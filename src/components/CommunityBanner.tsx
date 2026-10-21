import Link from "next/link";
import { LocalPrice } from "@/components/LocalPrice";
import { COMMUNITY_JOIN_URL, COMMUNITY_TIERS } from "@/lib/community";

const HIGHLIGHTS = ["Class notes & code", "Resume templates", "Interview questions", "Project ideas", "Live Q&A (Pro)"];

/** Homepage promo for the AI Engineers Insider monthly community. */
export default function CommunityBanner() {
  const starter = COMMUNITY_TIERS[0];
  return (
    <section className="bg-[#0f172a] border-y-2 border-[#0f172a]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <span className="inline-block text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#0f172a] bg-[#fef9c3] px-3 py-1 mb-4">
            New · Private community
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
            AI Engineers Insider
            <span className="block text-orange-400">MLOps &amp; GenAI community, every month</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-5 max-w-2xl">
            Class notes, resume templates, interview questions and project ideas shared in a private community by
            Rajinikanth Vadla. Cancel anytime.
          </p>
          <ul className="flex flex-wrap gap-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="text-xs font-semibold text-slate-200 border border-slate-600 px-3 py-1.5">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="text-slate-300 text-sm">
            From{" "}
            <LocalPrice inr={starter.inr} usd={starter.usd} className="font-display text-3xl font-bold text-white" />
            <span className="text-slate-400"> / month</span>
          </p>
          <Link
            href="/community/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            See plans &rarr;
          </Link>
          <a
            href={COMMUNITY_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-200 underline underline-offset-2 hover:text-white"
          >
            Join now on Topmate
          </a>
        </div>
      </div>
    </section>
  );
}
