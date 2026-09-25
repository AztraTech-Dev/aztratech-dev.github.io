"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { siteConfig } from "../../../lib/site-config";

type LeadSource = "homepage" | "contact";

type LeadFormProps = {
  source: LeadSource;
};

type FieldName = "name" | "email" | "company" | "context";

type FormValues = {
  name: string;
  email: string;
  company: string;
  context: string;
  website: string;
};

type FieldErrors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success";

const FIELD_ORDER: FieldName[] = ["name", "email", "company", "context"];

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const COMPANY_MAX = 120;
const CONTEXT_MIN = 20;
const CONTEXT_MAX = 3000;
const SUBMIT_TIMEOUT_MS = 15000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES = {
  nameRequired: "Enter your name.",
  nameTooLong: "Shorten your name.",
  emailInvalid: "Enter a valid email address.",
  companyTooLong: "Shorten this field.",
  contextRequired: "Add a short description of the project or problem.",
  contextTooLong: "Shorten the project context.",
  sendFailed:
    "The message could not be sent. Please try again, or email us directly.",
  rateLimited: "Too many submissions. Try again later, or book a call.",
  unreachable: "We could not reach the server. Please try again.",
} as const;

function codePointLength(value: string): number {
  return [...value].length;
}

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  const name = values.name.trim();
  if (name.length === 0) {
    errors.name = MESSAGES.nameRequired;
  } else if (codePointLength(name) > NAME_MAX) {
    errors.name = MESSAGES.nameTooLong;
  }

  const email = values.email.trim();
  if (
    email.length === 0 ||
    email.length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email = MESSAGES.emailInvalid;
  }

  const company = values.company.trim();
  if (codePointLength(company) > COMPANY_MAX) {
    errors.company = MESSAGES.companyTooLong;
  }

  const context = values.context.trim();
  const contextLength = codePointLength(context);
  if (contextLength === 0 || contextLength < CONTEXT_MIN) {
    errors.context = MESSAGES.contextRequired;
  } else if (contextLength > CONTEXT_MAX) {
    errors.context = MESSAGES.contextTooLong;
  }

  return errors;
}

/** Maps the backend's machine field codes (required/invalid/too_short/too_long) to copy. */
function mapBackendFieldErrors(fields: Record<string, unknown>): FieldErrors {
  const mapped: FieldErrors = {};

  for (const [field, rawCode] of Object.entries(fields)) {
    const code = typeof rawCode === "string" ? rawCode : "";

    if (field === "name") {
      mapped.name = code === "too_long" ? MESSAGES.nameTooLong : MESSAGES.nameRequired;
    } else if (field === "email") {
      mapped.email = MESSAGES.emailInvalid;
    } else if (field === "company") {
      mapped.company = MESSAGES.companyTooLong;
    } else if (field === "context") {
      mapped.context =
        code === "too_long" ? MESSAGES.contextTooLong : MESSAGES.contextRequired;
    }
    // Unknown/unexpected fields (e.g. "source") are intentionally not
    // surfaced as a field error; the caller falls back to a generic
    // send-failure message when nothing recognizable was mapped.
  }

  return mapped;
}

type SuccessBody = { ok: true; requestId?: unknown };
type ValidationBody = {
  ok: false;
  error: "validation_failed";
  fields: Record<string, unknown>;
};
type ErrorBody = { ok: false; error?: unknown };

function isSuccessBody(data: unknown): data is SuccessBody {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: unknown }).ok === true
  );
}

function isValidationBody(data: unknown): data is ValidationBody {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { ok?: unknown }).ok === false &&
    (data as { error?: unknown }).error === "validation_failed" &&
    typeof (data as { fields?: unknown }).fields === "object" &&
    (data as { fields?: unknown }).fields !== null
  );
}

