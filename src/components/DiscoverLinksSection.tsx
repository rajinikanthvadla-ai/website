import Link from "next/link";
import { INTL_MARKETS } from "@/lib/international-markets";

const LEARN_LINKS = [
  { href: "/enroll/", label: "Enroll & pricing" },
  { href: "/agentic-fde/", label: "Agentic AI & FDE (Nov 2026 · limited)" },
  { href: "/syllabus/", label: "Full syllabus" },
  { href: "/mlops-aiops-masterclass/", label: "MLOps · AIOps masterclass" },
  { href: "/courses/ai-automation/", label: "AI Automation course" },
  { href: "/mentorship/", label: "1:1 Mentorship" },
  { href: "/community/", label: "AI Engineers Insider" },
] as const;

const STUDY_LINKS = [
  { href: "/python-course/", label: "Free Python course" },
  { href: "/architecture/", label: "Architecture diagrams" },
  { href: "/interview-questions/", label: "Interview questions" },
  { href: "/roadmap/", label: "Career roadmaps" },
  { href: "/blog/", label: "Blog & tutorials" },
] as const;

const REGION_LINKS = [
  { href: "/global-training/", label: "Global training hub" },
  { href: "/mlops-course-india/", label: "MLOps India" },
  ...INTL_MARKETS.map((m) => ({
    href: `/global-training/${m.slug}/`,
    label: `MLOps ${m.shortName}`,
  })),
];

/** Crawlable internal link hub. Helps Google and AI assistants find key pages. */
export default function DiscoverLinksSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-12 md:py-14" aria-label="Explore the site">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-2 text-center">
          Explore Rajinikanth Vadla
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f172a] text-center mb-2">
          Find the right page fast
        </h2>
        <p className="text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
          Courses, free study resources, and regional landing pages for local search, timezone fit, and enroll
          pricing. Live online training open worldwide.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="font-display font-bold text-sm text-[#0f172a] mb-3">Learn & enroll</h3>
            <ul className="space-y-2">
              {LEARN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-[#0f172a] mb-3">Free study</h3>
            <ul className="space-y-2">
              {STUDY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-[#0f172a] mb-3">Regional pages</h3>
            <ul className="space-y-2">
              {REGION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
