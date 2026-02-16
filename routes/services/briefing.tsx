import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import BriefingForm from "../../islands/BriefingForm.tsx";

export default define.page(function BriefingPage() {
  return (
    <>
      <Head>
        <title>Request a Briefing — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <span class="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Level III: Strategic
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-4">
            Project <span class="font-medium text-emerald-400">Reform</span>
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed mb-12">
            Full-scale engagement for organizations ready to rebuild. We take
            your monolith — or your blank canvas — and architect a resilient,
            scalable system from the ground up.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
              <p class="text-3xl font-light text-slate-100 mb-1">DDD</p>
              <p class="text-xs text-slate-500 font-mono uppercase">
                Domain Modeling
              </p>
            </div>
            <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
              <p class="text-3xl font-light text-slate-100 mb-1">CQRS</p>
              <p class="text-xs text-slate-500 font-mono uppercase">
                Event-Driven
              </p>
            </div>
            <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
              <p class="text-3xl font-light text-slate-100 mb-1">Edge</p>
              <p class="text-xs text-slate-500 font-mono uppercase">
                Fast Delivery
              </p>
            </div>
          </div>
          <div class="border-t border-slate-800 pt-12">
            <h2 class="text-2xl font-semibold text-slate-100 mb-6">
              Tell Me About Your Project
            </h2>
            <BriefingForm />
          </div>
        </div>
      </section>
    </>
  );
});
