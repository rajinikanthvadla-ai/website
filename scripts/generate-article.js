const fs = require("fs");
const path = require("path");

const ARTICLES_PATH = path.join(__dirname, "..", "content", "articles.json");

const TOPICS = [
  "Latest breakthroughs in AI Agents and autonomous systems",
  "New MLOps tools and practices for production ML in 2026",
  "AIOps innovations: AI-powered infrastructure management",
  "GenAI and LLM updates: new models, techniques, and use cases",
  "Kubernetes and cloud-native AI/ML deployment trends",
  "LangChain and RAG system advancements",
  "AI tools for developer productivity: Cursor, Copilot, and beyond",
  "Enterprise AI adoption trends and challenges",
  "Vector databases and embedding technologies update",
  "CI/CD for machine learning: latest tools and patterns",
  "Multi-cloud AI/ML deployment strategies",
  "AI safety, governance, and responsible AI practices",
  "Fine-tuning LLMs: new techniques and open-source models",
  "Model Context Protocol (MCP) and tool-use in AI agents",
  "Prompt engineering advanced techniques and patterns",
];

const TREND_FEEDS = [
  "https://news.google.com/rss/search?q=AI+OR+Machine+Learning+OR+LLM+OR+AI+Agents&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=MLOps+OR+AIOps+OR+LangChain+OR+RAG&hl=en-US&gl=US&ceid=US:en",
];

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractKeywords(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !["with", "from", "that", "this", "into", "will", "have", "your"].includes(w));
}

async function fetchTrendingSignals() {
  const entries = [];

  for (const feed of TREND_FEEDS) {
    try {
      const res = await fetch(feed, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) continue;
      const xml = await res.text();
      const titles = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/g)]
        .map((m) => decodeXmlEntities((m[1] || m[2] || "").trim()))
        .filter(Boolean)
        .filter((t) => !/google news/i.test(t))
        .slice(0, 8);
      entries.push(...titles);
    } catch {
      // Ignore external feed failures and continue with available sources.
    }
  }

  if (!entries.length) return { headlines: [], keywords: [] };

  const freq = new Map();
  entries.forEach((headline) => {
    extractKeywords(headline).forEach((k) => freq.set(k, (freq.get(k) || 0) + 1));
  });

  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([k]) => k);

  return {
    headlines: [...new Set(entries)].slice(0, 10),
    keywords,
  };
}

function stripCodeFences(input) {
  const trimmed = (input || "").trim();
  if (!trimmed.startsWith("```")) return trimmed;
  return trimmed.replace(/^```json?\s*/i, "").replace(/\s*```$/, "").trim();
}

function extractJSONObject(input) {
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return input;
  return input.slice(start, end + 1);
}

function escapeControlCharsInStrings(jsonLike) {
  let out = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < jsonLike.length; i += 1) {
    const ch = jsonLike[i];

    if (inString) {
      if (escaped) {
        out += ch;
        escaped = false;
        continue;
      }

      if (ch === "\\") {
        out += ch;
        escaped = true;
        continue;
      }

      if (ch === "\"") {
        out += ch;
        inString = false;
        continue;
      }

      const code = ch.charCodeAt(0);
      if (code <= 0x1f) {
        switch (ch) {
          case "\n":
            out += "\\n";
            break;
          case "\r":
            out += "\\r";
            break;
          case "\t":
            out += "\\t";
            break;
          case "\b":
            out += "\\b";
            break;
          case "\f":
            out += "\\f";
            break;
          default:
            out += `\\u${code.toString(16).padStart(4, "0")}`;
        }
      } else {
        out += ch;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
    }
    out += ch;
  }

  return out;
}

