import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { contracts, getContractByType } from "../../../lib/contracts";

export const dynamicParams = false;

export function generateStaticParams() {
  return contracts.map((contract) => ({ type: contract.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ type: string }> },
): Promise<Metadata> {
  const { type } = await params;
  const contract = getContractByType(type);

  if (!contract) return { title: "Contract Not Found — ReformLogic" };
  return { title: `${contract.title} — ReformLogic` };
}

export default async function ContractViewPage(
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  const contract = getContractByType(type);

  if (!contract) notFound();

  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/contracts" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← All Agreements
        </Link>

        <div className="mb-12">
          <h1 className="mb-3 text-3xl font-light text-slate-100 md:text-4xl">{contract.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Version {contract.version}</span>
            <span>•</span>
            <span>Effective {contract.effectiveDate}</span>
            {contract.incorporatesMsa && (
              <>
                <span>•</span>
                <span className="text-indigo-400">Incorporates MSA</span>
              </>
            )}
          </div>
          <p className="mt-4 leading-relaxed text-slate-400">{contract.summary}</p>
        </div>

        <div className="space-y-8">
          {contract.sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-slate-800 bg-slate-900/30 p-6 md:p-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-200">{section.title}</h2>
              <div
                className="text-sm leading-relaxed text-slate-400 [&_strong]:text-slate-300"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
