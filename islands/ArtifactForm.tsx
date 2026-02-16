import { useSignal } from "@preact/signals";

export default function ArtifactForm() {
  const name = useSignal("");
  const email = useSignal("");
  const taskType = useSignal("Component Build");
  const description = useSignal("");
  const urgency = useSignal("Medium");
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
          type: "artifact",
          name: name.value,
          email: email.value,
          taskType: taskType.value,
          description: description.value,
          urgency: urgency.value,
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
          Request Received
        </p>
        <p class="text-slate-400">
          I'll review the task scope and get back to you with an estimate within
          24 hours.
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Task Type *
          </label>
          <select
            value={taskType.value}
            onChange={(e) =>
              taskType.value = (e.target as HTMLSelectElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option>Component Build</option>
            <option>Schema Design</option>
            <option>Bug Fix</option>
            <option>Code Review</option>
            <option>API Endpoint</option>
            <option>Migration Script</option>
            <option>Test Suite</option>
            <option>Documentation</option>
            <option>ChMS Configuration</option>
            <option>Church Website Update</option>
            <option>Data Migration</option>
            <option>Workflow Automation</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Urgency
          </label>
          <select
            value={urgency.value}
            onChange={(e) =>
              urgency.value = (e.target as HTMLSelectElement).value}
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Description *
        </label>
        <textarea
          required
          rows={5}
          value={description.value}
          onInput={(e) =>
            description.value = (e.target as HTMLTextAreaElement).value}
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          placeholder="Describe the task: what needs to be built, refactored, or fixed. Include any relevant context, repo links, or specs..."
        />
      </div>
      <button
        type="submit"
        disabled={status.value === "sending"}
        class="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
      >
        {status.value === "sending" ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}
