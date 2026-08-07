import Link from "next/link";
import { LINKS } from "@/lib/constants";

/* ── Inline SVG tech logos for the orbit ring ── */
function KubernetesLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="#60a5fa" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" fill="#60a5fa" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={a}
          x1={12 + 3.2 * Math.cos((a * Math.PI) / 180)}
          y1={12 + 3.2 * Math.sin((a * Math.PI) / 180)}
          x2={12 + 8 * Math.cos((a * Math.PI) / 180)}
          y2={12 + 8 * Math.sin((a * Math.PI) / 180)}
          stroke="#60a5fa"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="6" y="10" width="3.4" height="3.4" rx="0.5" fill="#38bdf8" />
      <rect x="10.3" y="10" width="3.4" height="3.4" rx="0.5" fill="#38bdf8" />
      <rect x="14.6" y="10" width="3.4" height="3.4" rx="0.5" fill="#38bdf8" />
      <rect x="10.3" y="5.7" width="3.4" height="3.4" rx="0.5" fill="#38bdf8" />
      <path d="M3 14.5h18.5l-2.2 5H5.2z" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function AiChipLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="none" stroke="#fb923c" strokeWidth="1.8" />
      <rect x="10.2" y="10.2" width="3.6" height="3.6" rx="0.6" fill="#fb923c" />
      {[8.5, 12, 15.5].map((p) => (
        <g key={p} stroke="#fb923c" strokeWidth="1.6" strokeLinecap="round">
          <line x1={p} y1="3.5" x2={p} y2="6" />
          <line x1={p} y1="18" x2={p} y2="20.5" />
          <line x1="3.5" y1={p} x2="6" y2={p} />
          <line x1="18" y1={p} x2="20.5" y2={p} />
        </g>
      ))}
    </svg>
  );
}

function CloudLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <path
        d="M7 17.5a3.8 3.8 0 01-.6-7.55A5.2 5.2 0 0116.3 11a3.3 3.3 0 01.7 6.5z"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TerminalLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="#34d399" strokeWidth="1.8" />
      <path d="M7 9.5l3 3-3 3" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="15.5" x2="17" y2="15.5" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <circle cx="6" cy="6" r="2.3" fill="none" stroke="#fbbf24" strokeWidth="1.7" />
      <circle cx="6" cy="18" r="2.3" fill="none" stroke="#fbbf24" strokeWidth="1.7" />
      <circle cx="17.5" cy="9" r="2.3" fill="none" stroke="#fbbf24" strokeWidth="1.7" />
      <path d="M6 8.3v7.4M6 12.5c5 0 7-0.6 9.2-1.3" fill="none" stroke="#fbbf24" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function RocketLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
      <path
        d="M12 2.5c3.2 2.2 4.4 6.2 4.4 9.2l3 4-4.2-1c-1 2-2 3-3.2 4-1.2-1-2.2-2-3.2-4l-4.2 1 3-4c0-3 1.2-7 4.4-9.2z"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.7" fill="#60a5fa" />
    </svg>
  );
}

function CompassLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
      <path d="M15.5 8.5l-2.2 5-4.8 2 2.2-5z" fill="#fbbf24" />
    </svg>
  );
}

/* ── Lost pod robot ── */
function PodRobot() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 sm:w-28 sm:h-28 nf-float drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
      aria-hidden
    >
      <line x1="60" y1="18" x2="60" y2="34" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="14" r="5" fill="#f97316" className="nf-twinkle" />
      <rect x="22" y="34" width="76" height="58" rx="12" fill="#0f172a" stroke="#f97316" strokeWidth="3" />
      <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round">
        <line x1="40" y1="52" x2="50" y2="62" />
        <line x1="50" y1="52" x2="40" y2="62" />
      </g>
      <circle cx="76" cy="57" r="6" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
      <path d="M46 80 Q60 72 74 80" stroke="#94a3b8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <line x1="22" y1="58" x2="10" y2="70" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <line x1="98" y1="58" x2="110" y2="70" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="92" x2="44" y2="106" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
      <line x1="76" y1="92" x2="76" y2="106" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ── Constellation background data ── */
