import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "1:1 Mentorship & Career Guidance",
  description:
    "Online 1:1 mentorship for MLOps, AIOps and AI engineering careers — role transitions, interview prep and learning plans. Open worldwide.",
  keywords: [
    "Rajinikanth Vadla mentorship",
    "MLOps career mentor online",
    "AI engineering career coaching",
    "remote tech mentorship",
    "career transformation mentor",
    "DevOps to MLOps career change",
    "international students MLOps",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/mentorship/" },
};

export default function MentorshipPage() {
  return (
    <>
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Personal guidance</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">1:1 Mentorship</h1>
          <p className="text-lg text-stone-600 mb-4">
            Direct time on your problems - not a generic playbook. I work with people who want honest help on
            career direction, skill gaps, and how to describe the work they have already done.
          </p>
          <p className="text-stone-600 text-base leading-relaxed">
            You can be in India, the Middle East, Europe, the Americas, or anywhere else: sessions are online. Bring
            questions about transformation into MLOps, AIOps, cloud, or AI roles, or about the next step from where you
            are today.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="panel p-8 md:p-10 mb-14">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">When private sessions help most</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              Whether you&apos;re breaking into AI/ML, tightening your DevOps story, preparing for a hiring loop, or
              planning a multi-year move into platform or AI teams, one-to-one work can save months of guessing. Many
              people message first with a short career summary and what feels stuck; that is enough to start.
            </p>
            <h3 className="font-semibold text-stone-900 mb-3">What we can cover</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-2">
              {[
                "Career roadmap and role targets (including cross-country moves)",
                "Resume and LinkedIn passes for MLOps, DevOps, and AI roles",
                "Mock interviews and story-telling for senior IC or lead tracks",
                "Technical project guidance when you are blocked in the lab",
                "Salary and offer framing (without empty hype)",
                "How to describe messy real delivery clearly to hiring managers",
                "Learning plan: what to study next if you are self-driven between cohorts",
                "Confidence after a layoff, break, or long gap - practical next steps",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-stone-600 text-sm md:text-base">
                  <span className="w-5 h-5 border border-accent-200 bg-accent-50 flex items-center justify-center shrink-0 text-accent-700 text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="font-display text-2xl font-bold text-stone-900 mb-8 text-center">Typical arc</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {[
              { step: "01", title: "Discovery", desc: "Current role, target role, and constraints - time, money, geography, visa or family context if relevant." },
              { step: "02", title: "Assessment", desc: "Honest read on gaps: systems thinking, depth in one stack, communication, and what recruiters will probe." },
              { step: "03", title: "Focused work", desc: "Sessions built around artifacts: repos, design docs, interview stories, and repeated practice where it helps." },
              { step: "04", title: "Launch", desc: "Interview prep and iteration until you sound like the engineer you already are - wherever you plan to apply." },
            ].map((item) => (
              <div key={item.step} className="panel p-7 card-hover">
                <span className="inline-flex items-center justify-center w-10 h-10 border border-stone-900 bg-stone-900 text-[#fffefc] font-bold text-xs mb-4">
                  {item.step}
                </span>
                <h3 className="font-display font-bold text-stone-900 text-lg mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-stone-900 mb-8 text-center">Choose an entry point</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🤖", title: "AI mentor chat", desc: "Quick answers when you already know the direction but want wording or next steps.", href: LINKS.myGPT, btn: "Open chat" },
              { icon: "📞", title: "Book 1:1", desc: "Deep dive on your CV, system design, career change, or a stuck project. Calendars are online for global time zones.", href: LINKS.topmate, btn: "Book on Topmate" },
              { icon: "💬", title: "WhatsApp first", desc: "Short questions about mentorship, courses, or transformation before you book a paid slot.", href: LINKS.whatsapp, btn: "Message" },
            ].map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group panel p-8 text-center card-hover flex flex-col items-center h-full min-h-[260px] sm:min-h-[280px]"
              >
                <div className="w-14 h-14 shrink-0 border border-stone-200 bg-stone-50 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:border-accent-400 transition-colors">
                  {opt.icon}
                </div>
                <h3 className="font-display font-bold text-stone-900 text-lg mb-2">{opt.title}</h3>
                <p className="text-sm text-stone-600 mb-5 flex-1 leading-relaxed">{opt.desc}</p>
                <span className="mt-auto inline-block bg-stone-900 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wide group-hover:bg-accent-600 transition-colors">
                  {opt.btn}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        ctaPreset="mentorship"
        title="If you are unsure which option fits, start small"
        subtitle="A short WhatsApp note with your background, country or time zone, and what you want to change is enough - I will suggest mentorship, a course, or self-study in plain language."
      />
      <SuccessStories />
    </>
  );
}
