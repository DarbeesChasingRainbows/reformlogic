import type { Metadata } from "next";
import Link from "next/link";

import DiagnosticForm from "../../../components/forms/DiagnosticForm.tsx";

export const metadata: Metadata = {
  title: "Book a Diagnostic — ReformLogic",
};

export const runtime = "edge";

export default function DiagnosticPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>

        <span className="mb-4 block text-sm uppercase tracking-widest text-indigo-500">Architecture Consulting</span>
        <h1 className="mb-8 text-4xl font-light text-slate-100 md:text-5xl">
          Architecture <span className="font-medium text-indigo-400">Review</span>
        </h1>

        <p className="mb-12 text-lg leading-relaxed text-slate-400">
          A focused, 60-minute deep-dive into your architecture. Whether you need a codebase audit, help unblocking a design decision, or a roadmap for migrating off a legacy system — this session is built for clarity.
        </p>

        <div className="border-t border-slate-800 pt-12">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Book Your Session</h2>
          <DiagnosticForm />
        </div>
      </div>
    </section>
  );
}
