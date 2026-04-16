import { LINKS } from "@/lib/constants";

interface CTASectionProps {
  title: string;
  subtitle: string;
  showYoutube?: boolean;
}

export default function CTASection({ title, subtitle, showYoutube = true }: CTASectionProps) {
  return (
    <section className="py-20 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">{title}</h2>
        <p className="text-stone-600 mb-9 leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={LINKS.enroll}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-stone-900 text-white px-7 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            Enroll &rarr;
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-emerald-700 text-white px-7 py-3 text-sm font-semibold hover:bg-emerald-800 transition-colors"
          >
            WhatsApp
          </a>
          {showYoutube && (
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center border border-stone-300 text-stone-800 px-7 py-3 text-sm font-semibold hover:border-stone-900 transition-colors"
            >
              YouTube
            </a>
          )}
        </div>
        <p className="mt-8 text-xs text-stone-500">
          I read every message. Typical reply within a day. No pressure to buy.
        </p>
      </div>
    </section>
  );
}
