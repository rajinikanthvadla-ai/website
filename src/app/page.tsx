import Image from "next/image";
import Link from "next/link";
import {
  LINKS,
  STATS,
  COURSES,
  STRUCTURED_DATA,
  HOME_PAGE_FAQS,
  MLOPS_MASTERCLASS_DURATION,
  YEARS_EXPERIENCE,
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
import LeadForm from "@/components/LeadForm";
import { MLOPS_MASTERCLASS_SYLLABUS } from "@/lib/masterclass-syllabus";
import { fetchApprovedTestimonials } from "@/lib/student-testimonials";
import { getProjects, type PortfolioProject } from "@/lib/cms";
import ProjectCard from "@/components/ProjectCard";
import SiteBanners from "@/components/SiteBanners";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "AI Platform Engineering Course — MLOps, AIOps, LLMOps, Agents & FDE | Rajinikanth Vadla",
  },
  description:
    "Learn AI Platform Engineering (DevOps / SRE / ML → production AI platforms). Live training in MLOps, AIOps, LLMOps, AI Agents and FDE with 1:1 mentorship. 500+ engineers trained worldwide.",
  alternates: {
    canonical: "https://rajinikanthvadla.com/",
    types: { "application/rss+xml": "https://rajinikanthvadla.com/feed.xml" },
  },
};

const STACK = ["MLOps", "AIOps", "LLMOps", "AI Agents", "FDE"] as const;

export default async function HomePage() {
  const reviews = await fetchApprovedTestimonials().catch(() => []);
  const featured = (await getProjects()).filter((p) => p.featured).slice(0, 3);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.aiAutomationCourse) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.courseList) }} />
      <HeroSection />
      <SiteBanners placement="home" />
      <div className="cv-auto">
        <ProgramsSection />
        <PathLadderSection />
      </div>
      <SuccessStories compact />
      <div className="cv-auto">
        <BuiltInProductionSection projects={featured} />
        <StudentFeedbacks initial={reviews} />
        <SyllabusPreviewSection />
        <MentorshipHomeSection />
        <YoutubePlaylist />
        <FAQSection />
        <LeadForm />
        <CommunityBanner />
        <CTASection
          title="Ready to build production AI platforms?"
          subtitle="Join the AI Platform Engineering masterclass (MLOps → FDE), or message on WhatsApp first."
        />
      </div>
      <DiscoverLinksSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="notion-hero home-hero !py-12 md:!py-16">
      <div className="notion-hero-inner !gap-10 !pt-2 lg:!pt-4">
        <div className="hero-enter">
          <p className="home-hero-brand">Rajinikanth Vadla</p>
          <p className="home-hero-live">
            <span className="hero-live-dot" aria-hidden />
            Live online · AI Platform Engineering
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-[1.08] mb-3">
            AI Platform Engineering
            <span className="home-hero-bracket">
              {" "}
              (DevOps / SRE / ML → production AI platforms)
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-xl mb-3">
            One live path that still covers{" "}
            <span className="font-semibold text-[#0f172a]">
              {STACK.join(" · ")}
            </span>
            . Real labs, mentorship, and portfolio work — not slide decks.
          </p>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
            Built for engineers who want to ship models, agents, and platforms in production —
            with {YEARS_EXPERIENCE} years of enterprise practice behind the teaching.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link href="/enroll/" className="notion-btn notion-btn--accent">
              Enroll — see local price
            </Link>
            <Link href="/syllabus/" className="notion-btn notion-btn--ink">
              Full syllabus
            </Link>
          </div>
          <p className="text-sm text-slate-600 mb-7">
            Questions first?{" "}
            <a
              href={LINKS.whatsappSyllabus}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-800 underline underline-offset-2 hover:text-teal-950"
            >
              WhatsApp batch details
            </a>
            {" · "}
            <Link href="/roadmap/ai-platform-engineer/" className="font-semibold text-[#0f172a] underline underline-offset-2 decoration-slate-300 hover:decoration-[#0f172a]">
              Free AI Platform roadmap
            </Link>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700 mb-8" aria-label="What every enrollment includes">
            {["Completion certificate", "Lifetime recordings", "Move batch anytime"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="text-teal-700 font-bold" aria-hidden>
                  ✓
                </span>
                {t}
              </li>
            ))}
            <li>
              <Link
                href="/refund-policy/"
                className="underline decoration-slate-300 underline-offset-2 text-slate-500 hover:text-[#0f172a]"
              >
                Refund policy
              </Link>
            </li>
          </ul>
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
          <div className="overflow-hidden rounded-lg border-2 border-[#0f172a] bg-[#2a2a2a] shadow-sm">
            <Image
              src="/assets/rajinikanth-portrait.webp"
              alt="Rajinikanth Vadla, AI Platform Engineering mentor for MLOps, AIOps, LLMOps, Agents and FDE"
              width={640}
              height={800}
              className="w-full object-cover object-top h-[340px] lg:h-[420px]"
              priority
            />
          </div>
          <p className="text-center text-xs font-semibold tracking-wide text-slate-600 uppercase">
            Mentor · practitioner · live cohorts worldwide
          </p>
          <div className="hero-fade flex gap-2 justify-center">
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

