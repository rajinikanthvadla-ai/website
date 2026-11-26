import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";
import { getAllArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AI Blog 2027 | Rajinikanth Vadla — Jobs, Market, MLOps, Agents",
  description:
    "Practical AI writing by Rajinikanth Vadla on 2027 jobs, market predictions, MLOps, LLMOps, agents, and FDE — for engineers learning this winter.",
  keywords: [
    "Rajinikanth Vadla",
    "AI jobs 2027",
    "AI market 2027",
    "MLOps blog India",
    "LLMOps best practices",
    "AI Agents tutorial",
    "Forward Deployed Engineering",
  ],
  alternates: { canonical: "https://rajinikanthvadla.com/blog/" },
};

export default async function BlogPage() {
  const sorted = await getAllArticles();
  const [featured, ...rest] = sorted;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", path: "/blog/" }]} />
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-16 md:py-20">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Rajinikanth Vadla</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">AI blog</h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            2027 market, jobs, agents, and platform notes — written so December–February learners find a clear path, not noise.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {featured ? (
            <Link href={`/blog/${featured.slug}/`} className="group block border-b border-stone-200 pb-10">
              <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-stone-500">
                <span className="uppercase tracking-wide text-[11px] font-semibold text-stone-700 border border-stone-300 px-2 py-0.5">
                  {featured.category}
                </span>
                <span>{featured.date}</span>
                <span>{featured.readTime} read</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 group-hover:text-accent-700 transition-colors leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">{featured.description}</p>
              <span className="text-sm font-semibold text-accent-600 group-hover:underline underline-offset-4">Read article →</span>
            </Link>
          ) : null}

          <div className="space-y-0 divide-y divide-stone-200">
            {rest.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}/`} className="group block py-7">
                <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-stone-500">
                  <span className="uppercase tracking-wide text-[11px] font-semibold text-stone-700">{article.category}</span>
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900 group-hover:text-accent-700 transition-colors leading-snug mb-2">
                  {article.title}
                </h2>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed line-clamp-2">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
