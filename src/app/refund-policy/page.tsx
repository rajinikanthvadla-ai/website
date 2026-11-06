import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { LINKS } from "@/lib/constants";

/** Update this date whenever the policy text changes. */
const POLICY_UPDATED = "6 November 2026";

export const metadata: Metadata = {
  title: "Refund & Batch Transfer Policy",
  description:
    "Refund and batch transfer policy for the live MLOps, AIOps, LLMOps and Agentic AI courses by Rajinikanth Vadla. No cash refunds; move to a later batch or switch to recordings.",
  alternates: { canonical: "https://rajinikanthvadla.com/refund-policy/" },
};

const SECTIONS: { title: string; points: string[] }[] = [
  {
    title: "Live cohort",
    points: [
      "Course fees are not refunded in cash once payment is made.",
      "If you cannot continue, you can move your seat to a later live batch at no extra cost.",
      "Or you can switch to the recordings plan and keep lifetime access to all 150+ hours.",
      "Message WhatsApp before you stop attending so we can plan your catch-up or transfer.",
    ],
  },
  {
    title: "Recordings only",
    points: [
      "Recordings are delivered right after payment, so they are not refundable.",
      "You can upgrade to the live cohort later by paying the difference, if seats are available.",
    ],
  },
  {
    title: "Other live programs",
    points: [
      "The same rules apply to AI-Powered Automation and Agentic AI Architecture & FDE: no cash refund, but you can move to a later batch.",
    ],
  },
  {
    title: "Payment problems",
    points: [
      "If you were charged twice or a payment failed but money left your account, send the receipt on WhatsApp and the extra amount is returned to the original payment method.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Refund policy", path: "/refund-policy/" }]} />
      <section className="py-16 md:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 mb-3">Last updated {POLICY_UPDATED}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Refund &amp; batch transfer policy
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Short version: there are no cash refunds, but you never lose what you paid for. You can move to a later
            batch or switch to recordings.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title} className="panel p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-stone-900 mb-4">{s.title}</h2>
              <ul className="space-y-3 text-stone-700 leading-relaxed list-disc pl-5">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-center pt-4">
            <p className="text-stone-600 mb-4">Questions before you pay? Ask first, it is free.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
                Ask on WhatsApp
              </a>
              <Link href="/enroll/" className="notion-btn notion-btn--ghost">
                Back to enroll
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
