import type { MetadataRoute } from "next";
import articles from "../../content/articles.json";
import { ROADMAP_SLUGS } from "@/lib/roadmaps";
import { getSkillSlugs, COMPARE_SLUGS } from "@/lib/knowledge-graph";
import { INTL_MARKETS } from "@/lib/international-markets";
import { RESUME_ROLES } from "@/lib/resume-roles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rajinikanthvadla.com";
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/courses/`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/enroll/`, lastModified: now, changeFrequency: "daily", priority: 0.99 },
    { url: `${base}/student-guide/`, lastModified: now, changeFrequency: "weekly", priority: 0.94 },
    { url: `${base}/architecture/`, lastModified: now, changeFrequency: "weekly", priority: 0.93 },
    { url: `${base}/roadmap/`, lastModified: now, changeFrequency: "weekly", priority: 0.92 },
    { url: `${base}/universe/`, lastModified: now, changeFrequency: "weekly", priority: 0.98 },
    { url: `${base}/path/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/compare/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/ai-automation/`, lastModified: now, changeFrequency: "daily", priority: 0.99 },
    { url: `${base}/mlops-aiops-masterclass/`, lastModified: now, changeFrequency: "daily", priority: 0.99 },
    { url: `${base}/mlops-course-india/`, lastModified: now, changeFrequency: "daily", priority: 0.97 },
    { url: `${base}/global-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.96 },
    { url: `${base}/resume-prep/`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/mlops-course/`, lastModified: now, changeFrequency: "daily", priority: 0.97 },
    { url: `${base}/mlops-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/genai-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/genai-course/`, lastModified: now, changeFrequency: "daily", priority: 0.96 },
    { url: `${base}/ai-agents-course/`, lastModified: now, changeFrequency: "daily", priority: 0.96 },
    { url: `${base}/aiops-training/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ai-tools-productivity/`, lastModified: now, changeFrequency: "weekly", priority: 0.88 },
    { url: `${base}/mentorship/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
  ];

  const roadmapRoutes: MetadataRoute.Sitemap = ROADMAP_SLUGS.map((slug) => ({
    url: `${base}/roadmap/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const skillRoutes: MetadataRoute.Sitemap = getSkillSlugs().map((slug) => ({
    url: `${base}/skills/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.87,
  }));

  const compareRoutes: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${base}/compare/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.86,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}/`,
    lastModified: new Date(a.date).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const intlRoutes: MetadataRoute.Sitemap = INTL_MARKETS.map((m) => ({
    url: `${base}/global-training/${m.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: m.slug === "usa" || m.slug === "uk" ? 0.95 : 0.93,
  }));

  const resumeRoutes: MetadataRoute.Sitemap = RESUME_ROLES.map((r) => ({
    url: `${base}/resume-prep/${r.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.traffic === "ultra" ? 0.93 : 0.9,
  }));

  return [...staticRoutes, ...intlRoutes, ...resumeRoutes, ...roadmapRoutes, ...skillRoutes, ...compareRoutes, ...blogRoutes];
}
