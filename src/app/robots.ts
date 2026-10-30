import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "anthropic-ai",
  "cohere-ai",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "Diffbot",
  "Amazonbot",
  "YouBot",
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Yandex",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/" as const,
      })),
    ],
    sitemap: "https://rajinikanthvadla.com/sitemap.xml",
    host: "https://rajinikanthvadla.com",
  };
}
