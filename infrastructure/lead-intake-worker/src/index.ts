// AztraTech lead-intake Worker.
//
// POST /lead is the only public route. D1 storage is authoritative: a
// successful INSERT is the definition of a successfully captured lead.
// There is no notification step in this phase.
//
// Request processing order (see README.md for the full rationale):
//   1. Route / OPTIONS handling
//   2. Method check
//   3. Origin check
//   4. Content-Type check
//   5. Content-Length early size check
//   6. Derive privacy-safe actor key (daily keyed IP HMAC)
//   7. Native burst rate-limit check
//   8. Read body with a hard byte cap
//   9. Parse JSON
//  10. Honeypot check
//  11. Normalize and validate
//  12. D1 hourly rate-limit check
//  13. Generate the real requestId
//  14. INSERT with a prepared statement (authoritative success point)
//  15. Log successful storage without PII
//  16. Return 200

import { isHoneypotTriggered, validateLead } from "./validate";
import { jsonResponse, preflightResponse, type CorsContext } from "./respond";

export interface Env {
  DB: D1Database;
  RATE_LIMIT: RateLimit;
  ALLOWED_ORIGINS: string;
  IP_HASH_KEY: string;
}

const MAX_BODY_BYTES = 16384;
const HOURLY_LIMIT = 5;
const HOUR_MS = 60 * 60 * 1000;

type LogEvent = {
  event: "lead_stored" | "lead_rejected" | "lead_rate_limited" | "lead_honeypot" | "store_failed";
  requestId?: string;
  source?: string;
  tier?: "burst" | "hourly";
  fields?: string[];
  reason?: string;
  durationMs?: number;
};

