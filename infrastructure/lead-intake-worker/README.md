# AztraTech Lead Intake Worker

Cloudflare Worker backend for the aztra.tech B2B lead form.

**Status: backend only. The frontend is NOT connected yet.** No form exists
on aztra.tech in this phase; this Worker is deployed and tested in
isolation so the storage path is proven before any public surface depends
on it.

## Purpose

Accepts a short lead submission (name, email, optional company, project
context, source) and stores it in D1. There is no email/CRM notification
in this phase -- D1 storage is the entire backend. A successful `INSERT`
is the authoritative definition of "lead captured."

## Architecture

```
src/
  index.ts     Routing, CORS, rate limiting, request orchestration
  validate.ts  Normalization + field validation rules
  respond.ts   JSON/CORS response builders
migrations/
  0001_create_leads.sql   Initial schema (immutable once applied remotely)
```

Zero runtime dependencies. Everything uses native Workers/Web APIs
(`crypto.subtle`, `fetch`, `D1Database`, `RateLimit`). The only
`devDependencies` are `wrangler` and `@cloudflare/workers-types`, isolated
from the root website's `package.json`.

## `POST /lead` contract

**Request** -- `Content-Type: application/json` (charset tolerated), max
16384 bytes:

```jsonc
{
  "name": "string",     // required, 1-100 code points
  "email": "string",    // required, <=254 chars, syntactically validated
  "company": "string",  // optional, <=120 code points; empty -> NULL
  "context": "string",  // required, 20-3000 code points
  "source": "string",   // required: "homepage" | "contact"
  "website": ""         // honeypot; must be empty/absent
}
```

Unknown top-level properties are ignored.

**Responses:**

| Status | Body | Meaning |
|---|---|---|
| 200 | `{"ok":true,"requestId":"<uuid>"}` | Stored (or honeypot fake-success) |
| 422 | `{"ok":false,"error":"validation_failed","fields":{...}}` | Field codes: `required`, `invalid`, `too_short`, `too_long` |
| 429 | `{"ok":false,"error":"rate_limited"}` | `Retry-After: 3600` |
| 400/403/404/405/413/415 | `{"ok":false,"error":"<code>"}` | See index.ts |
| 500 | `{"ok":false,"error":"server_error","requestId":"<uuid>"}` | D1 write failed |

`requestId` is a **correlation/reference ID only** (`crypto.randomUUID()`,
generated server-side after the request arrives). It is not, and must not
be described as, an idempotency key.

`OPTIONS /lead` handles CORS preflight; see "CORS" below.

## CORS

Production allowlist: `https://aztra.tech` only (set via the `ALLOWED_ORIGINS`
var in `wrangler.toml`, comma-separated if ever extended). No wildcard, no
`localhost` in the deployed config, no credentials. A disallowed origin
gets no `Access-Control-Allow-Origin` header on any response, including
errors. A future local-dev-origin story (for browser-based frontend
integration testing) is intentionally deferred to when the frontend is
built.

## Rate limiting (two tiers)

1. **Burst** -- native Cloudflare Rate Limiting binding (`RATE_LIMIT`),
   3 requests / 60 seconds per actor key. This is burst protection only;
   it does not provide an hourly quota (Cloudflare's native binding only
   supports 10s or 60s windows).
2. **Hourly** -- a D1 query (`SELECT COUNT(*) FROM leads WHERE ip_hash = ?
   AND created_at > ?`) rejects a 6th stored lead from the same `ip_hash`
   within a rolling hour. Only runs when `ip_hash` is available.

Both keys are the daily-rotating IP HMAC (below), never a raw IP.

## Privacy / IP handling

- The raw client IP (`CF-Connecting-IP`) is **never persisted and never
  logged**. It exists only as a local variable for the duration of one
  request.
- `ip_hash` = `base64url(HMAC-SHA256(IP_HASH_KEY, "<UTC-date>|<clientIp>")[0:16 bytes])`,
  computed with native `crypto.subtle`. Keyed (not a bare hash) so it
  cannot be reversed without the secret; rotates daily so hashes from
  different days cannot be correlated even by someone with database
  access and the key.
- **User-Agent is never stored, never logged.**
- If `CF-Connecting-IP` is absent, `ip_hash` is `NULL` -- no header is
  ever trusted as a substitute for it (in particular, `X-Forwarded-For`
  is not used as the production identity source).
- Known, accepted edge case: an hourly rate-limit window that straddles
  UTC midnight resets slightly early, since the hash changes at 00:00
  UTC. Immaterial at this form's expected volume.

