import { define } from "../../utils.ts";
import { isRateLimited } from "../../utils/rateLimit.ts";
import { getContractByType } from "../../utils/contracts.ts";
import { generateSignatureId } from "../../utils/contractUtils.ts";
import { sendSignedContract } from "../../utils/contractEmail.ts";

const VALID_TYPES = ["msa", "nda", "diagnostic", "sow", "artifact"];

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
        JSON.stringify({ success: true, signatureId: "SIG-00000000-xxxxx" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate contract type
    const contractType = String(body.contractType ?? "");
    if (!VALID_TYPES.includes(contractType)) {
      return new Response(
        JSON.stringify({ error: "Invalid contract type" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate required fields
    const signedName = String(body.signedName ?? "").trim();
    const clientEmail = String(body.clientEmail ?? "").trim();
    const agreeTerms = body.agreeTerms === true;
    const agreeEsign = body.agreeEsign === true;
    const contractHtml = String(body.contractHtml ?? "");

    if (!signedName) {
      return new Response(
        JSON.stringify({ error: "Legal name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!agreeTerms || !agreeEsign) {
      return new Response(
        JSON.stringify({ error: "Both consent checkboxes must be checked" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!contractHtml) {
      return new Response(
        JSON.stringify({ error: "Contract content is missing" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Look up contract definition for title and version
    const contract = getContractByType(contractType);
    const contractTitle = contract?.title ?? contractType;
    const contractVersion = String(
      body.contractVersion ?? contract?.version ?? "1.0",
    );

    // Capture server-side metadata
    const timestamp = new Date().toISOString();
    const userAgent = ctx.req.headers.get("user-agent") ?? "unknown";
    const signatureId = generateSignatureId();

    // Send signed contract emails to both parties
    await Promise.allSettled([
      sendSignedContract({
        signatureId,
        signedName,
        clientEmail,
        contractType,
        contractTitle,
        contractVersion,
        timestamp,
        ip,
        userAgent,
        contractHtml,
      }),
    ]);

    return new Response(
      JSON.stringify({ success: true, signatureId }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
});
