import { LINKS } from "@/lib/constants";

interface CTASectionProps {
  title: string;
  subtitle: string;
  showYoutube?: boolean;
}

export default function CTASection({ title, subtitle, showYoutube = true }: CTASectionProps) {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">{title}</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={LINKS.enroll}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5"
          >
            Enroll Now &rarr;
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all hover:-translate-y-0.5"
          >
            WhatsApp
          </a>
          {showYoutube && (
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg hover:border-gray-900 hover:text-gray-900 transition-all hover:-translate-y-0.5"
            >
              YouTube
            </a>
          )}
        </div>
        <p className="mt-8 text-sm text-gray-400">
          Free consultation &middot; Reply within 24 hours &middot; No obligation
        </p>
      </div>
    </section>
  );
}
