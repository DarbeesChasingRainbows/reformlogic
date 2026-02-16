import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import { getProjectBySlug } from "../../utils/projects.ts";
import { HttpError } from "fresh";

export default define.page(function ProjectDetailPage(props) {
  const slug = props.params.slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  return (
    <>
      <Head>
        <title>{project.title} — ReformLogic</title>
      </Head>
      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/portfolio"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Portfolio
          </a>
          <span class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block">
            {project.category}
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-6">
            {project.title}
          </h1>

          <div class="flex flex-wrap gap-2 mb-12">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                class="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div class="space-y-6 text-lg text-slate-400 leading-relaxed">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {(project.challenge || project.approach || project.results) && (
            <div class="mt-12 space-y-8">
              {project.challenge && (
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h3 class="text-sm font-mono text-rose-400 uppercase tracking-widest mb-3">
                    The Challenge
                  </h3>
                  <p class="text-slate-400 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.approach && (
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h3 class="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">
                    The Approach
                  </h3>
                  <p class="text-slate-400 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}
              {project.results && (
                <div class="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-6">
                  <h3 class="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-3">
                    Results
                  </h3>
                  <p class="text-slate-400 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>
          )}

          <div class="mt-16 border-t border-slate-800 pt-12 text-center">
            <p class="text-slate-500 mb-6">
              Interested in working together?
            </p>
            <a
              href="/contact"
              class="inline-flex px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </>
  );
});
