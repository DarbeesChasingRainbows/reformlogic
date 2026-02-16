# ReformLogic — Comprehensive LLM Context Document

> **Last Updated:** 2026-02-16
> **Purpose:** This document contains everything an LLM needs to understand, continue development on, and complete the strategic overhaul of the ReformLogic freelance portfolio website. It includes: the owner's background, business goals, market research, current project state, all file contents, architectural decisions, completed work, and a prioritized roadmap of remaining tasks.

---

## Table of Contents

1. [Owner Background & Resume](#1-owner-background--resume)
2. [Business Goals & Strategy](#2-business-goals--strategy)
3. [Market Research](#3-market-research)
4. [Tech Stack & Architecture](#4-tech-stack--architecture)
5. [Project Structure & File Map](#5-project-structure--file-map)
6. [Current File Contents](#6-current-file-contents)
7. [Design System & Conventions](#7-design-system--conventions)
8. [Phase 1 — Completed Work](#8-phase-1--completed-work)
9. [Remaining Roadmap (Phases 2–5)](#9-remaining-roadmap-phases-25)
10. [Pricing Strategy](#10-pricing-strategy)
11. [SEO & Marketing Strategy](#11-seo--marketing-strategy)
12. [Key Differentiators](#12-key-differentiators)
13. [Known Issues & Tech Debt](#13-known-issues--tech-debt)
14. [Framework Reference (Deno Fresh 2)](#14-framework-reference-deno-fresh-2)
15. [Deployment & Email Configuration](#15-deployment--email-configuration)

---

## 1. Owner Background & Resume

### Patrick Darbee
- **Title:** Senior .NET Technical Leader
- **Experience:** 12+ years of hands-on software development
- **Education:** Bachelor of Arts, Computer Science — Harding University, Searcy, AR
- **Faith Background:** Christian — has worked at John Hagee Ministries, iDisciple (faith-based tech company)
- **Current Employer:** Installation Made Easy (IME), 2020–Present

### Career History

#### Installation Made Easy (IME) — Senior Software Engineer & Acting Technical Lead (2020–Present)
- Primary architect and SME for the customer-facing platform powering Lowe's Home Project Center (public URL: https://lowes.myhomeprojectcenter.com/welcome-countertops-wizard)
- Drove **4.5x revenue growth** by stabilizing and scaling a failing legacy platform to 121% of profit targets
- Reduced production incidents by **90%** through systematic code quality improvements
- Architected **Strangler Fig migration** from monolithic Umbraco 8 to 5 independent microservices using Domain-Driven Design
- Optimized critical system performance: **75% reduction in page load times** (60s to 5s)
- Mentored **20+ developers** (including a CTO) over 5 years on .NET best practices
- Sole maintainer of custom Wizards framework
- 50+ major features, 200+ production releases with **zero critical incidents**
- **5+ years** as the sole SME on a heavily customized, revenue-driving **Umbraco CMS** instance

#### Scientific Games — Full-Stack .NET Developer (2018–2020)
- Developed mission-critical features for high-volume lottery and gaming systems serving **millions of daily transactions**
- Architected complete system rewrite migrating legacy **.NET 3.5 to Umbraco CMS 8 and .NET 4.8**
- Consulted directly with executive stakeholders on legacy CMS enhancement requirements

#### BEMA Information Technologies — Full-Stack Developer, RockRMS Consulting (2017–2018)
- Professional **RockRMS consulting firm** — delivered custom .NET solutions for multiple church clients
- Built **React/Redux/GraphQL** solution for complex group-finding functionality on the Rock RMS platform
- Managed client relationships through direct remote consultations and requirements gathering

#### Ministry & Earlier Roles (2012–2017)
- **iDisciple** — Faith-based technology company
- **John Hagee Ministries** — Direct ministry technology work
- **QueBIT** — Enterprise consulting
- **Aspect Software** — Custom solution delivery
- Progressive full-stack .NET development roles with increasing technical responsibility

### Technical Expertise
| Category | Skills |
|---|---|
| **Backend & Architecture** | C# / .NET 9 / ASP.NET Core, Domain-Driven Design (DDD), Microservices & CQRS, Strangler Fig Migrations |
| **CMS & Platforms** | Umbraco CMS (5+ years SME), RockRMS (consulting experience), Custom CMS development, Enterprise CMS migrations |
| **Data & Infrastructure** | SQL Server / Azure SQL / PostgreSQL, Azure DevOps / CI/CD Pipelines, Docker / Containerization, Performance Optimization |
| **Frontend & Integration** | React / TypeScript / NextJS, Deno Fresh / Preact, REST APIs / GraphQL, WebSockets / Real-time Systems |

---

## 2. Business Goals & Strategy

### Transition Plan
- **Phase:** Side hustle first, keeping current job at IME
- **Target Split:** 50% church/ministry clients, 50% commercial clients
- **Income Goal:** $170,000/year to replace current salary
- **Hours:** 30-35 hours/week (better work-life balance)
- **Current Status:** Just starting out, no clients yet, no revenue yet

### Target Clients
- **Church Track:** Churches of all sizes, ministries, faith-based organizations
- **Commercial Track:** Startups, mid-size businesses, enterprise clients needing .NET architecture

### Service Model
- Full service: development, consulting, ChMS setup, training, maintenance
- Every engagement starts with a **free 30-minute discovery call**
- Church clients prefer fixed-price quotes
- Commercial clients billed hourly or milestone-based

---

## 3. Market Research

### Church Technology Market
- **Market Size:** $270M, growing at 5.5% CAGR
- **55%** of churches are increasing tech spending
- **51%** of church leaders say communication is their biggest tech challenge
- Key platforms in the space: RockRMS, Planning Center, Breeze, CCB, Subsplash, Tithe.ly
- Churches prioritize outcomes and relationships over technical sophistication
- Church governance involves committees/boards — buying decisions are slower and more consensus-driven

### Competitive Landscape
- Very few people combine: (a) professional RockRMS development, (b) senior .NET architecture, (c) actual ministry experience
- Umbraco CMS consultants command premium rates; experienced ones are scarce
- Fractional CTO is a growing service model for startups

---

## 4. Tech Stack & Architecture

### Runtime & Framework
- **Runtime:** Deno (not Node.js)
- **Framework:** Fresh 2.x (Deno's server-rendered web framework)
- **UI Library:** Preact (lightweight React alternative)
- **State Management:** @preact/signals (reactive signals for islands)
- **Styling:** Tailwind CSS 4.x via @tailwindcss/vite plugin
- **Build Tool:** Vite 7.x
- **Package Manager:** Deno with manual node_modules

### Architecture Pattern: Island Architecture
- All pages are **server-rendered** (SSR) by default — zero JavaScript shipped
- Only components in the `islands/` directory are **hydrated on the client**
- This means: routes, layouts, and static components run ONLY on the server
- Islands receive props from server components and hydrate independently
- Pattern: `routes/` = server-only pages, `islands/` = interactive client components

### Key Configuration

**deno.json:**
```json
{
  "nodeModulesDir": "manual",
  "tasks": {
    "dev": "vite",
    "build": "vite build",
    "start": "deno serve -A _fresh/server.js",
    "check": "deno fmt --check . && deno lint . && deno check",
    "update": "deno run -A -r jsr:@fresh/update ."
  },
  "imports": {
    "@/": "./",
    "fresh": "jsr:@fresh/core@^2.2.0",
    "preact": "npm:preact@^10.27.2",
    "@preact/signals": "npm:@preact/signals@^2.5.0",
    "@fresh/plugin-vite": "jsr:@fresh/plugin-vite@^1.0.8",
    "vite": "npm:vite@^7.1.3",
    "tailwindcss": "npm:tailwindcss@^4.1.10",
    "@tailwindcss/vite": "npm:@tailwindcss/vite@^4.1.12"
  },
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "preact"
  }
}
```

**vite.config.ts:**
```ts
import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [fresh(), tailwindcss()],
});
```

### Shared State Definition (utils.ts)
```ts
import { createDefine } from "fresh";

export interface State {
  shared: string;
}

export const define = createDefine<State>();
```

All routes use `define.page()` and handlers use `define.handlers()` — this is the Fresh 2 pattern for typed route definitions.

### Email & API
- **Email Service:** Resend API (https://api.resend.com/emails)
- **Environment Variables:** `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `FROM_ADDRESS`
- **Dev Mode:** When `RESEND_API_KEY` is not set, emails log to console
- **Rate Limiting:** In-memory, IP-based, 3 requests per hour per IP
- **Honeypot:** All forms include a hidden `website` field — if filled, submission is silently accepted but not processed

---

## 5. Project Structure & File Map

```
C:\Work\repos\reformlogic\
├── deno.json                          # Deno config, tasks, imports
├── vite.config.ts                     # Vite + Fresh + Tailwind plugins
├── utils.ts                           # Shared state type + define helper
│
├── assets/
│   └── styles.css                     # Tailwind import + custom animations
│
├── static/
│   ├── logo.svg                       # Site logo
│   └── favicon.ico                    # Favicon
│
├── utils/
│   ├── email.ts                       # Resend API email utility
│   ├── rateLimit.ts                   # In-memory IP rate limiter
│   ├── projects.ts                    # Portfolio project data + types
│   ├── contracts.ts                   # Contract definitions (MSA, NDA, SOW, etc.)
│   ├── contractUtils.ts              # Contract interpolation, rendering, signing
│   └── contractEmail.ts              # Signed contract email templates
│
├── routes/
│   ├── _app.tsx                       # Root layout (nav, head, meta, OG tags)
│   ├── index.tsx                      # Homepage — gateway page (NEW)
│   ├── about.tsx                      # About page with career history (NEW)
│   ├── contact.tsx                    # Contact form page
│   │
│   ├── churches/
│   │   └── index.tsx                  # Church landing page (NEW)
│   │
│   ├── commercial/
│   │   └── index.tsx                  # Commercial landing + scrollytelling (NEW)
│   │
│   ├── portfolio/
│   │   ├── index.tsx                  # Portfolio listing
│   │   └── [slug].tsx                 # Portfolio detail + case study sections
│   │
│   ├── services/
│   │   ├── diagnostic.tsx             # Architecture review page (MODIFIED)
│   │   ├── artifacts.tsx              # Task/gig order page
│   │   └── briefing.tsx               # Full project engagement page
│   │
│   ├── contracts/
│   │   ├── index.tsx                  # Contract listing page
│   │   ├── [type].tsx                 # Contract view page
│   │   └── sign/
│   │       └── [type].tsx             # Contract signing page
│   │
│   └── api/
│       ├── intake.tsx                 # Form submission handler
│       └── sign.tsx                   # Contract signature handler
│
├── islands/
│   ├── ScrollytellingViz.tsx          # SVG architecture visualization (client)
│   ├── DiagnosticForm.tsx             # Architecture review booking form
│   ├── ArtifactForm.tsx               # Task request form (MODIFIED)
│   ├── BriefingForm.tsx               # Project briefing form (MODIFIED)
│   ├── ContactForm.tsx                # General contact form
│   └── ContractSignature.tsx          # Electronic signature island
│
├── _fresh/                            # Build output (gitignored)
└── node_modules/                      # Dependencies (gitignored)
```

### Files Marked (NEW) — Created during Phase 1:
- `routes/index.tsx` — Complete rewrite as gateway page
- `routes/about.tsx` — New About page
- `routes/churches/index.tsx` — New church landing page
- `routes/commercial/index.tsx` — New commercial landing page

### Files Marked (MODIFIED) — Updated during Phase 1:
- `routes/_app.tsx` — Added OG tags, Twitter Cards, canonical URL, expanded nav
- `routes/services/diagnostic.tsx` — Removed $350 price, renamed to Architecture Review
- `routes/portfolio/index.tsx` — Changed "Case Studies" to "Portfolio"
- `routes/portfolio/[slug].tsx` — Added Challenge/Approach/Results sections
- `islands/DiagnosticForm.tsx` — Changed button from "Book Diagnostic — $350" to "Get Started"
- `islands/ArtifactForm.tsx` — Added church task types to dropdown
- `islands/BriefingForm.tsx` — Added church scope options to dropdown
- `utils/projects.ts` — Expanded interface, added 3 real projects from resume

---

## 6. Current File Contents

### 6.1 Root Layout — routes/_app.tsx
```tsx
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en" class="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ReformLogic — Software Architecture & Church Technology Consulting</title>
        <meta name="description" content="Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS consulting, Umbraco CMS, and enterprise system design." />
        {/* Open Graph */}
        <meta property="og:title" content="ReformLogic — Technology That Serves Your Mission" />
        <meta property="og:description" content="Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS, and enterprise system design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reformlogic.com" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReformLogic — Technology That Serves Your Mission" />
        <meta name="twitter:description" content="Software architecture consulting and church technology services. 12+ years of .NET expertise." />
        {/* Canonical */}
        <link rel="canonical" href="https://reformlogic.com" />
      </head>
      <body class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-indigo-500/30">
        {/* Navigation */}
        <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
          <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="flex items-center space-x-3 group">
              <img src="/logo.svg" alt="" class="h-6 w-6" />
              <span class="text-slate-200 font-mono text-sm tracking-wide group-hover:text-indigo-400 transition-colors">ReformLogic</span>
            </a>
            <div class="flex items-center space-x-6 text-sm font-mono">
              <a href="/churches" class="text-slate-500 hover:text-indigo-400 transition-colors tracking-wide uppercase hidden sm:inline">Churches</a>
              <a href="/commercial" class="text-slate-500 hover:text-emerald-400 transition-colors tracking-wide uppercase hidden sm:inline">Commercial</a>
              <a href="/portfolio" class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase">Portfolio</a>
              <a href="/about" class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase hidden sm:inline">About</a>
              <a href="/contact" class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase">Contact</a>
            </div>
          </div>
        </nav>
        <Component />
      </body>
    </html>
  );
});
```

### 6.2 Homepage — routes/index.tsx (Gateway Page)
- **Sections:** Hero ("Technology that serves your mission"), Two Track Cards (Churches/Commercial), Credibility Stats, About Snapshot with Patrick's bio, Footer
- **Color Scheme:** Indigo for church track, Emerald for commercial track
- **Components:** `Tag`, `Stat`
- **Key Detail:** The two track cards link to `/churches` and `/commercial` respectively

### 6.3 Church Landing — routes/churches/index.tsx
- **Sections:** Hero, Pain Points (4 cards), Services (6 cards), Why Me (3 cards), How It Works (4 steps), CTA
- **Accent Color:** Indigo (#818cf8, #6366f1)
- **Components:** `PainPoint`, `ServiceCard` (with items list), `WhyCard`, `Step`
- **Services Listed:** RockRMS Implementation, Church Websites, Ministry Tech Assessment, ChMS Migration, Custom Development, Monthly Technology Partnership

### 6.4 Commercial Landing — routes/commercial/index.tsx
- **Sections:** Hero, Credibility Stats, Core Expertise (6 cards), Scrollytelling (5 phases), Services (4 cards), CTA
- **Accent Color:** Emerald (#10b981, #059669)
- **Components:** `Stat`, `ExpertiseCard`, `ServiceCard`
- **Scrollytelling Phases:** Domain → Ports & Adapters → CQRS → Frontend → Monolith vs. Microservices
- **Reuses:** `ScrollytellingViz` island from `islands/ScrollytellingViz.tsx`

### 6.5 About — routes/about.tsx
- **Sections:** Bio (2 paragraphs), Career Highlights (4 roles), Technical Expertise (4 skill groups), Education, CTA
- **Components:** `Role`, `SkillGroup`

### 6.6 Portfolio — routes/portfolio/index.tsx & routes/portfolio/[slug].tsx
- **Listing:** Shows all projects from `utils/projects.ts`, links to detail pages
- **Detail:** Shows full description, tech stack tags, Challenge/Approach/Results case study blocks (if data exists)

### 6.7 Projects Data — utils/projects.ts
4 projects defined:
1. **ime-platform** (Enterprise, Featured) — 4.5x revenue growth, Strangler Fig migration
2. **scientific-games** (Enterprise) — .NET 3.5 to Umbraco 8 migration
3. **rockrms-consulting** (Ministry, Featured) — BEMA RockRMS work, React/Redux/GraphQL
4. **taskforge** (Demo) — Kanban demo app with DDD/CQRS

```typescript
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  category: string;
  isFeatured: boolean;
  isConfidential?: boolean;
  challenge?: string;
  approach?: string;
  results?: string;
  testimonial?: {
    quote: string;
    name: string;
    title: string;
    org: string;
  };
}
```

### 6.8 Services Pages

**routes/services/diagnostic.tsx** — Architecture Review (formerly "The Diagnostic")
- Removed $350 price display
- Renamed from "Level II: Advisory" to "Architecture Consulting"
- Features: Live review, DDD modeling, written summary, no contract required
- Form: `DiagnosticForm` island

**routes/services/artifacts.tsx** — Specific Artifacts
- Still has "Level I: Tactical" label (TODO: remove)
- Task types grid: Component Build, Schema Design, Bug Fix, Code Review, API Endpoint, Migration Script, Test Suite, Documentation
- Form: `ArtifactForm` island (with added church types)

**routes/services/briefing.tsx** — Project Reform
- Still has "Level III: Strategic" label (TODO: remove)
- DDD, CQRS, Edge delivery badges
- Form: `BriefingForm` island (with added church scopes)

### 6.9 Contract System
Complete e-signature system with:
- **5 contract types:** MSA, NDA, Diagnostic, SOW, Artifact Task Order
- **Signing flow:** `/contracts` (listing) → `/contracts/[type]` (view) → `/contracts/sign/[type]?client=...&email=...` (sign)
- **Variable interpolation:** `{{clientName}}`, `{{clientEmail}}`, etc. are replaced in contract HTML
- **ESIGN Act compliance:** Typed name as signature, IP/timestamp/user-agent captured, both parties receive copy via email
- **Contract templates in:** `utils/contracts.ts`
- **Signing API:** `routes/api/sign.tsx`

### 6.10 Forms & API

All forms POST to `/api/intake` with JSON body:
- **Type field:** `diagnostic`, `briefing`, `artifact`, `general`
- **Required fields:** `name`, `email`
- **Honeypot:** `website` field (hidden, if filled = bot)
- **Rate limit:** 3 requests per IP per hour
- **Email:** Notification to owner + confirmation to submitter

All island forms use `@preact/signals` for state:
```tsx
const name = useSignal("");
const status = useSignal<"idle" | "sending" | "success" | "error">("idle");
```

### 6.11 Styles — assets/styles.css
```css
@import "tailwindcss";

/* Scrollytelling animations */
@keyframes pulse-ghost { /* ghost idea pulse */ }
@keyframes dash { to { stroke-dashoffset: -20; } }
.ghost-idea-animate { animation: pulse-ghost 2s infinite; }
.animate-dash { animation: dash 2s linear infinite; }
.animate-dash-reverse { animation: dash 2s linear infinite reverse; }
```

---

## 7. Design System & Conventions

### Color Palette
| Purpose | Color | Tailwind Class |
|---|---|---|
| Background | Near-black | `bg-slate-950` |
| Card backgrounds | Dark slate | `bg-slate-900/50`, `bg-slate-950` |
| Primary text | Light gray | `text-slate-100` |
| Secondary text | Medium gray | `text-slate-400` |
| Muted text | Dark gray | `text-slate-500` |
| Church accent | Indigo | `text-indigo-400`, `bg-indigo-600` |
| Commercial accent | Emerald | `text-emerald-400`, `bg-emerald-600` |
| Borders | Very dark | `border-slate-800`, `border-slate-800/50` |
| Selection | Indigo tint | `selection:bg-indigo-500/30` |

### Typography
- **Headings:** `font-light` (thin weight), `tracking-tight`
- **Mono elements:** `font-mono` for labels, stats, nav links
- **Body text:** `text-slate-400 leading-relaxed`
- **Section labels:** `font-mono text-sm tracking-widest uppercase` in accent color

### Card Pattern
```tsx
<div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-{accent}-500/20 transition-colors">
  <h3 class="text-lg font-medium text-slate-100 mb-2">{title}</h3>
  <p class="text-slate-400 text-sm leading-relaxed">{description}</p>
</div>
```

### Button Pattern
```tsx
// Primary (church/indigo)
<a class="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-indigo-500/25">

// Primary (commercial/emerald)
<a class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all text-sm shadow-lg shadow-emerald-500/25">

// Secondary
<a class="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 rounded-lg font-medium transition-all text-sm">
```

### Form Input Pattern
```tsx
<input class="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
```

### Section Spacing
- Sections: `py-20 px-6`
- Section borders: `border-t border-slate-800/50`
- Max widths: `max-w-3xl` (content), `max-w-5xl` (grids), `max-w-6xl` (nav)

---

## 8. Phase 1 — Completed Work

### ✅ Rewrote homepage as gateway page
- Old: 614-line scrollytelling about DDD/CQRS/Hexagonal Architecture
- New: Clean gateway routing visitors to `/churches` or `/commercial`

### ✅ Created church landing page (`/churches`)
- Outcome-focused messaging, ministry-aware language
- Pain points, services, process, why-me sections

### ✅ Created commercial landing page (`/commercial`)
- Condensed scrollytelling (5 phases, simplified language)
- Expertise cards highlighting Umbraco CMS prominently

### ✅ Created About page (`/about`)
- Full career history, technical expertise, education, faith statement

### ✅ Removed $350 price display
- Removed from diagnostic page and form button
- Renamed "The Diagnostic" to "Architecture Review"

### ✅ Updated navigation
- Added logo + brand name
- Expanded links: Churches, Commercial, Portfolio, About, Contact

### ✅ Added SEO meta tags
- Open Graph tags, Twitter Cards, canonical URL in `_app.tsx`
- Per-page `<title>` and `<meta name="description">` on all new pages

### ✅ Updated portfolio
- Added 3 real projects from resume (IME, Scientific Games, RockRMS)
- Expanded Project interface with case study fields
- Changed "Case Studies" label to "Portfolio"
- Added Challenge/Approach/Results display sections

### ✅ Updated forms
- ArtifactForm: Added church task types (ChMS Config, Church Website, Data Migration, Workflow Automation)
- BriefingForm: Added church scope options (RockRMS, ChMS Migration, Church Website, Ministry Tech Assessment, Umbraco CMS Consulting)

---

## 9. Remaining Roadmap (Phases 2–5)

### Phase 2: Church Track Completion (Weeks 3–6)

#### New Pages to Create
- [ ] `routes/churches/services.tsx` — Detailed church services page
- [ ] `routes/commercial/services.tsx` — Detailed commercial services page
- [ ] `routes/blog/index.tsx` — Blog listing page
- [ ] `routes/blog/[slug].tsx` — Blog post detail page
- [ ] `utils/posts.ts` — Blog post data structure and content

#### New Components to Extract
- [ ] `components/Header.tsx` — Extract nav from `_app.tsx` for reuse and expansion
- [ ] `components/Footer.tsx` — Full footer with logo, nav links, social links, copyright
- [ ] `components/TestimonialCard.tsx` — Reusable testimonial display component
- [ ] `components/ServiceCard.tsx` — Shared service card component (extract from churches/commercial)
- [ ] `components/CTABanner.tsx` — Reusable "Ready to get started?" block
- [ ] `components/BlogPostCard.tsx` — Blog listing card component

#### Contract Templates
- [ ] Add Ministry Technology Assessment contract to `utils/contracts.ts`
- [ ] Add Monthly Technology Partnership / Retainer contract to `utils/contracts.ts`
- [ ] Replace hardcoded "$350" in diagnostic contract with `{{rate}}` variable

#### SEO & Analytics
- [ ] Add JSON-LD structured data (ProfessionalService, LocalBusiness) to `_app.tsx`
- [ ] Set up Plausible Analytics or Fathom (privacy-respecting analytics)
- [ ] Add analytics tracking to form submissions in `routes/api/intake.tsx`
- [ ] Create `static/og-image.png` for social sharing

#### Directory Profiles
- [ ] Create profile on Churchlancer (churchlancer.com)
- [ ] Create profile on Church Freelance
- [ ] Join RockRMS community Slack/Discord

#### First Blog Posts (Church-Focused)
1. "5 Signs Your Church Has Outgrown Its Spreadsheets"
2. "RockRMS vs. Planning Center vs. Breeze: How to Choose"
3. "What to Expect When Migrating Your Church Management System"

### Phase 3: Social Proof Sprint (Weeks 6–12)

- [ ] Identify one local church for discounted engagement (case study + testimonial exchange)
- [ ] Build church demo project ("SanctuaryConnect" — member portal, small group finder, event registration, volunteer sign-up, giving link)
- [ ] Add `TestimonialCard` component to site
- [ ] Collect 2-3 professional references
- [ ] Publish 4 more blog posts
- [ ] Begin LinkedIn content sharing (1-2 posts/week)

### Phase 4: Revenue Ramp (Weeks 12–18)

- [ ] Launch church demo as live portfolio piece
- [ ] Complete pro-bono engagement, publish case study with testimonial
- [ ] Attend at least one church tech conference/meetup
- [ ] Target first paid church retainer ($500-1,000/mo)
- [ ] Target first commercial retainer ($2,500/mo)
- [ ] Add downloadable resources (church tech assessment worksheet, RockRMS getting started guide)

### Phase 5: Scale (Weeks 18–26)

- [ ] Review analytics, optimize high-bounce pages
- [ ] Raise commercial rates 10-20% for new clients
- [ ] Build 2-3 more case studies
- [ ] Explore YouTube content (RockRMS tutorials)
- [ ] Set 12-month revenue target based on pipeline data

### Items Still Needing Cleanup
- [ ] Remove "Level I: Tactical" label from `routes/services/artifacts.tsx` line 20
- [ ] Remove "Level III: Strategic" label from `routes/services/briefing.tsx` line 20
- [ ] Fix the Footer — currently only on homepage `routes/index.tsx`, should be in `_app.tsx` or a shared component
- [ ] Add mobile hamburger menu to nav (currently `hidden sm:inline` hides Church/Commercial/About on mobile)
- [ ] Add `og:image` meta tag when `static/og-image.png` is created
- [ ] Update contract diagnostic summary from "$350/session" to remove price reference (line 143 in `utils/contracts.ts`)

---

## 10. Pricing Strategy

### DO NOT display hourly rates on the site.
Show project price ranges and "Contact for pricing" for most services. Discuss rates in discovery calls.

### Rate Schedule (Accelerated — Patrick's experience justifies faster ramp)

| Timeline | Commercial | Church | Review/Advisory |
|---|---|---|---|
| **Months 1-6** | $150/hr | $110/hr | $200/hr |
| **Months 7-12** | $175/hr | $125/hr | $250/hr |
| **Year 2** | $200-250/hr | $150/hr | $300/hr |
| **Year 3+** | $250-350/hr | $175/hr | $350/hr |

### Church Service Pricing (Fixed-Price Preferred)
| Service | Price Range |
|---|---|
| Free Ministry Tech Conversation | FREE (30 min) |
| Ministry Technology Assessment | $500-1,500 fixed (by church size) |
| RockRMS Consulting & Implementation | $100-125/hr |
| Church Website Design & Development | $3,000-15,000 fixed |
| Monthly Technology Partnership | $500-2,000/mo |

### Commercial Service Pricing
| Service | Price Range |
|---|---|
| Discovery Call | FREE (30 min) |
| Architecture Review | $200/hr (2-4 hr engagement + written summary) |
| Project Work | $150/hr (milestone-based, per SOW) |
| Umbraco CMS Consulting | $150-175/hr |
| Retainer / Fractional CTO | $3,000/mo (20 hrs) |

### Path to $170K/Year (at 6-month rates)

| Revenue Stream | Hrs/Mo | Rate | Monthly |
|---|---|---|---|
| Commercial retainer | 20 | $175/hr | $3,500 |
| Commercial projects | 25 | $175/hr | $4,375 |
| Church retainers (2) | 15 | $110/hr | $1,650 |
| Church projects | 25 | $110/hr | $2,750 |
| Architecture reviews | 6 | $200/hr | $1,200 |
| **Total** | **91** | **$148 avg** | **$13,475** |
| **Annualized** | | | **$161,700** |

---

## 11. SEO & Marketing Strategy

### Target Keywords

**Church-focused (priority):**
- "rockrms consultant"
- "rockrms developer"
- "church management system migration"
- "church website developer"
- "church technology consultant"
- "chms migration planning center to rockrms"

**Commercial-focused:**
- "umbraco consultant"
- "umbraco migration developer"
- ".net architecture consultant"
- "legacy .net migration"
- "strangler fig pattern consultant"
- "fractional cto .net"

### Blog Content Calendar (2 posts/month)

**Church-focused:**
1. "5 Signs Your Church Has Outgrown Its Spreadsheets"
2. "RockRMS vs. Planning Center vs. Breeze: How to Choose"
3. "What to Expect When Migrating Your Church Management System"
4. "How to Present a Technology Budget to Your Church Board"
5. "10 RockRMS Workflows Every Church Should Set Up"

**Commercial-focused:**
6. "The Strangler Fig Pattern: Migrating Legacy .NET Without Downtime"
7. "Umbraco CMS: When Enterprise .NET Meets Content Management"
8. "Domain-Driven Design in Practice: Lessons from 5 Years of Microservices"
9. "Why Your Startup Needs a Fractional CTO (And What They Actually Do)"
10. "From 60 Seconds to 5: How We Cut Page Load Times by 75%"

### Directories & Communities
- Churchlancer, Church Freelance
- RockRMS Community Slack/Discord
- Our Umbraco forums
- LinkedIn (primary professional channel)
- Church tech Facebook groups: "Church IT Network", "RockRMS Users"

---

## 12. Key Differentiators

### Differentiator #1: Umbraco CMS Expertise (Commercial)
Patrick has 5+ years as the sole SME on a heavily customized, revenue-driving Umbraco instance at IME, plus a full Umbraco 8 migration at Scientific Games. Experienced Umbraco developers are scarce and command premium rates. The site now mentions Umbraco prominently on the commercial page but should be expanded with dedicated blog content and Umbraco community engagement.

### Differentiator #2: RockRMS + .NET + Ministry Triple-Play (Church)
Almost no one in the church tech space combines:
1. Professional RockRMS development experience (BEMA)
2. Senior-level .NET architecture skills (DDD, CQRS, microservices)
3. Actual ministry experience (John Hagee Ministries, iDisciple)

This triple combination is the core church-track differentiator and is highlighted on the church landing page.

### Differentiator #3: Measurable Business Outcomes
Unlike most freelancers, Patrick can point to specific, quantified results:
- 4.5x revenue growth
- 90% incident reduction
- 75% page load improvement (60s → 5s)
- 20+ developers mentored (including a CTO)
- 200+ production releases, zero critical incidents

---

## 13. Known Issues & Tech Debt

| Issue | Location | Priority |
|---|---|---|
| "Level I: Tactical" label still showing | `routes/services/artifacts.tsx:20` | Medium |
| "Level III: Strategic" label still showing | `routes/services/briefing.tsx:20` | Medium |
| "$350/session" in diagnostic contract summary | `utils/contracts.ts:143` | Medium |
| "$350" hardcoded in diagnostic contract section | `utils/contracts.ts:157` | Medium |
| "$350" in diagnostic payment section | `utils/contracts.ts:177` | Medium |
| No mobile hamburger menu | `routes/_app.tsx` nav | High |
| Footer only on homepage | `routes/index.tsx` (bottom) | High |
| No favicon meta in head | `routes/_app.tsx` | Low |
| No `og:image` tag | `routes/_app.tsx` | Medium |
| No JSON-LD structured data | `routes/_app.tsx` | Medium |
| No analytics | Global | High |
| No sitemap.xml | `static/` | Medium |
| No robots.txt | `static/` | Low |
| ScrollytellingViz shows "STEP 6: Microservices" but commercial page only has steps 0-5 | `islands/ScrollytellingViz.tsx` | Low |

---

## 14. Framework Reference (Deno Fresh 2)

### File-Based Routing
- `routes/` directory maps to URL paths
- `routes/index.tsx` → `/`
- `routes/about.tsx` → `/about`
- `routes/churches/index.tsx` → `/churches`
- `routes/portfolio/[slug].tsx` → `/portfolio/:slug` (dynamic)
- `routes/_app.tsx` → Root layout wrapping all pages
- `routes/api/*.tsx` → API endpoints (no UI)

### Page Definition Pattern
```tsx
import { define } from "../utils.ts";
import { Head } from "fresh/runtime";

export default define.page(function MyPage(props) {
  // props.params = URL params
  // props.url = full URL
  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      <section>...</section>
    </>
  );
});
```

### API Handler Pattern
```tsx
import { define } from "../utils.ts";

export const handler = define.handlers({
  async GET(ctx) { return new Response("hello"); },
  async POST(ctx) {
    const body = await ctx.req.json();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  },
});
```

### Island Pattern (Client-Side Interactive Component)
```tsx
// islands/MyIsland.tsx — This file ships JavaScript to the client
import { useSignal } from "@preact/signals";

export default function MyIsland() {
  const count = useSignal(0);
  return <button onClick={() => count.value++}>{count.value}</button>;
}
```

Islands are imported into route files and automatically hydrated:
```tsx
// routes/some-page.tsx
import MyIsland from "../islands/MyIsland.tsx";

export default define.page(function SomePage() {
  return <MyIsland />;
});
```

### Preact Signals (State Management)
```tsx
import { useSignal } from "@preact/signals";

const name = useSignal("");           // Local reactive state
const status = useSignal<"idle" | "sending">("idle");  // Typed state
// Read: name.value
// Write: name.value = "new value"
// In JSX: {name.value} (auto-subscribes)
```

### Commands
```bash
deno task dev      # Start dev server (Vite)
deno task build    # Production build
deno task start    # Serve production build
deno task check    # Format + lint + type check
```

---

## 15. Deployment & Email Configuration

### Hosting: Deno Deploy + Cloudflare CDN Proxy (Recommended)

Deno Fresh 2 runs natively on **Deno Deploy** with zero configuration. For Cloudflare benefits (CDN, DDoS protection, edge caching), proxy traffic through Cloudflare DNS while keeping Deno Deploy as the origin:

1. **Deno Deploy** — Link the GitHub repo at [dash.deno.com](https://dash.deno.com). Set the entry point to `main.ts`. Automatic deployments on push.
2. **Cloudflare DNS** — Add the `reformlogic.com` domain. Set the A/CNAME record to point at `*.deno.dev` with the orange proxy cloud enabled.
3. **Environment Variables** — Set secrets in the Deno Deploy dashboard (Settings → Environment Variables):
   - `RESEND_API_KEY` — from [resend.com/api-keys](https://resend.com/api-keys)
   - `NOTIFICATION_EMAIL` — Patrick's email for form notifications
   - `FROM_ADDRESS` — verified sender, e.g. `ReformLogic <noreply@reformlogic.com>`

> **Why not full Cloudflare Workers?** Deno Fresh 2 has no official Cloudflare Workers adapter. Running on Workers would require refactoring env access, handling the Deno→Workers runtime gap, and maintaining a custom adapter. Deno Deploy is the native, zero-friction choice.

### Email System (Resend HTTP API — NOT SMTP)

The email system uses **Resend's REST API** via `fetch()`. This is NOT SMTP. It works on any runtime that supports `fetch` (Deno Deploy, Cloudflare Workers, Node.js, etc.).

#### Architecture

```
Form Submit → /api/intake (POST)
                ├── sendNotification() → fetch("https://api.resend.com/emails") → Patrick's inbox
                └── sendConfirmation() → fetch("https://api.resend.com/emails") → Client's inbox

Contract Sign → /api/sign (POST)
                └── sendSignedContract() → fetch("https://api.resend.com/emails") → Both parties
```

#### Key Files

| File | Purpose |
|---|---|
| `utils/email.ts` | Core email utility — lazy env loading, structured `EmailResult`, dev-mode logging |
| `utils/contractEmail.ts` | Signed contract email templates with ESIGN Act metadata |
| `routes/api/intake.tsx` | Form submission handler — validates, rate-limits, emails both parties |
| `routes/api/sign.tsx` | Contract signature handler — captures IP/UA/timestamp, emails both parties |
| `routes/api/health.tsx` | Deployment health check — `GET /api/health` or `GET /api/health?email=1` |
| `utils/rateLimit.ts` | In-memory rate limiter (3 req/IP/hour) — resets on deploy restart |

#### Environment Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Yes (prod) | — | Omit for dev mode (emails logged to console) |
| `NOTIFICATION_EMAIL` | No | `hello@reformlogic.com` | Where form/contract notifications go |
| `FROM_ADDRESS` | No | `ReformLogic <noreply@reformlogic.com>` | Must match a verified Resend domain |

#### Email Production Checklist

- [ ] **Verify `reformlogic.com` domain with Resend** — Add MX, SPF, and DKIM DNS records at [resend.com/domains](https://resend.com/domains). Without this, emails are sent from `onboarding@resend.dev` (Resend sandbox) and limited to the account owner's email only.
- [ ] **Set `RESEND_API_KEY`** as environment secret in Deno Deploy dashboard
- [ ] **Set `NOTIFICATION_EMAIL`** to Patrick's actual email address
- [ ] **Update `FROM_ADDRESS`** to use the verified domain (e.g., `noreply@reformlogic.com`)
- [ ] **Test with health check** — `GET /api/health?email=1` sends a test email to Resend's test inbox (`delivered@resend.dev`)
- [ ] **Test full flow** — Submit each form type (diagnostic, briefing, artifact, general) and verify both notification + confirmation emails arrive
- [ ] **Test contract signing** — Sign a test contract and verify both parties receive the signed record email

#### Dev Mode

When `RESEND_API_KEY` is not set, all emails are logged to the server console with `[EMAIL-DEV]` prefix instead of actually being sent. This is the default for local development.

#### Structured Logging

All email operations produce structured console logs:
- `[EMAIL-DEV]` — Dev mode, email logged to console
- `[EMAIL-OK]` — Email sent successfully via Resend, includes Resend email ID
- `[EMAIL-FAIL]` — Resend returned an error (invalid API key, domain not verified, etc.)
- `[EMAIL-ERROR]` — Network error reaching Resend (DNS failure, timeout, etc.)
- `[INTAKE]` — Form submission email delivery status
- `[CONTRACT-EMAIL]` — Contract signing email delivery status

#### Rate Limiting

- In-memory store: 3 requests per IP per hour
- Resets on deploy/restart (acceptable for low-traffic freelance site)
- Uses `x-forwarded-for` header (set by Cloudflare/Deno Deploy proxy)

---

## End of Document

This document should be provided in full to any LLM continuing work on the ReformLogic project. All file contents, business context, and strategic decisions are captured here. The next phase of work is Phase 2 (Church Track Completion) as detailed in Section 9.
