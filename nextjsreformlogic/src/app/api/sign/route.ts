import { sendSignedContract } from "../../../lib/contractEmail";
import { generateSignatureId } from "../../../lib/contractUtils";
import { getContractByType } from "../../../lib/contracts";
import { isRateLimited } from "../../../lib/rateLimit";

export const runtime = "edge";

const VALID_TYPES = ["msa", "nda", "diagnostic", "sow", "artifact"];

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
    return new Response(
      JSON.stringify({ success: true, signatureId: "SIG-00000000-xxxxx" }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const contractType = String(body.contractType ?? "");
  if (!VALID_TYPES.includes(contractType)) {
    return new Response(JSON.stringify({ error: "Invalid contract type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const signedName = String(body.signedName ?? "").trim();
  const clientEmail = String(body.clientEmail ?? "").trim();
  const agreeTerms = body.agreeTerms === true;
  const agreeEsign = body.agreeEsign === true;
  const contractHtml = String(body.contractHtml ?? "");

  if (!signedName) {
    return new Response(JSON.stringify({ error: "Legal name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
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

  const contract = getContractByType(contractType);
  const contractTitle = contract?.title ?? contractType;
  const contractVersion = String(body.contractVersion ?? contract?.version ?? "1.0");

  const timestamp = new Date().toISOString();
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const signatureId = generateSignatureId();

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

  return new Response(JSON.stringify({ success: true, signatureId }), {
    headers: { "Content-Type": "application/json" },
  });
}
