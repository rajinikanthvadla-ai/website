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
      elements.push(<h2 key={i} className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="flex items-start gap-2 text-gray-600 mb-2">
            <span className="text-emerald-500 mt-1">&rarr;</span>
            <span><strong className="text-gray-900">{match[1]}</strong>{match[2]}</span>
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="flex items-start gap-2 text-gray-600 mb-2">
          <span className="text-emerald-500 mt-1">&rarr;</span>
          <span>{line.slice(2)}</span>
        </li>
      );
    } else if (line.startsWith("| ") && !line.includes("---")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      const isHeader = i + 1 < lines.length && lines[i + 1]?.includes("---");
      elements.push(
        <div key={i} className={`grid gap-4 py-2 border-b border-gray-100 ${isHeader ? "font-bold text-gray-900" : "text-gray-600"}`} style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}>
          {cells.map((cell, j) => <div key={j}>{cell}</div>)}
        </div>
      );
    } else if (line.startsWith("[") && line.includes("→")) {
      const match = line.match(/\[(.+?)\]\((.+?)\)/);
      if (match) {
        elements.push(
          <p key={i} className="mt-6">
            <Link href={match[2]} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all">
              {match[1]}
            </Link>
          </p>
        );
      }
    } else if (line.trim() === "") {
      continue;
    } else {
      elements.push(<p key={i} className="text-gray-600 leading-relaxed mb-4">{line}</p>);
    }
  }

  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug) as Article | undefined;

  if (!article) {
    return (
      <section className="py-28 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Article not found</h1>
        <Link href="/blog" className="text-indigo-600 font-semibold mt-4 inline-block">Back to Blog &rarr;</Link>
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
        <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Link href="/blog" className="text-indigo-600 font-semibold text-sm mb-6 inline-block hover:underline">&larr; Back to Blog</Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{article.category}</span>
              <span className="text-gray-500 text-sm">{article.date}</span>
              <span className="text-gray-500 text-sm">{article.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{article.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{article.description}</p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">RV</div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Rajinikanth Vadla</div>
                <div className="text-gray-500 text-xs">MLOps, AIOps, GenAI Expert</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-lg">
            {renderMarkdown(article.content)}
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Want to Learn This Hands-on?</h3>
            <p className="text-gray-500 mb-6">Join Rajinikanth Vadla&apos;s training programs and master these skills with real projects.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/mlops-aiops-masterclass" className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition-all">
                View Masterclass
              </Link>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-emerald-700 transition-all">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
