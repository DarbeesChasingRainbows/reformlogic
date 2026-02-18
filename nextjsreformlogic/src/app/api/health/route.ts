import { send } from "../../../lib/email";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const checkEmail = url.searchParams.get("email") === "1";

  const checks: Record<string, { ok: boolean; detail: string }> = {
    runtime: { ok: true, detail: "node" },
  };

  if (checkEmail) {
    const result = await send({
      to: "delivered@resend.dev",
      subject: "[ReformLogic] Health check",
      html: "<p>Deployment email verification — safe to ignore.</p>",
    });

    checks.email = {
      ok: result.ok,
      detail: result.devMode ? "dev-mode (no API key)" : result.detail,
    };
  }

  const allOk = Object.values(checks).every((check) => check.ok);

  return new Response(
    JSON.stringify({
      ok: allOk,
      checks,
      timestamp: new Date().toISOString(),
    }),
    {
      status: allOk ? 200 : 503,
      headers: { "Content-Type": "application/json" },
    },
  );
}
