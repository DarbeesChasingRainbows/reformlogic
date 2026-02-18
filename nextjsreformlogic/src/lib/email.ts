export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailResult {
  ok: boolean;
  detail: string;
  devMode: boolean;
}

const getEnv = (key: string): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }
  const g = globalThis as unknown as { __env?: Record<string, string> };
  return g.__env?.[key];
};

const getApiKey = () => getEnv("RESEND_API_KEY");
export const getNotificationEmail = () =>
  getEnv("NOTIFICATION_EMAIL") || "hello@reformlogic.com";
const getFromAddress = () =>
  getEnv("FROM_ADDRESS") || "ReformLogic <noreply@reformlogic.com>";

export async function send(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.log("[EMAIL-DEV]", payload.subject, "->", payload.to);
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
      console.log("[EMAIL-OK]", payload.subject, "->", payload.to, "id:", id);
      return { ok: true, detail: String(id), devMode: false };
    }

    const msg =
      (body as Record<string, unknown>).message ?? `HTTP ${res.status}`;
    console.error("[EMAIL-FAIL]", res.status, msg, "->", payload.to);
    return { ok: false, detail: String(msg), devMode: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[EMAIL-ERROR]", message);
    return { ok: false, detail: message, devMode: false };
  }
}

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
