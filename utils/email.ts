/**
 * Email utility using the Resend HTTP API (NOT SMTP).
 *
 * Environment variables (read lazily for Deno Deploy / Cloudflare compat):
 *   RESEND_API_KEY      — required in production; omit for dev-mode console logging
 *   NOTIFICATION_EMAIL  — where intake/signature notifications go (default: hello@reformlogic.com)
 *   FROM_ADDRESS        — verified sender (default: ReformLogic <noreply@reformlogic.com>)
 */

// ---------------------------------------------------------------------------
// Lazy env helpers — avoids module-level Deno.env.get() which breaks on some
// edge runtimes (Cloudflare Workers). Values are cached after first read.
// ---------------------------------------------------------------------------
let _apiKey: string | undefined;
let _notificationEmail: string | undefined;
let _fromAddress: string | undefined;

function env(key: string): string | undefined {
  // Deno Deploy & local Deno
  if (typeof Deno !== "undefined" && Deno.env?.get) {
    return Deno.env.get(key);
  }
  // Fallback for other runtimes (Cloudflare Workers, Node, etc.)
  // deno-lint-ignore no-explicit-any
  const g = globalThis as any;
  return g?.process?.env?.[key] ?? g?.__env?.[key];
}

function getApiKey(): string | undefined {
  if (_apiKey === undefined) _apiKey = env("RESEND_API_KEY") ?? "";
  return _apiKey || undefined;
}

export function getNotificationEmail(): string {
  if (_notificationEmail === undefined) {
    _notificationEmail = env("NOTIFICATION_EMAIL") || "hello@reformlogic.com";
  }
  return _notificationEmail;
}

function getFromAddress(): string {
  if (_fromAddress === undefined) {
    _fromAddress = env("FROM_ADDRESS") ||
      "ReformLogic <noreply@reformlogic.com>";
  }
  return _fromAddress;
}

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailResult {
  ok: boolean;
  /** Resend email ID on success, or error message on failure */
  detail: string;
  /** true when RESEND_API_KEY is missing and we only logged to console */
  devMode: boolean;
}

/**
 * Send an email via the Resend HTTP API.
 * Returns a structured result so callers can log / surface errors.
 */
export async function send(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.log("[EMAIL-DEV]", payload.subject, "→", payload.to);
    console.log(payload.html.replace(/<[^>]*>/g, "").substring(0, 200));
    return { ok: true, detail: "dev-mode-log", devMode: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getFromAddress(),
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    const body = await res.json().catch(() => ({}));

    if (res.ok) {
      const id = (body as Record<string, unknown>).id ?? "unknown";
      console.log("[EMAIL-OK]", payload.subject, "→", payload.to, "id:", id);
      return { ok: true, detail: String(id), devMode: false };
    }

    // Resend returns { statusCode, message, name } on errors
    const msg = (body as Record<string, unknown>).message ??
      `HTTP ${res.status}`;
    console.error("[EMAIL-FAIL]", res.status, msg, "→", payload.to);
    return { ok: false, detail: String(msg), devMode: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[EMAIL-ERROR]", message);
    return { ok: false, detail: message, devMode: false };
  }
}

/** Notify the developer about a new submission */
export async function sendNotification(
  type: string,
  data: Record<string, unknown>,
): Promise<EmailResult> {
  const fields = Object.entries(data)
    .filter(([k]) => k !== "website" && k !== "type")
    .map(([k, v]) => `<p><strong>${k}:</strong> ${String(v) || "—"}</p>`)
    .join("\n");

  return send({
    to: getNotificationEmail(),
    subject: `[ReformLogic] New ${type} request`,
    html: `
      <div style="font-family: monospace; color: #e2e8f0; background: #0f172a; padding: 24px; border-radius: 8px;">
        <h2 style="color: #818cf8; margin-bottom: 16px;">New ${
      type.charAt(0).toUpperCase() + type.slice(1)
    } Request</h2>
        ${fields}
      </div>
    `,
  });
}

/** Send a confirmation to the submitter */
export async function sendConfirmation(
  to: string,
  type: string,
): Promise<EmailResult> {
  const messages: Record<string, string> = {
    diagnostic:
      "I've received your request. I'll review your details and reach out within 24 hours to schedule the session.",
    briefing:
      "Your project briefing request has been received. I'll review the details and respond within 48 hours with a preliminary assessment.",
    artifact:
      "Your artifact request is in. I'll review the scope and get back to you with an estimate within 24 hours.",
    general: "Thanks for reaching out. I'll get back to you within 24 hours.",
  };

  return send({
    to,
    subject: "ReformLogic — Request Confirmed",
    html: `
      <div style="font-family: sans-serif; color: #e2e8f0; background: #0f172a; padding: 24px; border-radius: 8px;">
        <h2 style="color: #818cf8;">Request Received</h2>
        <p>${messages[type] ?? messages.general}</p>
        <p style="color: #64748b; margin-top: 24px; font-size: 12px;">— ReformLogic</p>
      </div>
    `,
  });
}
