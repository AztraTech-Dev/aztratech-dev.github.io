-- 0001_create_leads.sql
-- Lead intake storage for the aztra.tech project-context form.
--
-- D1 storage is authoritative: a successful INSERT here is the definition
-- of a successfully captured lead. There is no notification step yet.
--
-- Treat this migration as IMMUTABLE once it has been applied to the
-- remote (production) database. Future schema changes must be new,
-- separately numbered migration files (0002_*.sql, ...), never edits
-- to this file.
--
-- Privacy: this table intentionally has no column for a raw client IP
-- address and no column for User-Agent. ip_hash stores only a daily
-- keyed HMAC derived from the request IP (see src/validate.ts /
-- src/index.ts), never the IP itself.

CREATE TABLE leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id  TEXT    NOT NULL UNIQUE,
  created_at  INTEGER NOT NULL,              -- epoch milliseconds, UTC
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  company     TEXT,                          -- NULL when not provided
  context     TEXT    NOT NULL,
  source      TEXT    NOT NULL
              CHECK (source IN ('homepage', 'contact')),
  status      TEXT    NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'reviewed', 'replied', 'archived', 'spam')),
  ip_hash     TEXT                           -- daily-keyed HMAC, never a raw IP
);

CREATE INDEX idx_leads_created_at
ON leads (created_at DESC);

CREATE INDEX idx_leads_ip_hash_created_at
ON leads (ip_hash, created_at);
