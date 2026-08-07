import Link from "next/link";
import {
  YOUTUBE_MEMBERSHIP_JOIN_URL,
  YOUTUBE_MEMBERSHIP_TIERS,
  YOUTUBE_MEMBERSHIP_WHATSAPP,
} from "@/lib/youtube-membership";
import { LINKS } from "@/lib/constants";

type Props = {
  compact?: boolean;
};

const VALUE_PILLS = [
  { icon: "🎬", label: "60+ private videos" },
  { icon: "🔴", label: "Members-only live" },
  { icon: "🎓", label: "1:1 mentorship" },
  { icon: "↩", label: "Cancel anytime" },
];

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export default function YouTubeMembershipSection({ compact = false }: Props) {
  const pro = YOUTUBE_MEMBERSHIP_TIERS.find((t) => t.recommended)!;
  const learner = YOUTUBE_MEMBERSHIP_TIERS.find((t) => t.id === "learner")!;
  const practitioner = YOUTUBE_MEMBERSHIP_TIERS.find((t) => t.id === "practitioner")!;
  const sideTiers = [learner, practitioner];

  return (
    <section className="yt-membership relative overflow-hidden">
      {/* Background */}
      <div className="yt-membership-bg" aria-hidden />
      <div className="yt-membership-glow yt-membership-glow--left" aria-hidden />
      <div className="yt-membership-glow yt-membership-glow--right" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white bg-red-600 border-2 border-[#0f172a] px-4 py-1.5 rounded-sm shadow-[3px_3px_0_#0f172a] mb-5">
            <YouTubeIcon className="w-4 h-4" />
            Channel Membership
          </div>
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-[#0f172a] mb-4 leading-[1.08] tracking-tight">
            {compact ? (
              <>
                All private courses for{" "}
                <span className="text-orange-600">₹1,199/month</span>
              </>
            ) : (
              <>
                Every private video.{" "}
                <span className="text-orange-600">Real mentorship.</span>
                <br className="hidden sm:block" />
                One YouTube membership.
              </>
            )}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Skip ₹30K–₹40K upfront. Join{" "}
            <strong className="text-[#0f172a]">AI &amp; ML AI Agentic Pro</strong> and unlock the full
            library — old sessions, new uploads, members-only live classes — plus 1:1 career help when you
            share your Member ID.
          </p>
        </div>

        {/* Value pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {VALUE_PILLS.map((pill) => (
            <span key={pill.label} className="yt-pill">
              <span aria-hidden>{pill.icon}</span>
              {pill.label}
            </span>
          ))}
        </div>

        {/* Pricing — Pro centered on desktop */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 mb-12 items-end max-w-5xl mx-auto">
          {/* Side tier 1 */}
          <SideTierCard tier={sideTiers[0]} index={0} />

          {/* Pro — hero card */}
          <div className="yt-tier yt-tier--pro order-first md:order-none md:-mt-6 md:mb-0">
            <div className="yt-tier-pro-badge">
              <span className="yt-tier-pro-badge-dot" aria-hidden />
              Most students pick this
            </div>

            <div className="yt-tier-pro-header">
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-orange-800 mb-2">
                ⭐ Recommended · Agentic Pro
              </p>
              <h3 className="font-display font-bold text-[#0f172a] text-xl md:text-2xl leading-tight">
                {pro.name}
              </h3>
              <p className="text-sm text-slate-700 mt-1.5">{pro.tagline}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-5xl md:text-[3.25rem] font-bold text-[#0f172a] leading-none">
                  {pro.price}
                </span>
                <span className="text-sm font-bold text-slate-500 pb-1">/month</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                ≈ ₹40/day for the full library + mentorship
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Full library", "Live streams", "1:1 help"].map((tag) => (
                  <span key={tag} className="yt-tier-tag yt-tier-tag--pro">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ul className="yt-tier-pro-list">
              {pro.perks.map((p) => (
                <li key={p}>
                  <span className="yt-check" aria-hidden>✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="p-5 pt-2 bg-white border-t-2 border-dashed border-[#0f172a]/20">
              <a
                href={YOUTUBE_MEMBERSHIP_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="yt-cta-pro group"
              >
                <YouTubeIcon className="w-5 h-5 shrink-0" />
                <span>
                  Join Agentic Pro Now
                  <span className="block text-[0.65rem] font-semibold opacity-90 mt-0.5">
                    {pro.price}/month · cancel anytime
                  </span>
                </span>
                <span className="yt-cta-arrow group-hover:translate-x-0.5 transition-transform" aria-hidden>
                  →
                </span>
              </a>
              <a href={YOUTUBE_MEMBERSHIP_WHATSAPP} target="_blank" rel="noopener noreferrer" className="yt-whatsapp-link">
                Already a member? Send Member ID on WhatsApp →
              </a>
            </div>
          </div>

          {/* Side tier 2 */}
          <SideTierCard tier={sideTiers[1]} index={1} />
        </div>

        {/* Visual comparison table */}
        <div className="yt-compare-table mb-10 max-w-4xl mx-auto">
          <div className="yt-compare-head">
            <span>What you get</span>
            <span className="text-slate-400">₹179</span>
            <span className="text-slate-400">₹419</span>
            <span className="text-orange-600 font-extrabold">₹1,199 Pro</span>
          </div>
          {[
            { feature: "All private course videos", learner: false, practitioner: false, pro: true },
            { feature: "Members-only live streams", learner: false, practitioner: false, pro: true },
            { feature: "New + old video archive", learner: false, practitioner: false, pro: true },
            { feature: "1:1 mentorship (Member ID)", learner: false, practitioner: false, pro: true },
            { feature: "Interview & career Q&A", learner: false, practitioner: false, pro: true },
          ].map((row) => (
            <div key={row.feature} className="yt-compare-row">
              <span className="text-sm font-semibold text-[#0f172a]">{row.feature}</span>
              <CompareCell ok={row.learner} />
              <CompareCell ok={row.practitioner} />
              <CompareCell ok={row.pro} highlight />
            </div>
          ))}
        </div>

        {/* Bottom cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="yt-info-card">
            <div className="flex items-start gap-3 mb-4">
              <span className="yt-info-icon">💡</span>
              <div>
                <h3 className="font-display font-bold text-[#0f172a] text-lg">Why not ₹179 or ₹419?</h3>
                <p className="text-sm text-slate-500 mt-0.5">Lower tiers = partial access only</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Students who pick the cheaper plans often come back asking for the full library.{" "}
              <strong className="text-[#0f172a]">Agentic Pro</strong> is the only tier with every
              members-only video, live stream replay, and direct mentorship from Rajinikanth&apos;s team.
            </p>
          </div>

          <div className="yt-info-card yt-info-card--dark">
            <div className="flex items-start gap-3 mb-4">
              <span className="yt-info-icon">🚀</span>
              <div>
                <h3 className="font-display font-bold text-white text-lg">3 steps to unlock mentorship</h3>
                <p className="text-sm text-slate-400 mt-0.5">Takes under 2 minutes</p>
              </div>
            </div>
            <ol className="space-y-3">
              {[
                <>Join <strong className="text-[#fef9c3]">Agentic Pro</strong> on YouTube</>,
                <>Copy your <strong className="text-[#fef9c3]">Member ID</strong> from settings</>,
                <>
                  WhatsApp it to us — get learning path, interview tips &amp; Q&amp;A help
                </>,
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="yt-step-num">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <a href={YOUTUBE_MEMBERSHIP_WHATSAPP} target="_blank" rel="noopener noreferrer" className="yt-cta-ghost mt-5">
              Send Member ID on WhatsApp
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          Billed monthly via YouTube. Want live cohort + capstones? See the{" "}
          <Link href="/mlops-aiops-masterclass/" className="font-bold text-[#0f172a] underline underline-offset-2">
            MLOps Masterclass
          </Link>
          . Free public videos on{" "}
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="font-bold text-[#0f172a] underline underline-offset-2">
            YouTube
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function CompareCell({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  return (
    <span className={`yt-compare-cell ${highlight ? "yt-compare-cell--pro" : ""}`}>
      {ok ? (
        <span className="text-emerald-600 font-bold text-lg">✓</span>
      ) : (
        <span className="text-slate-300 font-bold text-lg">—</span>
      )}
    </span>
  );
}

function SideTierCard({ tier }: { tier: (typeof YOUTUBE_MEMBERSHIP_TIERS)[number]; index: number }) {
  return (
    <div className="yt-tier yt-tier--side hidden md:flex flex-col">
      <div className="p-5 border-b border-dashed border-slate-200">
        <p className="text-[0.6rem] font-bold uppercase tracking-wide text-slate-400 mb-1">
          {tier.id === "learner" ? "Basic" : "Mid tier"}
        </p>
        <h3 className="font-display font-bold text-slate-500 text-base">{tier.name}</h3>
        <p className="mt-3">
          <span className="font-display text-2xl font-bold text-slate-400">{tier.price}</span>
          <span className="text-[0.65rem] text-slate-400 font-semibold">/mo</span>
        </p>
      </div>
      <ul className="p-4 flex-1 space-y-1.5 text-xs text-slate-400">
        {tier.perks.slice(0, 2).map((p) => (
          <li key={p} className="flex gap-1.5">
            <span className="shrink-0">✓</span>
            {p}
          </li>
        ))}
        {tier.missing?.slice(0, 2).map((m) => (
          <li key={m} className="flex gap-1.5 text-slate-300">
            <span className="shrink-0">✕</span>
            {m}
          </li>
        ))}
      </ul>
      <div className="p-4 pt-0">
        <a
          href={YOUTUBE_MEMBERSHIP_JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[0.65rem] font-bold uppercase tracking-wide py-2 border border-slate-200 text-slate-400 rounded-sm hover:border-slate-400 transition-colors"
        >
          {tier.price}/mo
        </a>
      </div>
    </div>
  );
}
