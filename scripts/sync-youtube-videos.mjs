/**
 * Fetches the latest videos from the YouTube channel and writes
 * content/youtube-videos.json for the static site build.
 *
 * YouTube channel RSS currently 404s for this channel, so we:
 * 1) scrape /videos for ordered video IDs
 * 2) resolve titles via oEmbed
 * 3) keep prior publishedAt when the video was already synced
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "..", "content", "youtube-videos.json");
const CHANNEL_ID = "UCeFXgm7rc9WzmRF1UZ7B4PA";
const CHANNEL_HANDLE = "@IamRajinikanthvadla";
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;
const VIDEOS_URL = `${CHANNEL_URL}/videos`;
const MAX_VIDEOS = 18;

function loadPrevious() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
  } catch {
    return { videos: [] };
  }
}

function extractVideoIds(html) {
  const ids = [];
  const seen = new Set();
  for (const match of html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

async function fetchOembed(id) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
  const response = await fetch(url, {
    headers: { "User-Agent": "rajinikanthvadla-website-sync/1.0" },
  });
  if (!response.ok) return null;
  return response.json();
}

async function main() {
  const previous = loadPrevious();
  const previousById = new Map((previous.videos || []).map((v) => [v.id, v]));

  const pageResponse = await fetch(VIDEOS_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!pageResponse.ok) {
    throw new Error(`YouTube channel page fetch failed: ${pageResponse.status}`);
  }

  const html = await pageResponse.text();
  const ids = extractVideoIds(html).slice(0, MAX_VIDEOS);
  if (!ids.length) {
    throw new Error("No video IDs found on channel videos page");
  }

  const videos = [];
  for (const id of ids) {
    const oembed = await fetchOembed(id);
    const prev = previousById.get(id);
    const title = oembed?.title || prev?.title || `YouTube video ${id}`;
    videos.push({
      id,
      title,
      description: prev?.description || "Watch on Rajinikanth Vadla's YouTube channel.",
      publishedAt: prev?.publishedAt || new Date().toISOString(),
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }

  const payload = {
    channelId: CHANNEL_ID,
    channelUrl: CHANNEL_URL,
    channelTitle: videos[0] ? (await fetchOembed(videos[0].id))?.author_name || previous.channelTitle || "Rajinikanth Vadla" : "Rajinikanth Vadla",
    lastSyncedAt: new Date().toISOString(),
    source: "channel-page+oembed",
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
