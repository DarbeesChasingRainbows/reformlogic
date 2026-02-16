import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { getContractByType } from "../../utils/contracts.ts";
import { HttpError } from "fresh";

export default define.page(function ContractViewPage(props) {
  const slug = props.params.type;
  const contract = getContractByType(slug);

  if (!contract) {
    throw new HttpError(404, "Contract not found");
  }

  return (
    <>
      <Head>
        <title>{contract.title} — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/contracts"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; All Agreements
          </a>

          {/* Contract Header */}
          <div class="mb-12">
            <h1 class="text-3xl md:text-4xl font-light text-slate-100 mb-3">
              {contract.title}
            </h1>
            <div class="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span>Version {contract.version}</span>
              <span>•</span>
              <span>Effective {contract.effectiveDate}</span>
              {contract.incorporatesMsa && (
                <>
                  <span>•</span>
                  <span class="text-indigo-400">Incorporates MSA</span>
                </>
              )}
            </div>
            <p class="text-slate-400 mt-4 leading-relaxed">
              {contract.summary}
            </p>
          </div>

          {/* Contract Sections */}
          <div class="space-y-8">
            {contract.sections.map((section, i) => (
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

          {/* Variables Notice */}
          {contract.variables.length > 0 && (
            <div class="mt-12 bg-indigo-900/10 border border-indigo-500/20 rounded-lg p-6">
              <p class="text-sm text-indigo-300 mb-2 font-medium">
                Template Variables
              </p>
              <p class="text-xs text-slate-400 mb-3">
                This is a reference template. The following fields are populated
                when a signing link is generated:
              </p>
              <div class="flex flex-wrap gap-2">
                {contract.variables.map((v) => (
                  <span
                    key={v}
                    class="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
});
