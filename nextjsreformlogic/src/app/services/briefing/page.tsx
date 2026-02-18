import type { Metadata } from "next";
import Link from "next/link";

import BriefingForm from "../../../components/forms/BriefingForm";

export const metadata: Metadata = {
  title: "Request a Briefing — ReformLogic",
};

export default function BriefingPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>

        <span className="mb-4 block text-sm uppercase tracking-widest text-emerald-500">Level III: Strategic</span>
        <h1 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
          Project <span className="font-medium text-emerald-400">Reform</span>
        </h1>

        <p className="mb-12 text-lg leading-relaxed text-slate-400">
          Full-scale engagement for organizations ready to rebuild. We take your monolith — or your blank canvas — and architect a resilient, scalable system from the ground up.
        </p>

        <div className="border-t border-slate-800 pt-12">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Tell Me About Your Project</h2>
          <BriefingForm />
        </div>
      </div>
    </section>
  );
}
