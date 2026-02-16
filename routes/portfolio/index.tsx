import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { projects } from "../../utils/projects.ts";

export default define.page(function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-5xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Back
          </a>
          <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-4">
            Real <span class="font-medium text-indigo-400">Work</span>
          </h1>
          <p class="text-lg text-slate-400 max-w-2xl leading-relaxed mb-16">
            Enterprise platforms, legacy migrations, and ministry technology —
            12+ years of production-grade delivery.
          </p>

          <div class="grid grid-cols-1 gap-8">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                class="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 md:p-10 hover:border-indigo-500/30 transition-all group block"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h2>
                    <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  {project.isFeatured && (
                    <span class="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p class="text-slate-400 leading-relaxed mb-6">
                  {project.summary}
                </p>
                <div class="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      class="text-xs font-mono text-slate-400 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});
