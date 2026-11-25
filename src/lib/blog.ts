import staticArticles from "../../content/articles.json";
import { getCmsBlogPosts, type CmsBlogPost } from "@/lib/cms";

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  content: string;
  coverImage: string;
  source: "json" | "cms";
};

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}

function fromCms(p: CmsBlogPost): BlogArticle {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags ?? [],
    readTime: p.read_time || estimateReadTime(p.content),
    date: p.published_at,
    content: p.content,
    coverImage: p.cover_image_url || "",
    source: "cms",
  };
}

function fromJson(a: (typeof staticArticles)[number]): BlogArticle {
  const cover =
    "coverImage" in a && typeof (a as { coverImage?: string }).coverImage === "string"
      ? (a as { coverImage: string }).coverImage
      : "";
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    tags: a.tags,
    readTime: a.readTime,
    date: a.date,
    content: a.content,
    coverImage: cover,
    source: "json",
  };
}

/** Static articles.json + published CMS posts. CMS wins on the same slug. */
export async function getAllArticles(): Promise<BlogArticle[]> {
  const cms = (await getCmsBlogPosts()).map(fromCms);
  const bySlug = new Map<string, BlogArticle>();
  for (const a of staticArticles.map(fromJson)) bySlug.set(a.slug, a);
  for (const a of cms) bySlug.set(a.slug, a);
  return [...bySlug.values()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  return (await getAllArticles()).find((a) => a.slug === slug);
}