function parseGeneratedArticle(rawContent) {
  const normalized = extractJSONObject(stripCodeFences(rawContent));
  const attempts = [
    normalized,
    normalized.replace(/\u0000/g, ""),
    escapeControlCharsInStrings(normalized),
  ];

  let lastError;
  for (const attempt of attempts) {
    try {
      return JSON.parse(attempt);
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Unable to parse model JSON output: ${lastError?.message || "unknown parse error"}`);
}

function validateArticleShape(article) {
  const required = ["slug", "title", "description", "category", "tags", "readTime", "content"];
  const missing = required.filter((k) => !(k in article));
  if (missing.length) {
    throw new Error(`Generated article missing required fields: ${missing.join(", ")}`);
  }
  if (!Array.isArray(article.tags)) {
    throw new Error("Generated article field 'tags' must be an array.");
  }
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const TOKEN_STOP = new Set([
  "with", "from", "that", "this", "into", "will", "have", "your", "guide", "ultimate",
  "mastering", "latest", "future", "comprehensive", "update", "systems", "technologies",
  "trends", "breakthroughs", "practices", "production", "deployment", "advanced",
  "techniques", "patterns", "course", "training",
]);

function normalizeToken(word) {
  if (word.endsWith("ies") && word.length > 5) return `${word.slice(0, -3)}y`;
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 4) return word.slice(0, -1);
  return word;
}

function significantTokens(value) {
  return new Set(
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .map(normalizeToken)
      .filter((word) => word.length >= 4 && !TOKEN_STOP.has(word)),
  );
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }
  const union = left.size + right.size - shared;
  return union === 0 ? 0 : shared / union;
}

/** Drops the old Date.now().toString(36) suffix the daily job used to force a second URL. */
function canonicalSlug(slug) {
  return String(slug || "")
    .toLowerCase()
    .replace(/-(20\d{2})-[a-z0-9]{6,}$/, "-$1");
}

/** Scheduled topics that already have one post. Checked before the fuzzy match. */
const TOPIC_SLUGS = {
  "Latest breakthroughs in AI Agents and autonomous systems": "latest-breakthroughs-ai-agents-autonomous-systems-2026",
  "New MLOps tools and practices for production ML in 2026": "mlops-tools-practices-production-2026",
  "AIOps innovations: AI-powered infrastructure management": "aiops-innovations-infrastructure-management-2026",
  "GenAI and LLM updates: new models, techniques, and use cases": "genai-llm-updates-2026-comprehensive-guide",
  "Kubernetes and cloud-native AI/ML deployment trends": "kubernetes-cloud-native-ai-ml-deployment-trends-2026",
  "LangChain and RAG system advancements": "mastering-langchain-rag-systems-advancements-2026",
  "AI tools for developer productivity: Cursor, Copilot, and beyond": "10x-developer-productivity-cursor-copilot-2026",
  "Enterprise AI adoption trends and challenges": "enterprise-ai-adoption-trends-challenges-2026",
  "Vector databases and embedding technologies update": "vector-database-embeddings-update-2026",
  "Multi-cloud AI/ML deployment strategies": "mastering-multi-cloud-ai-ml-deployment-strategies-2026",
  "AI safety, governance, and responsible AI practices": "ai-safety-governance-responsible-practices-2026",
  "Fine-tuning LLMs: new techniques and open-source models": "master-fine-tuning-llms-2026-techniques-models",
};

function topicAlreadyCovered(topic, articles) {
  const mapped = TOPIC_SLUGS[topic];
  if (mapped && articles.some((article) => canonicalSlug(article.slug) === mapped)) return mapped;

  const incoming = significantTokens(topic);
  let best = null;
  let bestScore = 0;
  for (const article of articles) {
    const slug = canonicalSlug(article.slug);
    const score = jaccard(incoming, significantTokens(`${slug} ${article.title}`));
    if (score > bestScore) {
      bestScore = score;
      best = slug;
    }
  }
  return bestScore >= 0.45 ? best : null;
}

function duplicateOf(slug, articles) {
  const incomingSlug = canonicalSlug(slug);
  const incoming = significantTokens(incomingSlug);
  for (const article of articles) {
    const existing = canonicalSlug(article.slug);
    if (existing === incomingSlug) return existing;
    if (jaccard(incoming, significantTokens(existing)) >= 0.5) return existing;
  }
  return null;
}

function pickTopic(requested, articles) {
  const trimmed = String(requested || "").trim();
  if (trimmed) {
    const covered = topicAlreadyCovered(trimmed, articles);
    if (covered) return { skip: true, reason: `topic already covered by ${covered}` };
    return { topic: trimmed };
  }

  const open = TOPICS.filter((item) => !topicAlreadyCovered(item, articles));
  if (!open.length) return { skip: true, reason: "every scheduled topic already has an article" };
  return { topic: open[Math.floor(Math.random() * open.length)] };
}

function sanitizeArticle(article, today) {
  const sanitized = { ...article };
  sanitized.slug = canonicalSlug(slugify(sanitized.slug || sanitized.title));
  if (!sanitized.slug.includes("2026") && !sanitized.slug.includes("2027")) {
    sanitized.slug = `${sanitized.slug}-2026`;
  }
  sanitized.title = String(sanitized.title || "").replace(/\s+/g, " ").trim();
  if (sanitized.title.length > 70) {
    const clipped = sanitized.title.slice(0, 70);
    const boundary = clipped.lastIndexOf(" ");
    sanitized.title = (boundary > 40 ? clipped.slice(0, boundary) : clipped).trim();
  }
  sanitized.description = String(sanitized.description || "").trim().slice(0, 155);
  sanitized.category = String(sanitized.category || "").trim();
  sanitized.readTime = String(sanitized.readTime || "10 min").trim();
  sanitized.content = String(sanitized.content || "").trim();
  sanitized.tags = [...new Set((sanitized.tags || []).map((t) => String(t).trim()).filter(Boolean))].slice(0, 10);
  sanitized.date = today;

  if (sanitized.content.length < 2500) {
    throw new Error("Generated content is too short to be useful for SEO.");
  }
  if (sanitized.tags.length < 4) {
    throw new Error("Generated article has too few tags.");
  }

  return sanitized;
}

async function generateArticle(topic) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not set. Skipping article generation.");
    console.log("To enable auto-generation, add GEMINI_API_KEY to your GitHub repo secrets.");
    process.exit(0);
  }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, "utf-8"));
  const picked = pickTopic(topic, articles);
  if (picked.skip) {
    console.log(`Skipped article generation: ${picked.reason}`);
    process.exit(0);
  }
  const selectedTopic = picked.topic;
  const today = new Date().toISOString().split("T")[0];
  const trends = await fetchTrendingSignals();
  const trendLines = trends.headlines.length
    ? trends.headlines.map((h, idx) => `${idx + 1}. ${h}`).join("\n")
    : "No live feed available. Use broadly trending 2026 AI/ML industry topics.";
  const trendKeywords = trends.keywords.length
    ? trends.keywords.join(", ")
    : "ai agents, llmops, mlops, aiops, rag, langchain, kubernetes, genai";

  const prompt = `You are Rajinikanth Vadla, an MLOps, AIOps, GenAI, and AI Agents trainer in Hyderabad. Write one practical article. Do not invent rankings or news.

Topic: ${selectedTopic}
Date context: ${today}

Live trend headlines to align with:
${trendLines}

Priority SEO keywords (use naturally):
${trendKeywords}

Requirements:
- Title should be catchy, include the year 2026, stay under 70 characters, and target one intent
- Description should be 1-2 sentences, keyword-rich, under 155 characters
- Content should be 1200-1800 words in markdown format and genuinely useful
- Use ## for main headings, ### for subheadings
- Include practical insights, tool recommendations, and clearly explain real-world AI/ML use-cases
- Include one section: "How this helps your AI/ML career in 2026"
- Include one section: "Implementation checklist"
- Include one FAQ section with 4-6 Q&A bullets
- Include one comparison section of your approach vs common competitor approaches (without naming brands negatively)
- End with a call-to-action linking to relevant pages (use paths like /mlops-aiops-masterclass, /genai-course, /ai-agents-course, /aiops-training, /ai-tools-productivity)
- Category should be one of: MLOps, AIOps, GenAI, AI Agents, AI Tools, DevOps, Kubernetes, LLMOps
- Tags should be 6-10 relevant keywords focused on high-intent search phrases
- Slug should be URL-friendly (lowercase, hyphens, include 2026)
- Ensure claims are realistic; avoid fake "India's #1" unverifiable lines
- Keep tone clear, practical, and "human mentor" style

Respond ONLY with valid JSON (no markdown code fences, no extra text) in this exact format:
{
  "slug": "url-friendly-slug-2026",
  "title": "Article Title Here",
  "description": "SEO description under 160 chars",
  "category": "Category",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "readTime": "X min",
  "content": "## Markdown content here..."
}`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!res.ok) {
      console.error("Gemini API error:", res.status, await res.text());
      process.exit(1);
    }

    const data = await res.json();
    let content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!content) {
      throw new Error("Gemini returned empty content.");
    }

    if (content.startsWith("```")) {
      content = content.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
    }

    const rawArticle = parseGeneratedArticle(content);
    validateArticleShape(rawArticle);
    const article = sanitizeArticle(rawArticle, today);

    const duplicate = duplicateOf(article.slug, articles);
    if (duplicate) {
      console.log(`Skipped duplicate article. Slug "${article.slug}" matches existing "${duplicate}".`);
      process.exit(0);
    }

    articles.unshift(article);

    if (articles.length > 50) {
      articles.length = 50;
    }

    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));

    console.log(`Generated article: "${article.title}"`);
    console.log(`Slug: ${article.slug}`);
    console.log(`Category: ${article.category}`);
    console.log(`Total articles: ${articles.length}`);
  } catch (err) {
    console.error("Error generating article:", err.message);
    process.exit(1);
  }
}

module.exports = {
  topicAlreadyCovered,
  duplicateOf,
  canonicalSlug,
  pickTopic,
  TOPICS,
};

if (require.main === module) {
  const topic = process.argv[2] || "";
  generateArticle(topic);
}
