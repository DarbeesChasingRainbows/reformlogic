import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { contracts } from "../../utils/contracts.ts";

export default define.page(function ContractsPage() {
  return (
    <>
      <Head>
        <title>Agreements — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-4xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Legal
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-4">
            Client <span class="font-medium text-indigo-400">Agreements</span>
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed mb-16 max-w-2xl">
            Standard agreements governing all ReformLogic consulting
            engagements. Each agreement can be reviewed below and signed
            electronically when you're ready to proceed.
          </p>

          <div class="space-y-6">
            {contracts.map((contract) => (
              <a
                key={contract.slug}
                href={`/contracts/${contract.slug}`}
                class="block bg-slate-900/40 border border-slate-800 rounded-xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h2 class="text-xl font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {contract.title}
                    </h2>
                    <span class="text-xs font-mono text-slate-600 uppercase tracking-widest">
                      v{contract.version} • {contract.sections.length} sections
                    </span>
                  </div>
                  {contract.incorporatesMsa && (
                    <span class="text-xs font-mono text-slate-500 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full">
                      Requires MSA
                    </span>
                  )}
                </div>
                <p class="text-slate-400 text-sm leading-relaxed">
                  {contract.summary}
                </p>
              </a>
            ))}
          </div>

          <div class="mt-16 bg-slate-900/30 border border-slate-800 rounded-xl p-8">
            <h3 class="text-lg font-medium text-slate-200 mb-3">
              How It Works
            </h3>
            <div class="space-y-3 text-sm text-slate-400">
              <p class="flex items-start">
                <span class="text-indigo-400 font-mono mr-3 mt-0.5">01</span>
                Review the applicable agreement(s) above
              </p>
              <p class="flex items-start">
                <span class="text-indigo-400 font-mono mr-3 mt-0.5">02</span>
                When ready to proceed, you'll receive a personalized signing
                link from me
              </p>
              <p class="flex items-start">
                <span class="text-indigo-400 font-mono mr-3 mt-0.5">03</span>
                Sign electronically — type your name and confirm consent
              </p>
              <p class="flex items-start">
                <span class="text-indigo-400 font-mono mr-3 mt-0.5">04</span>
                Both parties receive a signed copy via email for records
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