// Structured, PII-free logging. Never pass name/email/company/context, a
// raw IP, an ip_hash, a request/response body, or a full error object.
function logEvent(event: LogEvent): void {
  console.log(JSON.stringify(event));
}

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function isJsonContentType(contentType: string): boolean {
  const mime = contentType.split(";")[0]?.trim().toLowerCase();
  return mime === "application/json";
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Daily-keyed HMAC-SHA256 of the client IP, truncated to ~128 bits and
 * base64url-encoded. The raw IP is never stored -- only this derived
 * value ever reaches D1. Rotating the date into the message means a
 * given day's hashes cannot be correlated with another day's, even by
 * someone with database access and the key.
 *
 * Known, accepted edge case: an hour-long rate-limit window that
 * straddles UTC midnight resets slightly early, since the hash changes
 * at 00:00 UTC. At this form's expected volume this is immaterial.
 */
async function computeIpHash(secret: string, clientIp: string): Promise<string> {
  const utcDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC
  const message = `${utcDate}|${clientIp}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  const truncated = new Uint8Array(signature).slice(0, 16); // 128 bits
  return base64UrlEncode(truncated);
}

/**
 * Reads the request body with a hard byte cap, never buffering past it.
 * Returns null if the body exceeds maxBytes (caller responds 413).
 * Content-Length is checked earlier as a cheap early rejection; this is
 * the authoritative check against the actual bytes read, since
 * Content-Length can be absent or wrong.
 */
async function readBodyWithCap(request: Request, maxBytes: number): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8").decode(merged);
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const start = Date.now();
    const url = new URL(request.url);

    // 1. Route handling.
    if (url.pathname !== "/lead") {
      return jsonResponse(404, { ok: false, error: "not_found" }, { allowed: false, origin: null });
    }

    const requestOrigin = request.headers.get("Origin");
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS);
    const originAllowed = requestOrigin !== null && allowedOrigins.includes(requestOrigin);
    const cors: CorsContext = {
      allowed: originAllowed,
      origin: originAllowed ? requestOrigin : null,
    };

    // OPTIONS preflight: allowed origin -> 204, otherwise 403, no ACAO.
    if (request.method === "OPTIONS") {
      return preflightResponse(cors);
    }

    // 2. Method check.
    if (request.method !== "POST") {
      return jsonResponse(
        405,
        { ok: false, error: "method_not_allowed" },
        cors,
        { Allow: "POST, OPTIONS" },
      );
    }

    // 3. Origin check (POST specifically must reject a disallowed origin).
    if (!originAllowed) {
      return jsonResponse(403, { ok: false, error: "forbidden" }, { allowed: false, origin: null });
    }

    // 4. Content-Type check (charset parameter tolerated).
    const contentType = request.headers.get("Content-Type") ?? "";
    if (!isJsonContentType(contentType)) {
      return jsonResponse(415, { ok: false, error: "unsupported_media_type" }, cors);
    }

    // 5. Content-Length early size check (cheap rejection; body may still
    //    lie, so step 8 enforces the real cap against bytes read).
    const contentLengthHeader = request.headers.get("Content-Length");
    if (contentLengthHeader !== null) {
      const declaredLength = Number(contentLengthHeader);
      if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
        return jsonResponse(413, { ok: false, error: "payload_too_large" }, cors);
      }
    }

    // 6. Derive the privacy-safe actor key. CF-Connecting-IP is the
    //    production-trustworthy client IP source; if it is absent (e.g.
    //    some local testing paths), ip_hash stays null rather than
    //    inventing or trusting an arbitrary header.
    const clientIp = request.headers.get("CF-Connecting-IP");
    const ipHash = clientIp ? await computeIpHash(env.IP_HASH_KEY, clientIp) : null;

    // 7. Native burst rate-limit check (3 / 60s). This is burst
    //    protection only -- it does not provide an hourly quota.
    const rateLimitKey = ipHash ?? "unknown";
    const { success: withinBurstLimit } = await env.RATE_LIMIT.limit({ key: rateLimitKey });
    if (!withinBurstLimit) {
      logEvent({ event: "lead_rate_limited", tier: "burst" });
      return jsonResponse(
        429,
        { ok: false, error: "rate_limited" },
        cors,
        { "Retry-After": "3600" },
      );
    }

    // 8. Read body with a hard byte cap.
    const bodyText = await readBodyWithCap(request, MAX_BODY_BYTES);
    if (bodyText === null) {
      return jsonResponse(413, { ok: false, error: "payload_too_large" }, cors);
    }

    // 9. Parse JSON. Must be a non-null, non-array object.
    let parsed: unknown;
    try {
      parsed = bodyText.length > 0 ? JSON.parse(bodyText) : null;
    } catch {
      return jsonResponse(400, { ok: false, error: "bad_request" }, cors);
    }
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return jsonResponse(400, { ok: false, error: "bad_request" }, cors);
    }
    const raw = parsed as Record<string, unknown>;

    // 10. Honeypot check: fake success, no D1 write, no tell.
    if (isHoneypotTriggered(raw)) {
      logEvent({ event: "lead_honeypot" });
      return jsonResponse(200, { ok: true, requestId: crypto.randomUUID() }, cors);
    }

    // 11. Normalize and validate.
    const result = validateLead(raw);
    if (!result.ok) {
      logEvent({ event: "lead_rejected", fields: Object.keys(result.fields) });
      return jsonResponse(
        422,
        { ok: false, error: "validation_failed", fields: result.fields },
        cors,
      );
    }
    const lead = result.value;

    // 12. D1 hourly rate-limit check (only meaningful when ip_hash exists).
    if (ipHash) {
      const since = Date.now() - HOUR_MS;
      const row = await env.DB.prepare(
        "SELECT COUNT(*) AS count FROM leads WHERE ip_hash = ? AND created_at > ?",
      )
        .bind(ipHash, since)
        .first<{ count: number }>();

      if (row && row.count >= HOURLY_LIMIT) {
        logEvent({ event: "lead_rate_limited", tier: "hourly" });
        return jsonResponse(
          429,
          { ok: false, error: "rate_limited" },
          cors,
          { "Retry-After": "3600" },
        );
      }
    }

    // 13. Generate the real requestId (a correlation/reference ID -- it
    //     is generated server-side after the request arrives, so it is
    //     NOT an idempotency key).
    const requestId = crypto.randomUUID();
    const createdAt = Date.now();

    // 14. INSERT with a prepared statement. This is the authoritative
    //     success point: once this commits, the lead is captured.
    try {
      await env.DB.prepare(
        `INSERT INTO leads (request_id, created_at, name, email, company, context, source, status, ip_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
      )
        .bind(
          requestId,
          createdAt,
          lead.name,
          lead.email,
          lead.company,
          lead.context,
          lead.source,
          ipHash,
        )
        .run();
    } catch (err) {
      // Never log the full error object -- it may echo bound values.
      const reason = err instanceof Error ? err.name : "unknown";
      logEvent({ event: "store_failed", requestId, reason });
      return jsonResponse(500, { ok: false, error: "server_error", requestId }, cors);
    }

    // 15. Log successful storage without PII.
    logEvent({ event: "lead_stored", requestId, source: lead.source, durationMs: Date.now() - start });

    // 16. Return.
    return jsonResponse(200, { ok: true, requestId }, cors);
  },
};
