import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en" class="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          ReformLogic — Software Architecture & Church Technology Consulting
        </title>
        <meta
          name="description"
          content="Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS consulting, Umbraco CMS, and enterprise system design."
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="ReformLogic — Technology That Serves Your Mission"
        />
        <meta
          property="og:description"
          content="Software architecture consulting and church technology services. 12+ years of .NET expertise, RockRMS, and enterprise system design."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reformlogic.dev" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ReformLogic — Technology That Serves Your Mission"
        />
        <meta
          name="twitter:description"
          content="Software architecture consulting and church technology services. 12+ years of .NET expertise."
        />
        {/* Canonical */}
        <link rel="canonical" href="https://reformlogic.dev" />
      </head>
      <body class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-indigo-500/30">
        {/* Navigation */}
        <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
          <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="flex items-center space-x-3 group">
              <img src="/logo.svg" alt="" class="h-6 w-6" />
              <span class="text-slate-200 font-mono text-sm tracking-wide group-hover:text-indigo-400 transition-colors">
                ReformLogic
              </span>
            </a>
            <div class="flex items-center space-x-6 text-sm font-mono">
              <a
                href="/churches"
                class="text-slate-500 hover:text-indigo-400 transition-colors tracking-wide uppercase hidden sm:inline"
              >
                Churches
              </a>
              <a
                href="/commercial"
                class="text-slate-500 hover:text-emerald-400 transition-colors tracking-wide uppercase hidden sm:inline"
              >
                Commercial
              </a>
              <a
                href="/portfolio"
                class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase"
              >
                Portfolio
              </a>
              <a
                href="/about"
                class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase hidden sm:inline"
              >
                About
              </a>
              <a
                href="/contact"
                class="text-slate-500 hover:text-slate-300 transition-colors tracking-wide uppercase"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
        <Component />
      </body>
    </html>
  );
});
