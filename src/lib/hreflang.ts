import { SITE } from "@/lib/constants";
import { INTL_MARKETS } from "@/lib/international-markets";

/** hreflang map for metadata alternates — signals regional landing pages to Google. */
export function buildHreflangLanguages(): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE.url}/`,
    "en-IN": `${SITE.url}/mlops-course-india/`,
  };

  for (const market of INTL_MARKETS) {
    languages[market.hreflang] = `${SITE.url}/global-training/${market.slug}/`;
  }

  return languages;
}

export const HREFLANG_LANGUAGES = buildHreflangLanguages();
