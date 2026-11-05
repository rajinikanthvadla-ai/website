import Link from "next/link";
import { LocalPrice } from "@/components/LocalPrice";
import { COMMUNITY_TIERS } from "@/lib/community";

/** Quiet homepage/footer promo for AI Engineers Insider. One CTA only. */
export default function CommunityBanner() {
  const starter = COMMUNITY_TIERS.find((t) => t.id === "community")!;
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 mb-2">Membership</p>
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#0f172a] mb-2">
            AI Engineers Insider
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Private Telegram community with notes, templates, and interview prep. From{" "}
            <LocalPrice inr={starter.inr} usd={starter.usd} className="font-semibold text-[#0f172a]" />
            /mo. Free prep available too.
          </p>
        </div>
        <Link
          href="/community/"
          className="shrink-0 inline-flex items-center justify-center bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-3 text-sm font-semibold rounded-xl transition-colors"
        >
          See plans →
        </Link>
      </div>
    </section>
  );
}
