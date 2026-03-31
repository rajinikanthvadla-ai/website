import type { Metadata } from "next";
import Link from "next/link";
import articles from "../../../content/articles.json";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "AI Blog & News | MLOps, AIOps, GenAI, AI Agents Articles",
  description:
    "Latest AI news, tutorials, and insights on MLOps, AIOps, GenAI, AI Agents, LangChain, Kubernetes, and more by Rajinikanth Vadla. Stay updated with the AI/ML industry.",
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
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-24 overflow-hidden">
        <div className="orb orb-1" style={{ opacity: 0.12 }} />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.15em] text-primary-600 mb-3">Insights &amp; Tutorials</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5">AI Blog &amp; News</h1>
          <p className="text-lg text-gray-600">
            Latest articles on MLOps, AIOps, GenAI, AI Agents, and everything AI/ML
          </p>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-8">
            {sorted.map((article, i) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group grid md:grid-cols-[1fr_auto] gap-6 bg-white rounded-2xl p-8 border border-gray-100 card-hover"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{article.category}</span>
                    <span className="text-gray-400 text-sm">{article.date}</span>
                    <span className="text-gray-400 text-sm">{article.readTime} read</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed line-clamp-2">{article.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-indigo-600 font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform">
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
