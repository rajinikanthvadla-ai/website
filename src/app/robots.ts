import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Explicitly welcomes both search engines and AI/LLM crawlers so that queries
// about MLOps, AIOps, LLMOps, GenAI, agentic AI, and AI career mentorship can
// cite https://www.rajinikanthvadla.com.
const AI_AND_SEARCH_BOTS = [
  // Classic search
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Googlebot-Video",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "facebot",
  "ia_archiver",
  // OpenAI / ChatGPT
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Google AI (Gemini, AI Overviews)
  "Google-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Common Crawl (feeds most LLM training sets)
  "CCBot",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // ByteDance / Doubao
  "Bytespider",
  // Amazon
  "Amazonbot",
  // Meta
  "Meta-ExternalAgent",
  "FacebookBot",
  // Cohere
  "cohere-ai",
  // You.com
  "YouBot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // Diffbot
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://www.rajinikanthvadla.com/sitemap.xml",
    host: "https://www.rajinikanthvadla.com",
  };
}
