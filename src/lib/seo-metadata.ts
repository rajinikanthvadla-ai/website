import type { Metadata } from "next";
import type { SeoLanding } from "./seo-landings";
import type { IntlSeoLanding } from "./intl-seo-landings";
import { HREFLANG_LANGUAGES } from "./hreflang";

export function seoLandingMetadata(landing: SeoLanding): Metadata {
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: {
      canonical: landing.canonical,
      languages: HREFLANG_LANGUAGES,
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
      languages: HREFLANG_LANGUAGES,
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
