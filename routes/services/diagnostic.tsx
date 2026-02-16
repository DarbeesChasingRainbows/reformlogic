import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import DiagnosticForm from "../../islands/DiagnosticForm.tsx";

export default define.page(function DiagnosticPage() {
  return (
    <>
      <Head>
        <title>Book a Diagnostic — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Architecture Consulting
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-8">
            Architecture <span class="font-medium text-indigo-400">Review</span>
          </h1>
          <div class="prose prose-invert prose-slate max-w-none mb-12">
            <p class="text-lg text-slate-400 leading-relaxed">
              A focused, 60-minute deep-dive into your architecture. Whether you
              need a codebase audit, help unblocking a design decision, or a
              roadmap for migrating off a legacy system — this session is built
              for clarity.
            </p>
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <h3 class="text-slate-200 font-medium mb-2">What You Get</h3>
                <ul class="space-y-2 text-sm text-slate-400">
                  <li class="flex items-start">
                    <span class="text-indigo-400 mr-2 mt-0.5">
                      &#10003;
                    </span>Live architecture review
                  </li>
                  <li class="flex items-start">
                    <span class="text-indigo-400 mr-2 mt-0.5">&#10003;</span>DDD
                    modeling session
                  </li>
                  <li class="flex items-start">
                    <span class="text-indigo-400 mr-2 mt-0.5">
                      &#10003;
                    </span>Written summary &amp; recommendations
                  </li>
                  <li class="flex items-start">
                    <span class="text-indigo-400 mr-2 mt-0.5">&#10003;</span>No
                    long-term contract required
                  </li>
                </ul>
              </div>
              <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <h3 class="text-slate-200 font-medium mb-2">Best For</h3>
                <ul class="space-y-2 text-sm text-slate-400">
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-2 mt-0.5">
                      &#9679;
                    </span>Startups needing architectural direction
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-2 mt-0.5">
                      &#9679;
                    </span>Teams stuck on a design decision
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-2 mt-0.5">
                      &#9679;
                    </span>Legacy migration planning
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-2 mt-0.5">
                      &#9679;
                    </span>Pre-build technical assessment
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="border-t border-slate-800 pt-12">
            <h2 class="text-2xl font-semibold text-slate-100 mb-6">
              Book Your Session
            </h2>
            <DiagnosticForm />
          </div>
        </div>
      </section>
    </>
  );
});
