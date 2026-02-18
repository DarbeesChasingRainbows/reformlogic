"use client";

import { useMemo, useState } from "react";

interface ContractSignatureProps {
  contractType: string;
  contractVersion: string;
  clientName: string;
  clientEmail: string;
  contractHtml: string;
}

export default function ContractSignature(props: ContractSignatureProps) {
  const [signedName, setSignedName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeEsign, setAgreeEsign] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [signatureId, setSignatureId] = useState("");

  const canSubmit = useMemo(
    () => signedName.trim().length > 0 && agreeTerms && agreeEsign,
    [signedName, agreeTerms, agreeEsign],
  );

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website || !canSubmit) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractType: props.contractType,
          contractVersion: props.contractVersion,
          signedName: signedName.trim(),
          clientName: props.clientName,
          clientEmail: props.clientEmail,
          agreeTerms,
          agreeEsign,
          contractHtml: props.contractHtml,
          website,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Signing failed" })) as { error?: string };
        throw new Error(data.error ?? "Signing failed");
      }

      const data = await response.json() as { signatureId?: string };
      setSignatureId(data.signatureId ?? "");
      setStatus("success");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Signing failed");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-8 text-center">
        <p className="mb-2 text-lg font-medium text-emerald-400">Agreement Signed</p>
        {signatureId && <p className="mb-4 font-mono text-sm text-slate-500">Signature ID: {signatureId}</p>}
        <p className="text-sm text-slate-400">
          A copy of the signed agreement has been sent to <strong className="text-slate-300">{props.clientEmail}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="signature-form-help">
      <p id="signature-form-help" className="sr-only">All required fields must be completed before signing.</p>

      <div className="hidden" aria-hidden="true">
        <input id="signature-website" type="text" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && <div role="alert" className="rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-sm text-red-400">{errorMsg}</div>}

      <div className="border-t-2 border-indigo-500/30 pt-8">
        <h3 className="mb-2 text-xl font-semibold text-slate-100">Electronic Signature</h3>
        <p className="text-sm text-slate-400">Your typed name constitutes a legally binding electronic signature under the ESIGN Act.</p>
      </div>

      <div>
        <label htmlFor="signature-name" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Full Legal Name *</label>
        <input
          id="signature-name"
          type="text"
          required
          value={signedName}
          onChange={(event) => setSignedName(event.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-lg text-slate-200"
          placeholder="Type your full legal name"
          autoComplete="name"
        />
      </div>

      <fieldset className="space-y-4" aria-required="true">
        <legend className="text-xs uppercase tracking-widest text-slate-500">Required Consents</legend>

        <label htmlFor="agree-terms" className="flex items-start gap-3 text-sm text-slate-400">
          <input id="agree-terms" type="checkbox" checked={agreeTerms} onChange={(event) => setAgreeTerms(event.target.checked)} className="mt-1 h-4 w-4" />
          I have read and agree to the terms of this agreement.
        </label>

        <label htmlFor="agree-esign" className="flex items-start gap-3 text-sm text-slate-400">
          <input id="agree-esign" type="checkbox" checked={agreeEsign} onChange={(event) => setAgreeEsign(event.target.checked)} className="mt-1 h-4 w-4" />
          I consent to signing this agreement electronically.
        </label>
      </fieldset>

      <button type="submit" disabled={!canSubmit || status === "sending"} className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600">
        {status === "sending" ? "Processing Signature..." : "Sign Agreement"}
      </button>
    </form>
  );
}
