// Best-effort operational email notification for a stored lead, sent via
// the Resend HTTP API with plain fetch (no SDK, no runtime dependency).
//
// This module runs only AFTER the D1 INSERT has succeeded (see index.ts).
// D1 remains the authoritative record; a notification failure never
// affects the visitor's response. The caller schedules this with
// ctx.waitUntil() and handles both outcomes.
//
// Content is deliberately minimal and plaintext-only, so visitor-supplied
// text is never interpreted as HTML. Excluded by design: raw IP, ip_hash,
// User-Agent, the honeypot field, rate-limit details, internal row IDs.

import type { ValidatedLead } from "./validate";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 10_000;

export type NotificationConfig = {
  apiKey: string | undefined;
  recipient: string | undefined;
  from: string | undefined;
};

export type StoredLead = {
  requestId: string;
  createdAt: number; // epoch milliseconds, UTC (same value stored in D1)
  lead: ValidatedLead;
};

export type LeadEmail = {
  from: string;
  to: string[];
  subject: string;
  text: string;
};

/**
 * Thrown for every notification failure. `reason` and `status` are the
 * only details surfaced, so a caller can log them without risking PII:
 * the provider response body is never read into this error.
 */
export class NotificationError extends Error {
  readonly reason: "not_configured" | "provider_rejected" | "network_error";
  readonly status?: number;

  constructor(reason: NotificationError["reason"], status?: number) {
    super(reason);
    this.name = "NotificationError";
    this.reason = reason;
    this.status = status;
  }
}

export function buildLeadEmail(stored: StoredLead, from: string, recipient: string): LeadEmail {
  const { lead } = stored;
  const lines = [
    "A new project-context submission was stored in D1.",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    ...(lead.company ? [`Company: ${lead.company}`] : []),
    `Source: ${lead.source}`,
    `Request ID: ${stored.requestId}`,
    `Received: ${new Date(stored.createdAt).toISOString()}`,
    "",
    "Project context:",
    lead.context,
  ];

  return {
    from,
    to: [recipient],
    subject: `New AztraTech lead — ${lead.name}`,
    text: lines.join("\n"),
  };
}

/**
 * Sends the notification. Resolves with the provider's HTTP status on a
 * 2xx response; rejects with a NotificationError otherwise. `fetchImpl`
 * is injectable so the behavior can be exercised with a mocked fetch.
 */
export async function sendLeadNotification(
  config: NotificationConfig,
  stored: StoredLead,
  fetchImpl: typeof fetch = fetch,
): Promise<number> {
  if (!config.apiKey || !config.recipient || !config.from) {
    throw new NotificationError("not_configured");
  }

  const email = buildLeadEmail(stored, config.from, config.recipient);

  let response: Response;
  try {
    response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch {
    throw new NotificationError("network_error");
  }

  // Release the connection without reading the body: it may echo
  // submitted fields and is never logged or returned.
  try {
    await response.body?.cancel();
  } catch {
    // Irrelevant to the outcome; the status code decides success.
  }

  if (!response.ok) {
    throw new NotificationError("provider_rejected", response.status);
  }
  return response.status;
}
