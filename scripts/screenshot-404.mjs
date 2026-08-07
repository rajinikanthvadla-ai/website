import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import puppeteer from "puppeteer";

const ROOT = "out";
const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".json": "application/json", ".txt": "text/plain", ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = join(ROOT, p);
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("nf");
  }
});

await new Promise((r) => server.listen(4899, r));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.evaluateOnNewDocument(() => {
  try { sessionStorage.setItem("rv-new-courses-popup-dismissed", "1"); } catch {}
});
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto("http://localhost:4899/404.html", { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: "scripts/output/404-preview.png", fullPage: true });

// mobile view
await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 1 });
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "scripts/output/404-preview-mobile.png" });

await browser.close();
server.close();
console.log("screenshots saved");
