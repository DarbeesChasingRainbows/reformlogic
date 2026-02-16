import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import ScrollytellingViz from "../../islands/ScrollytellingViz.tsx";

export default define.page(function CommercialPage() {
  return (
    <>
      <Head>
        <title>Software Architecture Consulting — ReformLogic</title>
        <meta
          name="description"
          content="Enterprise .NET architecture consulting, Umbraco CMS expertise, legacy migration, and custom software development. 12+ years, 200+ production releases."
        />
      </Head>

      {/* ====== Hero ====== */}
      <section
        class="step min-h-[70vh] flex items-center justify-center px-6 pt-24 relative z-10"
        data-step-index="0"
      >
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <span class="text-emerald-500 font-mono text-sm tracking-widest uppercase">
            Enterprise Architecture
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 tracking-tight">
            Systems that{" "}
            <span class="text-emerald-400 font-medium">scale</span>.
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            12+ years of hands-on .NET architecture. I've migrated monoliths to
            microservices, rebuilt legacy CMS platforms, and delivered 200+
            production releases with zero critical incidents. I build systems
            that last.
          </p>
          <div class="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-emerald-500/25"
            >
              Schedule a Discovery Call
            </a>
            <a
              href="/portfolio"
              class="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 rounded-lg font-medium transition-all text-sm"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ====== Credibility ====== */}
      <section class="py-16 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="12+" label="Years Experience" />
          <Stat value="4.5x" label="Revenue Growth" />
          <Stat value="90%" label="Incident Reduction" />
          <Stat value="20+" label="Developers Mentored" />
        </div>
      </section>

      {/* ====== Core Expertise ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-light text-slate-100 mb-12 text-center">
            What I do best
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExpertiseCard
              title="Legacy Migration"
              description="Modernizing .NET Framework applications using the Strangler Fig pattern. I've migrated monolithic Umbraco 8 systems to independent microservices using Domain-Driven Design — without downtime."
            />
            <ExpertiseCard
              title="Umbraco CMS"
              description="5+ years as the sole SME on a heavily customized, revenue-driving Umbraco instance. Enterprise CMS migrations, custom plugin development, and performance optimization."
            />
            <ExpertiseCard
              title="Architecture Design"
              description="Domain-Driven Design, CQRS, Hexagonal Architecture, and microservices. I design systems where the business logic is clean, testable, and independent of frameworks."
            />
            <ExpertiseCard
              title="Fractional CTO"
              description="Strategic technical oversight for startups and growing companies. Architecture decisions, team mentorship, code quality standards, and technical roadmapping."
            />
            <ExpertiseCard
              title="Performance Optimization"
              description="75% page load reduction (60s to 5s), database query optimization, caching strategies, and systematic profiling. I find the bottleneck and fix it."
            />
            <ExpertiseCard
              title="Custom .NET Development"
              description="Full-stack C# / ASP.NET Core / React / TypeScript development. APIs, integrations, real-time systems, and everything in between."
            />
          </div>
        </div>
      </section>

      {/* ====== Architecture Deep-Dive (Scrollytelling) ====== */}
      <section class="border-t border-slate-800/50">
        <div class="text-center py-16 px-6">
          <span class="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Architecture Philosophy
          </span>
          <h2 class="text-3xl font-light text-slate-100 mb-4">
            How I think about systems
          </h2>
          <p class="text-slate-400 max-w-2xl mx-auto">
            Scroll through my approach to building software that lasts. From
            domain modeling to deployment strategy.
          </p>
        </div>

        <div class="relative flex flex-col md:flex-row">
          {/* Left Column: The Narrative */}
          <div class="w-full md:w-1/2 relative z-10 px-6 md:px-12 lg:px-24">
            {/* Step 1: The Domain */}
            <div
              class="step min-h-[70vh] flex flex-col justify-center py-16"
              data-step-index="1"
            >
              <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase mb-4">
                Phase I: The Domain
              </span>
              <h3 class="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Start with the business logic
              </h3>
              <p class="text-slate-400 leading-relaxed">
                Before choosing frameworks or databases, we model the core
                business problem in pure C#. This is{" "}
                <strong>Domain-Driven Design</strong>{" "}
                — isolated, testable logic that doesn't depend on anything
                external.
              </p>
            </div>

            {/* Step 2: Hexagonal Architecture */}
            <div
              class="step min-h-[70vh] flex flex-col justify-center py-16"
              data-step-index="2"
            >
              <span class="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4">
                Phase II: Boundaries
              </span>
              <h3 class="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Ports &amp; Adapters
              </h3>
              <p class="text-slate-400 leading-relaxed">
                The core dictates the interfaces it needs. The outside world —
                databases, APIs, frontends — must adapt to the core's rules.
                Dependencies always point inward. This means you can swap your
                database or UI framework without touching business logic.
              </p>
            </div>

            {/* Step 3: CQRS */}
            <div
              class="step min-h-[70vh] flex flex-col justify-center py-16"
              data-step-index="3"
            >
              <span class="text-amber-500 font-mono text-sm tracking-widest uppercase mb-4">
                Phase III: Separation
              </span>
              <h3 class="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Command &amp; Query Separation
              </h3>
              <p class="text-slate-400 leading-relaxed">
                Writing data and reading data are fundamentally different
                operations. <strong>CQRS</strong>{" "}
                separates them — commands go through strict domain validation,
                while queries read from optimized views. This is how a heavy
                backend serves data instantly.
              </p>
            </div>

            {/* Step 4: The Frontend */}
            <div
              class="step min-h-[70vh] flex flex-col justify-center py-16"
              data-step-index="4"
            >
              <span class="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4">
                Phase IV: Delivery
              </span>
              <h3 class="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Fast, modern frontends
              </h3>
              <p class="text-slate-400 leading-relaxed">
                Server-rendered HTML with selective interactivity. No massive
                JavaScript bundles. The CQRS read model feeds optimized data
                directly to the frontend, resulting in near-instant page loads.
              </p>
            </div>

            {/* Step 5: Deployment */}
            <div
              class="step min-h-[70vh] flex flex-col justify-center py-16"
              data-step-index="5"
            >
              <span class="text-rose-500 font-mono text-sm tracking-widest uppercase mb-4">
                Phase V: Scale
              </span>
              <h3 class="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
                Monolith or Microservices
              </h3>
              <p class="text-slate-400 leading-relaxed">
                Not every system needs microservices. A well-structured monolith
                is often the right call. But when you outgrow it, clean
                architecture boundaries make the migration surgical instead of
                catastrophic. I've done both — and I'll recommend what actually
                fits your situation.
              </p>
            </div>

            <div class="h-[30vh]" />
          </div>

          {/* Right Column: Sticky Visualization */}
          <div class="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center bg-slate-950/50 backdrop-blur-sm border-l border-slate-800/50">
            <ScrollytellingViz />
          </div>
        </div>
      </section>

      {/* ====== Services ====== */}
      <section class="py-20 px-6 bg-slate-900/30 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-light text-slate-100 mb-4">
              How we can work together
            </h2>
            <p class="text-slate-400 max-w-2xl mx-auto">
              Every engagement starts with a free 30-minute discovery call.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="Architecture Review"
              description="A focused deep-dive into your codebase, architecture decisions, or migration strategy. You get a written summary with actionable recommendations."
              cta="Book a Review"
              href="/services/diagnostic"
            />
            <ServiceCard
              title="Project Engagement"
              description="Full development and architecture work on a milestone basis. Whether it's a legacy migration, greenfield build, or system redesign."
              cta="Request a Briefing"
              href="/services/briefing"
            />
            <ServiceCard
              title="Fractional CTO / Retainer"
              description="Ongoing strategic technical oversight. Architecture decisions, code quality standards, team mentorship, and a trusted advisor on call."
              cta="Learn More"
              href="/contact"
            />
            <ServiceCard
              title="Specific Tasks"
              description="Component builds, schema designs, bug fixes, API endpoints, or isolated development tasks. Fast turnaround, clear scope."
              cta="Browse Options"
              href="/services/artifacts"
            />
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <h2 class="text-3xl font-light text-slate-100">
            Ready to talk architecture?
          </h2>
          <p class="text-lg text-slate-400">
            The first conversation is always free. Tell me about your system and
            what's keeping you up at night.
          </p>
          <a
            href="/contact"
            class="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-emerald-500/25"
          >
            Schedule a Discovery Call
          </a>
        </div>
      </section>
    </>
  );
});

/* ====== Components ====== */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p class="text-3xl font-light text-emerald-400 mb-1">{value}</p>
      <p class="text-sm text-slate-500 font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

function ExpertiseCard(
  { title, description }: { title: string; description: string },
) {
  return (
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/20 transition-colors">
      <h3 class="text-lg font-medium text-slate-100 mb-2">{title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ServiceCard(
  { title, description, cta, href }: {
    title: string;
    description: string;
    cta: string;
    href: string;
  },
) {
  return (
    <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors flex flex-col">
      <h3 class="text-lg font-medium text-slate-100 mb-3">{title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
      <div class="mt-auto">
        <a
          href={href}
          class="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
        >
          {cta} &rarr;
        </a>
      </div>
    </div>
  );
}
