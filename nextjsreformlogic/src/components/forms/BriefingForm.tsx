"use client";

import { useState } from "react";

export default function BriefingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [scope, setScope] = useState("Migration (Legacy .NET)");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
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
          type: "briefing",
          name,
          email,
          organization,
          scope,
          budget,
          timeline,
          description,
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
        <p className="mb-2 text-lg font-medium text-emerald-400">Briefing Request Received</p>
        <p className="text-slate-400">I&apos;ll review your project details and respond within 48 hours with a preliminary assessment and next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="briefing-form-help">
      <p id="briefing-form-help" className="sr-only">All fields marked with an asterisk are required.</p>

      <div className="hidden" aria-hidden="true"><input id="briefing-website" type="text" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>

      {status === "error" && <div role="alert" className="rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-sm text-red-400">{errorMsg}</div>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="briefing-name" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Name *</label>
          <input id="briefing-name" type="text" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="briefing-email" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Email *</label>
          <input id="briefing-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="you@company.com" autoComplete="email" />
        </div>
      </div>

      <div>
        <label htmlFor="briefing-organization" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Organization *</label>
        <input id="briefing-organization" type="text" required value={organization} onChange={(event) => setOrganization(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="Company or venture name" autoComplete="organization" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="briefing-scope" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Project Scope</label>
          <select id="briefing-scope" value={scope} onChange={(event) => setScope(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
            <option>Migration (Legacy .NET)</option><option>Fractional CTO</option><option>Greenfield Build</option><option>Architecture Redesign</option><option>RockRMS Implementation</option><option>ChMS Migration</option><option>Church Website</option><option>Ministry Tech Assessment</option><option>Umbraco CMS Consulting</option><option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="briefing-budget" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Budget Range</label>
          <select id="briefing-budget" value={budget} onChange={(event) => setBudget(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
            <option value="">Select range...</option><option>$5k — $15k</option><option>$15k — $50k</option><option>$50k+</option><option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="briefing-timeline" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Timeline</label>
        <input id="briefing-timeline" type="text" value={timeline} onChange={(event) => setTimeline(event.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="e.g. 3 months, Q3 2026, ASAP" />
      </div>

      <div>
        <label htmlFor="briefing-description" className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Project Description *</label>
        <textarea id="briefing-description" required rows={5} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200" placeholder="Describe your current situation, goals, and what success looks like..." />
      </div>

      <button type="submit" disabled={status === "sending"} className="w-full rounded-lg bg-emerald-600 px-6 py-4 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 disabled:bg-emerald-800">
        {status === "sending" ? "Sending..." : "Request Briefing"}
      </button>
    </form>
  );
}
