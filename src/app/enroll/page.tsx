import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LINKS } from "@/lib/constants";
import { sketch, HOME_SKETCH } from "@/lib/sketch-assets";
import YouTubeMembershipSection from "@/components/YouTubeMembershipSection";

export const metadata: Metadata = {
  title: "Enroll Now | MLOps Course ₹40K Live or ₹30K Recordings | 2 Payment Plans",
  description:
    "MLOps, AIOps, AI Agents course enrollment: Choose live cohort (₹40,000 with 2 installments + mentorship) or recordings-only (₹30,000 with 2 installments). Direct WhatsApp payment support.",
  keywords: [
    "MLOps course buy",
    "MLOps course enroll",
    "MLOps course price",
    "MLOps course installments",
    "buy MLOps course",
    "enroll MLOps course",
    "AIOps course enrollment",
    "AI agents course buy",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/enroll/" },
};

export default function EnrollPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Enroll in the MLOps Course Today
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Two flexible payment options. Same world-class instructor. Choose your learning style and start building production AI systems.
          </p>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Option 1: Live Cohort */}
            <div className="panel border-l-4 border-l-blue-700 p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                    Recommended
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                    Live Cohort
                  </h2>
                  <p className="text-slate-600 text-sm mt-2">Full support & mentorship</p>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b-2 border-dashed border-slate-300">
                <p className="text-slate-500 text-sm mb-2">Total Investment</p>
                <p className="text-5xl md:text-6xl font-bold text-blue-700 mb-2">₹40,000</p>
                <p className="text-slate-700 font-semibold text-lg">Or 2 payments of ₹20,000</p>
                <p className="text-slate-500 text-sm mt-3">International: $450 USD or €420 EUR</p>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-display font-bold text-slate-900">What you get:</h3>
                <ul className="space-y-3">
                  {[
                    "4–5 months live online cohort",
                    "Mon–Fri, 8:00–9:45 PM IST",
                    "150+ hours hands-on training",
                    "6 comprehensive modules",
                    "4 capstone portfolio projects",
                    "1-on-1 mentorship from Rajinikanth",
                    "Mock interviews & interview prep",
                    "Job assistance & placement support",
                    "Lifetime access to all recordings",
                    "Community slack / WhatsApp group",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg text-base font-semibold transition-colors text-center mb-3"
              >
                Enroll Live Cohort on WhatsApp →
              </a>
              <p className="text-xs text-slate-500 text-center">
                WhatsApp to discuss timing, payment plan, and demo access
              </p>
            </div>

            {/* Option 2: Recordings */}
            <div className="panel border-l-4 border-l-slate-400 p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-block bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                    Self-Learning
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                    Recordings Only
                  </h2>
                  <p className="text-slate-600 text-sm mt-2">Learn at your own pace</p>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b-2 border-dashed border-slate-300">
                <p className="text-slate-500 text-sm mb-2">Total Investment</p>
                <p className="text-5xl md:text-6xl font-bold text-slate-900 mb-2">₹30,000</p>
                <p className="text-slate-700 font-semibold text-lg">Or 2 payments of ₹15,000</p>
                <p className="text-slate-500 text-sm mt-3">International: $375 USD or €350 EUR</p>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-display font-bold text-slate-900">What you get:</h3>
                <ul className="space-y-3">
                  {[
                    "4–5 months of recorded sessions",
                    "150+ hours of video content",
                    "6 comprehensive modules",
                    "4 capstone projects + solutions",
                    "All lecture notes & resources",
                    "Lifetime access (no expiry)",
                    "Watch anytime, anywhere",
                    "No live classes",
                    "No 1-on-1 mentorship",
                    "No job assistance",
                  ].map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm ${
                        item.toLowerCase().includes("no") ? "text-slate-500" : "text-slate-700"
                      }`}
                    >
                      <span className={`font-bold shrink-0 mt-0.5 ${item.toLowerCase().includes("no") ? "text-slate-400" : "text-slate-600"}`}>
                        {item.toLowerCase().includes("no") ? "—" : "✓"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-lg text-base font-semibold transition-colors text-center mb-3"
              >
                Buy Recordings on WhatsApp →
              </a>
              <p className="text-xs text-slate-500 text-center">
                WhatsApp to arrange payment & get instant access
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-16 pt-16 border-t-2 border-slate-200">
            <h3 className="font-display text-2xl font-bold text-slate-900 text-center mb-10">
              Quick Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-blue-700">Live Cohort</th>
                    <th className="text-center py-4 px-4 font-bold text-slate-600">Recordings</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Price", live: "₹40,000 (2 × ₹20K)", recordings: "₹30,000 (2 × ₹15K)" },
                    { feature: "Duration", live: "4–5 months live", recordings: "Self-paced" },
                    { feature: "Live Classes", live: "✓ Yes", recordings: "✗ No" },
                    { feature: "Mentorship", live: "✓ 1-on-1", recordings: "✗ No" },
                    { feature: "Job Support", live: "✓ Yes", recordings: "✗ No" },
                    { feature: "Interview Prep", live: "✓ Yes", recordings: "✗ No" },
                    { feature: "Content Hours", live: "150+ hours", recordings: "150+ hours" },
                    { feature: "Capstone Projects", live: "✓ 4 projects", recordings: "✓ 4 + solutions" },
                    { feature: "Lifetime Access", live: "✓ Recordings", recordings: "✓ Videos" },
                    { feature: "Community", live: "✓ Priority", recordings: "✗ Optional" },
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b border-slate-200 ${idx % 2 === 0 ? "bg-slate-50" : ""}`}>
                      <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-slate-700">{row.live}</td>
                      <td className="py-4 px-4 text-center text-slate-700">{row.recordings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans Explanation */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
            How Payment Plans Work
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 2 Installments */}
            <div className="panel p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                2-Installment Payment
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Split your payment into two equal parts over 30–60 days. No interest, no hidden charges.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-slate-700">
                  <span className="font-bold">Live Course:</span> ₹20,000 due at enrollment + ₹20,000 within 30–45 days
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-bold">Recordings:</span> ₹15,000 due at enrollment + ₹15,000 within 30–45 days
                </p>
              </div>
            </div>

            {/* How to Pay */}
            <div className="panel p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                How to Enroll & Pay
              </h3>
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">1.</span>
                  <span>Message WhatsApp with your choice (Live or Recordings)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">2.</span>
                  <span>We'll send you payment details and installment breakdown</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">3.</span>
                  <span>Pay first installment via bank transfer or UPI</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">4.</span>
                  <span>Get instant access + enrollment confirmation</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">5.</span>
                  <span>Pay second installment on agreed date</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What if I can't make the second payment?",
                a: "Contact us immediately via WhatsApp. We'll work out a new timeline with you — no penalties.",
              },
              {
                q: "Do you accept international payments?",
                a: "Yes! We accept bank transfers, Wise transfers, and international payment methods. Contact us for details.",
              },
              {
                q: "When does the live cohort start?",
                a: "The current cohort started July 15, 2026. Next intake timing depends on enrollment. WhatsApp to confirm dates.",
              },
              {
                q: "Can I switch from Recordings to Live later?",
                a: "Yes, you can upgrade from recordings to live mid-course if spots are available. We'll adjust pricing.",
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, 7-day no-questions-asked refund for live cohort. Recordings are non-refundable but lifetime access.",
              },
              {
                q: "Do I get a discount for bulk enrollment?",
                a: "Yes! Teams of 3+ get 15% off. Message WhatsApp for corporate pricing.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="panel p-6 cursor-pointer group">
                <summary className="font-bold text-slate-900 flex justify-between items-center">
                  {faq.q}
                  <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 text-sm mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <YouTubeMembershipSection compact />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Choose your path, arrange payment on WhatsApp, and start building production AI systems in days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg text-base font-bold transition-colors"
            >
              Enroll on WhatsApp Now
            </a>
            <Link
              href="/mlops-aiops-masterclass"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg text-base font-bold transition-colors"
            >
              Back to Course Details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
