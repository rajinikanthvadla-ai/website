import Link from "next/link";
import { MENTORSHIP_PLANS } from "@/lib/mentorship-pricing";

const deepDive = MENTORSHIP_PLANS.find((p) => p.id === "deep-dive")!.prices;

/**
 * Turns a learning page (roadmap, skill, interview prep) into a mentorship lead:
 * "you have the map, now get someone to walk it with you".
 */
export default function MentorshipCta({ topic }: { topic: string }) {
  return (
    <section className="py-16 md:py-20 bg-stone-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-400 mb-3">
          1:1 mentorship
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Want this {topic} turned into your own plan?
        </h2>
        <p className="text-stone-300 text-lg leading-relaxed mb-8">
          A roadmap shows the destination. In 1:1 mentorship I turn it into a week-by-week learning path for your
          background, review your projects, and prepare you for interviews until you land the role. Online, in your
          time zone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/mentorship/#pricing"
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            Get my personal roadmap
          </Link>
          <Link
            href="/mentorship/?region=usa#pricing"
            className="border border-stone-500 hover:border-white text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            Outside India? See USD plans
          </Link>
        </div>
        <p className="text-stone-400 text-sm mt-5">
          Start with one 60-minute call: {deepDive.C.main} in India · {deepDive.A.main} everywhere else.
        </p>
      </div>
    </section>
  );
}
