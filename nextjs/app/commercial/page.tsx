import type { Metadata } from "next";
import Link from "next/link";

import ScrollytellingViz from "../../components/ScrollytellingViz";

export const metadata: Metadata = {
  title: "Commercial Technology Consulting — ReformLogic",
  description:
    "Enterprise .NET architecture consulting, Umbraco CMS expertise, legacy migration, and custom software development.",
};

export default function CommercialPage() {
  return (
    <>
      <section className="min-h-[70vh] px-6 pt-24" data-step-index={0}>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="text-sm uppercase tracking-widest text-emerald-500">Enterprise Architecture</span>
          <h1 className="text-4xl font-light tracking-tight text-slate-100 md:text-5xl">
            Systems that <span className="font-medium text-emerald-400">scale</span>.
          </h1>
          <p className="text-lg leading-relaxed text-slate-400">
            12+ years of hands-on .NET architecture, legacy modernization, and production-grade delivery.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
            <Link href="/contact" className="rounded-lg bg-emerald-600 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-500">
              Schedule a Discovery Call
            </Link>
            <Link href="/portfolio" className="rounded-lg border border-slate-700 bg-slate-900 px-8 py-4 text-sm font-medium text-slate-200 transition-all hover:border-emerald-500/50">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-light text-slate-100">What I do best</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ExpertiseCard title="Legacy Migration" description="Incremental monolith to microservices migration with clean boundaries." />
            <ExpertiseCard title="Umbraco CMS" description="Enterprise CMS migrations, customization, and performance tuning." />
            <ExpertiseCard title="Architecture Design" description="DDD, CQRS, Hexagonal Architecture, and practical tradeoff guidance." />
            <ExpertiseCard title="Fractional CTO" description="Technical direction, mentorship, standards, and execution planning." />
            <ExpertiseCard title="Performance Optimization" description="Find bottlenecks and deliver measurable speed and reliability gains." />
            <ExpertiseCard title="Custom .NET Development" description="APIs, integrations, and full-stack delivery for business-critical systems." />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50">
        <div className="py-16 px-6 text-center">
          <h2 className="mb-4 text-3xl font-light text-slate-100">How I think about systems</h2>
          <p className="mx-auto max-w-2xl text-slate-400">Scroll through the architecture narrative.</p>
        </div>

        <div className="relative flex flex-col md:flex-row">
          <div className="w-full px-6 md:w-1/2 md:px-12 lg:px-24">
            <Step idx={1} phase="Phase I: The Domain" title="Start with business logic" description="Model core behaviors first, independent from frameworks." phaseClassName="text-indigo-500" />
            <Step idx={2} phase="Phase II: Boundaries" title="Ports & Adapters" description="Dependencies point inward so infrastructure stays replaceable." phaseClassName="text-emerald-500" />
            <Step idx={3} phase="Phase III: Separation" title="CQRS" description="Separate writes and reads for scalability and clarity." phaseClassName="text-amber-500" />
            <Step idx={4} phase="Phase IV: Delivery" title="Fast modern frontends" description="Server rendering with focused client interactivity." phaseClassName="text-cyan-500" />
            <Step idx={5} phase="Phase V: The Empire" title="The Monolith" description="Centralized power can move fast early, but coupling increases risk and slows evolution." phaseClassName="text-rose-500" />
            <Step idx={6} phase="Phase VI: The Schism" title="Microservices" description="Split bounded contexts into resilient services connected by events and explicit contracts." phaseClassName="text-fuchsia-500" />
          </div>

          <div className="sticky top-0 hidden h-screen w-1/2 items-center justify-center border-l border-slate-800/50 bg-slate-950/50 backdrop-blur-sm md:flex">
            <ScrollytellingViz />
          </div>
        </div>
      </section>
    </>
  );
}

function ExpertiseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-emerald-500/20">
      <h3 className="mb-2 text-lg font-medium text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

function Step({ idx, phase, title, description, phaseClassName }: { idx: number; phase: string; title: string; description: string; phaseClassName: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center py-16" data-step-index={idx}>
      <span className={`mb-4 text-sm uppercase tracking-widest ${phaseClassName}`}>{phase}</span>
      <h3 className="mb-4 text-2xl font-semibold text-slate-100 md:text-3xl">{title}</h3>
      <p className="leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
