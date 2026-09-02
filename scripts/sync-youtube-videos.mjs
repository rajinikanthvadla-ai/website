/**
 * Fetches the latest videos from the YouTube channel RSS feed (no API key required).
 * Writes content/youtube-videos.json for the site build.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "..", "content", "youtube-videos.json");
const CHANNEL_ID = "UCeFXgm7rc9WzmRF1UZ7B4PA";
const MAX_VIDEOS = 12;
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return decodeXml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function truncate(text, max = 220) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function channelTitleFrom(xml) {
  const match = xml.match(/<title>([^<]+)<\/title>/);
  return match ? decodeXml(match[1]) : "Rajinikanth Vadla";
}

function parseFeed(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);

  return entries.map((entry) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
    const title = stripTags(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    const descriptionRaw = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? "";
    const description = truncate(stripTags(descriptionRaw));

    return {
      id,
      title,
      description,
      publishedAt,
      url: `https://www.youtube.com/watch?v=${id}`,
    };
  }).filter((video) => video.id && video.title);
}

async function main() {
  const response = await fetch(RSS_URL, {
    headers: { "User-Agent": "rajinikanthvadla-website-sync/1.0" },
  });

  if (!response.ok) {
    throw new Error(`YouTube RSS fetch failed: ${response.status}`);
  }

  const xml = await response.text();
  const videos = parseFeed(xml).slice(0, MAX_VIDEOS);

  const payload = {
    channelId: CHANNEL_ID,
    channelUrl: "https://www.youtube.com/@IamRajinikanthvadla",
    channelTitle: channelTitleFrom(xml),
    lastSyncedAt: new Date().toISOString(),
    videos,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Synced ${videos.length} videos → ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
