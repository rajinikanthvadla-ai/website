import articles from "../../../content/articles.json";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** RSS feed of blog posts so Google, news readers and AI crawlers pick up new articles quickly. */
export function GET() {
  const posts = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const items = posts
    .map((post) => {
      const url = `${SITE.url}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} – MLOps, AIOps, LLMOps &amp; Agentic AI articles</title>
    <link>${SITE.url}/blog/</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Production guides on MLOps, AIOps, LLMOps, AI agents and AI engineering careers.</description>
    <language>en</language>
    <lastBuildDate>${posts.length ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
