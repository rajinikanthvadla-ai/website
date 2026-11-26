import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Countdown from "@/components/Countdown";
import FdeDemoForm from "@/components/FdeDemoForm";
import StudentFeedbacks from "@/components/StudentFeedbacks";
import { fetchApprovedTestimonials } from "@/lib/student-testimonials";
import { LINKS, SITE, YEARS_EXPERIENCE } from "@/lib/constants";
import {
  FDE_CAPS,
  FDE_COMPARE,
  FDE_COUNTDOWN,
  FDE_COUNTDOWN_AFTER,
  FDE_COURSE,
  FDE_DEMO_AGENDA,
  FDE_DEMO_SCHEMA,
  FDE_ENROL_STEPS,
  FDE_FAQS,
  FDE_FINAL_REQUIREMENTS,
  FDE_FOR_YOU,
  FDE_INCLUDES,
  FDE_NOT_FOR,
  FDE_PROOF,
  FDE_RELATED_LINKS,
  FDE_SCHEMA,
  FDE_SEO_BLOCK,
  FDE_TEACHING,
  FDE_WEBPAGE_SCHEMA,
  FDE_WHAT_IS,
  FDE_WEEKS,
} from "@/lib/fde-course-content";

const PAGE_URL = `${SITE.url}${FDE_COURSE.path}`;

