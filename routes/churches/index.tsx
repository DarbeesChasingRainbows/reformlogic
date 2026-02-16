import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function ChurchesPage() {
  return (
    <>
      <Head>
        <title>Church Technology Services — ReformLogic</title>
        <meta
          name="description"
          content="RockRMS consulting, church management system migration, websites, and ongoing technology partnership for churches and ministries."
        />
      </Head>

      {/* ====== Hero ====== */}
      <section class="min-h-[60vh] flex items-center justify-center px-6 pt-24 pb-16">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <span class="text-indigo-500 font-mono text-sm tracking-widest uppercase">
            Church &amp; Ministry Technology
          </span>
          <h1 class="text-4xl md:text-5xl font-light text-slate-100 tracking-tight">
            Technology should amplify your{" "}
            <span class="text-indigo-400 font-medium">ministry</span>,
            <br class="hidden md:block" /> not complicate it.
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            I've worked in ministry organizations and at a professional RockRMS
            consulting firm. I bring 12+ years of enterprise software experience
            to help your church build technology that actually serves your
            congregation.
          </p>
          <div class="pt-4">
            <a
              href="/contact"
              class="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
            >
              Start a Free Conversation
            </a>
          </div>
        </div>
      </section>

      {/* ====== Pain Points ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-light text-slate-100 mb-4">
              Sound familiar?
            </h2>
            <p class="text-slate-400 max-w-2xl mx-auto">
              These are the challenges I hear from church leaders every week.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PainPoint
              title="Scattered data across too many tools"
              description="Member info in one place, giving records in another, volunteer schedules in a spreadsheet. Nothing talks to each other."
            />
            <PainPoint
              title="Communication gaps with your congregation"
              description="51% of church leaders say communication is their biggest tech challenge. Emails get lost, texts feel impersonal, and important updates don't reach the right people."
            />
            <PainPoint
              title="Your website doesn't reflect who you are"
              description="Visitors check your website before they ever visit in person. If it's outdated or hard to navigate, you're losing people before they walk through the door."
            />
            <PainPoint
              title="No one on staff really 'gets' the technology"
              description="You need someone who understands both the technology and your mission — not an IT vendor who treats you like a billing account."
            />
          </div>
        </div>
      </section>

      {/* ====== Services ====== */}
      <section class="py-20 px-6 bg-slate-900/30 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-light text-slate-100 mb-4">
              How I can help
            </h2>
            <p class="text-slate-400 max-w-2xl mx-auto">
              Every engagement starts with a free conversation to understand
              your church's unique needs.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="RockRMS Implementation"
              description="New installations, migration from other platforms, custom workflows, data views, reporting, and plugin development. I worked at a professional RockRMS consulting firm — I know the platform inside and out."
              items={[
                "New setup & configuration",
                "Migration from Planning Center, Breeze, or CCB",
                "Custom workflows & automation",
                "Staff training",
              ]}
            />
            <ServiceCard
              title="Church Websites"
              description="Modern, mobile-responsive websites that integrate with your church management system. Event registration, online giving, sermon archives, and a 'Plan Your Visit' experience that converts."
              items={[
                "Mobile-first design",
                "ChMS integration",
                "Online giving setup",
                "Content management training",
              ]}
            />
            <ServiceCard
              title="Ministry Tech Assessment"
              description="A focused review of your current technology stack — what's working, what's not, and a prioritized roadmap for improvement. No jargon, just clear recommendations."
              items={[
                "Full tech stack audit",
                "Written report with priorities",
                "Budget-conscious recommendations",
                "Actionable next steps",
              ]}
            />
            <ServiceCard
              title="ChMS Migration"
              description="Moving from spreadsheets, an outdated system, or switching between platforms? I'll handle the data migration, configuration, and training so nothing falls through the cracks."
              items={[
                "Data cleaning & migration",
                "Platform configuration",
                "Workflow setup",
                "Staff onboarding",
              ]}
            />
            <ServiceCard
              title="Custom Development"
              description="When off-the-shelf solutions don't fit, I build custom tools tailored to your ministry's specific needs. Member portals, volunteer coordination systems, giving integrations, and more."
              items={[
                "Custom web applications",
                "API integrations",
                "Reporting dashboards",
                "Automation tools",
              ]}
            />
            <ServiceCard
              title="Monthly Technology Partnership"
              description="Ongoing support so you always have someone to call. Maintenance, updates, quarterly reviews, and priority response when something breaks."
              items={[
                "Ongoing maintenance & updates",
                "Quarterly technology reviews",
                "Priority support",
                "Staff training sessions",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ====== Why Me ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-light text-slate-100 mb-4">
              Why work with me
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyCard
              title="Ministry Experience"
              description="I've worked at John Hagee Ministries, iDisciple, and a professional RockRMS consulting firm (BEMA). I understand church culture, governance, and the unique challenges of ministry technology."
            />
            <WhyCard
              title="Enterprise-Grade Skills"
              description="12+ years building systems for Fortune 500 retailers, gaming platforms, and high-volume transaction systems. Your church gets the same quality of architecture that enterprise clients pay premium rates for."
            />
            <WhyCard
              title="Long-Term Partnership"
              description="I'm not here to build something and disappear. I believe in ongoing relationships — training your staff, reviewing your tech quarterly, and being the person you call when something comes up."
            />
          </div>
        </div>
      </section>

      {/* ====== How I Work ====== */}
      <section class="py-20 px-6 bg-slate-900/30 border-t border-slate-800/50">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-light text-slate-100 mb-4">
              How it works
            </h2>
          </div>
          <div class="space-y-8">
            <Step
              number="1"
              title="Free conversation"
              description="We talk for 30 minutes about your church, your technology pain points, and what you're trying to accomplish. No sales pitch, no obligation."
            />
            <Step
              number="2"
              title="Assessment & proposal"
              description="I review your current setup and put together a clear, plain-English proposal with options that fit your budget. You'll know exactly what you're getting and what it costs."
            />
            <Step
              number="3"
              title="Implementation"
              description="I do the work — migration, setup, development, whatever's needed. You get regular updates and I train your staff along the way so you're never dependent on me."
            />
            <Step
              number="4"
              title="Ongoing partnership"
              description="After launch, I'm still here. Monthly retainers available for ongoing support, updates, and quarterly reviews to make sure everything keeps running smoothly."
            />
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section class="py-20 px-6 border-t border-slate-800/50">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <h2 class="text-3xl font-light text-slate-100">
            Ready to talk?
          </h2>
          <p class="text-lg text-slate-400">
            The first conversation is always free. Tell me about your church and
            what's not working with your technology — I'll let you know how I
            can help.
          </p>
          <a
            href="/contact"
            class="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25"
          >
            Start a Free Conversation
          </a>
        </div>
      </section>
    </>
  );
});

/* ====== Components ====== */

function PainPoint(
  { title, description }: { title: string; description: string },
) {
  return (
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
      <h3 class="text-lg font-medium text-slate-100 mb-2">{title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ServiceCard(
  { title, description, items }: {
    title: string;
    description: string;
    items: string[];
  },
) {
  return (
    <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
      <h3 class="text-lg font-medium text-slate-100 mb-3">{title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
      <ul class="mt-auto space-y-2">
        {items.map((item) => (
          <li class="flex items-start text-sm text-slate-400">
            <span class="text-indigo-400 mr-2 mt-0.5 shrink-0">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhyCard(
  { title, description }: { title: string; description: string },
) {
  return (
    <div class="text-center">
      <h3 class="text-lg font-medium text-slate-100 mb-3">{title}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Step(
  { number, title, description }: {
    number: string;
    title: string;
    description: string;
  },
) {
  return (
    <div class="flex gap-6">
      <div class="shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-sm">
        {number}
      </div>
      <div>
        <h3 class="text-lg font-medium text-slate-100 mb-1">{title}</h3>
        <p class="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
