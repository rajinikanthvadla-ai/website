import type { Metadata } from "next";
import Link from "next/link";
import articles from "../../../../content/articles.json";
import { LINKS } from "@/lib/constants";

type Article = (typeof articles)[number];

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `https://www.rajinikanthvadla.com/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: ["Rajinikanth Vadla"],
      tags: article.tags,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-display text-2xl font-bold text-stone-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-display text-xl font-bold text-stone-900 mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="flex items-start gap-2 text-stone-600 mb-2">
            <span className="text-accent-600 mt-1">&rarr;</span>
            <span><strong className="text-stone-900">{match[1]}</strong>{match[2]}</span>
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="flex items-start gap-2 text-stone-600 mb-2">
          <span className="text-accent-600 mt-1">&rarr;</span>
          <span>{line.slice(2)}</span>
        </li>
      );
    } else if (line.startsWith("| ") && !line.includes("---")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      const isHeader = i + 1 < lines.length && lines[i + 1]?.includes("---");
      elements.push(
        <div key={i} className={`grid gap-4 py-2 border-b border-stone-200 ${isHeader ? "font-bold text-stone-900" : "text-stone-600"}`} style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}>
          {cells.map((cell, j) => <div key={j}>{cell}</div>)}
        </div>
      );
    } else if (line.startsWith("[") && line.includes("→")) {
      const match = line.match(/\[(.+?)\]\((.+?)\)/);
      if (match) {
        elements.push(
          <p key={i} className="mt-6">
            <Link href={match[2]} className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors">
              {match[1]}
            </Link>
          </p>
        );
      }
    } else if (line.trim() === "") {
      continue;
    } else {
      elements.push(<p key={i} className="text-stone-600 leading-relaxed mb-4">{line}</p>);
    }
  }

  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug) as Article | undefined;

  if (!article) {
    return (
      <section className="py-28 text-center px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900">Article not found</h1>
        <Link href="/blog" className="text-accent-600 font-semibold mt-4 inline-block underline underline-offset-4">Back to blog &rarr;</Link>
      </section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Person", name: "Rajinikanth Vadla" },
    publisher: { "@type": "Organization", name: "Rajinikanth Vadla" },
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-16 md:py-20">
          <div className="relative max-w-3xl mx-auto px-6">
            <Link href="/blog" className="text-accent-600 font-semibold text-sm mb-6 inline-block hover:underline underline-offset-4">&larr; Back to blog</Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="border border-stone-300 bg-white text-stone-700 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">{article.category}</span>
              <span className="text-stone-500 text-sm">{article.date}</span>
              <span className="text-stone-500 text-sm">{article.readTime} read</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">{article.title}</h1>
            <p className="text-lg text-stone-600 leading-relaxed">{article.description}</p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 border border-stone-900 bg-stone-900 text-[#fffefc] flex items-center justify-center font-bold text-xs">RV</div>
              <div>
                <div className="font-semibold text-stone-900 text-sm">Rajinikanth Vadla</div>
                <div className="text-stone-500 text-xs">MLOps, AIOps, GenAI</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 text-base md:text-lg">
            {renderMarkdown(article.content)}
          </div>
        </section>

        <section className="py-14 md:py-16 bg-stone-50 border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-3">Want this as guided work?</h3>
            <p className="text-stone-600 mb-6 text-sm md:text-base">The masterclass is where these threads get tied into a coherent story for interviews and delivery.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/mlops-aiops-masterclass" className="bg-stone-900 text-white px-7 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors">
                View masterclass
              </Link>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-emerald-700 text-white px-7 py-3 text-sm font-semibold hover:bg-emerald-800 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
