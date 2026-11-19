import { fetchImageAsDataUrl, resolveExternalImageUrl } from "@/lib/whiteboard-image-search";

function pickHttpLine(text: string): string | null {
  return (
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#") && /^https?:\/\//i.test(line)) || null
  );
}

function urlFromHtml(html: string): string | null {
  const imgSrc = html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  if (imgSrc) return resolveExternalImageUrl(imgSrc.replace(/&amp;/g, "&"));
  const bare = html.match(/https?:\/\/[^"'\\\s>]+/i)?.[0];
  return bare ? resolveExternalImageUrl(bare) : null;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function loadDroppedImage(
  dt: DataTransfer,
  coords: { clientX: number; clientY: number },
  insert: (
    dataUrl: string,
    mimeType: string,
    opts: { clientX: number; clientY: number },
  ) => Promise<void>,
): Promise<boolean> {
  const fileList = dt.files?.length ? [...dt.files] : [];
  for (const file of fileList) {
    if (!file.type.startsWith("image/")) continue;
    const dataUrl = await readFileAsDataUrl(file);
    await insert(dataUrl, file.type || "image/png", coords);
    return true;
  }

  for (const item of [...dt.items]) {
    if (item.kind === "file" && item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (!file) continue;
      const dataUrl = await readFileAsDataUrl(file);
      await insert(dataUrl, file.type || "image/png", coords);
      return true;
    }
  }

  const syncCandidates = [
    dt.getData("text/uri-list"),
    dt.getData("text/plain"),
    dt.getData("text/html"),
    dt.getData("URL"),
    dt.getData("text/x-moz-url"),
  ];

  for (const block of syncCandidates) {
    if (!block) continue;
    const url =
      block.includes("<") ? urlFromHtml(block) : resolveExternalImageUrl(pickHttpLine(block) || block);
    if (!url) continue;
    const { dataUrl, mimeType } = await fetchImageAsDataUrl(url);
    await insert(dataUrl, mimeType, coords);
    return true;
  }

  const stringItems = [...dt.items].filter((item) => item.kind === "string");
  for (const item of stringItems) {
    const text = await new Promise<string>((resolve) => item.getAsString(resolve));
    if (!text) continue;
    const url =
      item.type === "text/html" ? urlFromHtml(text) : resolveExternalImageUrl(pickHttpLine(text) || text);
    if (!url) continue;
    const { dataUrl, mimeType } = await fetchImageAsDataUrl(url);
    await insert(dataUrl, mimeType, coords);
    return true;
  }

  return false;
}

export function shouldAcceptBoardDrag(types: readonly string[], googlePanelOpen: boolean) {
  if (googlePanelOpen && types.length === 0) return true;
  const list = Array.from(types);
  return (
    list.includes("Files") ||
    list.includes("text/uri-list") ||
    list.includes("text/html") ||
    list.includes("text/plain") ||
    list.includes("URL") ||
    list.includes("text/x-moz-url")
  );
}