import Link from "next/link";

const GROUPS = [
  {
    title: "Learn & enroll",
    links: [
      { href: "/enroll/", label: "Enroll & pricing" },
      { href: "/syllabus/", label: "Full syllabus" },
      { href: "/mlops-aiops-masterclass/", label: "MLOps · AIOps masterclass" },
      { href: "/courses/ai-automation/", label: "AI Automation course" },
      { href: "/mentorship/", label: "1:1 Mentorship" },
    ],
  },
  {
    title: "Free study",
    links: [
      { href: "/python-course/", label: "Free Python course" },
      { href: "/architecture/", label: "Architecture diagrams" },
      { href: "/interview-questions/", label: "Interview questions" },
      { href: "/roadmap/", label: "Career roadmaps" },
      { href: "/blog/", label: "Blog & tutorials" },
    ],
  },
  {
    title: "By region",
    links: [
      { href: "/global-training/", label: "Global training hub" },
      { href: "/mlops-course-india/", label: "MLOps India" },
      { href: "/global-training/usa/", label: "MLOps USA" },
      { href: "/global-training/uk/", label: "MLOps UK" },
      { href: "/global-training/ireland/", label: "MLOps Ireland" },
    ],
  },
] as const;

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
          MLOps, AIOps, LLMOps, AI Agents, GenAI, and mentorship: courses, free resources, and regional pages for
          India, USA, UK, and Europe.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-display font-bold text-sm text-[#0f172a] mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
