import { sendConfirmation, sendNotification } from "../../../lib/email";
import { isRateLimited } from "../../../lib/rateLimit";

export const runtime = "edge";

const VALID_TYPES = ["diagnostic", "briefing", "artifact", "general"];

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (body.website) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const type = String(body.type ?? "");
  if (!VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid request type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = String(body.email ?? "").trim();
  const name = String(body.name ?? "").trim();
  if (!email || !name) {
    return new Response(JSON.stringify({ error: "Name and email are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Please provide a valid email address" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const [notifResult, confirmResult] = await Promise.allSettled([
    sendNotification(type, body),
    sendConfirmation(email, type),
  ]);

  const notifOk =
    notifResult.status === "fulfilled" && notifResult.value.ok;
  const confirmOk =
    confirmResult.status === "fulfilled" && confirmResult.value.ok;

  if (!notifOk || !confirmOk) {
    console.error("[INTAKE]", type, email, {
      notification: notifOk,
      confirmation: confirmOk,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
