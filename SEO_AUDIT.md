# SEO Audit — rajinikanthvadla.com

Date: 2026-04-18
Audited build: `/out/` (Next.js 15 static export)

---

## TL;DR

Your technical SEO foundation is strong: good Next.js static export, comprehensive JSON-LD (Person, Organization, Course, FAQPage), clean sitemap generation, image alt coverage at 100% (107/107 `<img>` tags have non-empty alt). The issues below are in three buckets, in priority order:

1. **Canonical tags and content cannibalization are actively hurting you.** 4 core pages declare the homepage as their canonical, and the blog has 5+ near-duplicate articles competing for the same keywords. Google is almost certainly consolidating signals incorrectly.
2. **Titles and meta descriptions are too long on every page.** Every title is 80–114 chars; Google truncates at ~60. Descriptions run 200–340 chars; Google truncates at ~155. You are paying a word cost for zero visible benefit.
3. **Content depth is too shallow to outrank big domains.** 4 blog posts are under 400 words; the rest are 800–1,100. To beat NareshIT / IBM / Microsoft on generic terms, pillar pages need 2,500–4,000 words.

---

## P0 — Fix this week

### P0.1 Canonical tags wrong on 4 core pages

Pages that do NOT set their own `alternates.canonical` inherit the root layout's canonical, which points to the homepage. Google reads this as "this URL is a duplicate of the homepage."

| Page | Rendered canonical | Should be |
|---|---|---|
| `/about/` | `https://www.rajinikanthvadla.com/` | `…/about` |
| `/courses/` | `https://www.rajinikanthvadla.com/` | `…/courses` |
| `/mentorship/` | `https://www.rajinikanthvadla.com/` | `…/mentorship` |
| `/contact/` | `https://www.rajinikanthvadla.com/` | `…/contact` |

**Fix:** In each of those 4 `src/app/<page>/page.tsx` files, add to the `metadata` export:

```ts
alternates: { canonical: "https://www.rajinikanthvadla.com/<slug>" },
```

The training pages (`mlops-training`, `aiops-training`, `genai-training`, `mlops-aiops-masterclass`, `ai-tools-productivity`, `blog`) already do this correctly — use them as reference.

### P0.2 Apex vs www canonical mismatch

- `CNAME` file: `rajinikanthvadla.com` (apex)
- Every canonical, sitemap URL, and schema URL: `https://www.rajinikanthvadla.com` (www)

This is a split-signal problem. If a user lands on the apex (what your DNS points to), the canonical tells Google the "real" page is at www — Google then has to decide which to index. GitHub Pages does enforce a redirect between apex and www, but the direction depends on which one you set as the custom domain in repo settings.

**Fix (recommended):** Pick www as canonical (you already did in code). Update `public/CNAME` to `www.rajinikanthvadla.com` and in the GitHub Pages settings set the custom domain to `www.rajinikanthvadla.com`. Confirm DNS has a `CNAME` record at `www` pointing to `<user>.github.io` and an `ALIAS`/`A` record at apex to the GitHub Pages IPs — GitHub Pages will then 301 apex → www.

Verify after deploy:

```bash
curl -sI https://rajinikanthvadla.com | grep -i location
# expect: Location: https://www.rajinikanthvadla.com/
```

### P0.3 Blog content cannibalization (duplicate topics)

`content/articles.json` contains duplicate/near-duplicate posts competing for the same queries:

| Kept (canonical) | Duplicate to delete or merge + 301 |
|---|---|
| `enterprise-ai-adoption-trends-challenges-2026` | `enterprise-ai-adoption-trends-challenges-2026-mo15r440` |
| `autonomous-ai-agents-breakthroughs-2026` | `autonomous-ai-agents-breakthroughs-2026-mnzqaole` |
| `mlops-tools-practices-production-2026` | `mlops-tools-practices-production-2026-mnvfd6dy` |
| `mastering-multi-cloud-ai-ml-deployment-strategies-2026` | `multi-cloud-ai-ml-deployment-strategies-2026` |
| `autonomous-ai-agents-breakthroughs-2026` | `breakthroughs-ai-agents-autonomous-systems-2026` (near-dup) |
| `mastering-aiops-infrastructure-management-2026` | `aiops-innovations-infrastructure-management-2026` (near-dup) |

Those `-mnvfd6dy` / `-mo15r440` / `-mnzqaole` suffixes look like machine-generated auto-publishing collisions. They must not ship.

