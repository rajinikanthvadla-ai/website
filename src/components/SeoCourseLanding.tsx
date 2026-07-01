import Link from "next/link";
import type { SeoLanding } from "@/lib/seo-landings";
import { LINKS, STRUCTURED_DATA } from "@/lib/constants";

type Props = {
  landing: SeoLanding;
};

export default function SeoCourseLanding({ landing }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.course) }} />
      <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">Rajinikanth Vadla Training</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">{landing.h1}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{landing.intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed">
            {landing.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-base">{p}</p>
            ))}
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-3">
            {landing.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-600 font-bold shrink-0">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href={landing.courseHref}
              className="inline-flex justify-center bg-blue-700 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              {landing.cta} &rarr;
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center bg-emerald-600 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              WhatsApp for details
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
