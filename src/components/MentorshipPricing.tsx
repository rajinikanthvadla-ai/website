"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LINKS } from "@/lib/constants";
import {
  MENTORSHIP_MONTHLY_CAP,
  MENTORSHIP_PLANS,
  MENTORSHIP_ZONES,
  detectMentorshipRegion,
  type MentorshipRegion,
  type MentorshipZoneId,
} from "@/lib/mentorship-pricing";

function useMentorshipRegion(): MentorshipRegion | null {
  const [region, setRegion] = useState<MentorshipRegion | null>(null);
  useEffect(() => {
    setRegion(detectMentorshipRegion(Intl.DateTimeFormat().resolvedOptions().timeZone));
  }, []);
  return region;
}

/** Renders children everywhere except for visitors in the United Kingdom. */
export function HideInUk({ children }: { children: ReactNode }) {
  const region = useMentorshipRegion();
  if (region?.uk) return null;
  return <>{children}</>;
}

export default function MentorshipPricing() {
  const region = useMentorshipRegion();
  const [zone, setZone] = useState<MentorshipZoneId>("C");

  useEffect(() => {
    if (region && !region.uk) setZone(region.zone);
  }, [region]);

  if (region?.uk) {
    return (
      <section id="pricing" className="py-20 md:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 text-center panel p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-3">Mentorship is not offered in the United Kingdom</h2>
          <p className="text-stone-600">
            Paid 1:1 mentorship plans are currently unavailable for the UK. You can still learn from the free Python
            course, blog and YouTube channel.
          </p>
        </div>
      </section>
    );
  }

  const activeZone = MENTORSHIP_ZONES.find((z) => z.id === zone)!;

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
              onClick={() => setZone(z.id)}
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
                <a
                  href={plan.bookUrl[zone]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    plan.featured
                      ? "bg-accent-500 hover:bg-accent-600 text-white"
                      : "bg-stone-900 hover:bg-accent-600 text-white"
                  }`}
                >
                  {plan.id === "deep-dive" ? "Book a call" : "Start mentorship"}
                </a>
              </div>
            );
          })}
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
