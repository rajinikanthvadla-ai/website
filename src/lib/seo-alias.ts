import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/** Absolute canonical URL for a site path. Static export cannot send a 301, so aliases use this plus a meta refresh. */
export function canonicalUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE.url}${withSlash}`;
}

/** Metadata for a URL that should disappear in favor of one canonical page. */
export function aliasPageMetadata(canonicalPath: string, title = "Page moved"): Metadata {
  return {
    title,
    description: "This address now points at the main page for this topic.",
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    alternates: { canonical: canonicalUrl(canonicalPath) },
  };
}
