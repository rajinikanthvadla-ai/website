import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { AGENTIC_FDE } from "@/lib/agentic-fde-training";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const URL = `${SITE.url}${AGENTIC_FDE.path}`;
const OG_IMAGE = `${SITE.url}${AGENTIC_FDE.statusImage}`;

export const metadata: Metadata = {
  title: "Agentic AI Architecture & FDE — November 2026 Customized Training",
  description:
    "Limited seats: customized Agentic AI Architecture and Forward Deployed Engineering training with Rajinikanth Vadla. 8–10 weeks live, 5–6 students, weekly 1:1. Syllabus PDF online. ₹70,000.",
  keywords: [
    "Agentic AI Architecture course",
    "Forward Deployed Engineering training",
    "FDE course India",
    "AI architect training",
    "LangGraph MCP course",
    "Rajinikanth Vadla",
    "November 2026 AI training",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Agentic AI Architecture & FDE — Limited November 2026 seats",
    description:
      "Customized live training for senior engineers and architects. 5–6 seats, 8–10 weeks, weekly 1:1. Open the syllabus and message WhatsApp to reserve.",
    url: URL,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1080,
        height: 1920,
        alt: "Agentic AI Architecture & FDE — November 2026 limited seats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic AI Architecture & FDE — November 2026",
    description: "Limited customized batch. Syllabus on the page. Reserve on WhatsApp.",
    images: [OG_IMAGE],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: AGENTIC_FDE.title,
  description:
    "Customized live training for experienced engineers moving into AI architect, forward deployed engineer, advisory, or founder roles.",
  provider: {
    "@type": "Person",
    name: AGENTIC_FDE.trainer,
    url: SITE.url,
  },
  url: URL,
  image: OG_IMAGE,
  offers: {
    "@type": "Offer",
    price: "70000",
    priceCurrency: "INR",
    availability: "https://schema.org/LimitedAvailability",
    url: URL,
    validThrough: "2026-11-30",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT6H",
    startDate: "2026-11-01",
  },
};

export default function AgenticFdePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <BreadcrumbJsonLd items={[{ name: "Agentic AI & FDE", path: AGENTIC_FDE.path }]} />

      <section className="notion-hero !py-12 md:!py-16">
        <div className="notion-hero-inner !gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-600 mb-3">
              <span className="rounded bg-orange-700 px-2 py-0.5 text-white">Limited time</span>
              {AGENTIC_FDE.batchLabel}
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
              {AGENTIC_FDE.shortTitle}
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-3">
              Customized training with {AGENTIC_FDE.trainer}. For people with {AGENTIC_FDE.experience}.
              Depth and examples adjusted to your background and target role.
            </p>
            <p className="text-orange-700 font-semibold text-sm md:text-base mb-6">
              {AGENTIC_FDE.urgency}. Only {AGENTIC_FDE.seats}.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={LINKS.whatsappAgenticFde}
                target="_blank"
                rel="noopener noreferrer"
                className="notion-btn notion-btn--accent"
              >
                Reserve seat on WhatsApp
              </a>
              <a href="#syllabus-pdf" className="notion-btn notion-btn--ink">
                View syllabus PDF
              </a>
              <a
                href={AGENTIC_FDE.pdfPath}
                download
                className="notion-btn notion-btn--ghost"
              >
                Download PDF
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-4 max-w-lg">
              {[
                { label: "Duration", value: AGENTIC_FDE.duration },
                { label: "Fee", value: `${AGENTIC_FDE.feeInr} ${AGENTIC_FDE.feeNote}` },
                { label: "Batch size", value: AGENTIC_FDE.seats },
                { label: "Format", value: AGENTIC_FDE.mode },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-blue-700">{item.label}</dt>
                  <dd className="text-sm text-slate-800 mt-1 font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="overflow-hidden rounded-lg border-2 border-[#0f172a] shadow-[4px_4px_0_#ea580c] bg-[#0f172a]">
              <Image
                src={AGENTIC_FDE.statusImage}
                alt={`${AGENTIC_FDE.shortTitle} promotional poster for November 2026`}
                width={720}
                height={1280}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <p className="text-center text-xs text-slate-500 mt-3">
              Share this page:{" "}
              <span className="font-semibold text-slate-700">rajinikanthvadla.com/agentic-fde/</span>
            </p>
          </div>
        </div>
      </section>

      <section className="notion-section bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
            What you get in this batch
          </h2>
          <p className="text-slate-600 max-w-2xl mb-8">
            One client-style project from start to end. Every week adds a piece the way a real FDE or
            consulting engagement works.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {AGENTIC_FDE.highlights.map((item) => (
              <li
                key={item}
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 bg-slate-50"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">Classes</p>
              <p className="text-slate-800 font-medium">{AGENTIC_FDE.schedule}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">1:1 sessions</p>
              <p className="text-slate-800 font-medium">{AGENTIC_FDE.oneOnOne}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">After course</p>
              <p className="text-slate-800 font-medium">{AGENTIC_FDE.supportAfter}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="notion-section">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-4">Who should join</h2>
            <ul className="space-y-3">
              {AGENTIC_FDE.whoFor.map((item) => (
                <li key={item} className="text-slate-700 text-sm leading-relaxed pl-4 border-l-2 border-orange-500">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-500 text-sm mt-5">
              You should read and write Python. Prior AI experience is not required — systems, cloud,
              data and client work is the base we build on.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-4">By the end</h2>
            <ul className="space-y-3">
              {AGENTIC_FDE.outcomes.map((item) => (
                <li key={item} className="text-slate-700 text-sm leading-relaxed pl-4 border-l-2 border-blue-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="syllabus-pdf" className="notion-section bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] mb-2">
                Full syllabus PDF
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl">
                Read the week-by-week plan here, or download it. Same document you can share with
                managers or peers.
              </p>
            </div>
            <a
              href={AGENTIC_FDE.pdfPath}
              download
              className="shrink-0 inline-flex items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 text-sm font-semibold transition-colors"
            >
              Download syllabus PDF
            </a>
          </div>
          <div className="rounded-lg border-2 border-[#0f172a] overflow-hidden bg-white shadow-[4px_4px_0_#0f172a]">
            <iframe
              title="Agentic AI Architecture and FDE syllabus PDF"
              src={`${AGENTIC_FDE.pdfPath}#view=FitH`}
              className="w-full h-[70vh] min-h-[480px]"
            />
          </div>
          <p className="text-xs text-slate-500 mt-3">
            If the preview does not load on your phone,{" "}
            <a href={AGENTIC_FDE.pdfPath} className="text-blue-700 font-semibold underline" target="_blank" rel="noopener noreferrer">
              open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      <section className="notion-section bg-white">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
          <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-3">
            WhatsApp status link
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mb-6">
            Put this URL in your WhatsApp status so people land on details, PDF, and WhatsApp reserve.
            Use the poster image below as the status photo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
            <code className="rounded-lg bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-[#0f172a] font-semibold break-all">
              {URL}
            </code>
            <a
              href={AGENTIC_FDE.statusImage}
              download="agentic-fde-whatsapp-status.jpg"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 hover:border-slate-500 text-slate-800 px-5 py-3 text-sm font-semibold transition-colors"
            >
              Download status image
            </a>
          </div>
          <div className="max-w-xs">
            <Image
              src={AGENTIC_FDE.statusImage}
              alt="WhatsApp status poster for Agentic AI FDE training"
              width={540}
              height={960}
              className="w-full rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#0f172a] bg-[#0f172a] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.14em] mb-2">
              {AGENTIC_FDE.intakeEndsLabel}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Only a few seats left this month
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-lg">
              Message on WhatsApp with your background and target role. Fee {AGENTIC_FDE.feeInr}{" "}
              {AGENTIC_FDE.feeNote}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={LINKS.whatsappAgenticFde}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-semibold transition-colors"
            >
              WhatsApp to join
            </a>
            <Link
              href="/enroll/"
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 text-sm font-semibold transition-colors"
            >
              All programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
