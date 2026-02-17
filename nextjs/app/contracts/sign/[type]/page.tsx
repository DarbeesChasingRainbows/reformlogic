import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ContractSignature from "../../../../components/forms/ContractSignature";
import { interpolateContract, parseContractParams, renderContractHtml } from "../../../../lib/contractUtils";
import { contracts, getContractByType } from "../../../../lib/contracts";

export function generateStaticParams() {
  return contracts.map((contract) => ({ type: contract.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ type: string }> },
): Promise<Metadata> {
  const { type } = await params;
  const contract = getContractByType(type);

  if (!contract) return { title: "Contract Not Found — ReformLogic" };
  return { title: `Sign: ${contract.title} — ReformLogic` };
}

export default async function SignContractPage(
  { params, searchParams }: {
    params: Promise<{ type: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  },
) {
  const { type } = await params;
  const search = await searchParams;
  const contract = getContractByType(type);

  if (!contract) notFound();

  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (typeof value === "string") urlSearchParams.set(key, value);
    if (Array.isArray(value) && value[0]) urlSearchParams.set(key, value[0]);
  }

  const variables = parseContractParams(urlSearchParams);
  const interpolatedSections = interpolateContract(contract.sections, variables);
  const contractHtml = renderContractHtml(
    contract.title,
    contract.version,
    interpolatedSections,
  );

  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/contracts" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← All Agreements
        </Link>

        <div className="mb-8 border-b border-slate-800 pb-8">
          <span className="mb-4 block text-sm uppercase tracking-widest text-indigo-500">Agreement for Signature</span>
          <h1 className="mb-3 text-3xl font-light text-slate-100 md:text-4xl">{contract.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Version {contract.version}</span>
            <span>•</span>
            <span>{variables.effectiveDate}</span>
          </div>
        </div>

        <div className="mb-12 space-y-8">
          {interpolatedSections.map((section) => (
            <div key={section.title} className="rounded-lg border border-slate-800 bg-slate-900/30 p-6 md:p-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-200">{section.title}</h2>
              <div className="text-sm leading-relaxed text-slate-400 [&_strong]:text-slate-300" dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>

        <ContractSignature
          contractType={contract.slug}
          contractVersion={contract.version}
          clientName={variables.clientName ?? ""}
          clientEmail={variables.clientEmail ?? ""}
          contractHtml={contractHtml}
        />
      </div>
    </section>
  );
}