## Logging

Structured, single-line JSON events only: `lead_stored`, `lead_rejected`,
`lead_rate_limited`, `lead_honeypot`, `store_failed`. Allowed metadata:
`requestId`, `source`, `tier`, `fields` (names only), `reason` (an error
*name*, never a full error object), `durationMs`. **Never logged:** name,
email, company, context, raw IP, `ip_hash`, request/response bodies.

## D1 database

- Name: `aztratech-leads`
- Database ID: `d5fe15de-9437-4a7c-a9de-094c36215705`
- **Jurisdiction: EU** (confirmed via `wrangler d1 info` -- `jurisdiction:
  eu`, `running_in_region: EEUR`), created with
  `wrangler d1 create aztratech-leads --jurisdiction=eu`.
- Schema: see `migrations/0001_create_leads.sql`. No raw IP column, no
  User-Agent column, no notification columns (out of scope this phase).

### Migrations

Treat an applied migration file as **immutable**. A schema change is
always a new, separately numbered file (`0002_*.sql`, ...), never an edit
to an existing one -- Wrangler tracks applied migrations by filename, and
SQLite's `ALTER TABLE` is limited (adding a nullable column is cheap;
dropping/renaming a column or changing a `CHECK` constraint requires a
full table rebuild).

```bash
# Local first, always:
npx wrangler d1 migrations apply aztratech-leads --local

# Then remote, only after local + Worker QA pass:
npx wrangler d1 migrations apply aztratech-leads --remote
```

## Local development

```bash
cd infrastructure/lead-intake-worker
npm install

# One-time: create infrastructure/lead-intake-worker/.dev.vars
# (gitignored) containing:
#   IP_HASH_KEY="<any random value for local testing>"
# infrastructure/lead-intake-worker/.dev.vars.example shows the format.

npm run migrate:local   # apply the schema to the local D1 emulation
npm run dev              # wrangler dev, http://localhost:8787

curl -i -X POST http://localhost:8787/lead \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://aztra.tech' \
  -d '{"name":"Test","email":"t@example.com","context":"A context long enough to pass the twenty character minimum.","source":"homepage"}'
```

`IP_HASH_KEY` is required by `Env` (no fallback) -- the Worker will error
without it, both locally (`.dev.vars`) and in production (`wrangler secret`).

## Deploying

```bash
npx wrangler deploy --dry-run   # compile + checks, uploads nothing
npx wrangler deploy
```

Secrets are never set in `wrangler.toml` or committed. Production:

```bash
npx wrangler secret put IP_HASH_KEY
# paste the value at the prompt, or pipe it in without echoing to
# shell history, e.g.: printf '%s' "$KEY" | npx wrangler secret put IP_HASH_KEY
```

## Inspecting remote leads safely

```bash
npx wrangler d1 execute aztratech-leads --remote \
  --command "SELECT id, request_id, source, status, created_at FROM leads ORDER BY id DESC LIMIT 20"
```

Prefer selecting only `id, request_id, source, status, created_at` for
routine checks -- avoid pulling `name`/`email`/`context` into a terminal
or log unless actually needed, and never paste lead content into a chat,
issue, or log aggregator.

## Current backend endpoint

```
https://aztratech-lead-intake.aztratech.workers.dev/lead
```

This is a **workers.dev endpoint, used for development and release
testing**. It is not a production DNS-backed hostname. A branded
endpoint such as `api.aztra.tech` is a separate, later decision --
`aztra.tech` DNS is not currently hosted on Cloudflare, so that step
requires its own DNS migration decision and is explicitly out of scope
here.

> **Account subdomain history:** the account's workers.dev subdomain was
> initially auto-registered by Wrangler as `aztratech-lead-intake-worker`
> during the first deploy rather than chosen interactively. It has since
> been manually reviewed and changed to `aztratech`, giving the current
> endpoint above.

## Current infrastructure state

- Worker deployed (`aztratech-lead-intake`, workers.dev)
- D1 active (`aztratech-leads`)
- D1 jurisdiction = EU
- Frontend NOT connected -- `app/**` and `lib/**` are untouched
- No email notification provider
- workers.dev is the current Worker host
- `api.aztra.tech` remains a future infrastructure decision
- Website production remains GitHub Pages
- DNS has not been moved to Cloudflare

## Not in this phase

- No email or CRM notification provider (D1 storage only).
- No frontend form -- `app/**` and `lib/**` are untouched.
- No `api.aztra.tech` custom domain, no DNS changes.
- No Turnstile / bot challenge beyond the honeypot field.
