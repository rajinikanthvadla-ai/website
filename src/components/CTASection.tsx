import { LINKS } from "@/lib/constants";

interface CTASectionProps {
  title: string;
  subtitle: string;
  showYoutube?: boolean;
  ctaPreset?: "default" | "mentorship" | "contact";
}

export default function CTASection({
  title,
  subtitle,
  showYoutube = true,
  ctaPreset = "default",
}: CTASectionProps) {
  const actions =
    ctaPreset === "mentorship" || ctaPreset === "contact" ? (
      <>
        <a
          href={LINKS.topmate}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          Book 1:1 Session
        </a>
        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center bg-emerald-600 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          WhatsApp
        </a>
        {showYoutube ? (
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center border-2 border-slate-200 text-slate-700 px-7 py-3 rounded-lg text-sm font-semibold hover:border-slate-400 transition-colors"
          >
            YouTube
          </a>
        ) : null}
      </>
    ) : (
      <>
        <a
          href={LINKS.enroll}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          Enroll Now
        </a>
        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center bg-emerald-600 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          WhatsApp
        </a>
        {showYoutube ? (
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center border-2 border-slate-200 text-slate-700 px-7 py-3 rounded-lg text-sm font-semibold hover:border-slate-400 transition-colors"
          >
            YouTube
          </a>
        ) : null}
      </>
    );

  return (
    <section className="py-20 md:py-24 bg-blue-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{title}</h2>
        <p className="text-slate-600 mb-9 leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">{actions}</div>
        <p className="mt-8 text-xs text-slate-500">
          I read every message. Typical reply within a day. No pressure to buy.
        </p>
      </div>
    </section>
  );
}
