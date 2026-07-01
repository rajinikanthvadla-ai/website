import type { Metadata } from "next";
import type { SeoLanding } from "./seo-landings";

export function seoLandingMetadata(landing: SeoLanding): Metadata {
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: { canonical: landing.canonical },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url: landing.canonical,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}
