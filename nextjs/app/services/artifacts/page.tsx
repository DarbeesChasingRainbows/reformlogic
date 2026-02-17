import type { Metadata } from "next";
import Link from "next/link";

import ArtifactForm from "../../../components/forms/ArtifactForm.tsx";

export const metadata: Metadata = {
  title: "Specific Artifacts — ReformLogic",
};

const items = [
  "Component Build",
  "Schema Design",
  "Bug Fix",
  "Code Review",
  "API Endpoint",
  "Migration Script",
  "Test Suite",
  "Documentation",
];

export const runtime = "edge";

export default function ArtifactsPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>

        <span className="mb-4 block text-sm uppercase tracking-widest text-slate-500">Level I: Tactical</span>
        <h1 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
          Specific <span className="font-medium text-indigo-400">Artifacts</span>
        </h1>

        <p className="mb-12 text-lg leading-relaxed text-slate-400">
          Clearly scoped deliverables. You define the task, I execute it. Best for component builds, schema designs, refactoring jobs, or isolated bug fixes.
        </p>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item) => (
            <div key={item} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-12">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">Describe What You Need</h2>
          <ArtifactForm />
        </div>
      </div>
    </section>
  );
}
