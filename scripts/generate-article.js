const fs = require("fs");
const path = require("path");

const ARTICLES_PATH = path.join(__dirname, "..", "content", "articles.json");
const SITEMAP_PATH = path.join(__dirname, "..", "src", "app", "sitemap.ts");

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

async function generateArticle(topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY not set. Skipping article generation.");
    console.log("To enable auto-generation, add OPENAI_API_KEY to your GitHub repo secrets.");
    process.exit(0);
  }

  const selectedTopic = topic || TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are Rajinikanth Vadla, India's #1 MLOps, AIOps, GenAI, and AI Agents trainer. Write a comprehensive, SEO-optimized blog article.

Topic: ${selectedTopic}

Requirements:
- Title should be catchy, include the year 2026, and target SEO keywords
- Description should be 1-2 sentences, keyword-rich, under 160 characters
- Content should be 800-1200 words in markdown format
- Use ## for main headings, ### for subheadings
- Include practical insights, tool recommendations, and industry trends
- End with a call-to-action linking to relevant training pages
- Category should be one of: MLOps, AIOps, GenAI, AI Agents, AI Tools, DevOps, Kubernetes, LLMOps
- Tags should be 4-6 relevant keywords
- Slug should be URL-friendly (lowercase, hyphens, include 2026)

Respond ONLY with valid JSON in this exact format:
{
  "slug": "url-friendly-slug-2026",
  "title": "Article Title Here",
  "description": "SEO description under 160 chars",
  "category": "Category",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readTime": "X min",
  "content": "## Markdown content here..."
}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!res.ok) {
      console.error("OpenAI API error:", res.status, await res.text());
      process.exit(1);
    }

    const data = await res.json();
    let content = data.choices[0].message.content.trim();

    if (content.startsWith("```")) {
      content = content.replace(/^```json?\n?/, "").replace(/\n?```$/, "");
    }

    const article = JSON.parse(content);
    article.date = today;

    const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, "utf-8"));

    if (articles.some((a) => a.slug === article.slug)) {
      article.slug += "-" + Date.now().toString(36);
    }

    articles.unshift(article);

    if (articles.length > 50) {
      articles.length = 50;
    }

    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));

    let sitemap = fs.readFileSync(SITEMAP_PATH, "utf-8");
    const newEntry = `    { url: \`\${base}/blog/${article.slug}\`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },`;

    if (!sitemap.includes(article.slug)) {
      sitemap = sitemap.replace(
        /(\s*\];)/,
        `\n${newEntry}$1`
      );
      fs.writeFileSync(SITEMAP_PATH, sitemap);
    }

    console.log(`Generated article: "${article.title}"`);
    console.log(`Slug: ${article.slug}`);
    console.log(`Category: ${article.category}`);
    console.log(`Total articles: ${articles.length}`);
  } catch (err) {
    console.error("Error generating article:", err.message);
    process.exit(1);
  }
}

const topic = process.argv[2] || "";
generateArticle(topic);
