import { COURSE_PLANS, type CoursePlan } from "@/lib/course-pricing";

/**
 * Shows the price in the visitor's currency (₹ in India, $ elsewhere).
 *
 * Both prices are in the HTML, so search engines and AI assistants that read the
 * page without running scripts see "₹40,000 / $599". A tiny script in <head>
 * sets html[data-zone] before the first paint and CSS hides the other currency,
 * so visitors never see a flash of the wrong one.
 */
export function LocalPrice({ inr, usd, className }: { inr: string; usd: string; className?: string }) {
  return (
    <span className={className}>
      <span className="px-inr">{inr}</span>
      <span className="px-sep"> / </span>
      <span className="px-usd">{usd}</span>
    </span>
  );
}

/** The masterclass fee for a plan, in the visitor's currency. */
export function CoursePrice({ plan, className }: { plan: CoursePlan["id"]; className?: string }) {
  const prices = COURSE_PLANS.find((p) => p.id === plan)!.prices;
  return <LocalPrice inr={prices.C} usd={prices.A} className={className} />;
}
