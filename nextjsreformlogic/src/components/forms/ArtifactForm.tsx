"use client";

import { useState } from "react";

export default function ArtifactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [taskType, setTaskType] = useState("Component Build");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "artifact",
          name,
          email,
          taskType,
          description,
          urgency,
          website,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Submission failed" })) as { error?: string };
        throw new Error(data.error ?? "Submission failed");
      }

      setStatus("success");
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Submission failed");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-8 text-center">
        <p className="mb-2 text-lg font-medium text-emerald-400">Request Received</p>
        <p className="text-slate-400">I&apos;ll review the task scope and get back to you with an estimate within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="artifact-form-help">
      <p id="artifact-form-help" className="sr-only">All fields marked with an asterisk are required.</p>

      <div className="hidden" aria-hidden="true">
        <input id="artifact-website" type="text" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && <div role="alert" className="rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-sm text-red-400">{errorMsg}</div>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="artifact-name" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Name *</label>
          <input id="artifact-name" type="text" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="artifact-email" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Email *</label>
          <input id="artifact-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="you@company.com" autoComplete="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="artifact-task-type" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Task Type</label>
          <select id="artifact-task-type" value={taskType} onChange={(event) => setTaskType(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
            <option>Component Build</option><option>Schema Design</option><option>Bug Fix</option><option>Code Review</option><option>API Endpoint</option><option>Migration Script</option><option>Test Suite</option><option>Documentation</option><option>ChMS Configuration</option><option>Church Website Update</option><option>Data Migration</option><option>Workflow Automation</option><option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="artifact-urgency" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Urgency</label>
          <select id="artifact-urgency" value={urgency} onChange={(event) => setUrgency(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="artifact-description" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Task Description *</label>
        <textarea id="artifact-description" required rows={5} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="Describe the task..." />
      </div>

      <button type="submit" disabled={status === "sending"} className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 disabled:bg-indigo-800">
        {status === "sending" ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}
