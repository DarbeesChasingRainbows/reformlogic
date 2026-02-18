import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ReformLogic — Technology That Serves Your Mission",
  description:
    "Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS consulting, and enterprise system design.",
};

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[70vh] items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h1 className="text-4xl tracking-tight text-slate-100 md:text-6xl">
            Technology that serves your <span className="font-medium text-indigo-400">mission</span>.
          </h1>
          <div className="mx-auto h-px w-24 bg-slate-700" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            I help churches and businesses build the right technology — systems that scale, integrate cleanly, and actually solve the problem. 12+ years of hands-on .NET architecture, enterprise CMS, and ministry technology experience.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          <Link href="/churches" className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-10 transition-all hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5">
            <h2 className="mb-3 text-2xl font-semibold text-slate-100">For Churches &amp; Ministries</h2>
            <p className="mb-6 leading-relaxed text-slate-400">
              RockRMS implementation, church management systems, websites, and ongoing technology partnership.
            </p>
            <span className="text-sm font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">Explore church services</span>
          </Link>

          <Link href="/commercial" className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-10 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5">
            <h2 className="mb-3 text-2xl font-semibold text-slate-100">For Businesses &amp; Startups</h2>
            <p className="mb-6 leading-relaxed text-slate-400">
              Software architecture consulting, legacy system modernization, Umbraco CMS expertise, and custom .NET development.
            </p>
            <span className="text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">Explore commercial services</span>
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-800/50 py-16 px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          <Stat value="12+" label="Years Experience" />
          <Stat value="4.5x" label="Revenue Growth Delivered" />
          <Stat value="200+" label="Production Releases" />
          <Stat value="20+" label="Developers Mentored" />
        </div>
      </section>

      <section className="border-t border-slate-800/50 py-20 px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl text-slate-100 md:text-3xl">
            Hi, I&apos;m <span className="font-medium text-indigo-400">Patrick Darbee</span>.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            I&apos;m a Senior .NET Technical Leader who&apos;s spent the last 12+ years building scalable systems for enterprise retailers, gaming platforms, and ministry organizations.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link href="/about" className="rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:border-indigo-500/50">
              Learn More About Me
            </Link>
            <Link href="/contact" className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="mb-1 text-3xl text-indigo-400">{value}</p>
      <p className="text-sm uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}
