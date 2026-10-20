import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import YouTubeMembershipSection from "@/components/YouTubeMembershipSection";
import CoursePricing from "@/components/CoursePricing";
import { CoursePrice } from "@/components/LocalPrice";

export const metadata: Metadata = {
  title: "Enroll: MLOps, AIOps, LLMOps & Agentic AI Course – Fees & Payment",
  description:
    "Enroll in the live MLOps, AIOps, LLMOps, Agentic AI, GenAI and FDE course. Live cohort with 1:1 mentorship or self-paced recordings. Secure Razorpay checkout.",
  keywords: [
    "MLOps course buy",
    "MLOps course enroll",
    "MLOps course price",
    "buy MLOps course",
    "enroll MLOps course",
    "AIOps course enrollment",
    "AI agents course buy",
  ],
  alternates: { canonical: "https://rajinikanthvadla.com/enroll/" },
};

export default function EnrollPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Courses", path: "/courses/" }, { name: "Enroll", path: "/enroll/" }]} />
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Enroll in the MLOps, AIOps, LLMOps &amp; Agentic AI course
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Live cohort or self-paced recordings. Same instructor, same 150+ hours. Pay securely in your currency and start building production AI systems.
          </p>
        </div>
      </section>

      <CoursePricing />

      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          {/* Comparison Table */}
          <div>
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
                    { feature: "Price", live: <CoursePrice plan="live" />, recordings: <CoursePrice plan="recordings" /> },
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

      {/* Secure payment explanation */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
            How Secure Payment Works
          </h2>

          <div className="panel p-8 max-w-xl mx-auto">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                How to Enroll & Pay
              </h3>
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">1.</span>
                  <span>Choose Live Cohort or Recordings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">2.</span>
                  <span>Complete payment on the secure Razorpay page</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold shrink-0">3.</span>
                  <span>Receive your payment receipt and enrollment confirmation</span>
                </li>
              </ol>
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
