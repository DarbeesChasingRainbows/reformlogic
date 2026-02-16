import { useSignal } from "@preact/signals";

export default function BriefingForm() {
  const name = useSignal("");
  const email = useSignal("");
  const organization = useSignal("");
  const scope = useSignal("Migration (Legacy .NET)");
  const budget = useSignal("");
  const timeline = useSignal("");
  const description = useSignal("");
  const honeypot = useSignal("");
  const status = useSignal<"idle" | "sending" | "success" | "error">("idle");
  const errorMsg = useSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (honeypot.value) return;
    status.value = "sending";

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "briefing",
          name: name.value,
          email: email.value,
          organization: organization.value,
          scope: scope.value,
          budget: budget.value,
          timeline: timeline.value,
          description: description.value,
          website: honeypot.value,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({
          error: "Submission failed",
        }));
        throw new Error(data.error ?? "Submission failed");
      }
      status.value = "success";
    } catch (err) {
      errorMsg.value = (err as Error).message;
      status.value = "error";
    }
  };

  if (status.value === "success") {
    return (
      <div class="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-8 text-center">
        <p class="text-emerald-400 text-lg font-medium mb-2">
          Briefing Request Received
        </p>
        <p class="text-slate-400">
          I'll review your project details and respond within 48 hours with a
          preliminary assessment and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={name.value}
            onInput={(e) => name.value = (e.target as HTMLInputElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={email.value}
            onInput={(e) => email.value = (e.target as HTMLInputElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Organization *
        </label>
        <input
          type="text"
          required
          value={organization.value}
          onInput={(e) =>
            organization.value = (e.target as HTMLInputElement).value}
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Company or venture name"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Project Scope *
          </label>
          <select
            value={scope.value}
            onChange={(e) =>
              scope.value = (e.target as HTMLSelectElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option>Migration (Legacy .NET)</option>
            <option>Fractional CTO</option>
            <option>Greenfield Build</option>
            <option>Architecture Redesign</option>
            <option>RockRMS Implementation</option>
            <option>ChMS Migration</option>
            <option>Church Website</option>
            <option>Ministry Tech Assessment</option>
            <option>Umbraco CMS Consulting</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Budget Range
          </label>
          <select
            value={budget.value}
            onChange={(e) =>
              budget.value = (e.target as HTMLSelectElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="">Select range...</option>
            <option>$5k — $15k</option>
            <option>$15k — $50k</option>
            <option>$50k+</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Timeline
        </label>
        <input
          type="text"
          value={timeline.value}
          onInput={(e) => timeline.value = (e.target as HTMLInputElement).value}
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="e.g. 3 months, Q3 2026, ASAP"
        />
      </div>
      <div>
        <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Project Description *
        </label>
        <textarea
          required
          rows={5}
          value={description.value}
          onInput={(e) =>
            description.value = (e.target as HTMLTextAreaElement).value}
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          placeholder="Describe your current situation, goals, and what success looks like..."
        />
      </div>
      <button
        type="submit"
        disabled={status.value === "sending"}
        class="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-emerald-500/25"
      >
        {status.value === "sending" ? "Sending..." : "Request Briefing"}
      </button>
    </form>
  );
}
