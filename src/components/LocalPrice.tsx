"use client";

import { useDisplayZone } from "@/components/visitor-zone";
import { COURSE_PLANS, type CoursePlan } from "@/lib/course-pricing";

/**
 * Shows one price in the visitor's currency (₹ in India, $ elsewhere).
 * Hidden until location is known so nobody sees the other currency flash.
 */
export function LocalPrice({ inr, usd, className }: { inr: string; usd: string; className?: string }) {
  const { zone, ready } = useDisplayZone();
  return (
    <span className={className} style={{ visibility: ready ? "visible" : "hidden" }}>
      {zone === "C" ? inr : usd}
    </span>
  );
}

/** The masterclass fee for a plan, in the visitor's currency. */
export function CoursePrice({ plan, className }: { plan: CoursePlan["id"]; className?: string }) {
  const prices = COURSE_PLANS.find((p) => p.id === plan)!.prices;
  return <LocalPrice inr={prices.C} usd={prices.A} className={className} />;
}
