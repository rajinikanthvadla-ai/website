import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";
import CTASection from "@/components/CTASection";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rajinikanth Vadla. Book a session, ask questions, or connect on social media.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-24 overflow-hidden">
        <div className="orb orb-1" style={{ opacity: 0.15 }} />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.15em] text-primary-600 mb-3">Reach out</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5">Get In Touch</h1>
          <p className="text-lg text-gray-600">Choose your preferred way to connect. I reply within 24 hours!</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Choose Your Preferred Channel</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "💬", title: "WhatsApp", desc: "Quick replies, batch details", href: LINKS.whatsapp, color: "from-green-500 to-emerald-600", shadow: "shadow-green-500/20" },
              { icon: "💼", title: "LinkedIn", desc: "Professional networking", href: LINKS.linkedin, color: "from-blue-600 to-indigo-600", shadow: "shadow-blue-600/20" },
              { icon: "📸", title: "Instagram", desc: "Daily tips & updates", href: LINKS.instagram, color: "from-pink-500 to-rose-600", shadow: "shadow-pink-500/20" },
            ].map((ch) => (
              <a
                key={ch.title}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-100 text-center card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${ch.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg ${ch.shadow} group-hover:scale-110 transition-transform`}>
                  {ch.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{ch.title}</h3>
                <p className="text-sm text-gray-500">{ch.desc}</p>
              </a>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">What Would You Like to Do?</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "📞", title: "Book a Call", desc: "1:1 career guidance", href: LINKS.topmate, color: "from-primary-600 to-indigo-600" },
              { icon: "🎓", title: "Course Enquiry", desc: "Get syllabus & details", href: LINKS.enroll, color: "from-accent-500 to-teal-600" },
              { icon: "🤖", title: "AI Mentor Chat", desc: "Chat with my AI assistant", href: LINKS.myGPT, color: "from-purple-600 to-violet-600" },
            ].map((action) => (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 text-center card-hover overflow-hidden"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{action.desc}</p>
                <span className="text-primary-600 font-semibold text-sm">Get Started &rarr;</span>
              </a>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Watch &amp; Learn</h2>
          <div className="bg-gradient-to-br from-gray-950 to-indigo-950 rounded-3xl p-10 text-center">
            <div className="text-5xl mb-4">▶️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Free Content on YouTube</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Watch real training demos, tutorials, and tips on my YouTube channel. New content every week!</p>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-red-500/25 hover:-translate-y-1 transition-all">
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      <CTASection title="Let's Connect!" subtitle="I'm always happy to chat. Whether it's about courses, career advice, or just tech talk." />
      <SuccessStories />
    </>
  );
}
