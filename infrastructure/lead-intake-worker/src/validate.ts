// Server-side authoritative validation for POST /lead.
//
// Design notes:
// - User text is stored as text. HTML/script content is never stripped or
//   escaped here -- that is a rendering concern for wherever a lead is
//   displayed later, not a storage concern.
// - SQL injection is prevented exclusively by prepared statements with
//   bound parameters in index.ts. This module never builds SQL.
// - Unknown top-level JSON properties are ignored by the caller; this
//   module only reads the fields it knows about.

export type ValidatedLead = {
  name: string;
  email: string;
  company: string | null;
  context: string;
  source: "homepage" | "contact";
};

export type FieldErrorCode = "required" | "invalid" | "too_short" | "too_long";

export type FieldErrors = Record<string, FieldErrorCode>;

export type ValidationResult =
  | { ok: true; value: ValidatedLead }
  | { ok: false; fields: FieldErrors };

const ALLOWED_SOURCES = new Set(["homepage", "contact"]);

// C0 controls except \n (0x0A) and \t (0x09), plus C1 controls and DEL.
const UNSAFE_CONTROL_CHARS =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

function codePointLength(value: string): number {
  return [...value].length;
}

function normalizeBase(input: string): string {
  return input
    .normalize("NFC")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(UNSAFE_CONTROL_CHARS, "");
}

/** For name / email / company: single logical line, whitespace collapsed. */
function normalizeSingleLineField(input: string): string {
  return normalizeBase(input)
    .replace(/\s+/g, " ")
    .trim();
}

/** For context: preserve paragraphs, collapse excessive blank lines. */
function normalizeContext(input: string): string {
  return normalizeBase(input)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

/**
 * Sensible syntactic email validation. Deliberately not a full RFC 5322
 * parser -- that accepts addresses no real mail server would deliver to
 * anyway. This checks the shape a legitimate business email actually has.
 */
function isValidEmailSyntax(value: string): boolean {
  if (/\s/.test(value)) return false;

  const parts = value.split("@");
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.startsWith("-") || domain.includes("..")) return false;
  if (!domain.includes(".")) return false;

  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (!/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(domain)) return false;

  return true;
}

/**
 * True when `website` (the honeypot field) carries a meaningful value.
 * Absent, null, or empty-after-trim is accepted as normal (human) traffic.
 * Any other type is treated as a triggered honeypot rather than risking
 * an exception on unexpected input shapes.
 */
export function isHoneypotTriggered(raw: Record<string, unknown>): boolean {
  const website = raw.website;
  if (website === undefined || website === null) return false;
  if (typeof website !== "string") return true;
  return normalizeBase(website).trim().length > 0;
}

export function validateLead(raw: Record<string, unknown>): ValidationResult {
  const fields: FieldErrors = {};

  // name
  let name = "";
  if (typeof raw.name !== "string") {
    fields.name = "required";
  } else {
    name = normalizeSingleLineField(raw.name);
    const len = codePointLength(name);
    if (len === 0) fields.name = "required";
    else if (len > 100) fields.name = "too_long";
  }

  // email
  let email = "";
  if (typeof raw.email !== "string") {
    fields.email = "required";
  } else {
    const normalized = normalizeSingleLineField(raw.email);
    if (normalized.length === 0) {
      fields.email = "required";
    } else if (normalized.length > 254) {
      fields.email = "too_long";
    } else if (!isValidEmailSyntax(normalized)) {
      fields.email = "invalid";
    } else {
      const at = normalized.indexOf("@");
      // Lowercase the domain only; the local part is technically
      // case-sensitive and is left exactly as provided.
      email = `${normalized.slice(0, at)}@${normalized.slice(at + 1).toLowerCase()}`;
    }
  }

  // company (optional; empty normalizes to NULL)
  let company: string | null = null;
  if (raw.company !== undefined && raw.company !== null) {
    if (typeof raw.company !== "string") {
      fields.company = "invalid";
    } else {
      const normalized = normalizeSingleLineField(raw.company);
      const len = codePointLength(normalized);
      if (len > 120) {
        fields.company = "too_long";
      } else if (len > 0) {
        company = normalized;
      }
    }
  }

  // context
  let context = "";
  if (typeof raw.context !== "string") {
    fields.context = "required";
  } else {
    context = normalizeContext(raw.context);
    const len = codePointLength(context);
    if (len === 0) fields.context = "required";
    else if (len < 20) fields.context = "too_short";
    else if (len > 3000) fields.context = "too_long";
  }

  // source
  let source: "homepage" | "contact" | null = null;
  if (typeof raw.source !== "string") {
    fields.source = "required";
  } else if (ALLOWED_SOURCES.has(raw.source)) {
    source = raw.source as "homepage" | "contact";
  } else {
    fields.source = "invalid";
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  // Every field above is confirmed valid when `fields` is empty, so
  // `source` is guaranteed non-null here.
  return {
    ok: true,
    value: { name, email, company, context, source: source as "homepage" | "contact" },
  };
}
