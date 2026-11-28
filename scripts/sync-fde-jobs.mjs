/**
 * Pulls live Forward Deployed / Applied AI engineering roles from public
 * Greenhouse job boards and writes content/fde-jobs.json for the FDE course page.
 *
 * Sources are official public ATS JSON APIs (no LinkedIn scrape).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "..", "content", "fde-jobs.json");

const POOL_SIZE = 16;
const DISPLAY_HINT = 8;

const BOARDS = [
  { company: "Anthropic", token: "anthropic", brand: "Anthropic" },
  { company: "Databricks", token: "databricks", brand: "Databricks" },
  { company: "Scale AI", token: "scaleai", brand: "Scale AI" },
  { company: "Stripe", token: "stripe", brand: "Stripe" },
  { company: "Airbnb", token: "airbnb", brand: "Airbnb" },
];

const TITLE_INCLUDE =
  /\b(forward\s*deployed|\bFDE\b|applied\s*ai\s*engineer|frontier\s*agents?\s*engineer.*forward\s*deployed|full-?stack.*forward\s*deployed)/i;

const TITLE_EXCLUDE =
  /\b(recruiter|manager|head of|director|vp\b|intern|internship|tpm|program manager|product manager|architect|accelerator|marketing)\b/i;

const COURSE_SIGNALS = [
  { tag: "Customer discovery", re: /customer|stakeholder|discovery|requirements|embed/i },
  { tag: "Production delivery", re: /production|deploy|ship|delivery|integrate|fullstack|full-stack/i },
  { tag: "Evals & quality", re: /eval|quality|reliab|benchmark|test|metric/i },
  { tag: "Security & cost", re: /security|privacy|cost|latency|guardrail|compliance/i },
  { tag: "Playbook / reuse", re: /playbook|pattern|reusable|scale|template|platform/i },
  { tag: "LLM / agents", re: /\bLLM\b|agent|genai|generative|claude|gpt|model/i },
];

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function bulletsFromText(text, max = 3) {
  const parts = text
    .split(/(?<=[.!?])\s+|[\n\r]+|[•\u2022*]|\s{2,}/)
    .map((p) => p.replace(/^[\d.)\-–—:\s]+/, "").trim())
    .filter(Boolean);

  const preferred = [];
  const fallback = [];
  for (const p of parts) {
    if (p.length < 45 || p.length > 170) continue;
    if (/experience|python|customer|deploy|product|llm|api|stakeholder|production|security|eval|agent|integrate/i.test(p)) {
      preferred.push(p);
    } else {
      fallback.push(p);
    }
  }
  return [...preferred, ...fallback].slice(0, max);
}

function courseTags(title, text) {
  const hay = `${title} ${text}`;
  const tags = [];
  for (const signal of COURSE_SIGNALS) {
    if (signal.re.test(hay)) tags.push(signal.tag);
  }
  if (!tags.length) tags.push("Production delivery");
  return tags.slice(0, 3);
}

function shortenLocation(location) {
  const parts = location
    .split(/;|\|/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 2) {
    const joined = parts.join(" · ") || location;
    return joined.length > 72 ? `${joined.slice(0, 69).trim()}…` : joined;
  }
  const remote = parts.find((p) => /remote/i.test(p));
  const picked = parts.slice(0, 2);
  if (remote && !picked.some((p) => /remote/i.test(p))) picked.push("Remote");
  const joined = `${picked.join(" · ")} +${parts.length - picked.length} more`;
  return joined.length > 80 ? `${joined.slice(0, 77).trim()}…` : joined;
}

function scoreJob(job) {
  let score = 0;
  const title = job.title;
  if (/^forward\s*deployed\s*engineer/i.test(title)) score += 60;
  else if (/forward\s*deployed|\bFDE\b/i.test(title)) score += 50;
  if (/applied\s*ai\s*engineer/i.test(title)) score += 30;
  if (/staff|senior|sr\./i.test(title)) score += 4;
  if (/india|bangalore|bengaluru|hyderabad|remote/i.test(job.location)) score += 8;
  if (/san francisco|new york|london|seattle|munich|paris/i.test(job.location)) score += 2;
  score += Math.min(job.courseTags.length, 3) * 3;
  return score;
}

async function fetchBoard(board) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs?content=true`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "rajinikanthvadla-website-fde-jobs-sync/1.0",
    },
  });
  if (!res.ok) {
    throw new Error(`${board.brand} Greenhouse fetch failed: ${res.status}`);
  }
  const data = await res.json();
  const jobs = data.jobs || [];
  const matched = [];

  for (const j of jobs) {
    const title = (j.title || "").trim();
    if (!TITLE_INCLUDE.test(title) || TITLE_EXCLUDE.test(title)) continue;

    const text = stripHtml(j.content || "");
    const location = (j.location && j.location.name) || "See posting";
    const absoluteUrl = j.absolute_url || "";
    if (!absoluteUrl) continue;

    const cleanLocation = location.replace(/\s+/g, " ").trim();
    matched.push({
      id: `${board.token}-${j.id}`,
      company: board.brand,
      title,
      location: shortenLocation(cleanLocation),
      locationFull: cleanLocation,
      url: absoluteUrl,
      source: "greenhouse",
      board: board.token,
      updatedAt: j.updated_at || j.first_published || null,
      bullets: bulletsFromText(text),
      courseTags: courseTags(title, text),
    });
  }

  return matched;
}

function diversify(jobs, limit) {
  const ranked = [...jobs].sort((a, b) => scoreJob(b) - scoreJob(a));
  const queues = new Map();
  for (const job of ranked) {
    if (!queues.has(job.company)) queues.set(job.company, []);
    const list = queues.get(job.company);
    if (list.length < 3) list.push(job);
  }

  const selected = [];
  let progressed = true;
  while (selected.length < limit && progressed) {
    progressed = false;
    for (const [, list] of queues) {
      if (!list.length || selected.length >= limit) continue;
      selected.push(list.shift());
      progressed = true;
    }
  }
  return selected;
}

async function main() {
  const all = [];
  const errors = [];

  for (const board of BOARDS) {
    try {
      const jobs = await fetchBoard(board);
      console.log(`${board.brand}: ${jobs.length} FDE-relevant roles`);
      all.push(...jobs);
    } catch (err) {
      errors.push(String(err.message || err));
      console.warn(err.message || err);
    }
  }

  if (!all.length) {
    if (fs.existsSync(OUTPUT)) {
      console.warn("No fresh jobs fetched; keeping existing content/fde-jobs.json");
      process.exit(0);
    }
    throw new Error(`No FDE jobs found. Errors: ${errors.join("; ") || "none"}`);
  }

  // Dedupe by company + normalized title (keep highest score / freshest)
  const dedup = new Map();
  for (const job of all) {
    const key = `${job.company}::${job.title.toLowerCase()}`;
    const prev = dedup.get(key);
    if (!prev || scoreJob(job) > scoreJob(prev)) {
      dedup.set(key, job);
    }
  }

  const pool = diversify([...dedup.values()], POOL_SIZE);
  const payload = {
    updatedAt: new Date().toISOString(),
    displayCount: DISPLAY_HINT,
    disclaimer:
      "Sample openings pulled from public company career boards. Not a placement guarantee — use them to see how this course maps to real FDE hiring signals.",
    jobs: pool,
    meta: {
      totalMatched: all.length,
      uniqueTitles: dedup.size,
      sources: BOARDS.map((b) => b.brand),
      errors,
    },
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${pool.length} jobs → ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
