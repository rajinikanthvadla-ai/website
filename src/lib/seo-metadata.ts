import type { Metadata } from "next";
import type { SeoLanding } from "./seo-landings";
import type { IntlSeoLanding } from "./intl-seo-landings";
import { HREFLANG_LANGUAGES } from "./hreflang";

/** hreflang only belongs on pages that are part of the country set (home, India, country pages). */
function languagesFor(canonical: string) {
  return Object.values(HREFLANG_LANGUAGES).includes(canonical) ? HREFLANG_LANGUAGES : undefined;
}

export function seoLandingMetadata(landing: SeoLanding): Metadata {
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: {
      canonical: landing.canonical,
      languages: languagesFor(landing.canonical),
    },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url: landing.canonical,
      type: "website",
      locale: "en_US",
    },
    robots: { index: true, follow: true },
  };
}

export function intlLandingMetadata(landing: IntlSeoLanding): Metadata {
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: {
      canonical: landing.canonical,
      languages: languagesFor(landing.canonical),
    },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url: landing.canonical,
      type: "website",
      locale: landing.hreflang.replaceAll("-", "_"),
    },
    robots: { index: true, follow: true },
  };
}
