import Link from "next/link";
import { LINKS } from "@/lib/constants";
import { MENTORSHIP_PLANS } from "@/lib/mentorship-pricing";

const HIGHLIGHTS = [
  "Personal week-by-week learning roadmap",
  "Weekly 1:1 calls on your time zone",
  "Project reviews, resume & interview prep",
  "MLOps · LLMOps · Agents · career switch",
] as const;

export default function MentorshipHomeSection() {
  const monthly = MENTORSHIP_PLANS.find((p) => p.id === "monthly");
  const deepDive = MENTORSHIP_PLANS.find((p) => p.id === "deep-dive");

  return (
    <section className="notion-section notion-section--white" id="mentorship">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-2">1:1 Mentorship</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
              Private coaching when a cohort is not enough
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">
              Book direct time with Rajinikanth for career direction, role transitions, and technical depth. Online
              worldwide.
            </p>
            <ul className="space-y-2 mb-8">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="text-sm text-slate-700 flex gap-2">
                  <span className="text-teal-600 font-bold">·</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/mentorship/" className="notion-btn notion-btn--accent">
                View mentorship plans
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="notion-btn notion-btn--ghost"
              >
                WhatsApp first
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {monthly ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700 mb-1">Most booked</p>
                <h3 className="font-display font-bold text-lg text-[#0f172a]">{monthly.name}</h3>
                <p className="text-sm text-slate-600 mt-1 mb-3">{monthly.summary}</p>
                <p className="text-sm font-semibold text-[#0f172a]">
                  From {monthly.prices.C.main} · {monthly.prices.A.main} worldwide
                </p>
              </div>
            ) : null}
            {deepDive ? (
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">Focused session</p>
                <h3 className="font-display font-bold text-lg text-[#0f172a]">{deepDive.name}</h3>
                <p className="text-sm text-slate-600 mt-1 mb-3">{deepDive.summary}</p>
                <p className="text-sm font-semibold text-[#0f172a]">
                  From {deepDive.prices.C.main} · {deepDive.prices.A.main} worldwide
                </p>
              </div>
            ) : null}
            <p className="text-center text-sm text-slate-600 pt-2 leading-relaxed">
              Still have doubts?{" "}
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-teal-700 underline underline-offset-2"
              >
                WhatsApp me
              </a>{" "}
              before you pay on Razorpay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
