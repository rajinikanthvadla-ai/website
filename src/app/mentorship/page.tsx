import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "1:1 Mentorship",
  description: "Get personal mentorship from Rajinikanth Vadla. Career guidance, interview prep, resume review, and hands-on project help.",
};

export default function MentorshipPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-24 overflow-hidden">
        <div className="orb orb-1" style={{ opacity: 0.15 }} />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.15em] text-primary-600 mb-3">Personal Guidance</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5">1:1 Mentorship</h1>
          <p className="text-lg text-gray-600">Accelerate your career with personal guidance from an industry expert</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass rounded-3xl p-10 mb-16 border border-primary-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Accelerate Your Career</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Whether you&apos;re trying to break into AI/ML, level up your DevOps skills, or transition to a new role,
              personalized mentorship can save you months of trial and error.
            </p>
            <h3 className="font-bold text-gray-900 mb-4">What&apos;s Included:</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Career roadmap planning",
                "Resume & LinkedIn optimization",
                "Mock interview sessions",
                "Technical project guidance",
                "Salary negotiation tips",
                "Industry networking advice",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-accent-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Your Mentorship Journey</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {[
              { step: "01", title: "Discovery Call", desc: "We discuss your current situation, goals, and create a personalized roadmap.", color: "from-primary-600 to-indigo-600" },
              { step: "02", title: "Skill Assessment", desc: "I evaluate your technical skills and identify gaps to focus on.", color: "from-purple-600 to-violet-600" },
              { step: "03", title: "Focused Training", desc: "Hands-on sessions tailored to your learning pace and career goals.", color: "from-accent-500 to-teal-600" },
              { step: "04", title: "Career Launch", desc: "Interview prep, resume optimization, and placement support until you succeed.", color: "from-amber-500 to-orange-600" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white font-black text-sm mb-4 shadow-lg`}>
                  {item.step}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Choose Your Option</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI Mentor Chat", desc: "Chat with my AI assistant for quick answers", href: LINKS.myGPT, btn: "Chat Now", color: "from-purple-600 to-violet-600", shadow: "shadow-purple-600/20" },
              { icon: "📞", title: "Book 1:1 Session", desc: "Personal mentorship call with me", href: LINKS.topmate, btn: "Book Session", color: "from-primary-600 to-indigo-600", shadow: "shadow-primary-600/20" },
              { icon: "💬", title: "Free Enquiry", desc: "Ask questions on WhatsApp first", href: LINKS.whatsapp, btn: "Ask Free", color: "from-green-500 to-emerald-600", shadow: "shadow-green-500/20" },
            ].map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-100 text-center card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${opt.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg ${opt.shadow} group-hover:scale-110 transition-transform`}>
                  {opt.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{opt.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{opt.desc}</p>
                <span className={`inline-block bg-gradient-to-r ${opt.color} text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg ${opt.shadow}`}>
                  {opt.btn}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Accelerate Your Career?" subtitle="Book a free discovery call. Let's discuss your goals and create a plan." />
      <SuccessStories />
    </>
  );
}
