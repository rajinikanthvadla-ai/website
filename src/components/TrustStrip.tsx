import { STATS } from "@/lib/constants";

type TrustStripProps = {
  /** Refund wording must match the policy on the matching Razorpay page. */
  refundNote: string;
};

/** Proof + reassurance shown right next to payment buttons, so visitors pay with confidence. */
export default function TrustStrip({ refundNote }: TrustStripProps) {
  const points = [
    { icon: "🔒", title: "Secure payment by Razorpay", desc: "UPI, cards, net banking and international cards. Instant email receipt." },
    { icon: "↩️", title: "Clear refund policy", desc: refundNote },
    { icon: "💬", title: "Personal reply within 24 hours", desc: "I contact you on WhatsApp or email right after you pay." },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-3 gap-3 mb-6">
        {STATS.slice(0, 3).map((stat) => (
          <div key={stat.label} className="panel p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-stone-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {points.map((point) => (
          <div key={point.title} className="panel p-5 flex gap-3">
            <span className="text-xl shrink-0" aria-hidden>
              {point.icon}
            </span>
            <div>
              <p className="font-semibold text-stone-900 text-sm">{point.title}</p>
              <p className="text-sm text-stone-600 leading-relaxed">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
