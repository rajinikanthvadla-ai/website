import type { MetadataRoute } from "next";
import articles from "../../content/articles.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rajinikanthvadla.com";
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/mlops-aiops-masterclass/`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/mentorship/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/genai-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/aiops-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/mlops-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ai-tools-productivity/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/blog/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}/`,
    lastModified: new Date(a.date).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
