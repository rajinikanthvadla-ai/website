import Link from "next/link";
import articles from "../../content/articles.json";

const latestArticles = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

export default function LatestArticlesSection() {
  return (
    <section className="notion-section notion-section--white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="notion-eyebrow justify-center">
            <span className="notion-eyebrow-dot" />
            Latest AI News & Insights
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f172a] mt-3 mb-3">
            Stay ahead in AI every single day
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fresh articles on AI agents, Kubernetes, enterprise automation, and MLOps published daily.
            Learn what's happening in production right now.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {latestArticles.map((article, idx) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}/`}
              className="group block"
            >
              <article className="h-full panel p-6 card-hover flex flex-col transition-all border border-slate-200 hover:border-blue-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    {article.category}
                  </span>
                  {idx === 0 && (
                    <span className="bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-lg font-bold text-[#0f172a] mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                    Read →
                  </span>
                  <span className="text-xs text-slate-400">{article.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="panel p-8 md:p-10 text-center border-2 border-slate-900 shadow-[4px_4px_0_#0f172a]">
          <h3 className="font-display text-2xl font-bold text-[#0f172a] mb-3">
            New AI topics every day
          </h3>
          <p className="text-slate-600 mb-6 text-base max-w-2xl mx-auto">
            Fresh guides on MLOps, AI agents, Kubernetes, LLMOps, and enterprise automation — updated for students and working engineers.
          </p>
          <Link href="/blog" className="notion-btn notion-btn--ink">
            Browse all articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
