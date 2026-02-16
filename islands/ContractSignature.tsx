import { useSignal } from "@preact/signals";

interface ContractSignatureProps {
  contractType: string;
  contractVersion: string;
  clientName: string;
  clientEmail: string;
  contractHtml: string;
}

export default function ContractSignature(props: ContractSignatureProps) {
  const signedName = useSignal("");
  const agreeTerms = useSignal(false);
  const agreeEsign = useSignal(false);
  const honeypot = useSignal("");
  const status = useSignal<"idle" | "sending" | "success" | "error">("idle");
  const errorMsg = useSignal("");
  const signatureId = useSignal("");

  const isValid = () =>
    signedName.value.trim().length > 0 &&
    agreeTerms.value &&
    agreeEsign.value;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (honeypot.value) return;
    if (!isValid()) return;
    status.value = "sending";

    try {
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractType: props.contractType,
          contractVersion: props.contractVersion,
          signedName: signedName.value.trim(),
          clientName: props.clientName,
          clientEmail: props.clientEmail,
          agreeTerms: agreeTerms.value,
          agreeEsign: agreeEsign.value,
          contractHtml: props.contractHtml,
          website: honeypot.value,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({
          error: "Signing failed",
        }));
        throw new Error(data.error ?? "Signing failed");
      }
      const data = await res.json();
      signatureId.value = data.signatureId ?? "";
      status.value = "success";
    } catch (err) {
      errorMsg.value = (err as Error).message;
      status.value = "error";
    }
  };

  if (status.value === "success") {
    return (
      <div class="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <svg
            class="w-8 h-8 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p class="text-emerald-400 text-lg font-medium mb-2">
          Agreement Signed
        </p>
        {signatureId.value && (
          <p class="text-slate-500 font-mono text-sm mb-4">
            Signature ID: {signatureId.value}
          </p>
        )}
        <p class="text-slate-400 text-sm">
          A copy of the signed agreement has been sent to{" "}
          <strong class="text-slate-300">{props.clientEmail}</strong>. Please
          retain this email for your records.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      {/* Honeypot */}
      <div style="display:none">
        <input
          type="text"
          name="website"
          value={honeypot.value}
          onInput={(e) => honeypot.value = (e.target as HTMLInputElement).value}
          tabIndex={-1}
          autocomplete="off"
        />
      </div>

      {status.value === "error" && (
        <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
          {errorMsg.value}
        </div>
      )}

      {/* Signature Section Header */}
      <div class="border-t-2 border-indigo-500/30 pt-8">
        <h3 class="text-xl font-semibold text-slate-100 mb-2">
          Electronic Signature
        </h3>
        <p class="text-sm text-slate-400 mb-6">
          By signing below, you acknowledge that you have read and agree to the
          terms of this agreement. Your typed name constitutes a legally binding
          electronic signature under the ESIGN Act.
        </p>
      </div>

      {/* Typed Name */}
      <div>
        <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Full Legal Name *
        </label>
        <input
          type="text"
          required
          value={signedName.value}
          onInput={(e) =>
            signedName.value = (e.target as HTMLInputElement).value}
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors font-serif text-lg"
          placeholder="Type your full legal name"
        />
        {signedName.value.trim() && (
          <div class="mt-3 px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <p class="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">
              Signature Preview
            </p>
            <p
              class="text-2xl text-indigo-400 italic"
              style="font-family: 'Georgia', serif;"
            >
              {signedName.value}
            </p>
          </div>
        )}
      </div>

      {/* Consent Checkboxes */}
      <div class="space-y-4">
        <label class="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreeTerms.value}
            onChange={(e) =>
              agreeTerms.value = (e.target as HTMLInputElement).checked}
            class="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
          />
          <span class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            I have read and agree to the terms of this agreement. I understand
            that this creates a binding legal obligation.
          </span>
        </label>

        <label class="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreeEsign.value}
            onChange={(e) =>
              agreeEsign.value = (e.target as HTMLInputElement).checked}
            class="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
          />
          <span class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            I consent to signing this agreement electronically pursuant to the
            U.S. Electronic Signatures in Global and National Commerce Act
            (ESIGN Act) and applicable state laws.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid() || status.value === "sending"}
        class="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
      >
        {status.value === "sending"
          ? "Processing Signature..."
          : "Sign Agreement"}
      </button>

      <p class="text-xs text-slate-600 text-center">
        Date: {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </form>
  );
}
