import { getNotificationEmail, send } from "./email";

interface SignatureMetadata {
  signatureId: string;
  signedName: string;
  clientEmail: string;
  contractType: string;
  contractTitle: string;
  contractVersion: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  contractHtml: string;
}

export async function sendSignedContract(
  meta: SignatureMetadata,
): Promise<{ consultantOk: boolean; clientOk: boolean }> {
  const signatureBlock = `
    <div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #334155;">
      <h2 style="color: #818cf8; font-size: 18px; margin-bottom: 16px;">Electronic Signature Record</h2>
      <table style="width: 100%; font-size: 14px; color: #94a3b8; line-height: 1.8;">
        <tr><td style="color: #64748b; width: 160px;">Signature ID:</td><td style="color: #e2e8f0; font-family: monospace;">${meta.signatureId}</td></tr>
        <tr><td style="color: #64748b;">Signed By:</td><td style="color: #e2e8f0;">${meta.signedName}</td></tr>
        <tr><td style="color: #64748b;">Email:</td><td style="color: #e2e8f0;">${meta.clientEmail}</td></tr>
        <tr><td style="color: #64748b;">Contract:</td><td style="color: #e2e8f0;">${meta.contractTitle} (v${meta.contractVersion})</td></tr>
        <tr><td style="color: #64748b;">Timestamp (UTC):</td><td style="color: #e2e8f0; font-family: monospace;">${meta.timestamp}</td></tr>
        <tr><td style="color: #64748b;">IP Address:</td><td style="color: #e2e8f0; font-family: monospace;">${meta.ip}</td></tr>
      </table>
      <p style="color: #64748b; font-size: 11px; margin-top: 24px; padding: 12px; background: #1e293b; border-radius: 4px;">
        This document was electronically signed in accordance with the U.S. Electronic Signatures in Global and National Commerce Act (ESIGN Act) and the Uniform Electronic Transactions Act (UETA). The signer provided explicit consent to conduct this transaction electronically. This email serves as a durable record of the agreement. Both parties should retain this email for their records.
      </p>
    </div>
  `;

  const fullHtml = `
    <div style="font-family: sans-serif; color: #e2e8f0; background: #0f172a; padding: 32px; border-radius: 8px; max-width: 720px;">
      <div style="margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #334155;">
        <h1 style="color: #818cf8; margin: 0; font-size: 20px;">ReformLogic — Signed Agreement</h1>
        <p style="color: #64748b; margin: 8px 0 0; font-size: 13px;">${meta.contractTitle} • ${meta.signatureId}</p>
      </div>
      ${meta.contractHtml}
      ${signatureBlock}
    </div>
  `;

  const subject =
    `[ReformLogic] Signed: ${meta.contractTitle} — ${meta.signedName}`;

  const [consultantResult, clientResult] = await Promise.allSettled([
    send({ to: getNotificationEmail(), subject, html: fullHtml }),
    send({ to: meta.clientEmail, subject, html: fullHtml }),
  ]);

  const consultantOk =
    consultantResult.status === "fulfilled" && consultantResult.value.ok;
  const clientOk = clientResult.status === "fulfilled" && clientResult.value.ok;

  if (!consultantOk || !clientOk) {
    console.error("[CONTRACT-EMAIL]", meta.signatureId, {
      consultant: consultantOk,
      client: clientOk,
    });
  }

  return { consultantOk, clientOk };
}
