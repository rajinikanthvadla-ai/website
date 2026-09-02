import Link from "next/link";
import {
  AI_AUTOMATION_DURATION,
  AI_AUTOMATION_PRICE,
  LINKS,
  MLOPS_MASTERCLASS_DURATION,
} from "@/lib/constants";
import { AI_AUTOMATION_SYLLABUS_RICH } from "@/lib/ai-automation-content";
import { MLOPS_MASTERCLASS_SYLLABUS } from "@/lib/masterclass-syllabus";

const COURSES = [
  {
    id: "masterclass",
    badge: "Flagship",
    title: "MLOps, AIOps, LLMOps, AI Agents & FDE",
    duration: MLOPS_MASTERCLASS_DURATION,
    price: "₹40,000 live · ₹30,000 recordings",
    href: "/mlops-aiops-masterclass",
    syllabusHref: "/mlops-aiops-masterclass/#full-syllabus",
    whatsapp: LINKS.whatsappSyllabus,
    modules: MLOPS_MASTERCLASS_SYLLABUS.map((mod) => ({
      label: `Module ${mod.module}: ${mod.title}`,
      duration: mod.duration,
    })),
  },
  {
    id: "automation",
    badge: "New",
    title: "AI-Powered Automation Efficiency",
    duration: AI_AUTOMATION_DURATION,
    price: AI_AUTOMATION_PRICE,
    href: "/courses/ai-automation",
    syllabusHref: "/courses/ai-automation/#curriculum",
    whatsapp: LINKS.whatsappAutomation,
    modules: AI_AUTOMATION_SYLLABUS_RICH.map((mod) => ({
      label: `Module ${mod.module}: ${mod.title}`,
      duration: mod.duration,
    })),
  },
] as const;

export default function CourseSyllabusQuickAccess() {
  return (
    <section className="notion-section notion-section--paper border-y border-slate-200" id="syllabus">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Course syllabus
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mt-3 mb-3">
            See what you will learn before you enroll
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Full module breakdown for both live programs. Open the full syllabus, or message on WhatsApp for batch dates, fees, and a quick call.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {COURSES.map((course) => (
            <article key={course.id} className="panel p-6 md:p-8 flex flex-col h-full border-2 border-slate-900 shadow-[4px_4px_0_#0f172a]">
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="notion-dash-badge">{course.badge}</span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">{course.duration}</span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0f172a] mb-2 leading-snug">
                {course.title}
              </h3>
              <p className="text-sm font-semibold text-orange-600 mb-5">{course.price}</p>

              <ul className="space-y-3 mb-6 flex-1">
                {course.modules.map((mod) => (
                  <li key={mod.label} className="text-sm text-slate-700 leading-relaxed border-b border-dashed border-slate-200 pb-3 last:border-0 last:pb-0">
                    <span className="font-semibold text-[#0f172a]">{mod.label}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{mod.duration}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={course.syllabusHref} className="notion-btn notion-btn--ink flex-1 text-center">
                  Full syllabus &rarr;
                </Link>
                <a
                  href={course.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notion-btn notion-btn--accent flex-1 text-center"
                >
                  WhatsApp me
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="panel p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-slate-50">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">Not sure which course?</p>
            <h3 className="font-display font-bold text-lg text-[#0f172a] mb-1">Talk before you commit</h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Share your background (DevOps, ML, QA, student) and goal. I will suggest MLOps masterclass, AI Automation, or 1:1 mentorship.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent text-center">
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="notion-btn notion-btn--ghost text-center">
              Contact page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
