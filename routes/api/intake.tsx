import { define } from "../../utils.ts";
import { isRateLimited } from "../../utils/rateLimit.ts";
import { sendConfirmation, sendNotification } from "../../utils/email.ts";

const VALID_TYPES = ["diagnostic", "briefing", "artifact", "general"];

export const handler = define.handlers({
  async POST(ctx) {
    // Rate limit by IP
    const ip = ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      ctx.req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await ctx.req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Honeypot check — silently return success to fool bots
    if (body.website) {
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate type
    const type = String(body.type ?? "");
    if (!VALID_TYPES.includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid request type" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate required fields
    const email = String(body.email ?? "").trim();
    const name = String(body.name ?? "").trim();
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Send emails — log failures but still return success to the client
    // (we don't want a Resend outage to prevent form submissions)
    const [notifResult, confirmResult] = await Promise.allSettled([
      sendNotification(type, body),
      sendConfirmation(email, type),
    ]);

    const notifOk = notifResult.status === "fulfilled" &&
      notifResult.value.ok;
    const confirmOk = confirmResult.status === "fulfilled" &&
      confirmResult.value.ok;

    if (!notifOk || !confirmOk) {
      console.error("[INTAKE]", type, email, {
        notification: notifOk,
        confirmation: confirmOk,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
});
