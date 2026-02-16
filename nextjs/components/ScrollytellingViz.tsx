"use client";

import { useEffect, useState } from "react";

export default function ScrollytellingViz() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-step-index]");
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!Number.isNaN(index)) setStep(index);
          }
        }
      },
      { threshold: 0.5 },
    );

    steps.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex h-[500px] w-[500px] items-center justify-center">
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className={`origin-center transition-all duration-500 ${step === 0 ? "ghost-idea-animate opacity-50" : "opacity-0"}`}>
          <circle cx="250" cy="250" r="60" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <text x="250" y="255" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="14">Idea</text>
        </g>

        <g className={`origin-center transition-all duration-700 ${step >= 1 ? "scale-100 opacity-100" : "scale-[0.8] opacity-0"}`}>
          <circle cx="250" cy="250" r="100" fill="url(#core-glow)" />
          <circle cx="250" cy="250" r="80" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
          <text x="250" y="245" textAnchor="middle" fill="#c7d2fe" fontWeight="600" fontSize="16">Domain Model</text>
          <text x="250" y="265" textAnchor="middle" fill="#818cf8" fontFamily="monospace" fontSize="12">Aggregate Root</text>
        </g>

        <g className={`transition-opacity duration-700 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          <polygon points="250,50 423,150 423,350 250,450 77,350 77,150" fill="none" stroke="#64748b" strokeWidth="3" />
          <text x="250" y="30" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="12">Ports & Adapters</text>
        </g>

        <g className={`transition-opacity duration-700 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
          <path d="M 50 150 C 150 150, 150 230, 170 230" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 10" className="animate-dash" />
          <path d="M 450 350 C 350 350, 350 270, 330 270" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10 10" className="animate-dash-reverse" />
          <text x="70" y="140" fill="#f87171" fontFamily="monospace" fontSize="12">Command (Write)</text>
          <text x="370" y="370" fill="#34d399" fontFamily="monospace" fontSize="12">Query (Read)</text>
        </g>

        <g className={`transition-opacity duration-700 ${step >= 4 ? "opacity-100" : "opacity-0"}`}>
          <rect x="350" y="30" width="120" height="80" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <text x="410" y="72" textAnchor="middle" fill="#a5f3fc" fontWeight="600" fontSize="12">Next.js</text>
        </g>

        <g className={`origin-center transition-all duration-700 ${step >= 5 ? "scale-100 opacity-100" : "scale-[0.9] opacity-0"}`}>
          <rect x="100" y="100" width="300" height="300" rx="16" fill="#1e293b" stroke="#f43f5e" strokeWidth="4" />
          <text x="250" y="140" textAnchor="middle" fill="#f43f5e" fontWeight="700" fontSize="20">THE MONOLITH</text>
        </g>
      </svg>
    </div>
  );
}
