"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/constants";
import TrustStrip from "@/components/TrustStrip";
import {
  MENTORSHIP_MONTHLY_CAP,
  MENTORSHIP_PAYMENT_PAGES,
  MENTORSHIP_PLANS,
  MENTORSHIP_REFUND_NOTE,
  MENTORSHIP_ZONES,
  detectMentorshipZone,
  type MentorshipZoneId,
} from "@/lib/mentorship-pricing";

const REGION_EVENT = "mentorship-region-change";
const REGION_PARAM: Record<string, MentorshipZoneId> = {
  a: "A", global: "A", us: "A", usa: "A",
  b: "A", international: "A",
  c: "C", india: "C", in: "C",
};

/** Region chosen via `?region=` (shareable link) or the region tabs. */
function readRegionOverride(): MentorshipZoneId | null {
  const value = new URLSearchParams(window.location.search).get("region");
  return value ? REGION_PARAM[value.toLowerCase()] ?? null : null;
}

function setRegionOverride(zone: MentorshipZoneId) {
  const url = new URL(window.location.href);
  url.searchParams.set("region", zone.toLowerCase());
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(REGION_EVENT));
}

/** The visitor's zone: `?region=` override first, otherwise guessed from the browser time zone. */
function useMentorshipZone(): MentorshipZoneId | null {
  const [zone, setZone] = useState<MentorshipZoneId | null>(null);
  useEffect(() => {
    const update = () =>
      setZone(readRegionOverride() ?? detectMentorshipZone(Intl.DateTimeFormat().resolvedOptions().timeZone));
    update();
    window.addEventListener(REGION_EVENT, update);
    return () => window.removeEventListener(REGION_EVENT, update);
  }, []);
  return zone;
}

function whatsappPayLink(planName: string, price: string) {
  const text = `Hi Rajinikanth, I want to join ${planName} (${price}). Please send me the payment link.`;
  return `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** `defaultZone` pins a country page to its currency; visitors can still switch with the tabs. */
export default function MentorshipPricing({ defaultZone }: { defaultZone?: MentorshipZoneId } = {}) {
  const detectedZone = useMentorshipZone();
  const [zone, setZone] = useState<MentorshipZoneId>(defaultZone ?? "C");

  useEffect(() => {
    if (detectedZone) setZone(defaultZone && !readRegionOverride() ? defaultZone : detectedZone);
  }, [detectedZone, defaultZone]);

  const activeZone = MENTORSHIP_ZONES.find((z) => z.id === zone)!;
  const paymentPage = MENTORSHIP_PAYMENT_PAGES[zone];

  return (
    <section id="pricing" className="py-20 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">
            Mentorship plans
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-3">
            Monthly 1:1 mentorship, priced for your country
          </h2>
          <p className="text-stone-600">
            Same mentor, same plans everywhere. Prices follow local salaries. Capped at {MENTORSHIP_MONTHLY_CAP} monthly
            mentees so every person gets real time.
          </p>
        </div>

        <div role="tablist" aria-label="Choose your region" className="flex flex-wrap justify-center gap-2 mb-3">
          {MENTORSHIP_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              role="tab"
              aria-selected={zone === z.id}
              onClick={() => setRegionOverride(z.id)}
              className={`px-4 py-2 text-sm font-semibold border transition-colors ${
                zone === z.id
                  ? "bg-stone-900 border-stone-900 text-white"
                  : "bg-white border-stone-300 text-stone-700 hover:border-stone-900"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-stone-500 mb-10">{activeZone.countries}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {MENTORSHIP_PLANS.map((plan) => {
            const price = plan.prices[zone];
            return (
              <div
                key={plan.id}
                className={`relative panel p-7 flex flex-col card-hover ${
                  plan.featured ? "border-2 !border-accent-500" : ""
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1">
                    Most popular
                  </span>
                )}
                <h3 className="font-display font-bold text-stone-900 text-xl mb-1">{plan.name}</h3>
                <p className="text-sm text-stone-600 mb-5 leading-relaxed">{plan.summary}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-stone-900">{price.main}</span>
                  {price.alt && <span className="ml-2 text-sm text-stone-500">{price.alt}</span>}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-5">{plan.cadence}</p>
                <ul className="space-y-2 mb-7 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-stone-700">
                      <span className="text-accent-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={paymentPage ?? whatsappPayLink(plan.name, price.main)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center text-center px-2 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors ${
                      plan.featured ? "bg-accent-500 hover:bg-accent-600" : "bg-stone-900 hover:bg-accent-600"
                    }`}
                  >
                    {paymentPage ? "Pay with Razorpay" : "Get payment link"}
                  </a>
                  <a
                    href={LINKS.topmate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-center px-2 py-3 text-xs font-semibold uppercase tracking-wide border border-stone-300 bg-white text-stone-700 hover:border-stone-900 transition-colors"
                  >
                    Book on Topmate
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <TrustStrip refundNote={MENTORSHIP_REFUND_NOTE} />
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="font-display text-2xl font-bold text-stone-900 text-center mb-6">What happens after you pay</h3>
          <ol className="grid md:grid-cols-3 gap-3">
            {[
              { step: "1", title: "Instant receipt", desc: "Razorpay emails your payment receipt straight away." },
              { step: "2", title: "I contact you", desc: "Within 24 hours on WhatsApp or email to fix your first call time." },
              { step: "3", title: "First session", desc: "We map your goal and build your plan. Weekly calls start from here." },
            ].map((item) => (
              <li key={item.step} className="panel p-5">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-stone-900 text-white font-bold text-sm mb-3">
                  {item.step}
                </span>
                <p className="font-semibold text-stone-900">{item.title}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-sm text-stone-600 mt-10">
          Not sure which plan fits?{" "}
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 underline">
            Message me on WhatsApp
          </a>{" "}
          with your background and goal.
        </p>
      </div>
    </section>
  );
}
