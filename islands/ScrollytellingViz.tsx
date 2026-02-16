import { useEffect, useRef, useState } from "preact/hooks";

/**
 * ScrollytellingViz — Hydrated island that renders the sticky SVG
 * visualisation on the right column and reacts to IntersectionObserver
 * events fired by step sections in the DOM.
 */
export default function ScrollytellingViz() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-step-index]");
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(idx)) setStep(idx);
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 },
    );

    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      class="relative w-[500px] h-[500px] flex items-center justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        class="w-full h-full overflow-visible absolute inset-0"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
          </radialGradient>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
          <marker
            id="arrow-emerald"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>

        {/* STEP 0: The Ghost Idea */}
        <g
          class={`transform origin-center transition-all duration-500 ${
            step === 0 ? "opacity-50 ghost-idea-animate" : "opacity-0"
          }`}
          style={{ strokeDasharray: step === 0 ? "4 4" : undefined }}
        >
          <circle
            cx="250"
            cy="250"
            r="60"
            fill="none"
            stroke="#94a3b8"
            stroke-width="2"
          />
          <text
            x="250"
            y="255"
            text-anchor="middle"
            fill="#94a3b8"
            font-family="monospace"
            font-size="14"
          >
            Idea
          </text>
        </g>

        {/* STEP 1: The Core Domain */}
        <g
          class={`transform origin-center transition-all duration-700 ${
            step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-[0.8]"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.175,0.885,0.32,1.275)",
          }}
        >
          <circle cx="250" cy="250" r="100" fill="url(#core-glow)" />
          <circle
            cx="250"
            cy="250"
            r="80"
            fill="#1e1b4b"
            stroke="#6366f1"
            stroke-width="2"
          />
          <text
            x="250"
            y="245"
            text-anchor="middle"
            fill="#c7d2fe"
            font-family="sans-serif"
            font-weight="600"
            font-size="16"
          >
            Domain Model
          </text>
          <text
            x="250"
            y="265"
            text-anchor="middle"
            fill="#818cf8"
            font-family="monospace"
            font-size="12"
          >
            Aggregate Root
          </text>
        </g>

        {/* STEP 2: The Hexagon (Ports & Adapters) */}
        <g
          class={`transition-all duration-1000 ${
            step === 2 ? "opacity-100" : step > 2 ? "opacity-30" : "opacity-0"
          }`}
          style={{
            strokeDashoffset: step >= 2 ? 0 : 1000,
            transition: "stroke-dashoffset 1.5s ease-out, opacity 0.5s",
          }}
        >
          <polygon
            points="250,50 423,150 423,350 250,450 77,350 77,150"
            fill="none"
            stroke="#64748b"
            stroke-width="3"
            stroke-linejoin="round"
          />
          <circle
            cx="250"
            cy="50"
            r="8"
            fill="#0f172a"
            stroke="#64748b"
            stroke-width="2"
          />
          <text
            x="250"
            y="30"
            text-anchor="middle"
            fill="#94a3b8"
            font-family="monospace"
            font-size="12"
          >
            UI Adapter
          </text>
          <circle
            cx="250"
            cy="450"
            r="8"
            fill="#0f172a"
            stroke="#64748b"
            stroke-width="2"
          />
          <text
            x="250"
            y="475"
            text-anchor="middle"
            fill="#94a3b8"
            font-family="monospace"
            font-size="12"
          >
            DB Adapter
          </text>
          <line
            x1="250"
            y1="58"
            x2="250"
            y2="160"
            stroke="#475569"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
          <line
            x1="250"
            y1="340"
            x2="250"
            y2="442"
            stroke="#475569"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
        </g>

        {/* STEP 3: CQRS Flow */}
        <g
          class={`transition-opacity duration-500 ${
            step >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          <path
            d="M 50 150 C 150 150, 150 230, 170 230"
            fill="none"
            stroke="#ef4444"
            stroke-width="4"
            marker-end="url(#arrow-red)"
            class="animate-dash"
            stroke-dasharray="10 10"
          />
          <text
            x="70"
            y="140"
            fill="#f87171"
            font-family="monospace"
            font-size="12"
          >
            Command (Write)
          </text>
          <rect x="180" y="215" width="20" height="30" fill="#7f1d1d" rx="2" />
          <path
            d="M 450 350 C 350 350, 350 270, 330 270"
            fill="none"
            stroke="#10b981"
            stroke-width="4"
            marker-end="url(#arrow-emerald)"
            class="animate-dash-reverse"
            stroke-dasharray="10 10"
          />
          <text
            x="370"
            y="370"
            fill="#34d399"
            font-family="monospace"
            font-size="12"
          >
            Query (Read)
          </text>
          <circle cx="310" cy="270" r="15" fill="#064e3b" />
        </g>

        {/* STEP 4: Frontend UI (Deno) */}
        <g
          class={`transition-all duration-500 ${
            step === 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
        >
          <rect
            x="350"
            y="30"
            width="120"
            height="80"
            rx="6"
            fill="#0f172a"
            stroke="#06b6d4"
            stroke-width="2"
          />
          <circle cx="360" cy="42" r="3" fill="#ef4444" />
          <circle cx="370" cy="42" r="3" fill="#eab308" />
          <circle cx="380" cy="42" r="3" fill="#22c55e" />
          <line
            x1="350"
            y1="52"
            x2="470"
            y2="52"
            stroke="#06b6d4"
            stroke-width="1"
          />
          <text
            x="410"
            y="70"
            text-anchor="middle"
            fill="#a5f3fc"
            font-family="sans-serif"
            font-weight="600"
            font-size="12"
          >
            Deno Fresh
          </text>
          <path
            d="M 410 110 L 410 320"
            fill="none"
            stroke="#06b6d4"
            stroke-width="2"
            stroke-dasharray="4 4"
            marker-end="url(#arrow-emerald)"
          />
          <text
            x="415"
            y="200"
            fill="#67e8f9"
            font-family="monospace"
            font-size="10"
            transform="rotate(90, 415, 200)"
          >
            Fetch Render
          </text>
        </g>

        {/* STEP 5: The Monolith */}
        <g
          class={`transform origin-center transition-all duration-700 ${
            step === 5 ? "opacity-100 scale-100" : "opacity-0 scale-[0.9]"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.175,0.885,0.32,1.275)",
            transitionDelay: step === 5 ? "0.3s" : "0s",
          }}
        >
          <rect
            x="100"
            y="100"
            width="300"
            height="300"
            rx="16"
            fill="#1e293b"
            stroke="#f43f5e"
            stroke-width="4"
          />
          <text
            x="250"
            y="140"
            text-anchor="middle"
            fill="#f43f5e"
            font-family="sans-serif"
            font-weight="bold"
            font-size="20"
          >
            THE MONOLITH
          </text>
          <rect
            x="140"
            y="170"
            width="220"
            height="60"
            rx="4"
            fill="#0f172a"
            stroke="#64748b"
            stroke-width="1"
          />
          <text
            x="250"
            y="205"
            text-anchor="middle"
            fill="#94a3b8"
            font-family="monospace"
            font-size="14"
          >
            UI &amp; API Layer
          </text>
          <rect
            x="140"
            y="240"
            width="220"
            height="60"
            rx="4"
            fill="#0f172a"
            stroke="#6366f1"
            stroke-width="1"
          />
          <text
            x="250"
            y="275"
            text-anchor="middle"
            fill="#c7d2fe"
            font-family="monospace"
            font-size="14"
          >
            Business Logic
          </text>
          <rect
            x="140"
            y="310"
            width="220"
            height="60"
            rx="4"
            fill="#0f172a"
            stroke="#10b981"
            stroke-width="1"
          />
          <text
            x="250"
            y="345"
            text-anchor="middle"
            fill="#6ee7b7"
            font-family="monospace"
            font-size="14"
          >
            Shared Database
          </text>
          <line
            x1="250"
            y1="230"
            x2="250"
            y2="240"
            stroke="#475569"
            stroke-width="4"
          />
          <line
            x1="250"
            y1="300"
            x2="250"
            y2="310"
            stroke="#475569"
            stroke-width="4"
          />
        </g>

        {/* STEP 6: Microservices */}
        <g
          class={`transition-opacity duration-700 ${
            step === 6 ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: step === 6 ? "0.5s" : "0s" }}
        >
          {/* Event Bus */}
          <rect
            x="50"
            y="235"
            width="400"
            height="30"
            rx="15"
            fill="#4a044e"
            stroke="#d946ef"
            stroke-width="2"
          />
          <text
            x="250"
            y="255"
            text-anchor="middle"
            fill="#f0abfc"
            font-family="monospace"
            font-size="14"
            font-weight="bold"
            dominant-baseline="middle"
          >
            Event Bus (RabbitMQ)
          </text>
          <line
            x1="70"
            y1="250"
            x2="430"
            y2="250"
            stroke="#f0abfc"
            stroke-width="2"
            stroke-dasharray="10 15"
            class="animate-dash"
            opacity="0.3"
          />

          {/* Service 1: Ledger */}
          <g transform="translate(60, 60)">
            <rect
              x="0"
              y="0"
              width="160"
              height="110"
              rx="8"
              fill="#0f172a"
              stroke="#3b82f6"
              stroke-width="2"
            />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#1e3a8a" />
            <text
              x="80"
              y="23"
              text-anchor="middle"
              fill="#eff6ff"
              font-family="sans-serif"
              font-weight="bold"
              font-size="14"
            >
              Ledger Service
            </text>
            <path
              d="M 60 60 Q 80 50 100 60 L 100 80 Q 80 90 60 80 Z"
              fill="#1e1b4b"
              stroke="#60a5fa"
              stroke-width="1.5"
            />
            <text
              x="80"
              y="100"
              text-anchor="middle"
              fill="#93c5fd"
              font-family="monospace"
              font-size="11"
            >
              Local DB
            </text>
            <line
              x1="80"
              y1="110"
              x2="80"
              y2="175"
              stroke="#3b82f6"
              stroke-width="3"
              stroke-dasharray="6 4"
              class="animate-dash-reverse"
            />
          </g>

          {/* Service 2: Identity */}
          <g transform="translate(280, 60)">
            <rect
              x="0"
              y="0"
              width="160"
              height="110"
              rx="8"
              fill="#0f172a"
              stroke="#eab308"
              stroke-width="2"
            />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#713f12" />
            <text
              x="80"
              y="23"
              text-anchor="middle"
              fill="#fefce8"
              font-family="sans-serif"
              font-weight="bold"
              font-size="14"
            >
              Identity Service
            </text>
            <path
              d="M 60 60 Q 80 50 100 60 L 100 80 Q 80 90 60 80 Z"
              fill="#422006"
              stroke="#facc15"
              stroke-width="1.5"
            />
            <text
              x="80"
              y="100"
              text-anchor="middle"
              fill="#fde047"
              font-family="monospace"
              font-size="11"
            >
              Local DB
            </text>
            <line
              x1="80"
              y1="110"
              x2="80"
              y2="175"
              stroke="#eab308"
              stroke-width="3"
              stroke-dasharray="6 4"
              class="animate-dash"
            />
          </g>

          {/* Service 3: Edge Gateway */}
          <g transform="translate(170, 320)">
            <rect
              x="0"
              y="0"
              width="160"
              height="110"
              rx="8"
              fill="#0f172a"
              stroke="#06b6d4"
              stroke-width="2"
            />
            <rect x="0" y="0" width="160" height="35" rx="8" fill="#164e63" />
            <text
              x="80"
              y="23"
              text-anchor="middle"
              fill="#ecfeff"
              font-family="sans-serif"
              font-weight="bold"
              font-size="14"
            >
              Edge Gateway
            </text>
            <circle
              cx="80"
              cy="65"
              r="18"
              fill="#0f172a"
              stroke="#22d3ee"
              stroke-width="1.5"
            />
            <text
              x="80"
              y="69"
              text-anchor="middle"
              fill="#67e8f9"
              font-family="sans-serif"
              font-size="11"
              font-weight="bold"
            >
              Redis
            </text>
            <text
              x="80"
              y="100"
              text-anchor="middle"
              fill="#67e8f9"
              font-family="monospace"
              font-size="11"
            >
              Fast Cache
            </text>
            <line
              x1="80"
              y1="0"
              x2="80"
              y2="-55"
              stroke="#06b6d4"
              stroke-width="3"
              stroke-dasharray="6 4"
              class="animate-dash"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