export const metadata: Metadata = {
  title: {
    absolute: "FDE Course India | Forward Deployed AI Engineering | Rajinikanth Vadla",
  },
  description:
    "Free live FDE demo on Zoom, Sun 6 Dec 2026, 11 AM IST. 8-week Forward Deployed AI Engineering cohort from Mon 7 Dec, 7 AM IST. Early bird ₹32,000 till 6 Dec, then ₹36,999.",
  keywords: [
    "FDE course",
    "FDE course India",
    "Forward Deployed Engineering course",
    "Forward Deployed Engineer course",
    "Forward Deployed AI Engineering",
    "FDE training India",
    "Forward Deployed AI Engineer training",
    "live FDE cohort",
    "customer facing AI course",
    "Rajinikanth Vadla FDE",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "FDE Course India | Forward Deployed AI Engineering | ₹32,000 Early Bird",
    description:
      "8-week live FDE cohort with Rajinikanth Vadla. Discovery to production on one incident triage case. Graded demo, evals, security, cost sheet, and playbook.",
    url: PAGE_URL,
    type: "website",
    siteName: SITE.name,
    images: [{ url: SITE.image, width: 1200, height: 630, alt: "Rajinikanth Vadla Forward Deployed AI Engineering course" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FDE Course India | Forward Deployed AI Engineering | ₹32,000",
    description: "Live 8-week FDE cohort. Graded weekly projects. Portfolio demo and playbook. Rajinikanth Vadla.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FDE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function FdeCoursePage() {
  const reviews = await fetchApprovedTestimonials().catch(() => []);
  return (
    <div className="pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FDE_WEBPAGE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FDE_DEMO_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FDE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Courses", path: "/courses/" },
          { name: "Forward Deployed AI Engineering", path: FDE_COURSE.path },
        ]}
      />

      {/* HERO */}
      <section className="bg-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-400 mb-3">
              Rajinikanth Vadla · Starts {FDE_COURSE.startDate} · {FDE_COURSE.classTime}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="rounded bg-emerald-600 text-white text-[11px] font-bold uppercase px-2 py-1">
                Free demo · {FDE_COURSE.demoShort} · 11 AM IST
              </span>
              <span className="rounded bg-blue-700 text-white text-[11px] font-bold uppercase px-2 py-1">
                Classes from Mon 7 Dec · 7 AM IST
              </span>
              <span className="rounded border border-slate-600 text-slate-300 text-[11px] font-bold uppercase px-2 py-1">
                Early bird {FDE_COURSE.earlyBirdDisplay} till {FDE_COURSE.demoShort}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
              {FDE_COURSE.shortTitle}
            </h1>
            <p className="text-orange-400 font-semibold text-lg md:text-xl mb-4">{FDE_COURSE.tagline}</p>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mb-6">
              {FDE_COURSE.heroSub}
            </p>
            <p className="text-sm text-slate-400 mb-8">
              {FDE_COURSE.sessions}. {FDE_COURSE.clinic}. {FDE_COURSE.format}.
            </p>
            <div className="mb-6">
              <Countdown variant="hero" phases={FDE_COUNTDOWN} after={FDE_COUNTDOWN_AFTER} />
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600"
                data-track="FDE course: hero join free demo"
              >
                Join the free demo · {FDE_COURSE.demoShort}
              </a>
              <a
                href={LINKS.whatsappFde}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border-2 border-slate-500 text-white hover:border-white"
                data-track="FDE course: hero WhatsApp enroll"
              >
                Reserve early bird {FDE_COURSE.earlyBirdDisplay}
              </a>
            </div>
            <p className="text-sm text-slate-400 mb-8">
              Not sure yet? Watch the free demo first.{" "}
              <a href="#syllabus" className="font-semibold text-slate-200 underline underline-offset-2 hover:text-white">
                Read the 8-week syllabus
              </a>
            </p>
            <dl className="grid grid-cols-2 gap-4 max-w-lg">
              {FDE_PROOF.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-blue-300">{item.label}</dt>
                  <dd className="text-sm text-white mt-1 font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="bg-white text-slate-900 rounded-lg border border-slate-200 p-7 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-2">
              {FDE_COURSE.earlyBirdNote}
            </p>
            <p className="font-display text-4xl font-bold text-slate-900">{FDE_COURSE.earlyBirdDisplay}</p>
            <p className="text-sm text-slate-500 mt-1 mb-1">
              Then {FDE_COURSE.priceDisplay}
            </p>
            <p className="text-xs text-slate-500 mb-5">{FDE_COURSE.priceNote}</p>
            <ul className="space-y-2.5 mb-6">
              {[
                `Starts ${FDE_COURSE.startDate} (Monday)`,
                `${FDE_COURSE.classDays}, ${FDE_COURSE.classTime}`,
                "Weekly Saturday project clinic",
                "One incident triage case end to end",
                "Security checklist + cost and latency sheet",
                "Mock stakeholder and security review",
                "Final demo, runbook, and reusable playbook",
                "Session recordings included",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  {line}
                </li>
              ))}
            </ul>
            <a
              href={LINKS.whatsappFde}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              data-track="FDE course: price tower WhatsApp"
            >
              WhatsApp to reserve a seat
            </a>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Prerequisite: {FDE_COURSE.prerequisite}
            </p>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Outside India? Message WhatsApp for Wise or bank transfer after we confirm seats.
            </p>
          </aside>
        </div>
      </section>

      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FDE_INCLUDES.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-sm font-bold">{item.value}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-80 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Free demo */}
      <section id="demo" className="py-14 md:py-20 bg-emerald-50 border-b border-emerald-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_minmax(0,460px)] gap-10 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-3">Free live demo on Zoom</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              See how the cohort works before you pay
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {FDE_COURSE.demoDate}, {FDE_COURSE.demoTime}, about {FDE_COURSE.demoLength}. Live with Rajinikanth Vadla. Ask
              anything. Decide after.
            </p>
            <ol className="space-y-3 mb-6">
              {FDE_DEMO_AGENDA.map((item, index) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-slate-800 leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
            <ul className="space-y-1.5 text-sm text-slate-700">
              <li>✓ Free to attend. You pay only if you join the cohort.</li>
              <li>✓ The Zoom link is sent to your WhatsApp, not posted publicly, to keep the session clean.</li>
              <li>✓ Classes start the next morning: Monday 7 December, 7:00 AM IST.</li>
            </ul>
          </div>
          <FdeDemoForm />
        </div>
      </section>

      {/* What is FDE */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Industry context</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {FDE_WHAT_IS.title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">{FDE_WHAT_IS.body}</p>
            <p className="text-slate-600 leading-relaxed">
              This cohort trains that loop on one realistic case so your portfolio shows delivery judgment, not only a
              chat demo.
            </p>
          </div>
          <ul className="space-y-3">
            {FDE_WHAT_IS.points.map((point) => (
              <li key={point} className="panel p-4 flex gap-3 items-start">
                <span className="text-blue-700 font-bold shrink-0">→</span>
                <span className="text-slate-800 text-sm font-medium leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Honest positioning */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">Straight talk</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Practice the FDE loop. Do not buy a job guarantee.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">{FDE_COURSE.positioning}</p>
        </div>
      </section>

      {/* Case */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">The cohort case</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">{FDE_COURSE.caseStudyTitle}</h2>
          <p className="text-slate-600 max-w-3xl text-lg leading-relaxed mb-10">{FDE_COURSE.caseStudy}</p>
          <div className="grid md:grid-cols-3 gap-5">
            {FDE_TEACHING.map((item) => (
              <article key={item.title} className="panel p-6 border-l-4 border-l-orange-500">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Caps / gaps filled */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">Built into the syllabus</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            The hard parts most agent courses skip
          </h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            These are graded. They are why this cohort costs what it costs, and why the work looks believable in an
            interview.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FDE_CAPS.map((cap) => (
              <article key={cap.title} className="panel p-6">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cap.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* For you / not for you */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Who this is for</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Engineers who already ship code</h2>
            <div className="space-y-4">
              {FDE_FOR_YOU.map((item) => (
                <article key={item.role} className="panel p-5 border-l-4 border-l-blue-700">
                  <h3 className="font-display font-bold text-base text-slate-900 mb-1">{item.role}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.gain}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">Who should wait</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Not a fit (yet)</h2>
            <ul className="space-y-4 mb-8">
              {FDE_NOT_FOR.map((line) => (
                <li key={line} className="panel p-5 text-sm text-slate-700 leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">
              Need Python first? Start free:{" "}
              <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
                Python course with in-browser compiler
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section id="syllabus" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Syllabus</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            8 weeks: customer problem to production
          </h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            Each week ends with a graded artifact. Kubernetes and cloud stay supporting topics. The delivery loop is the
            product.
          </p>
          <div className="space-y-4">
            {FDE_WEEKS.map((w) => (
              <article key={w.week} className="panel p-5 md:p-6 grid md:grid-cols-[72px_1fr_240px] gap-4 md:gap-6 items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Week</p>
                  <p className="font-display text-3xl font-bold text-slate-900">{w.week}</p>
                </div>
                <div>
                  <h3 className="sr-only">Week {w.week} focus</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{w.focus}</p>
                </div>
                <div className="md:border-l md:border-slate-200 md:pl-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-1">You ship</p>
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">{w.output}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final project */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">Final project</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Portfolio package, not a quiz</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Week 8 is a working package you can walk through in interviews: demo, evidence, and the playbook that shows
            you think like field delivery, not like a tutorial watcher.
          </p>
          <ul className="space-y-3">
            {FDE_FINAL_REQUIREMENTS.map((req) => (
              <li key={req} className="flex gap-3 panel p-4 items-start">
                <span className="text-blue-700 font-bold shrink-0">→</span>
                <span className="text-slate-800 font-medium">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[200px_1fr] gap-10 items-center">
          <div className="mx-auto md:mx-0">
            <Image
              src="/assets/rajinikanth-portrait.jpg"
              alt="Rajinikanth Vadla, FDE and AI Platform Engineering trainer"
              width={200}
              height={200}
              className="rounded-lg border border-slate-200 object-cover w-[200px] h-[200px]"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Your instructor</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Rajinikanth Vadla</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              {YEARS_EXPERIENCE} years in enterprise delivery. Live trainer for AI Platform Engineering, MLOps, AIOps,
              LLMOps, agents, and FDE. 500+ engineers trained. Classes are live with critique, not only slides.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800"
              >
                LinkedIn
              </a>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-500"
              >
                YouTube
              </a>
              <Link
                href="/about/"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-500"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StudentFeedbacks initial={reviews} limit={4} />

      {/* Compare */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3">Pick the right path</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-10">How this compares</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {FDE_COMPARE.map((item) => (
              <article key={item.title} className="panel p-6">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-3 text-center">Investment</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3 text-center">First cohort pricing</h2>
          <p className="text-center text-slate-600 mb-10 max-w-xl mx-auto">{FDE_COURSE.earlyBirdRule} Same syllabus, same live classes, same recordings.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <article className="panel p-7 border-l-4 border-l-orange-500 relative">
              <span className="absolute top-4 right-4 rounded bg-orange-500 text-white text-[10px] font-bold uppercase px-2 py-1">
                Till {FDE_COURSE.demoShort} · 8 seats
              </span>
              <p className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-2">Early bird</p>
              <p className="font-display text-4xl font-bold text-slate-900">{FDE_COURSE.earlyBirdDisplay}</p>
              <div className="mt-2">
                <Countdown
                  variant="inline"
                  phases={[{ until: FDE_COURSE.earlyBirdEndIso, label: "Ends in" }]}
                  after="Early bird has closed."
                />
              </div>
              <p className="text-sm text-slate-500 mt-2 mb-6">Pay by {FDE_COURSE.earlyBirdDeadline}. Full syllabus with security, cost, and playbook caps.</p>
              <a
                href={LINKS.whatsappFde}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600"
                data-track="FDE course: early bird CTA"
              >
                Claim early bird on WhatsApp
              </a>
            </article>
            <article className="panel p-7 border-l-4 border-l-blue-700">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">Regular fee</p>
              <p className="font-display text-4xl font-bold text-slate-900">{FDE_COURSE.priceDisplay}</p>
              <p className="text-sm text-slate-500 mt-2 mb-6">From Monday 7 December, or once the 8 early bird seats are taken · same live format</p>
              <a
                href={LINKS.whatsappFde}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800"
                data-track="FDE course: regular price CTA"
              >
                Ask seat availability
              </a>
            </article>
          </div>
          <div className="mt-10 grid md:grid-cols-[1fr_1fr] gap-6">
            <div className="panel p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">How enrolment works</h3>
              <ol className="space-y-2.5">
                {FDE_ENROL_STEPS.map((stepText, index) => (
                  <li key={stepText} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-blue-700 shrink-0">{index + 1}.</span>
                    {stepText}
                  </li>
                ))}
              </ol>
            </div>
            <div className="panel p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">If plans change</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Fees are not refunded in cash once paid. If you cannot continue, you can move your seat to a later batch
                at no extra cost. Message on WhatsApp before you stop attending.{" "}
                <Link href="/refund-policy/" className="font-semibold text-blue-700 hover:underline">
                  Read the refund policy
                </Link>
                .
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">
                Questions before paying? Message Rajinikanth directly on{" "}
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">
                  WhatsApp +91 91000 28801
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO intent block + internal links */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">{FDE_SEO_BLOCK.heading}</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed mb-10">
            {FDE_SEO_BLOCK.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Related guides and programs</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {FDE_RELATED_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block panel p-4 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-10 text-center">
            Forward Deployed AI Engineering FAQ
          </h2>
          <div className="space-y-4">
            {FDE_FAQS.map((f) => (
              <details key={f.q} className="panel p-5 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to own a customer AI outcome?</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Message on WhatsApp with your background (Python and API level, plus target role). I will confirm early bird
            seats and the next step to pay.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={LINKS.whatsappFde}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              data-track="FDE course: final WhatsApp"
            >
              WhatsApp: reserve early bird {FDE_COURSE.earlyBirdDisplay}
            </a>
            <Link
              href="/courses/"
              className="inline-flex px-6 py-3 rounded-lg text-sm font-semibold border-2 border-slate-500 text-white hover:border-white"
            >
              Compare all programs
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white p-3 safe-pb flex gap-2">
        <a
          href="#demo"
          className="flex-1 text-center px-3 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white"
          data-track="FDE course: mobile sticky free demo"
        >
          Free demo · {FDE_COURSE.demoShort}
        </a>
        <a
          href={LINKS.whatsappFde}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-3 py-3 rounded-lg text-sm font-semibold border-2 border-emerald-600 text-emerald-700"
          data-track="FDE course: mobile sticky WhatsApp"
        >
          Early bird · WhatsApp
        </a>
      </div>
    </div>
  );
}
