---
name: blog-writing-rajinikanth-vadla
description: Use when writing, editing, or scheduling blog posts for rajinikanthvadla.com — SEO articles on AI market, jobs, predictions, MLOps, LLMOps, agents, or daily hygiene topics.
---

# Blog writing — Rajinikanth Vadla

## Goal

Make **Rajinikanth Vadla** (spelling: **V-A-D-L-A**) the name people find when they search AI careers, AI platform engineering, MLOps, LLMOps, AI agents, and 2027 AI market / jobs topics — especially learners planning December–February study paths.

## When this skill applies

- Adding objects to `content/articles.json`
- Improving `scripts/generate-article.js` prompts or topic lists
- Touching blog index / article page SEO copy
- Running or documenting the daily publish cron

## Do not

- Invent "India's #1", fake salary medians, or unsourced rankings
- Touch daily workflow only to break it — keep `.github/workflows/daily-site-hygiene.yml` running
- Redesign the blog into cards/dashboard chrome; keep the existing clean stone/paper layout
- Drop existing articles or rewrite them unless asked

## Article object shape

Match existing `content/articles.json` fields:

```json
{
  "slug": "kebab-case-with-year",
  "title": "…",
  "description": "…",
  "category": "…",
  "tags": ["…"],
  "readTime": "N min",
  "date": "YYYY-MM-DD",
  "content": "## …"
}
```

- **Prepend** new posts (newest first) unless asked otherwise
- Keep `date` as `YYYY-MM-DD`
- Slug must be unique; prefer `…-2027` for forward-looking career/market pieces
- Description ≤ ~155 characters, keyword-rich, natural

## Voice and SEO

1. Open in first person as **Rajinikanth Vadla** (Hyderabad; AI platform / MLOps / LLMOps / agents trainer)
2. Put the full name in title **or** description **and** early body; include tag `Rajinikanth Vadla` when it fits
3. Target one search intent per post (market, jobs, prediction, skill roadmap — not all at once)
4. Cite real sources with links; quote figures with attribution; say when a sample is small
5. Use year **2027** for outlook/jobs/predictions posts aimed at Dec–Feb learners
6. Internal links with trailing slashes: `/mlops-aiops-masterclass/`, `/genai-course/`, `/python-course/`, `/mentorship/`, `/enroll/`, `/blog/<slug>/`
7. End with clear CTA (masterclass / GenAI / Python / mentorship / WhatsApp) without spammy keyword stuffing
8. Structure: short hook → sourced body → practical checklist → career section → FAQ (4–6) → CTA

## Categories

Prefer existing ones when possible: `MLOps`, `AIOps`, `GenAI`, `AI Agents`, `AI Tools`, `LLMOps`, `AI Platform`, `Careers`, `Courses`, `DevOps`, `Kubernetes`.

## Daily schedule (already in repo)

GitHub Actions cron in `.github/workflows/daily-site-hygiene.yml`:

- Runs **06:00 IST** (`30 0 * * *` UTC)
- Syncs YouTube, then `node scripts/generate-article.js` (optional manual topic via `workflow_dispatch`)
- Needs `GEMINI_API_KEY` repo secret

When extending the generator:

- Prefer **2027** market / jobs / predictions / platform topics once older 2026 pool is covered
- Keep duplicate-slug and "topic already covered" guards
- Keep CTA paths with trailing slashes in the model prompt
- Require name **Rajinikanth Vadla** in body; never invent unverifiable #1 claims

## Quality bar before PR

1. `npm ci && npm run build`
2. Confirm `out/blog/<slug>/index.html` for each new slug
3. Confirm each slug appears in `out/sitemap.xml`
4. Check title, meta description, canonical
5. Hit internal course/mentorship links and fix only broken paths