function PathLadderSection() {
  const steps = [
    {
      title: "Orient free",
      body: "Roadmaps, Python course, architecture diagrams — start without paying.",
      href: "/roadmap/ai-platform-engineer/",
      cta: "AI Platform roadmap",
    },
    {
      title: "Talk / community",
      body: "WhatsApp batch details or the free community before you commit.",
      href: LINKS.whatsappSyllabus,
      cta: "WhatsApp",
      external: true,
    },
    {
      title: "Mentorship",
      body: "1:1 career and interview guidance if you need a personal plan first.",
      href: "/mentorship/",
      cta: "Mentorship",
    },
    {
      title: "Masterclass",
      body: "Full AI Platform Engineering path: MLOps → AIOps → LLMOps → Agents → FDE.",
      href: "/enroll/",
      cta: "Enroll",
    },
  ];

  return (
    <section className="notion-section notion-section--paper" id="start-here">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="How to start"
          title="A clear ladder — not five equal offers"
          subtitle="Move from free orientation to paid depth. Keep MLOps through FDE inside the flagship path."
        />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="home-ladder-step">
              <span className="home-ladder-num" aria-hidden>
                {index + 1}
              </span>
              <h3 className="font-display font-bold text-[#0f172a] text-base mb-1">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-1">{step.body}</p>
              {step.external ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-teal-800 underline underline-offset-2"
                >
                  {step.cta}
                </a>
              ) : (
                <Link href={step.href} className="text-sm font-bold text-teal-800 underline underline-offset-2">
                  {step.cta}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = COURSES.filter(
    (c) => c.href.startsWith("/courses") || c.href === "/mlops-aiops-masterclass" || c.href === "/mentorship",
  );

  return (
    <section className="notion-section notion-section--white" id="programs">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Programs"
          title="Flagship platform path + faster automation + 1:1"
          subtitle="AI Platform Engineering stays the main career offer. Automation is the shorter agents track. Mentorship is private guidance."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {programs.map((c) => (
            <article
              key={c.title}
              className={`lift bg-white border rounded-lg p-6 flex flex-col ${
                c.featured ? "border-[#0f172a] border-2 shadow-sm" : "border-slate-200"
              }`}
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
          subtitle={`${MLOPS_MASTERCLASS_DURATION} masterclass for AI Platform Engineering — MLOps through FDE. Open any module on the full syllabus.`}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {modules.map((mod) => (
            <Link
              key={mod.module}
              href={`/syllabus/#module-${mod.module}`}
              className="lift bg-white border border-slate-200 rounded-lg p-4 hover:border-teal-600"
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
  const faqs = HOME_PAGE_FAQS.slice(0, 6);

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

function BuiltInProductionSection({ projects }: { projects: PortfolioProject[] }) {
  if (!projects.length) return null;
  return (
    <section className="notion-section notion-section--paper" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="Built in production"
          title="I teach what I ship"
          subtitle="Agents, RAG and AI platforms running for real companies. The same patterns go into the course labs."
        />
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/projects/" className="notion-btn notion-btn--ink">
            All projects
          </Link>
          <Link href="/work-with-me/" className="notion-btn notion-btn--ghost">
            Need one built for your company?
          </Link>
        </div>
      </div>
    </section>
  );
}
