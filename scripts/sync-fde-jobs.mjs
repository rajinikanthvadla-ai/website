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

function decodeEntities(text) {
  if (!text) return "";
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)));
}

function stripHtml(html) {
  if (!html) return "";
  let text = decodeEntities(html);
  // Second pass in case entities encoded tags (&lt;p&gt;...)
  text = decodeEntities(text);
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractListItems(html) {
  if (!html) return [];
  const decoded = decodeEntities(html);
  const items = [];
  for (const match of decoded.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
    const clean = stripHtml(match[1]);
    if (clean) items.push(clean);
  }
  return items;
}

const JUNK_BULLET =
  /^(about (the )?(team|role|company|us|anthropic|databricks|scale|stripe|privy)|who we are|what you('|’)ll|equal employment|we are an equal|based on the factors|anticipates utilizing|encouraged to apply|compensation|salary|benefits|stock|equity|visa|export control|government license|hiring practices|inclusive|mission is to|as a forward deployed|job (id|code|requisition)|req(uisition)?\.?\s*#?)/i;

const JUNK_INLINE =
  /<\/?[a-z]|class=\"|content-intro|equal opportunity|affirmative action|privacy policy|unsubscribe|CSQ\d|[A-Z]{2,}\d{4,}|\bREQ[-_]?\d+/i;

const REQUIREMENT_SIGNAL =
  /\b(experience|years?|python|typescript|javascript|java|golang|go\b|rust|customer|stakeholder|deploy|production|ship|build|design|architect|llm|api|eval|agent|integrat|security|ambiguity|partner|prototype|fullstack|full-stack|software|engineer|own|lead|collaborate|deliver)\b/i;

function cleanBullet(raw) {
  return stripHtml(raw)
    .replace(/^[\d.)\-–—•\u2022*\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isUsefulBullet(text) {
  if (!text) return false;
  if (text.length < 48 || text.length > 180) return false;
  if (JUNK_BULLET.test(text)) return false;
  if (JUNK_INLINE.test(text)) return false;
  if (/^[A-Z0-9_-]{6,}$/.test(text)) return false; // codes like CSQ327R39
  if (!REQUIREMENT_SIGNAL.test(text)) return false;
  // Skip pure role restatements with no skill signal beyond the title words
  if (/^as a forward deployed engineer/i.test(text) && text.length < 120) return false;
  return true;
}

function bulletsFromHtml(html, max = 3) {
  const fromLists = extractListItems(html).map(cleanBullet).filter(isUsefulBullet);
  if (fromLists.length >= max) return fromLists.slice(0, max);

  const plain = stripHtml(html);
  const sentences = plain
    .split(/(?<=[.!?])\s+/)
    .map(cleanBullet)
    .filter(isUsefulBullet);

  const seen = new Set();
  const out = [];
  for (const bullet of [...fromLists, ...sentences]) {
    const key = bullet.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(bullet);
    if (out.length >= max) break;
  }
  return out;
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

    const html = j.content || "";
    const text = stripHtml(html);
    const location = (j.location && j.location.name) || "See posting";
    const absoluteUrl = j.absolute_url || "";
    if (!absoluteUrl) continue;

    const bullets = bulletsFromHtml(html, 3);
    // Skip postings we can't summarize cleanly — better empty than junk on the page
    if (!bullets.length) continue;

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
      bullets,
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
