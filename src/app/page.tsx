import Image from "next/image";
import Link from "next/link";
import {
  LINKS,
  STATS,
  COURSES,
  STRUCTURED_DATA,
  HOME_PAGE_FAQS,
  MLOPS_MASTERCLASS_DURATION,
} from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";
import StudentFeedbacks from "@/components/StudentFeedbacks";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import MentorshipHomeSection from "@/components/MentorshipHomeSection";
import DiscoverLinksSection from "@/components/DiscoverLinksSection";
import CommunityBanner from "@/components/CommunityBanner";
import AgenticFdeBanner from "@/components/AgenticFdeBanner";
import LeadForm from "@/components/LeadForm";
import { MLOPS_MASTERCLASS_SYLLABUS } from "@/lib/masterclass-syllabus";
import { fetchApprovedTestimonials } from "@/lib/student-testimonials";

export default async function HomePage() {
  // Runs at build time (static export), so real reviews ship inside the HTML.
  const reviews = await fetchApprovedTestimonials().catch(() => []);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.courseList) }} />
      <HeroSection />
      {/* Below-the-fold sections: the browser skips their layout until scrolled near (faster first paint on phones). */}
      <div className="cv-auto">
        <AgenticFdeBanner />
        <ProgramsSection />
        <StudentFeedbacks initial={reviews} />
        <SyllabusPreviewSection />
        <MentorshipHomeSection />
        <YoutubePlaylist />
        <FAQSection />
        <LeadForm />
        <CommunityBanner />
        <CTASection
          title="Ready to start your AI career?"
          subtitle="Join a live cohort for MLOps, AIOps, LLMOps, AI Agents, and FDE, or message on WhatsApp first."
        />
      </div>
      {/* Not wrapped: SuccessStories has a position:fixed lightbox that content-visibility would clip,
          and the last section sits next to the footer, where skipped layout confuses a11y checks. */}
      <SuccessStories compact />
      <DiscoverLinksSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="notion-hero !py-12 md:!py-16">
      <div className="notion-hero-inner !gap-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-3">
            Live AI engineering · Rajinikanth Vadla
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            Learn MLOps, AIOps, LLMOps and AI Agents, clearly and live.
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-6">
            One structured path from fundamentals to production. Real labs, not slide decks. Live online cohorts
            with mentorship, open to engineers everywhere.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/enroll/" className="notion-btn notion-btn--accent">
              Enroll, see local price
            </Link>
            <Link href="/syllabus/" className="notion-btn notion-btn--ink">
              Open full syllabus
            </Link>
            <a
              href={LINKS.whatsappSyllabus}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn notion-btn--ghost"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap gap-6">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-[#0f172a]">{s.value}</div>
                <div className="text-xs text-slate-500">
                  {s.href ? (
                    <a href={s.href} className="underline decoration-slate-300 underline-offset-2 hover:text-[#0f172a]">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-4 max-w-md mx-auto w-full">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#2a2a2a] shadow-sm">
            <Image
              src="/assets/rajinikanth-portrait.webp"
              alt="Rajinikanth Vadla, MLOps and AI engineering mentor"
              width={640}
              height={800}
              className="w-full object-cover object-top h-[340px] lg:h-[400px]"
              priority
            />
          </div>
          <div className="flex gap-2 justify-center">
            {[
              { href: LINKS.linkedin, icon: <LinkedInIcon size={18} />, label: "LinkedIn" },
              { href: LINKS.youtube, icon: <YouTubeIcon size={18} />, label: "YouTube" },
              { href: LINKS.instagram, icon: <InstagramIcon size={18} />, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-slate-300 flex items-center justify-center text-slate-700 hover:border-teal-600 hover:text-teal-700 transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = COURSES.filter(
    (c) => c.href.startsWith("/courses") || c.href === "/mlops-aiops-masterclass",
  );

  return (
    <section className="notion-section notion-section--white" id="programs">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Programs"
          title="Two clear paths"
          subtitle="Pick the masterclass for a full career shift, or Automation if you need agents and tooling faster."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((c) => (
            <article
              key={c.title}
              className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide text-orange-700 mb-2">
                {c.badge}
              </span>
              <h2 className="font-display font-bold text-xl text-[#0f172a] mb-2">{c.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{c.description}</p>
              <ul className="space-y-1.5 mb-5">
                {c.features.slice(0, 4).map((f) => (
                  <li key={f} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-teal-600">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={c.href}
                className={`notion-btn text-center ${c.featured ? "notion-btn--accent" : "notion-btn--ink"}`}
              >
                {c.ctaText}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SyllabusPreviewSection() {
  const modules = MLOPS_MASTERCLASS_SYLLABUS.slice(0, 6);

  return (
    <section className="notion-section notion-section--paper">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Syllabus"
          title="What you learn, module by module"
          subtitle={`${MLOPS_MASTERCLASS_DURATION} masterclass. Open any module on the full syllabus page.`}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {modules.map((mod) => (
            <Link
              key={mod.module}
              href={`/syllabus/#module-${mod.module}`}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:border-teal-600 transition-colors"
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700 mb-1">
                Module {mod.module} · {mod.duration}
              </p>
              <h3 className="font-display font-bold text-[#0f172a] text-sm leading-snug">{mod.title}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link href="/syllabus/" className="notion-btn notion-btn--ink">
            View complete syllabus
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = HOME_PAGE_FAQS.slice(0, 5);

  return (
    <section className="notion-section notion-section--white">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          tag="FAQ"
          title="Before you enroll"
          subtitle="Short answers. Message on WhatsApp if you need batch timing for your time zone."
        />
        <div className="space-y-2">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-white border border-slate-200 rounded-lg group">
              <summary className="flex items-start justify-between gap-4 p-4 cursor-pointer list-none font-display font-bold text-[#0f172a] text-sm md:text-base leading-snug">
                {faq.q}
                <span className="text-slate-400 text-lg shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
