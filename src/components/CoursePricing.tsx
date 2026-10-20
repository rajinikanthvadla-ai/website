"use client";

import { LINKS } from "@/lib/constants";
import TrustStrip from "@/components/TrustStrip";
import { setRegionOverride, useDisplayZone, type VisitorZone } from "@/components/visitor-zone";
import { COURSE_PAYMENT_PAGES, COURSE_PLANS, COURSE_REFUND_NOTE } from "@/lib/course-pricing";

const ZONE_TABS: { id: VisitorZone; label: string }[] = [
  { id: "A", label: "International (USD)" },
  { id: "C", label: "India & South Asia (₹)" },
];

function whatsappPayLink(planName: string, price: string) {
  const text = `Hi Rajinikanth, I want to join the MLOps course – ${planName} (${price}). Please send me the payment link.`;
  return `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Course prices in ₹ or $ by visitor location, with direct Razorpay checkout. */
export default function CoursePricing({ defaultZone }: { defaultZone?: VisitorZone } = {}) {
  const zone = useDisplayZone(defaultZone);

  return (
    <section id="pricing" className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">
            Fees & enrollment
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Join the MLOps · AIOps · LLMOps · Agentic AI masterclass
          </h2>
          <p className="text-slate-600">Same course, same mentor everywhere. Pay securely in your currency.</p>
        </div>

        <div role="tablist" aria-label="Choose your region" className="flex flex-wrap justify-center gap-2 mb-10">
          {ZONE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={zone === tab.id}
              onClick={() => setRegionOverride(tab.id)}
              className={`px-4 py-2 text-sm font-semibold border rounded-lg transition-colors ${
                zone === tab.id
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-300 text-slate-700 hover:border-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {COURSE_PLANS.map((plan) => {
            const price = plan.prices[zone];
            const payPage = COURSE_PAYMENT_PAGES[zone][plan.id];
            return (
              <div
                key={plan.id}
                className={`relative panel p-8 flex flex-col text-left ${plan.featured ? "border-2 !border-blue-700" : ""}`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 bg-blue-700 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded">
                    Recommended
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-5">{plan.tagline}</p>
                <p className="text-5xl font-bold text-slate-900 mb-1">{price}</p>
                <p className="text-xs text-slate-500 mb-6">One-time payment</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-blue-700 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                  {plan.excludes?.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-500">
                      <span className="font-bold">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={payPage ?? whatsappPayLink(plan.name, price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-lg text-sm font-semibold text-white transition-colors ${
                    plan.featured ? "bg-blue-700 hover:bg-blue-800" : "bg-slate-800 hover:bg-slate-900"
                  }`}
                >
                  {payPage ? `Pay ${price} securely →` : `Enroll for ${price} →`}
                </a>
                <p className="mt-2 text-center text-xs text-slate-500">
                  {payPage ? "Secure Razorpay checkout" : "Get your secure payment link on WhatsApp"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <TrustStrip refundNote={COURSE_REFUND_NOTE} />
        </div>

        <p className="text-center text-sm text-slate-600 mt-8">
          Questions about batch timing or the syllabus?{" "}
          <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">
            Message on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
