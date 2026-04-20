import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Rajinikanth Vadla on WhatsApp, Topmate, LinkedIn or YouTube — fastest replies for batch timing, fees and mentorship booking.",
  alternates: { canonical: "https://www.rajinikanthvadla.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Reach out</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">Contact</h1>
          <p className="text-lg text-stone-600">
            Pick a channel you already use - I answer in plain language, usually within a day. Mentorship and career
            questions are welcome from anywhere in the world; say your time zone when you write.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-stone-900 mb-8 text-center">Channels</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              { icon: "💬", title: "WhatsApp", desc: "Fastest for batch timing and fees", href: LINKS.whatsapp },
              { icon: "💼", title: "LinkedIn", desc: "Professional context and referrals", href: LINKS.linkedin },
              { icon: "📸", title: "Instagram", desc: "Short updates and behind-the-scenes", href: LINKS.instagram },
            ].map((ch) => (
              <a
                key={ch.title}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group panel p-8 text-center card-hover"
              >
                <div className="w-14 h-14 border border-stone-200 bg-stone-50 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:border-accent-400 transition-colors">
                  {ch.icon}
                </div>
                <h3 className="font-display font-bold text-stone-900 text-lg mb-1">{ch.title}</h3>
                <p className="text-sm text-stone-600">{ch.desc}</p>
              </a>
            ))}
          </div>

          <h2 className="font-display text-xl font-bold text-stone-900 mb-8 text-center">What do you need?</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              { icon: "📞", title: "Book a call", desc: "1:1 mentorship or career review", href: LINKS.topmate },
              { icon: "🎓", title: "Course enquiry", desc: "Syllabus, dates, and fit", href: LINKS.enroll },
              { icon: "🤖", title: "AI mentor chat", desc: "Lightweight Q&A on concepts", href: LINKS.myGPT },
            ].map((action) => (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group panel p-8 text-center card-hover"
              >
                <div className="w-14 h-14 border border-stone-200 bg-stone-50 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:border-accent-400 transition-colors">
                  {action.icon}
                </div>
                <h3 className="font-display font-bold text-stone-900 text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-stone-600 mb-3">{action.desc}</p>
                <span className="text-accent-600 font-semibold text-sm">Continue &rarr;</span>
              </a>
            ))}
          </div>

          <h2 className="font-display text-xl font-bold text-stone-900 mb-6 text-center">YouTube</h2>
          <div className="panel p-8 md:p-10 text-center max-w-xl mx-auto">
            <h3 className="font-display font-bold text-stone-900 text-lg mb-2">Public labs and talks</h3>
            <p className="text-stone-600 text-sm mb-6">Longer recordings so you can hear how concepts are explained in a real class tone.</p>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors">
              Open channel
            </a>
          </div>
        </div>
      </section>

      <CTASection title="Prefer to talk instead of typing?" subtitle="Book a short Topmate slot - even fifteen minutes can clear a big decision." />
      <SuccessStories />
    </>
  );
}
