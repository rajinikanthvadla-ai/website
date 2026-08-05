import fs from "fs";
import path from "path";

export type DownloadVariant = {
  fmt: string;
  w: number;
  h: number;
  platform: string;
  png: string;
  jpg: string;
};

export type DownloadItem = {
  id: string;
  title: string;
  files: {
    story: { png: string; jpg: string };
    square: { png: string; jpg: string };
  };
  variants: DownloadVariant[];
};

export function loadDownloadsManifest(): DownloadItem[] {
  try {
    const p = path.join(process.cwd(), "public", "downloads", "manifest.json");
    return JSON.parse(fs.readFileSync(p, "utf-8")) as DownloadItem[];
  } catch {
    return [];
  }
}