**Fix:**
1. Delete the duplicate entries from `content/articles.json`.
2. Remove their URLs from `src/app/sitemap.ts`.
3. Since the duplicates may already be indexed, add a redirect file (if hosting supports it) or at minimum add a `noindex` meta on those pages before removing. On GitHub Pages static export, the cleanest move is to delete the dup slugs from `articles.json` so the static files stop generating, then submit the URLs for removal in Google Search Console.

### P0.4 Sitemap orphan

`multi-cloud-ai-ml-deployment-strategies-2026` exists in `articles.json` but is NOT in `sitemap.ts`. This will resolve itself once you delete it as a duplicate (see P0.3), but right now it's an orphan.

---

## P1 — Fix this month

### P1.1 Titles exceed Google's display limit

Rendered HTML confirms every page title is 80–114 chars. Google's SERP displays roughly 50–60 chars (pixel-width based). Anything longer gets truncated with `…`. Worse, Google sometimes rewrites titles entirely when they look stuffed.

Recommended rewrites (target 50–60 chars):

| Page | Current (chars) | Suggested (chars) |
|---|---|---|
| `/` | "Rajinikanth Vadla \| MLOps, AIOps, GenAI training and 1:1 career mentorship (worldwide)" (86) | "Rajinikanth Vadla — MLOps, AIOps & GenAI Training" (51) |
| `/mlops-training` | "Best MLOps Training India \| Machine Learning Operations Course \| MLflow Kubeflow \| Rajinikanth Vadla" (100) | "MLOps Training India — MLflow, Kubeflow, Production ML" (55) |
| `/aiops-training` | 95 chars | "AIOps Training — AI for IT Ops, Anomaly Detection" (49) |
| `/genai-training` | 93 chars | "GenAI & AI Agents Training — LangChain, RAG, LLMs" (49) |
| `/mlops-aiops-masterclass` | 114 chars | "MLOps + AIOps Masterclass — 12-Week Live Cohort" (47) |
| `/ai-tools-productivity` | 111 chars | "AI Tools for 10x Productivity — Cursor, Claude, Copilot" (56) |
| `/blog` | 80 chars | "MLOps, AIOps & GenAI Blog — Rajinikanth Vadla" (45) |

The `template: \`%s | ${SITE.name}\`` in `layout.tsx` already appends your name — individual page titles should exclude " | Rajinikanth Vadla" since the template adds it.

### P1.2 Meta descriptions are too long

Google displays ~155 chars on desktop, ~120 on mobile. Current pages run 200–342 chars; everything after 155 is invisible. Rewrite with the keyword + hook + CTA in the first 150 chars.

Example for homepage (currently 342 chars, cut to 155):

> Live MLOps, AIOps & GenAI training from Rajinikanth Vadla — 500+ engineers trained, hands-on labs, 1:1 career mentorship worldwide. Join the next cohort.

### P1.3 Thin content on 4 legacy blog posts

| Slug | Words |
|---|---|
| `aiops-vs-traditional-monitoring-2026` | 251 |
| `top-ai-tools-developers-2026` | 296 |
| `ai-agents-explained-langchain-crewai-2026` | 305 |
| `what-is-mlops-complete-guide-2026` | 322 |

Google's quality rater guidelines penalize "thin content" — especially when the title promises a "complete guide" and delivers 322 words. `what-is-mlops-complete-guide-2026` is the worst offender because the intent is high-volume and the bar is set by 3,000+ word competitor articles from neptune.ai, valohai, etc.

**Fix:** Rewrite each to 2,000–3,000 words with:
- Real code snippets (install, deploy, monitor commands)
- Comparison tables (you already use them well)
- Diagrams or Mermaid graphs
- FAQ section with `FAQPage` JSON-LD
- Internal links to your training pages
- External authoritative citations (papers, docs)

### P1.4 Blog markdown renderer is too limited

`src/app/blog/[slug]/page.tsx` hand-rolls markdown with string `startsWith` checks. It doesn't support:

