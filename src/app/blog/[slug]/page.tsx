import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import BlogMarkdown from "@/components/BlogMarkdown";
import SeoAlias from "@/components/SeoAlias";
import { ARTICLE_REDIRECTS } from "@/lib/article-redirects";
import { aliasPageMetadata } from "@/lib/seo-alias";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";

const SITE_ORIGIN = "https://rajinikanthvadla.com";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...Object.keys(ARTICLE_REDIRECTS).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const redirectTarget = ARTICLE_REDIRECTS[slug];
  if (redirectTarget) return aliasPageMetadata(`/blog/${redirectTarget}/`, "Article moved");
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const cover = article.coverImage || `${SITE_ORIGIN}/assets/og-image.jpg`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `${SITE_ORIGIN}/blog/${article.slug}/` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: ["Rajinikanth Vadla"],
      tags: article.tags,
      images: [{ url: cover }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const redirectTarget = ARTICLE_REDIRECTS[slug];
  const articles = await getAllArticles();
  if (redirectTarget) {
    const canonical = articles.find((a) => a.slug === redirectTarget);
    return (
      <SeoAlias
        title="This article has moved"
        message={
          canonical
            ? `The current version is “${canonical.title}”.`
            : "This note now lives on the main article for the topic."
        }
        href={`/blog/${redirectTarget}/`}
        cta="Read the article"
      />
    );
  }
  const article = articles.find((a) => a.slug === slug);
  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const isFdeArticle =
    !!article &&
    (article.slug.includes("forward-deployed") ||
      article.slug.includes("fde") ||
      article.tags.some((t) => /fde|forward deployed/i.test(t)));

  if (!article) {
    return (
      <section className="py-28 text-center px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900">Article not found</h1>
        <Link href="/blog" className="text-accent-600 font-semibold mt-4 inline-block underline underline-offset-4">Back to blog &rarr;</Link>
      </section>
    );
  }

  const articlePath = `/blog/${article.slug}/`;
  const articleUrl = `${SITE_ORIGIN}${articlePath}`;
  const cover = article.coverImage || `${SITE_ORIGIN}/assets/og-image.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [cover],
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Person", name: "Rajinikanth Vadla", url: `${SITE_ORIGIN}/` },
    publisher: {
      "@type": "Organization",
      name: "Rajinikanth Vadla",
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/assets/logo-512.png` },
    },
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Blog", path: "/blog/" }, { name: article.title, path: articlePath }]} />

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
            {article.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImage}
                alt=""
                className="mt-8 w-full max-h-[420px] object-cover border border-stone-300 bg-white"
              />
            ) : null}
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
            <BlogMarkdown content={article.content} />
          </div>
        </section>

        <section className="py-14 md:py-16 bg-stone-50 border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            {isFdeArticle ? (
              <>
                <h3 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-3">
                  Ready for the live FDE cohort?
                </h3>
                <p className="text-stone-600 mb-6 text-sm md:text-base">
                  Free demo Sun 6 Dec, 11 AM IST on Zoom. Classes from Mon 7 Dec, 7:00-8:30 AM IST. Early bird ₹32,000 till 6 Dec (first 8 seats).
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/courses/fde/"
                    className="bg-orange-500 text-white px-7 py-3 text-sm font-semibold hover:bg-orange-600 transition-colors"
                  >
                    View FDE course
                  </Link>
                  <a
                    href={LINKS.whatsappFde}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 text-white px-7 py-3 text-sm font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    WhatsApp to enroll
                  </a>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-3">Want this as guided work?</h3>
                <p className="text-stone-600 mb-6 text-sm md:text-base">
                  The masterclass is where these threads get tied into a coherent story for interviews and delivery.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/mlops-aiops-masterclass/"
                    className="bg-stone-900 text-white px-7 py-3 text-sm font-semibold hover:bg-stone-800 transition-colors"
                  >
                    View masterclass
                  </Link>
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 text-white px-7 py-3 text-sm font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="py-14 md:py-16 bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-6">Related reads for MLOps, LLMOps, and AI Agents</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}/`}
                  className="panel p-5 hover:border-stone-400 transition-colors"
                >
                  {item.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.coverImage} alt="" className="mb-3 h-28 w-full object-cover border border-stone-200" />
                  ) : null}
                  <div className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-2">{item.category}</div>
                  <h4 className="font-semibold text-stone-900 leading-snug mb-2">{item.title}</h4>
                  <p className="text-sm text-stone-600 line-clamp-3">{item.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/courses/fde/" className="text-sm font-semibold text-accent-700 hover:underline underline-offset-4">
                FDE course
              </Link>
              <Link href="/mlops-aiops-masterclass/" className="text-sm font-semibold text-accent-700 hover:underline underline-offset-4">
                MLOps masterclass
              </Link>
              <Link href="/genai-course/" className="text-sm font-semibold text-accent-700 hover:underline underline-offset-4">
                GenAI course
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
