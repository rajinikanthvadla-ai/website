"use client";

import { LINKS } from "@/lib/constants";
import TrustStrip from "@/components/TrustStrip";
import { useDisplayZone, type VisitorZone } from "@/components/visitor-zone";
import { COURSE_PAYMENT_PAGES, COURSE_PLANS, type CoursePlan } from "@/lib/course-pricing";

function whatsappPayLink(planName: string, price: string) {
  const text = `Hi Rajinikanth, I want to join the MLOps course – ${planName} (${price}). Please send me the payment link.`;
  return `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}

const AFTER_PAYMENT = [
  { step: "1", title: "Instant receipt", desc: "Razorpay emails your payment receipt straight away." },
  { step: "2", title: "Joining details", desc: "Class schedule, community and course access within 24 hours." },
  { step: "3", title: "Start learning", desc: "Join the next live class, or start the recordings the same day." },
];

function PayButton({ plan, zone, primary }: { plan: CoursePlan; zone: VisitorZone; primary?: boolean }) {
  const price = plan.prices[zone];
  const payPage = COURSE_PAYMENT_PAGES[zone][plan.id];
  return (
    <a
      href={payPage ?? whatsappPayLink(plan.name, price)}
      target="_blank"
      rel="noopener noreferrer"
      className={`block text-center rounded-lg font-semibold transition-colors ${
        primary
          ? "bg-blue-700 hover:bg-blue-800 text-white py-4 text-base"
          : "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white py-3 text-sm"
      }`}
    >
      {payPage ? `Pay ${price} securely →` : `Enroll for ${price} →`}
    </a>
  );
}

/** Course fees in the visitor's currency only (₹ in India, $ elsewhere), with direct Razorpay checkout. */
export default function CoursePricing({ defaultZone }: { defaultZone?: VisitorZone } = {}) {
  const { zone, ready } = useDisplayZone(defaultZone);
  const live = COURSE_PLANS.find((p) => p.id === "live")!;
  const recordings = COURSE_PLANS.find((p) => p.id === "recordings")!;
  const payMethods = zone === "C" ? "UPI, cards and net banking" : "Visa, Mastercard and Amex";

  return (
    <section id="pricing" className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">
            Fees &amp; enrollment
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Start your MLOps, AIOps, LLMOps &amp; Agentic AI journey
          </h2>
          <p className="text-slate-600">Live online · 150+ hours · 4 capstone projects · 1:1 mentorship</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start" style={{ visibility: ready ? "visible" : "hidden" }}>
          <div className="lg:col-span-3 relative bg-white rounded-xl border-2 border-blue-700 p-8 md:p-10">
            <span className="absolute -top-3 left-8 bg-orange-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded">
              Most popular
            </span>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">{live.name}</h3>
                <p className="text-slate-600">{live.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl md:text-6xl font-bold text-slate-900 leading-none">{live.prices[zone]}</p>
                <p className="text-xs text-slate-500 mt-2">One-time payment</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {live.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-blue-700 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <PayButton plan={live} zone={zone} primary />
            <p className="mt-3 text-center text-xs text-slate-500">
              🔒 Secure Razorpay checkout · {payMethods}
            </p>
            {zone !== "C" ? (
              <p className="mt-2 text-center text-xs text-slate-600">
                Outside India: pay in USD on Razorpay, or{" "}
                <a href={whatsappPayLink(live.name, live.prices[zone])} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">
                  WhatsApp for Wise / bank transfer
                </a>
                .
              </p>
            ) : (
              <p className="mt-2 text-center text-xs text-slate-600">
                India: UPI / cards on Razorpay. Questions?{" "}
                <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">
                  WhatsApp
                </a>
                .
              </p>
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">{recordings.name}</h3>
            <p className="text-slate-600 text-sm mb-4">{recordings.tagline}</p>
            <p className="text-4xl font-bold text-slate-900 leading-none mb-1">{recordings.prices[zone]}</p>
            <p className="text-xs text-slate-500 mb-5">One-time payment</p>
            <ul className="space-y-2 mb-6">
              {recordings.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-blue-700 font-bold">✓</span>
                  {item}
                </li>
              ))}
              {recordings.excludes?.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-500">
                  <span className="font-bold">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <PayButton plan={recordings} zone={zone} />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl font-bold text-slate-900 text-center mb-6">What happens after you pay</h3>
          <ol className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {AFTER_PAYMENT.map((item) => (
              <li key={item.step} className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <TrustStrip />
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
