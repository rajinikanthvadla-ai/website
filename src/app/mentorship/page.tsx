import type { Metadata } from "next";
import { LINKS, SITE } from "@/lib/constants";
import { MENTORSHIP_FAQS, mentorshipOfferSchema } from "@/lib/mentorship-pricing";
import { MENTORSHIP_MARKETS } from "@/lib/mentorship-markets";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import YouTubeMembershipSection from "@/components/YouTubeMembershipSection";
import MentorshipPricing, { HideInUk } from "@/components/MentorshipPricing";

export const metadata: Metadata = {
  title: "MLOps & AI Career Mentorship – Monthly 1:1 Plans",
  description:
    "Monthly 1:1 mentorship for MLOps, AIOps, LLMOps and AI engineering careers with Rajinikanth Vadla: weekly calls, WhatsApp support, resume and interview prep. From ₹2,499 in India and $199 internationally. Secure Razorpay payment.",
  keywords: [
    "Rajinikanth Vadla mentorship",
    "MLOps mentor",
    "MLOps mentorship India",
    "AI career mentor online",
    "monthly tech mentorship",
    "AI engineering career coaching",
    "MLOps mentor USA",
    "DevOps to MLOps career change",
    "LLMOps mentorship",
    "job switch mentorship AI",
  ],
  alternates: {
    canonical: "https://rajinikanthvadla.com/mentorship/",
    languages: {
      "x-default": "https://rajinikanthvadla.com/mentorship/",
      "en-IN": "https://rajinikanthvadla.com/mentorship/",
      ...Object.fromEntries(
        MENTORSHIP_MARKETS.map((m) => [m.hreflang, `https://rajinikanthvadla.com/mentorship/${m.slug}/`]),
      ),
    },
  },
  openGraph: {
    title: "1:1 MLOps & AI Career Mentorship – Rajinikanth Vadla",
    description: "Weekly 1:1 calls, WhatsApp support, resume and interview prep. Priced for your country. Secure Razorpay payment.",
    url: "https://rajinikanthvadla.com/mentorship/",
    images: [SITE.image],
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "1:1 MLOps & AI Career Mentorship",
  serviceType: "Career mentorship",
  provider: { "@type": "Person", name: SITE.name, url: SITE.url },
  areaServed: "Worldwide (except United Kingdom)",
  url: `${SITE.url}/mentorship/`,
  offers: mentorshipOfferSchema(SITE.url),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MENTORSHIP_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
    { "@type": "ListItem", position: 2, name: "Mentorship", item: `${SITE.url}/mentorship/` },
  ],
};

export default function MentorshipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
          <a
            href="#pricing"
            className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            See mentorship plans
          </a>
        </div>
      </section>

      <MentorshipPricing />

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

      <YouTubeMembershipSection compact />

      <HideInUk>
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="w-full px-0 md:px-0">
          <div className="panel p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="font-display text-2xl font-bold text-stone-900">Book without leaving this website</h2>
              <a
                href={LINKS.topmate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-stone-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700 hover:border-stone-900 transition-colors"
              >
                Open full page
              </a>
            </div>
            <p className="text-sm text-stone-600 mb-5">
              Topmate is embedded here for availability and booking. If your device clips the embed, use
              "Open full page" for the complete view.
            </p>
            <div className="relative w-full border border-stone-200 bg-white">
              <iframe
                src="https://topmate.io/rajinikanthvadla"
                title="Topmate mentorship booking"
                loading="lazy"
                className="w-full min-h-[88vh] md:min-h-[1100px] lg:min-h-[1250px]"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>
      </HideInUk>

      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Mentorship by country</h2>
          <p className="text-stone-600 text-sm mb-6">Time zones, salary ranges and USD pricing for your country.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {MENTORSHIP_MARKETS.map((m) => (
              <Link
                key={m.slug}
                href={`/mentorship/${m.slug}/`}
                className="px-4 py-2 text-sm font-semibold border border-stone-300 bg-white text-stone-700 hover:border-stone-900 transition-colors"
              >
                {m.flag} {m.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-stone-900 text-center mb-10">Questions before you pay</h2>
          <div className="space-y-3">
            {MENTORSHIP_FAQS.map((faq) => (
              <details key={faq.q} className="panel p-5 group">
                <summary className="font-semibold text-stone-900 cursor-pointer">{faq.q}</summary>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
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
