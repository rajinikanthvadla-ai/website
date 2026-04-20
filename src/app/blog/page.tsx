import type { Metadata } from "next";
import Link from "next/link";
import articles from "../../../content/articles.json";

export const metadata: Metadata = {
  title: "MLOps, AIOps & GenAI Blog",
  description:
    "Tutorials and notes on MLOps, AIOps, GenAI, AI Agents, LangChain, RAG and Kubernetes by Rajinikanth Vadla.",
  keywords: [
    "AI blog", "MLOps blog", "AIOps news", "GenAI articles", "AI Agents tutorials",
    "AI news 2026", "machine learning blog", "DevOps blog", "AI tools news",
    "Rajinikanth Vadla blog",
  ],
  alternates: { canonical: "https://www.rajinikanthvadla.com/blog" },
};

const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function BlogPage() {
  return (
    <>
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-3">Writing</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">Blog</h1>
          <p className="text-lg text-stone-600">
            Notes on MLOps, AIOps, GenAI, and agents - updated when there is something worth your time.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-4">
            {sorted.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group grid md:grid-cols-[1fr_auto] gap-6 panel p-7 md:p-8 card-hover"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="border border-stone-300 bg-stone-50 text-stone-700 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">{article.category}</span>
                    <span className="text-stone-500 text-sm">{article.date}</span>
                    <span className="text-stone-500 text-sm">{article.readTime} read</span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-2 group-hover:text-accent-700 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed line-clamp-2 text-sm md:text-base">{article.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[11px] font-medium text-stone-500 border border-stone-200 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-accent-600 font-semibold text-sm whitespace-nowrap group-hover:underline underline-offset-4">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
