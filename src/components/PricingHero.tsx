import Link from "next/link";
import { LINKS } from "@/lib/constants";

export default function PricingHero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Cohort Running Now
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Master MLOps, AIOps & AI Agents
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            4–5 month live masterclass from DevOps through production AI systems. 150+ hours of hands-on training. Choose your learning style.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Live Cohort */}
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-shadow transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                  RECOMMENDED
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">Live Cohort</h2>
              </div>
              <span className="text-4xl">🎓</span>
            </div>

            <div className="mb-8 pb-8 border-b-2 border-blue-100">
              <p className="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Investment</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-blue-700">₹40,000</span>
                <span className="text-slate-600 text-lg">or 2 × ₹20,000</span>
              </div>
              <p className="text-slate-700 text-sm font-semibold mt-2 text-center">🔴 Classes Already Started</p>
              <p className="text-slate-600 text-sm mt-2">No interest • No hidden charges</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "4–5 months live online",
                "1-on-1 mentorship",
                "150+ hands-on hours",
                "4 capstone projects",
                "Job assistance & placement",
                "Interview prep included",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-700 text-sm">
                  <span className="text-blue-600 text-lg">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-lg transition-colors text-center mb-3"
            >
              Enroll on WhatsApp →
            </a>
            <p className="text-xs text-slate-500 text-center">Direct to Rajinikanth • Payment plans available</p>
          </div>

          {/* Recordings Only */}
          <div className="bg-slate-900 rounded-xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-block bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
                  SELF-LEARNING
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Recordings</h2>
              </div>
              <span className="text-4xl">🎬</span>
            </div>

            <div className="mb-8 pb-8 border-b-2 border-slate-700">
              <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-bold">Investment</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">₹30,000</span>
                <span className="text-slate-400 text-lg">or 2 × ₹15,000</span>
              </div>
              <p className="text-slate-400 text-sm mt-3">Lifetime access • Learn anytime</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "150+ hours of videos",
                "Lifetime access (no expiry)",
                "All course materials",
                "4 capstone projects",
                "Watch at your pace",
                "No live support needed",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-slate-400 text-lg">→</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-lg transition-colors text-center mb-3"
            >
              Get Recordings on WhatsApp →
            </a>
            <p className="text-xs text-slate-400 text-center">Instant access after payment</p>
          </div>
        </div>

        {/* Comparison Link */}
        <div className="text-center">
          <Link
            href="/enroll"
            className="inline-flex items-center gap-2 text-white hover:text-blue-200 font-semibold transition-colors"
          >
            See full comparison & payment plans
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
