import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rajinikanthvadla.com";
  const now = new Date().toISOString();

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/mlops-aiops-masterclass`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/mentorship`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/genai-training`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/aiops-training`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/mlops-training`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ai-tools-productivity`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog/what-is-mlops-complete-guide-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/ai-agents-explained-langchain-crewai-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/top-ai-tools-developers-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/aiops-vs-traditional-monitoring-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/mastering-multi-cloud-ai-ml-deployment-strategies-2026`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog/kubernetes-cloud-native-ai-ml-trends-2026`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog/10x-developer-productivity-cursor-copilot-2026`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog/mastering-aiops-infrastructure-management-2026`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog/breakthroughs-ai-agents-autonomous-systems-2026`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/blog/master-fine-tuning-llms-2026-techniques-models`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];
}
