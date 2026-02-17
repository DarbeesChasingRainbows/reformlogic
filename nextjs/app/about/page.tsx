import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — ReformLogic",
  description:
    "Patrick Darbee — Senior .NET Technical Leader with 12+ years of experience in enterprise architecture, church technology, and legacy system modernization.",
};

export const runtime = "edge";

export default function AboutPage() {
  return (
    <section className="min-h-screen px-6 pb-32 pt-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-400">
          ← Home
        </Link>

        <h1 className="mb-8 text-4xl font-light text-slate-100 md:text-5xl">
          About <span className="font-medium text-indigo-400">Patrick Darbee</span>
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-slate-400">
          <p>
            I&apos;m a Senior .NET Technical Leader with 12+ years of experience building scalable, secure software systems. I&apos;ve architected platforms that drive millions in revenue, mentored 20+ developers, and delivered 200+ production releases.
          </p>
          <p>
            My faith background drives my passion for serving churches with the same quality of technology I build for enterprise clients. I&apos;ve worked at John Hagee Ministries, iDisciple, and BEMA Information Technologies, so I understand ministry technology constraints firsthand.
          </p>
        </div>

        <div className="my-12 h-px w-full bg-slate-800" />

        <h2 className="mb-8 text-2xl font-semibold text-slate-100">Technical Expertise</h2>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SkillGroup
            title="Backend & Architecture"
            skills={["C# / .NET 9 / ASP.NET Core", "Domain-Driven Design (DDD)", "Microservices & CQRS", "Strangler Fig Migrations"]}
          />
          <SkillGroup
            title="CMS & Platforms"
            skills={["Umbraco CMS", "RockRMS", "Custom CMS development", "Enterprise CMS migrations"]}
          />
          <SkillGroup
            title="Data & Infrastructure"
            skills={["SQL Server / PostgreSQL", "Azure DevOps / CI/CD", "Docker", "Performance Optimization"]}
          />
          <SkillGroup
            title="Frontend & Integration"
            skills={["React / TypeScript / Next.js", "Deno Fresh / Preact", "REST APIs / GraphQL", "WebSockets"]}
          />
        </div>

        <div className="my-12 h-px w-full bg-slate-800" />

        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-light text-slate-100">Let&apos;s work together.</h2>
          <p className="text-slate-400">Whether you&apos;re a church looking for technology help or a business needing architecture expertise, I&apos;d love to hear about your project.</p>
          <Link href="/contact" className="inline-block rounded-lg bg-indigo-600 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500">
            Start a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
      <h3 className="mb-3 text-sm uppercase tracking-widest text-indigo-400">{title}</h3>
      <ul className="space-y-1.5">
        {skills.map((skill) => (
          <li key={skill} className="text-sm text-slate-400">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
