import { define } from "../../../utils.ts";
import { Head } from "fresh/runtime";
import { getContractByType } from "../../../utils/contracts.ts";
import {
  interpolateContract,
  parseContractParams,
  renderContractHtml,
} from "../../../utils/contractUtils.ts";
import ContractSignature from "../../../islands/ContractSignature.tsx";
import { HttpError } from "fresh";

export default define.page(function SignContractPage(props) {
  const slug = props.params.type;
  const contract = getContractByType(slug);

  if (!contract) {
    throw new HttpError(404, "Contract not found");
  }

  // Parse query parameters into contract variables
  const url = new URL(props.url);
  const variables = parseContractParams(url);

  // Interpolate contract sections with client data
  const interpolatedSections = interpolateContract(
    contract.sections,
    variables,
  );

  // Render the full contract HTML for the email record
  const contractHtml = renderContractHtml(
    contract.title,
    contract.version,
    interpolatedSections,
  );

  return (
    <>
      <Head>
        <title>Sign: {contract.title} — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          {/* Header */}
          <div class="mb-8 pb-8 border-b border-slate-800">
            <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4 block">
              Agreement for Signature
            </span>
            <h1 class="text-3xl md:text-4xl font-light text-slate-100 mb-3">
              {contract.title}
            </h1>
            <div class="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span>Version {contract.version}</span>
              <span>•</span>
              <span>{variables.effectiveDate}</span>
            </div>
            {variables.clientName && (
              <p class="text-slate-400 mt-4">
                Prepared for{" "}
                <strong class="text-slate-200">{variables.clientName}</strong>
                {variables.clientCompany && (
                  <>
                    of{" "}
                    <strong class="text-slate-200">
                      {variables.clientCompany}
                    </strong>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Contract Sections */}
          <div class="space-y-8 mb-12">
            {interpolatedSections.map((section, i) => (
              <div
                key={i}
                class="bg-slate-900/30 border border-slate-800 rounded-lg p-6 md:p-8"
              >
                <h2 class="text-lg font-semibold text-slate-200 mb-4">
                  {section.title}
                </h2>
                <div
                  class="text-sm text-slate-400 leading-relaxed [&_strong]:text-slate-300 [&_br]:mb-2"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>

          {/* MSA Reference Note */}
          {contract.incorporatesMsa && (
            <div class="mb-8 bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <p class="text-sm text-slate-400">
                <strong class="text-slate-300">Note:</strong>{" "}
                This agreement incorporates the{" "}
                <a
                  href="/contracts/msa"
                  class="text-indigo-400 hover:text-indigo-300 underline"
                  target="_blank"
                >
                  Master Services Agreement
                </a>{" "}
                by reference. Please ensure you have reviewed and signed the MSA
                before signing this document.
              </p>
            </div>
          )}

          {/* Signature Island */}
          <ContractSignature
            contractType={contract.slug}
            contractVersion={contract.version}
            clientName={variables.clientName ?? ""}
            clientEmail={variables.clientEmail ?? ""}
            contractHtml={contractHtml}
          />
        </div>
      </section>
    </>
  );
});
