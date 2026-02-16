import { define } from "../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>ReformLogic — Technology That Serves Your Mission</title>
        <meta
          name="description"
          content="Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS consulting, and enterprise system design."
        />
      </Head>

      {/* ====== Hero ====== */}
      <section class="min-h-[70vh] flex items-center justify-center px-6 pt-20">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h1 class="text-4xl md:text-6xl font-light text-slate-100 tracking-tight">
            Technology that serves your{" "}
            <span class="text-indigo-400 font-medium">mission</span>.
          </h1>
          <div class="w-24 h-px bg-slate-700 mx-auto" />
          <p class="text-lg md:text-xl leading-relaxed text-slate-400 max-w-2xl mx-auto">
            I help churches and businesses build the right technology — systems
            that scale, integrate cleanly, and actually solve the problem. 12+
            years of hands-on .NET architecture, enterprise CMS, and ministry
            technology experience.
          </p>
        </div>
      </section>

      {/* ====== Two Tracks ====== */}
      <section class="py-20 px-6">
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Church Track */}
          <a
            href="/churches"
            class="group bg-slate-900/50 border border-slate-800 rounded-2xl p-10 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <svg
                class="w-6 h-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-slate-100 mb-3">
              For Churches &amp; Ministries
            </h2>
            <p class="text-slate-400 leading-relaxed mb-6">
              RockRMS implementation, church management systems, websites, and
              ongoing technology partnership — from someone who's worked in
              ministry and understands your mission.
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <Tag>RockRMS</Tag>
              <Tag>ChMS Migration</Tag>
              <Tag>Church Websites</Tag>
              <Tag>Tech Assessments</Tag>
            </div>
            <span class="inline-flex items-center text-indigo-400 font-medium text-sm group-hover:text-indigo-300 transition-colors">
              Explore church services
              <svg
                class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* Commercial Track */}
          <a
            href="/commercial"
            class="group bg-slate-900/50 border border-slate-800 rounded-2xl p-10 hover:border-emerald-500/40 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <svg
                class="w-6 h-6 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-slate-100 mb-3">
              For Businesses &amp; Startups
            </h2>
            <p class="text-slate-400 leading-relaxed mb-6">
              Software architecture consulting, legacy system modernization,
              Umbraco CMS expertise, and custom .NET development — built on 12+
              years of enterprise delivery.
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <Tag>Architecture Consulting</Tag>
              <Tag>Umbraco CMS</Tag>
              <Tag>.NET / C#</Tag>
              <Tag>Legacy Migration</Tag>
            </div>
            <span class="inline-flex items-center text-emerald-400 font-medium text-sm group-hover:text-emerald-300 transition-colors">
              Explore commercial services
              <svg
                class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* ====== Credibility Bar ====== */}
      <section class="py-16 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat value="12+" label="Years Experience" />
            <Stat value="4.5x" label="Revenue Growth Delivered" />
            <Stat value="200+" label="Production Releases" />
            <Stat value="20+" label="Developers Mentored" />
          </div>
        </div>
      </section>

      {/* ====== About Snapshot ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <h2 class="text-2xl md:text-3xl font-light text-slate-100">
            Hi, I'm{" "}
            <span class="font-medium text-indigo-400">Patrick Darbee</span>.
          </h2>
          <p class="text-lg text-slate-400 leading-relaxed">
            I'm a Senior .NET Technical Leader who's spent the last 12+ years
            building scalable systems for enterprise retailers, gaming
            platforms, and ministry organizations. I've led architecture
            migrations, mentored engineering teams, and delivered
            mission-critical software that handles millions of transactions.
          </p>
          <p class="text-lg text-slate-400 leading-relaxed">
            My faith background drives my passion for serving churches with the
            same caliber of technology I build for Fortune 500 clients. Whether
            you need a RockRMS implementation or a full enterprise architecture
            overhaul, I bring the same commitment to quality.
          </p>
          <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              class="px-6 py-3 bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 rounded-lg font-medium transition-all text-sm"
            >
              Learn More About Me
            </a>
            <a
              href="/contact"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* ====== Footer ====== */}
      <footer class="bg-slate-950 py-12 border-t border-slate-900">
        <div class="max-w-5xl mx-auto px-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center space-x-3">
              <img src="/logo.svg" alt="ReformLogic" class="h-6 w-6" />
              <span class="text-slate-400 text-sm font-mono">ReformLogic</span>
            </div>
            <nav class="flex items-center space-x-6 text-sm text-slate-500">
              <a
                href="/churches"
                class="hover:text-indigo-400 transition-colors"
              >
                Churches
              </a>
              <a
                href="/commercial"
                class="hover:text-emerald-400 transition-colors"
              >
                Commercial
              </a>
              <a
                href="/portfolio"
                class="hover:text-slate-300 transition-colors"
              >
                Portfolio
              </a>
              <a href="/about" class="hover:text-slate-300 transition-colors">
                About
              </a>
              <a href="/contact" class="hover:text-slate-300 transition-colors">
                Contact
              </a>
            </nav>
            <p class="text-slate-600 text-sm font-mono">
              &copy; 2026 ReformLogic
            </p>
          </div>
        </div>
      </footer>
    </>
  );
});

/* ====== Reusable Components ====== */

function Tag({ children }: { children: string }) {
  return (
    <span class="text-xs font-mono bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-slate-400">
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p class="text-3xl font-light text-indigo-400 mb-1">{value}</p>
      <p class="text-sm text-slate-500 font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
