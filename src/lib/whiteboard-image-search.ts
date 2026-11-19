export type SearchImage = {
  id: string;
  title: string;
  thumb: string;
  full: string;
  width?: number;
  height?: number;
  source?: string;
};

type CommonsPage = {
  pageid?: number;
  title?: string;
  imageinfo?: Array<{
    url?: string;
    thumburl?: string;
    width?: number;
    height?: number;
    mime?: string;
    descriptionurl?: string;
  }>;
};

/**
 * Image search for the class whiteboard (static site — no server API).
 * Wikimedia Commons is CORS-friendly and reliable for logos / diagrams.
 * Thumbnails + full images are proxied via wsrv.nl so Excalidraw can fetch bytes.
 */
async function searchCommons(query: string, withFiletype: boolean): Promise<SearchImage[]> {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", withFiletype ? `${query} filetype:bitmap|drawing` : query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "24");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|size|mime");
  url.searchParams.set("iiurlwidth", "320");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Search failed (${res.status})`);

  const data = (await res.json()) as {
    query?: { pages?: Record<string, CommonsPage> };
  };
  const pages = Object.values(data.query?.pages ?? {});

  return pages
    .map((page, index) => {
      const info = page.imageinfo?.[0];
      const fullSrc = cleanWikiUrl(info?.url || info?.thumburl || "");
      const thumbSrc = cleanWikiUrl(info?.thumburl || info?.url || "");
      if (!fullSrc) return null;
      const mime = info?.mime || "";
      if (mime && !mime.startsWith("image/")) return null;
      const title = (page.title || query).replace(/^File:/i, "").replace(/\.[^.]+$/, "");
      return {
        id: String(page.pageid ?? `${index}-${fullSrc}`),
        title,
        thumb: proxiedImage(thumbSrc, 280),
        full: proxiedImage(fullSrc, 1200),
        width: info?.width,
        height: info?.height,
        source: info?.descriptionurl,
      } satisfies SearchImage;
    })
    .filter((hit): hit is SearchImage => Boolean(hit));
}

function cleanWikiUrl(src: string) {
  if (!src) return "";
  try {
    const u = new URL(src);
    u.search = "";
    return u.toString();
  } catch {
    return src.split("?")[0] || src;
  }
}

export async function searchTeachingImages(query: string): Promise<SearchImage[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const primary = await searchCommons(q, true);
    if (primary.length) return primary;
  } catch {
    /* fall through to broader search */
  }

  return searchCommons(q, false);
}

/** Turn Google imgres / redirect links into a direct image URL. */
export function resolveExternalImageUrl(raw: string): string | null {
  const trimmed = raw.trim().replace(/&amp;/g, "&");
  if (!trimmed) return null;

  const imgurlParam = trimmed.match(/[?&]imgurl=([^&]+)/i)?.[1];
  if (imgurlParam) {
    try {
      return decodeURIComponent(imgurlParam);
    } catch {
      return imgurlParam;
    }
  }

  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("google.") && u.searchParams.has("imgurl")) {
      const inner = u.searchParams.get("imgurl");
      if (inner) return decodeURIComponent(inner);
    }
    if (
      u.hostname.includes("gstatic.com") ||
      u.hostname.includes("googleusercontent.com") ||
      /\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname)
    ) {
      return trimmed;
    }
  } catch {
    /* not a URL */
  }

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return null;
}

/** CORS-friendly image CDN wrapper so we can fetch bytes into Excalidraw. */
export function proxiedImage(src: string, width: number) {
  if (!src) return "";
  if (src.startsWith("data:")) return src;
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&output=webp&n=-1`;
}

export async function fetchImageAsDataUrl(src: string): Promise<{ dataUrl: string; mimeType: string }> {
  const resolved = resolveExternalImageUrl(src) || src;
  const candidates = resolved.startsWith("data:")
    ? [resolved]
    : [proxiedImage(resolved, 1400), resolved];

  let lastError: unknown;
  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate);
      if (!res.ok) throw new Error(`Could not download image (${res.status})`);
      const blob = await res.blob();
      const mimeType = blob.type && blob.type.startsWith("image/") ? blob.type : "image/webp";
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
      return { dataUrl, mimeType };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Could not download image");
}
