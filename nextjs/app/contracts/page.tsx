import type { Metadata } from "next";
import Link from "next/link";

import { contracts } from "../../lib/contracts";

export const metadata: Metadata = {
  title: "Agreements — ReformLogic",
};

export const runtime = "edge";

export default function ContractsPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>

        <span className="mb-4 block text-sm uppercase tracking-widest text-indigo-500">Legal</span>
        <h1 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
          Client <span className="font-medium text-indigo-400">Agreements</span>
        </h1>
        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-slate-400">
          Standard agreements governing all ReformLogic consulting engagements. Each agreement can be reviewed below and signed electronically when you&apos;re ready to proceed.
        </p>

        <div className="space-y-6">
          {contracts.map((contract) => (
            <Link
              key={contract.slug}
              href={`/contracts/${contract.slug}`}
              className="group block rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-indigo-500/30 md:p-8"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100 transition-colors group-hover:text-indigo-400">
                    {contract.title}
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-slate-600">
                    v{contract.version} • {contract.sections.length} sections
                  </span>
                </div>
                {contract.incorporatesMsa && (
                  <span className="rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-xs text-slate-500">
                    Requires MSA
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{contract.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
