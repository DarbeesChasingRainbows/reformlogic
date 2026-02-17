import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Church Technology Services — ReformLogic",
  description:
    "RockRMS consulting, church management system migration, websites, and ongoing technology partnership for churches and ministries.",
};

export const runtime = "edge";

export default function ChurchesPage() {
  return (
    <>
      <section className="flex min-h-[60vh] items-center justify-center px-6 pb-16 pt-24">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="text-sm uppercase tracking-widest text-indigo-500">Church & Ministry Technology</span>
          <h1 className="text-4xl font-light tracking-tight text-slate-100 md:text-5xl">
            Technology should amplify your <span className="font-medium text-indigo-400">ministry</span>, not complicate it.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            I bring 12+ years of enterprise software experience to help your church build technology that actually serves your congregation.
          </p>
          <div className="pt-4">
            <Link href="/contact" className="inline-block rounded-lg bg-indigo-600 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500">
              Start a Free Conversation
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-light text-slate-100">How I can help</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard title="RockRMS Implementation" description="New setups, migrations, workflows, reporting, and training." />
            <ServiceCard title="Church Websites" description="Mobile-responsive websites with giving, events, and ChMS integration." />
            <ServiceCard title="Ministry Tech Assessment" description="A practical roadmap for your current stack, budget, and priorities." />
            <ServiceCard title="ChMS Migration" description="Data cleaning, migration, configuration, and onboarding support." />
            <ServiceCard title="Custom Development" description="Custom tools for real ministry workflows and integrations." />
            <ServiceCard title="Monthly Partnership" description="Ongoing support, updates, and quarterly strategic reviews." />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 py-20 px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl font-light text-slate-100">Ready to talk?</h2>
          <p className="text-lg text-slate-400">The first conversation is always free. Tell me what&apos;s not working with your technology.</p>
          <Link href="/contact" className="inline-block rounded-lg bg-indigo-600 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500">
            Start a Free Conversation
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition-colors hover:border-indigo-500/30">
      <h3 className="mb-3 text-lg font-medium text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
