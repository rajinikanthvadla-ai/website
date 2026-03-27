import { LINKS } from "@/lib/constants";

interface CTASectionProps {
  title: string;
  subtitle: string;
  showYoutube?: boolean;
}

export default function CTASection({ title, subtitle, showYoutube = true }: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="orb orb-1" style={{ opacity: 0.15 }} />
      <div className="orb orb-2" style={{ opacity: 0.15 }} />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">{title}</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={LINKS.enroll}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary-600/25 hover:-translate-y-1 hover:shadow-primary-600/40 transition-all"
          >
            Enroll Now &rarr;
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/20 hover:-translate-y-1 hover:shadow-green-500/35 transition-all"
          >
            WhatsApp
          </a>
          {showYoutube && (
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold text-lg hover:border-red-400 hover:text-red-500 hover:-translate-y-1 transition-all"
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
