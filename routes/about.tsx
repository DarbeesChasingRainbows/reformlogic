import { define } from "../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function AboutPage() {
  return (
    <>
      <Head>
        <title>About — ReformLogic</title>
        <meta
          name="description"
          content="Patrick Darbee — Senior .NET Technical Leader with 12+ years of experience in enterprise architecture, church technology, and legacy system modernization."
        />
      </Head>

      <section class="min-h-screen pt-24 pb-32 px-6">
        <div class="max-w-3xl mx-auto">
          <a
            href="/"
            class="text-sm text-slate-500 hover:text-indigo-400 font-mono uppercase tracking-widest mb-8 inline-block"
          >
            &larr; Home
          </a>

          <h1 class="text-4xl md:text-5xl font-light text-slate-100 mb-8">
            About{" "}
            <span class="font-medium text-indigo-400">Patrick Darbee</span>
          </h1>

          <div class="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              I'm a Senior .NET Technical Leader with 12+ years of experience
              building scalable, secure software systems. I've architected
              platforms that drive millions in revenue, mentored 20+ developers
              (including a CTO), and delivered 200+ production releases with
              zero critical incidents.
            </p>
            <p>
              My faith background isn't just a footnote — it's why I care deeply
              about serving churches with the same quality of technology I build
              for Fortune 500 clients. I've worked at John Hagee Ministries,
              iDisciple, and BEMA Information Technologies (a professional
              RockRMS consulting firm), so I understand the unique needs,
              culture, and constraints of ministry organizations firsthand.
            </p>
          </div>

          <div class="w-full h-px bg-slate-800 my-12" />

          {/* ====== Career Highlights ====== */}
          <h2 class="text-2xl font-semibold text-slate-100 mb-8">
            Career Highlights
          </h2>

          <div class="space-y-10">
            <Role
              company="Installation Made Easy (IME)"
              role="Senior Software Engineer & Acting Technical Lead"
              period="2020 — Present"
              highlights={[
                "Primary architect and SME for the company's customer-facing platform (powering Lowe's Home Project Center)",
                "Drove 4.5x revenue growth by stabilizing and scaling a failing legacy platform to 121% of profit targets",
                "Reduced production incidents by 90% through systematic code quality improvements",
                "Architected Strangler Fig migration from monolithic Umbraco 8 to 5 independent microservices using Domain-Driven Design",
                "Optimized critical system performance: 75% reduction in page load times (60s to 5s)",
                "Mentored 20+ developers over 5 years on .NET best practices and the platform's framework",
              ]}
            />

            <Role
              company="Scientific Games"
              role="Full-Stack .NET Developer"
              period="2018 — 2020"
              highlights={[
                "Developed mission-critical features for high-volume lottery and gaming systems serving millions of daily transactions",
                "Architected complete system rewrite migrating legacy .NET 3.5 applications to Umbraco CMS 8 and .NET 4.8",
                "Consulted directly with executive stakeholders on legacy CMS enhancement requirements",
              ]}
            />

            <Role
              company="BEMA Information Technologies"
              role="Full-Stack Developer — RockRMS Consulting"
              period="2017 — 2018"
              highlights={[
                "Delivered custom .NET solutions for multiple church clients on the Rock RMS platform",
                "Implemented React/Redux/GraphQL solution for complex group-finding functionality",
                "Managed client relationships through direct remote consultations and requirements gathering",
              ]}
            />

            <Role
              company="Ministry & Earlier Roles"
              role="iDisciple | John Hagee Ministries | QueBIT | Aspect Software"
              period="2012 — 2017"
              highlights={[
                "Progressive full-stack .NET development roles with increasing technical responsibility",
                "Direct ministry technology experience at John Hagee Ministries and iDisciple",
                "Enterprise consulting and custom solution delivery across multiple industries",
              ]}
            />
          </div>

          <div class="w-full h-px bg-slate-800 my-12" />

          {/* ====== Technical Expertise ====== */}
          <h2 class="text-2xl font-semibold text-slate-100 mb-8">
            Technical Expertise
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <SkillGroup
              title="Backend & Architecture"
              skills={[
                "C# / .NET 9 / ASP.NET Core",
                "Domain-Driven Design (DDD)",
                "Microservices & CQRS",
                "Strangler Fig Migrations",
              ]}
            />
            <SkillGroup
              title="CMS & Platforms"
              skills={[
                "Umbraco CMS (5+ years SME)",
                "RockRMS (consulting experience)",
                "Custom CMS development",
                "Enterprise CMS migrations",
              ]}
            />
            <SkillGroup
              title="Data & Infrastructure"
              skills={[
                "SQL Server / Azure SQL / PostgreSQL",
                "Azure DevOps / CI/CD Pipelines",
                "Docker / Containerization",
                "Performance Optimization",
              ]}
            />
            <SkillGroup
              title="Frontend & Integration"
              skills={[
                "React / TypeScript / NextJS",
                "Deno Fresh / Preact",
                "REST APIs / GraphQL",
                "WebSockets / Real-time Systems",
              ]}
            />
          </div>

          <div class="w-full h-px bg-slate-800 my-12" />

          {/* ====== Education ====== */}
          <h2 class="text-2xl font-semibold text-slate-100 mb-4">
            Education
          </h2>
          <p class="text-slate-400">
            <strong class="text-slate-200">
              Bachelor of Arts, Computer Science
            </strong>
            <br />
            Harding University — Searcy, AR
          </p>

          <div class="w-full h-px bg-slate-800 my-12" />

          {/* ====== CTA ====== */}
          <div class="text-center space-y-6">
            <h2 class="text-2xl font-light text-slate-100">
              Let's work together.
            </h2>
            <p class="text-slate-400">
              Whether you're a church looking for technology help or a business
              needing architecture expertise, I'd love to hear about your
              project.
            </p>
            <a
              href="/contact"
              class="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </>
  );
});

/* ====== Components ====== */

function Role(
  { company, role, period, highlights }: {
    company: string;
    role: string;
    period: string;
    highlights: string[];
  },
) {
  return (
    <div>
      <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3">
        <h3 class="text-xl font-semibold text-slate-100">{company}</h3>
        <span class="text-sm font-mono text-slate-500">{period}</span>
      </div>
      <p class="text-indigo-400 text-sm font-medium mb-4">{role}</p>
      <ul class="space-y-2">
        {highlights.map((h) => (
          <li class="flex items-start text-sm text-slate-400 leading-relaxed">
            <span class="text-indigo-400 mr-2 mt-1 shrink-0">&#8226;</span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup(
  { title, skills }: { title: string; skills: string[] },
) {
  return (
    <div class="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
      <h3 class="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">
        {title}
      </h3>
      <ul class="space-y-1.5">
        {skills.map((s) => <li class="text-sm text-slate-400">{s}</li>)}
      </ul>
    </div>
  );
}