- Inline code (`` `code` ``)
- Code fences (```` ```lang ````) — critical for MLOps content
- Inline bold/italic inside paragraphs
- Inline links inside paragraphs (you only handle the full-line CTA variant)
- Images in posts (no `<img>` handling)
- Nested lists

**Fix:** Swap the hand renderer for `react-markdown` + `remark-gfm` + `rehype-highlight`. One-time 30-min change. Bigger win than it sounds — code snippets + images are what rank for tutorial queries.

### P1.5 Per-article Article schema is missing `image` and `dateModified`

In `src/app/blog/[slug]/page.tsx` the JSON-LD has `headline`, `description`, `datePublished`, `author`, `publisher`, `keywords`. Google also wants:

- `image` (required for article rich results)
- `dateModified` (ranking signal — fresh content wins)
- `mainEntityOfPage`

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: [`https://www.rajinikanthvadla.com${article.heroImage || "/assets/pic-1.png"}`],
  datePublished: article.date,
  dateModified: article.updatedAt || article.date,
  mainEntityOfPage: `https://www.rajinikanthvadla.com/blog/${article.slug}`,
  author: { "@type": "Person", name: "Rajinikanth Vadla", url: "https://www.rajinikanthvadla.com/" },
  publisher: {
    "@type": "Organization",
    name: "Rajinikanth Vadla",
    logo: { "@type": "ImageObject", url: "https://www.rajinikanthvadla.com/assets/pic-1.png" },
  },
  keywords: article.tags.join(", "),
};
```

### P1.6 The root layout injects the same 5 JSON-LD blocks on every page

`layout.tsx` injects WebSite + Person + Organization + Course + FAQPage on every single URL. That's fine for WebSite/Person/Organization (site-wide), but `Course` and `FAQPage` should appear on the relevant pages only — otherwise your `/contact/` and `/blog/` pages declare they are the Masterclass course. Google won't always detect this, but it dilutes the signal.

**Fix:** Move `STRUCTURED_DATA.course` into `src/app/mlops-aiops-masterclass/page.tsx` and `STRUCTURED_DATA.faq` into the homepage only (plus per-page FAQ schema for training pages that list their own FAQs).

---

## P2 — Nice to have

### P2.1 BreadcrumbList schema

Add breadcrumb JSON-LD to each training and blog page. Rich results eligible.

### P2.2 Open Graph image per page

Currently all pages share the same OG image (`/assets/pic-1.png`). Unique OG images per training page will lift LinkedIn/Twitter/WhatsApp click-through from the blog and social shares — which drives backlinks.

### P2.3 Core Web Vitals measurement

Run Lighthouse / PageSpeed Insights against `https://www.rajinikanthvadla.com/`. The priority-preloaded hero image is good. Watch for:
- YouTube `<iframe>` on homepage — defer it further (lazy-load via intersection observer)
- Google Fonts (`Libre_Baskerville`, `Source_Sans_3`) — already using `next/font` which is optimal.

### P2.4 Remove `meta name="keywords"`

Google has ignored this tag since 2009. You have ~420 words of keywords per page. Not harmful, but remove from `layout.tsx` and per-page metadata to simplify.

### P2.5 Video schema

You have a YouTube embed on the homepage. Add `VideoObject` schema so the video appears in Google Video rich results.

### P2.6 Google Search Console verification

The `metadata.verification: {}` in `layout.tsx` is empty. Once canonical/duplicates are fixed, add a `google-site-verification` meta and verify the property in Google Search Console. Then:
- Submit `sitemap.xml`
- Request re-indexing of fixed pages
- Request removal of the 5 duplicate blog URLs (after you delete them)

### P2.7 `hreflang` for international reach

You advertise "worldwide mentorship" and your audience includes India, USA, Europe. Since you only serve English, a single `<link rel="alternate" hreflang="en" href="…" />` plus `hreflang="x-default"` signals international intent without needing translations.

---

## What is already done well (do not touch)

- Static export with `trailingSlash: true` — all URLs consistent and fully pre-rendered.
- 100% image alt coverage (107/107).
- H1 is unique per page and keyword-targeted.
- Person, Organization, AggregateRating, ContactPoint schema are comprehensive.
- FAQ blocks on training pages with proper `FAQPage` JSON-LD.
- Internal linking via `next/link`.
- Mobile-responsive (Tailwind).
- `robots.ts` correctly lists sitemap.
- `next/font` with font subsetting.
- Lazy-loaded YouTube iframe (good, could be deferred further).

---

## Suggested order of fixes (2-hour focused session)

1. Add `alternates.canonical` to `about`, `courses`, `mentorship`, `contact` pages. (10 min)
2. Delete 5 duplicate blog entries from `content/articles.json` and `src/app/sitemap.ts`. (15 min)
3. Shorten titles and descriptions per P1.1 / P1.2. (30 min)
4. Fix CNAME / confirm GitHub Pages domain is www. (15 min)
5. Move `Course` + `FAQ` schema out of root layout into their correct pages. (15 min)
6. Add Google Search Console verification and submit sitemap. (15 min)
7. Rebuild (`npm run build:clean`), deploy, verify each `/page/` shows correct canonical. (20 min)

Remaining items (rewrite thin content, swap markdown renderer, per-page OG images) belong in the 90-day plan.
