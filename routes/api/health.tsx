/**
 * Health-check endpoint for deployment verification.
 *
 * GET /api/health          → basic liveness check
 * GET /api/health?email=1  → also verifies Resend API key is valid
 *
 * Returns JSON: { ok, checks: { runtime, email? }, timestamp }
 */
import { define } from "../../utils.ts";
import { send } from "../../utils/email.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const checkEmail = url.searchParams.get("email") === "1";

    const checks: Record<string, { ok: boolean; detail: string }> = {
      runtime: { ok: true, detail: "deno" },
    };

    // Optionally verify that the Resend API key works by sending a test email
    if (checkEmail) {
      const result = await send({
        to: "delivered@resend.dev", // Resend's test inbox — always succeeds
        subject: "[ReformLogic] Health check",
        html: "<p>Deployment email verification — safe to ignore.</p>",
      });
      checks.email = {
        ok: result.ok,
        detail: result.devMode ? "dev-mode (no API key)" : result.detail,
      };
    }

    const allOk = Object.values(checks).every((c) => c.ok);

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
  },
});
