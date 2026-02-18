"use client";

import { useEffect, useState } from "react";

export default function ScrollytellingViz() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-step-index]");
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!activeEntry) return;

        const index = Number(activeEntry.target.getAttribute("data-step-index"));
        if (!Number.isNaN(index)) {
          setStep((current) => (current === index ? current : index));
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-10% 0px -35% 0px",
      },
    );

    steps.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="viz-container" data-step={step} className="relative flex h-[500px] w-[500px] items-center justify-center">
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Architecture scrollytelling visualization">
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
          </marker>
        </defs>

        <g className="ghost-idea origin-center">
          <circle cx="250" cy="250" r="60" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <text x="250" y="255" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="14">Idea</text>
        </g>

        <g className="core-domain origin-center transition-all duration-700">
          <circle cx="250" cy="250" r="100" fill="url(#core-glow)" />
          <circle cx="250" cy="250" r="80" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
          <text x="250" y="245" textAnchor="middle" fill="#c7d2fe" fontWeight="600" fontSize="16">Domain Model</text>
          <text x="250" y="265" textAnchor="middle" fill="#818cf8" fontFamily="monospace" fontSize="12">Aggregate Root</text>
        </g>

        <g className="hexagon-shield">
          <polygon className="path-draw" points="250,50 423,150 423,350 250,450 77,350 77,150" fill="none" stroke="#64748b" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="250" cy="50" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
          <text x="250" y="30" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="12">UI Adapter</text>
          <circle cx="250" cy="450" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
          <text x="250" y="475" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="12">DB Adapter</text>
          <line x1="250" y1="58" x2="250" y2="160" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="250" y1="340" x2="250" y2="442" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        </g>

        <g className="cqrs-flow">
          <path d="M 50 150 C 150 150, 150 230, 170 230" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 10" className="animate-dash" markerEnd="url(#arrow-red)" />
          <path d="M 450 350 C 350 350, 350 270, 330 270" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="10 10" className="animate-dash-reverse" markerEnd="url(#arrow-emerald)" />
          <text x="70" y="140" fill="#f87171" fontFamily="monospace" fontSize="12">Command (Write)</text>
          <text x="370" y="370" fill="#a5b4fc" fontFamily="monospace" fontSize="12">Query (Read)</text>
          <rect x="180" y="215" width="20" height="30" fill="#7f1d1d" rx="2" />
          <circle cx="310" cy="270" r="15" fill="#1e3a8a" />
        </g>

        <g className="frontend-ui">
          <rect x="350" y="30" width="120" height="80" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="360" cy="42" r="3" fill="#ef4444" />
          <circle cx="370" cy="42" r="3" fill="#eab308" />
          <circle cx="380" cy="42" r="3" fill="#6366f1" />
          <line x1="350" y1="52" x2="470" y2="52" stroke="#06b6d4" strokeWidth="1" />
          <text x="410" y="72" textAnchor="middle" fill="#a5f3fc" fontWeight="600" fontSize="12">Next.js</text>
          <path d="M 410 110 L 410 320" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-emerald)" />
        </g>

        <g className="monolith origin-center">
          <rect x="100" y="100" width="300" height="300" rx="16" fill="#1e293b" stroke="#f43f5e" strokeWidth="4" />
          <text x="250" y="140" textAnchor="middle" fill="#f43f5e" fontWeight="700" fontSize="20">THE MONOLITH</text>

          <rect x="140" y="170" width="220" height="60" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
          <text x="250" y="205" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="14">UI &amp; API Layer</text>

          <rect x="140" y="240" width="220" height="60" rx="4" fill="#0f172a" stroke="#6366f1" strokeWidth="1" />
          <text x="250" y="275" textAnchor="middle" fill="#c7d2fe" fontFamily="monospace" fontSize="14">Business Logic</text>

          <rect x="140" y="310" width="220" height="60" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
          <text x="250" y="345" textAnchor="middle" fill="#93c5fd" fontFamily="monospace" fontSize="14">Shared Database</text>

          <line x1="250" y1="230" x2="250" y2="240" stroke="#475569" strokeWidth="4" />
          <line x1="250" y1="300" x2="250" y2="310" stroke="#475569" strokeWidth="4" />
        </g>

        <g className="microservices">
          <rect x="50" y="235" width="400" height="30" rx="15" fill="#4a044e" stroke="#d946ef" strokeWidth="2" />
          <text x="250" y="255" textAnchor="middle" fill="#f0abfc" fontFamily="monospace" fontSize="14" fontWeight="bold" dominantBaseline="middle">
            Event Bus
          </text>
          <line x1="70" y1="250" x2="430" y2="250" stroke="#f0abfc" strokeWidth="2" strokeDasharray="10 15" className="animate-dash" opacity="0.3" />

          <g transform="translate(60, 60)">
            <rect x="0" y="0" width="160" height="110" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#1e3a8a" />
            <text x="80" y="23" textAnchor="middle" fill="#eff6ff" fontWeight="bold" fontSize="14">Ledger Service</text>
          </g>
          <g transform="translate(280, 60)">
            <rect x="0" y="0" width="160" height="110" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#713f12" />
            <text x="80" y="23" textAnchor="middle" fill="#fefce8" fontWeight="bold" fontSize="14">Identity Service</text>
          </g>
          <g transform="translate(170, 320)">
            <rect x="0" y="0" width="160" height="110" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#164e63" />
            <text x="80" y="23" textAnchor="middle" fill="#ecfeff" fontWeight="bold" fontSize="14">Edge Gateway</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
