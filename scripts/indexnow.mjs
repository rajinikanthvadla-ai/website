// Tells Bing (and through it ChatGPT search, Copilot, DuckDuckGo) and Yandex which pages changed.
//
//   node scripts/indexnow.mjs diff     run after `next build`, BEFORE deploy:
//                                      compares each page's visible text in out/ with the live site
//                                      and writes indexnow-urls.txt with new or changed pages.
//   node scripts/indexnow.mjs submit   run AFTER deploy: sends indexnow-urls.txt to IndexNow.
//
// Only changed pages are sent, as IndexNow asks.
import fs from "node:fs";
import path from "node:path";

const HOST = "rajinikanthvadla.com";
const ORIGIN = `https://${HOST}`;
const KEY = "c80ab8e0f900fb82a1bf6967b5c65ccd"; // public/<KEY>.txt holds the same value
const OUT = path.resolve("out");
const LIST = path.resolve("indexnow-urls.txt");

function visibleText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  const body = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return `${title}\n${desc}\n${body}`;
}

function localFile(url) {
  const p = new URL(url).pathname;
  if (!p.endsWith("/")) return path.join(OUT, p); // .txt, .json
  return path.join(OUT, p, "index.html");
}

async function diff() {
  const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const changed = [];
  const queue = [...urls];
  async function worker() {
    for (let url = queue.shift(); url; url = queue.shift()) {
      const file = localFile(url);
      if (!fs.existsSync(file)) continue;
      const local = fs.readFileSync(file, "utf8");
      let live = "";
      try {
        const r = await fetch(url, { headers: { "User-Agent": "indexnow-diff" } });
        live = r.ok ? await r.text() : "";
      } catch {
        live = "";
      }
      const isHtml = file.endsWith(".html");
      const a = isHtml ? visibleText(local) : local;
      const b = isHtml ? visibleText(live) : live;
      if (a !== b) changed.push(url);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  fs.writeFileSync(LIST, changed.join("\n"));
  console.log(`${changed.length} of ${urls.length} pages are new or changed`);
}

async function submit() {
  const urlList = fs.existsSync(LIST) ? fs.readFileSync(LIST, "utf8").split("\n").filter(Boolean) : [];
  if (!urlList.length) {
    console.log("Nothing changed, nothing to submit.");
    return;
  }
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urlList.slice(0, 10000) }),
  });
  console.log(`IndexNow answered ${r.status} for ${urlList.length} URLs`);
  if (r.status >= 400) process.exitCode = 1;
}

const mode = process.argv[2];
if (mode === "diff") await diff();
else if (mode === "submit") await submit();
else console.log("usage: node scripts/indexnow.mjs diff|submit");
