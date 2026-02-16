import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import ArtifactForm from "../../islands/ArtifactForm.tsx";

export default define.page(function ArtifactsPage() {
  return (
    <>
      <Head>
        <title>Specific Artifacts — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <span class="text-slate-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Level I: Tactical
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-4">
            Specific <span class="font-medium text-indigo-400">Artifacts</span>
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed mb-12">
            Clearly scoped deliverables. You define the task, I execute it. Best
            for component builds, schema designs, refactoring jobs, or isolated
            bug fixes.
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              "Component Build",
              "Schema Design",
              "Bug Fix",
              "Code Review",
              "API Endpoint",
              "Migration Script",
              "Test Suite",
              "Documentation",
            ].map((item) => (
              <div
                key={item}
                class="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-center"
              >
                <p class="text-sm text-slate-300 font-mono">{item}</p>
              </div>
            ))}
          </div>
          <div class="border-t border-slate-800 pt-12">
            <h2 class="text-2xl font-semibold text-slate-100 mb-6">
              Describe What You Need
            </h2>
            <ArtifactForm />
          </div>
        </div>
      </section>
    </>
  );
});
