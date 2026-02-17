import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "../../lib/projects";

export const metadata: Metadata = {
  title: "Portfolio — ReformLogic",
};

export default function PortfolioPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Back
        </Link>

        <span className="mb-4 block text-sm uppercase tracking-widest text-indigo-500">Portfolio</span>
        <h1 className="mb-4 text-4xl font-light text-slate-100 md:text-5xl">
          Real <span className="font-medium text-indigo-400">Work</span>
        </h1>

        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-slate-400">
          Enterprise platforms, legacy migrations, and ministry technology — 12+ years of production-grade delivery.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-indigo-500/30 md:p-10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-100 transition-colors group-hover:text-indigo-400">
                    {project.title}
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-slate-500">{project.category}</span>
                </div>
                {project.isFeatured && (
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
                    Featured
                  </span>
                )}
              </div>
              <p className="mb-6 leading-relaxed text-slate-400">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
