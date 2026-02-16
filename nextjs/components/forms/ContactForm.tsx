"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          name,
          email,
          message,
          website,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Submission failed" }));
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
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-8 text-center">
        <p className="mb-2 text-lg font-medium text-emerald-400">Message Sent</p>
        <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="hidden">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-sm text-red-400">{errorMsg}</div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Message *</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none"
          placeholder="What&apos;s on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 disabled:bg-indigo-800"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