const STARS = [
  { x: 60, y: 120 }, { x: 180, y: 80 }, { x: 320, y: 140 }, { x: 90, y: 320 },
  { x: 240, y: 260 }, { x: 380, y: 340 }, { x: 520, y: 120 }, { x: 640, y: 220 },
  { x: 760, y: 90 }, { x: 880, y: 180 }, { x: 1020, y: 120 }, { x: 1120, y: 260 },
  { x: 980, y: 360 }, { x: 700, y: 380 }, { x: 460, y: 60 }, { x: 150, y: 460 },
  { x: 340, y: 520 }, { x: 560, y: 480 }, { x: 760, y: 520 }, { x: 940, y: 500 },
  { x: 1120, y: 60 }, { x: 460, y: 420 },
];

const STAR_LINES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [6, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 6], [15, 16], [16, 17],
  [17, 18], [18, 19], [19, 20], [4, 7], [13, 21], [14, 6], [2, 14],
];

const ORBIT_LOGOS = [KubernetesLogo, DockerLogo, AiChipLogo, CloudLogo, TerminalLogo, GitLogo];

const CARDS = [
  {
    title: "AI Automation",
    desc: "2-month live course building real company AI agents with MCP, Cursor & Bedrock.",
    href: "/courses/ai-automation/",
    Icon: AiChipLogo,
    accent: "text-orange-400",
    hover: "group-hover:text-orange-400",
  },
  {
    title: "MLOps Masterclass",
    desc: "4-5 month job-ready program with mentorship, capstones & placement support.",
    href: "/mlops-aiops-masterclass/",
    Icon: RocketLogo,
    accent: "text-blue-400",
    hover: "group-hover:text-blue-400",
  },
  {
    title: "Career Roadmaps",
    desc: "Free step-by-step guides for MLOps, AI Engineer, LLMOps & FDE roles.",
    href: "/roadmap/",
    Icon: CompassLogo,
    accent: "text-amber-400",
    hover: "group-hover:text-amber-400",
  },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[radial-gradient(ellipse_at_top,#101c36_0%,#070d1a_62%)] text-slate-200 flex items-center justify-center px-4 py-16">
      {/* Constellation background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {STAR_LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
            stroke="#1e293b"
            strokeWidth="1"
          />
        ))}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={1.8 + (i % 3)}
            fill="#64748b"
            className="nf-twinkle"
            style={{ animationDelay: `${(i % 7) * 0.45}s` }}
          />
        ))}
      </svg>

      {/* Aurora blobs */}
      <div className="absolute -top-20 -left-24 w-72 h-72 bg-orange-500/10 blur-3xl nf-blob pointer-events-none" aria-hidden />
      <div
        className="absolute -bottom-24 -right-20 w-80 h-80 bg-sky-500/10 blur-3xl nf-blob pointer-events-none"
        style={{ animationDelay: "3s" }}
        aria-hidden
      />

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent nf-scanline pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Orbit system: radar + pod + tech logos */}
        <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] mx-auto mb-2 nf-orbit">
          {/* radar rings */}
          <div className="absolute inset-0 rounded-full border border-slate-700/60" />
          <div className="absolute inset-[15%] rounded-full border border-slate-700/40" />
          <div className="absolute inset-[30%] rounded-full border border-slate-700/25" />
          {/* expanding pulse rings */}
          <div className="absolute inset-[30%] rounded-full border-2 border-orange-500/50 nf-ring" aria-hidden />
          <div
            className="absolute inset-[30%] rounded-full border-2 border-sky-500/40 nf-ring"
            style={{ animationDelay: "1.2s" }}
            aria-hidden
          />
          {/* radar sweep */}
          <div className="absolute inset-0 rounded-full overflow-hidden" aria-hidden>
            <div
              className="absolute inset-0 nf-spin"
              style={{
                animationDuration: "7s",
                background: "conic-gradient(from 0deg, rgba(249,115,22,0.28), transparent 70deg)",
              }}
            />
          </div>
          {/* lost pod */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PodRobot />
          </div>
          {/* orbiting tech logos */}
          <div className="absolute inset-0 nf-spin" style={{ animationDuration: "28s" }}>
            {ORBIT_LOGOS.map((Logo, i) => (
              <div key={i} className="nf-orbit-logo" style={{ "--a": `${i * 60}deg` } as React.CSSProperties}>
                <div
                  className="nf-spin-rev"
                  style={{ animationDuration: "28s" }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800/90 border border-slate-600 flex items-center justify-center shadow-[0_0_18px_-4px_rgba(56,189,248,0.5)]">
                    <Logo />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glitch 404 */}
        <div className="mb-3">
          <span
            className="nf-glitch404 font-display font-bold text-[5rem] sm:text-[7.5rem] leading-none text-white tracking-tight"
            data-text="404"
            style={{ textShadow: "0 0 45px rgba(249,115,22,0.35)" }}
          >
            404
          </span>
        </div>

        {/* Status chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-red-500/50 text-red-400 bg-red-500/10">
            STATUS: NotFound
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-amber-500/50 text-amber-400 bg-amber-500/10">
            RESTARTS: 127
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
            VISITOR: SAFE
          </span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          This page got evicted from the cluster.
        </h1>
        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Pod <span className="font-mono text-orange-400">page-404</span> is in CrashLoopBackOff — but your career
          path is still running healthy. Backpropagate to one of the routes below.
        </p>

        {/* Fake cluster terminal */}
        <div className="mx-auto mb-10 max-w-md text-left rounded-xl border border-slate-700 bg-[#0b1120]/90 shadow-[0_0_60px_-15px_rgba(56,189,248,0.35)] overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-700 bg-slate-900/70">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">cluster shell</span>
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed">
            <p className="text-slate-300"><span className="text-emerald-400">$</span> kubectl get pods</p>
            <p className="text-red-400">page-404&nbsp;&nbsp;NotFound&nbsp;&nbsp;restarts: 127</p>
            <p className="text-slate-300"><span className="text-emerald-400">$</span> reroute --visitor --to /courses/ai-automation</p>
            <p className="text-sky-400">
              status: OK — routes available below
              <span className="nf-blink text-orange-400 ml-1">▊</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg bg-orange-500 text-white border-2 border-orange-400 hover:bg-orange-400 transition-colors shadow-[0_0_25px_-6px_rgba(249,115,22,0.7)]"
          >
            ← Back to Home
          </Link>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg bg-emerald-600 text-white border-2 border-emerald-500 hover:bg-emerald-500 transition-colors shadow-[0_0_25px_-6px_rgba(16,185,129,0.6)]"
          >
            Message on WhatsApp
          </a>
          <Link
            href="/mentorship/"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-lg border-2 border-slate-600 text-slate-200 bg-slate-800/60 hover:border-slate-300 transition-colors"
          >
            Book Mentorship
          </Link>
        </div>

        {/* Route cards */}
        <div className="grid sm:grid-cols-3 gap-5 text-left">
          {CARDS.map(({ title, desc, href, Icon, accent, hover }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-slate-700 bg-slate-900/70 p-5 transition-all duration-200 hover:border-orange-400/70 hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center mb-4 group-hover:border-orange-400/60 transition-colors">
                <Icon />
              </div>
              <h3 className={`font-display font-bold text-lg mb-2 text-white ${hover} transition-colors`}>
                {title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              <p className={`mt-3 text-xs font-bold font-mono ${accent}`}>deploy route →</p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Lost students can also browse{" "}
          <Link href="/blog/" className="text-sky-400 font-bold underline underline-offset-2 hover:text-sky-300">
            free tutorials
          </Link>{" "}
          or explore the{" "}
          <Link href="/universe/" className="text-sky-400 font-bold underline underline-offset-2 hover:text-sky-300">
            AI Universe
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
