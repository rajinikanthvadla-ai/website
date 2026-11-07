import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { LINKS } from "@/lib/constants";

export type LegalSection = { title: string; points: string[] };

export default function LegalPage({
  path,
  crumb,
  updated,
  title,
  summary,
  sections,
}: {
  path: string;
  crumb: string;
  updated: string;
  title: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: crumb, path }]} />
      <section className="py-16 md:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 mb-3">Last updated {updated}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">{title}</h1>
          <p className="text-lg text-stone-600 leading-relaxed">{summary}</p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {sections.map((s) => (
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
            <p className="text-stone-600 mb-4">Questions about this page? Ask directly.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
                Ask on WhatsApp
              </a>
              <Link href="/contact/" className="notion-btn notion-btn--ghost">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