export default function LeadForm({ source }: LeadFormProps) {
  const uid = useId();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    context: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const mountedRef = useRef(true);
  const abortRef = useRef<AbortController | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const contextRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const fieldRefs: Record<FieldName, typeof nameRef | typeof contextRef> = {
    name: nameRef,
    email: emailRef,
    company: companyRef,
    context: contextRef,
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  function focusFirstError(errors: FieldErrors) {
    for (const field of FIELD_ORDER) {
      if (errors[field]) {
        fieldRefs[field].current?.focus();
        return;
      }
    }
  }

  function updateField<K extends FieldName | "website">(
    field: K,
    value: string,
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "website" && fieldErrors[field as FieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field as FieldName];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError(null);
      focusFirstError(errors);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");
    setStatusMessage("Sending your message.");

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(siteConfig.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        mode: "cors",
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          context: values.context.trim(),
          source,
          website: values.website,
        }),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!mountedRef.current) return;

      if (response.ok && isSuccessBody(data)) {
        setRequestId(typeof data.requestId === "string" ? data.requestId : null);
        setStatus("success");
        setStatusMessage("Message received.");
        return;
      }

      if (response.status === 422 && isValidationBody(data)) {
        const mapped = mapBackendFieldErrors(data.fields);
        if (Object.keys(mapped).length > 0) {
          setFieldErrors(mapped);
          setStatus("idle");
          setStatusMessage("The form has errors.");
          focusFirstError(mapped);
        } else {
          // formError below renders with role="alert", which already
          // announces this text; setting the same string into the
          // aria-live="polite" region too would announce it twice.
          setFormError(MESSAGES.sendFailed);
          setStatus("idle");
        }
        return;
      }

      if (response.status === 429) {
        setFormError(MESSAGES.rateLimited);
        setStatus("idle");
        return;
      }

      // 400 / 413 / 415 / 500 / any other unexpected response shape.
      const errorBody = data as ErrorBody | null;
      void errorBody; // Never surfaced -- backend internals are not shown to the user.
      setFormError(MESSAGES.sendFailed);
      setStatus("idle");
    } catch (err) {
      if (!mountedRef.current) return;
      // Both a client-side timeout (AbortError) and a genuine network
      // failure resolve to the same user-facing copy; there is nothing
      // actionable a visitor can do differently for one versus the other.
      void err;
      setFormError(MESSAGES.unreachable);
      setStatus("idle");
    } finally {
      clearTimeout(timeoutId);
      abortRef.current = null;
    }
  }

  if (status === "success") {
    return (
      <div className="lead-form lead-form--success">
        <h3 tabIndex={-1} ref={successHeadingRef}>
          Message received.
        </h3>
        <p>
          Thank you. We will review the context and reply to the email you
          provided if there is a useful next step.
        </p>
        {requestId ? (
          <p className="lead-form__reference">Reference: {requestId}</p>
        ) : null}
        <p aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form__row">
        <div className="lead-form__field">
          <label htmlFor={`${uid}-name`}>Name</label>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX}
            required
            placeholder="Your name"
            value={values.name}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `${uid}-name-error` : undefined}
            onChange={(event) => updateField("name", event.target.value)}
          />
          {fieldErrors.name ? (
            <p id={`${uid}-name-error`} className="lead-form__error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="lead-form__field">
          <label htmlFor={`${uid}-email`}>Email</label>
          <input
            ref={emailRef}
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={EMAIL_MAX}
            required
            placeholder="you@company.com"
            value={values.email}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {fieldErrors.email ? (
            <p id={`${uid}-email-error`} className="lead-form__error">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="lead-form__field">
        <label htmlFor={`${uid}-company`}>Company or project (optional)</label>
        <input
          ref={companyRef}
          id={`${uid}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={COMPANY_MAX}
          placeholder="Company or product name"
          value={values.company}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.company)}
          aria-describedby={fieldErrors.company ? `${uid}-company-error` : undefined}
          onChange={(event) => updateField("company", event.target.value)}
        />
        {fieldErrors.company ? (
          <p id={`${uid}-company-error`} className="lead-form__error">
            {fieldErrors.company}
          </p>
        ) : null}
      </div>

      <div className="lead-form__field">
        <label htmlFor={`${uid}-context`}>Project context</label>
        <textarea
          ref={contextRef}
          id={`${uid}-context`}
          name="context"
          rows={6}
          maxLength={CONTEXT_MAX}
          required
          placeholder="What does the product do, what is already built, and which technical decision or blocker is still open?"
          value={values.context}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.context)}
          aria-describedby={fieldErrors.context ? `${uid}-context-error` : undefined}
          onChange={(event) => updateField("context", event.target.value)}
        />
        {fieldErrors.context ? (
          <p id={`${uid}-context-error`} className="lead-form__error">
            {fieldErrors.context}
          </p>
        ) : null}
      </div>

      {/* Honeypot: present in the DOM for bots, invisible and unreachable
          for real visitors. Positioned off-screen rather than display:none
          (which some bots specifically skip), not focusable, and hidden
          from assistive tech. Field name matches the backend contract. */}
      <div className="lead-form__hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <p className="lead-form__security-note">
        Do not send private keys, seed phrases, credentials or other secrets.
      </p>

      {formError ? (
        <div className="lead-form__form-error" role="alert">
          <p>{formError}</p>
          <p className="lead-form__form-error-alt">
            <a href={`mailto:${siteConfig.contact.email}`}>Email us directly</a>
            {" or "}
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">
              book a 30-minute discovery call
            </a>
            .
          </p>
        </div>
      ) : null}

      <button type="submit" className="button button--primary lead-form__submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending" : "Send project context"}
      </button>

      <p className="lead-form__privacy">
        We use these details only to respond to your message. See the{" "}
        <a href={siteConfig.routes.privacy}>Privacy notice</a>.
      </p>

      <p aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
    </form>
  );
}
