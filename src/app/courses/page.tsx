import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, COURSES } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "Training Courses",
  description:
    "Explore DevOps, MLOps, AIOps, Kubernetes, and AI Agents training programs, plus mentorship for career and transformation. Production-ready skills with hands-on projects. Open to learners worldwide online.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">Training programs</h1>
          <p className="text-lg text-stone-600">
            Cohorts built around what teams actually ship - not slide-only certifications.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Choose Your Path" title="Training Programs" subtitle="From fundamentals to advanced AI systems" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((c) => (
              <div
                key={c.title}
                className={`panel p-6 flex flex-col card-hover ${
                  c.featured ? "border-l-4 border-l-accent-600" : ""
                }`}
              >
                <span className={`self-start text-[11px] font-semibold uppercase tracking-wide mb-3 ${
                  c.featured ? "text-accent-600" : "text-stone-500"
                }`}>
                  {c.badge}
                </span>
                <h3 className={`font-display font-bold text-lg mb-2 ${c.featured ? "text-stone-900" : "text-stone-900"}`}>{c.title}</h3>
                <p className="text-sm text-stone-600 mb-4">{c.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {c.features.map((f) => (
                    <li key={f} className="text-sm text-stone-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {c.href.startsWith("/") ? (
                  <Link href={c.href} className={`w-full text-center py-3 text-sm font-semibold transition-colors ${
                    c.featured ? "bg-accent-600 text-white hover:bg-accent-700" : "bg-stone-900 text-white hover:bg-stone-800"
                  }`}>
                    {c.ctaText}
                  </Link>
                ) : (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors">
                    {c.ctaText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="What You Get" title="What's Included" subtitle="Everything you need for a complete learning experience" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📹", title: "Live Interactive Sessions", desc: "Weekly live classes with Q&A" },
              { icon: "🚀", title: "Hands-on Projects", desc: "Real-world capstone projects" },
              { icon: "💻", title: "Code Reviews", desc: "Personal code review sessions" },
              { icon: "🎯", title: "Career Support", desc: "Resume, interview & placement" },
            ].map((item) => (
              <div key={item.title} className="panel p-6 text-center card-hover">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-stone-900 mb-1">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="FAQ" title="Frequently Asked Questions" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Who is this training for?", a: "Software engineers, DevOps engineers, data scientists, and anyone wanting to break into AI/ML Ops roles." },
              { q: "What are the prerequisites?", a: "Basic programming knowledge and familiarity with Linux. We teach everything else from scratch." },
              { q: "Is the training live or recorded?", a: "All sessions are live with interactive Q&A. Recordings are provided for review." },
              { q: "Do you provide job assistance?", a: "Yes! Resume optimization, mock interviews, and placement support are included." },
              { q: "Can I pay in installments?", a: "Yes, EMI options are available. Contact us on WhatsApp for details." },
              { q: "What if I miss a session?", a: "All sessions are recorded and shared. You get lifetime access to materials." },
            ].map((faq) => (
              <div key={faq.q} className="panel p-6 hover:border-stone-400 transition-colors">
                <h3 className="font-display font-bold text-stone-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Journey?"
        subtitle="Get personalized course recommendations. Let's find the perfect program for you."
      />
      <SuccessStories />
    </>
  );
}
