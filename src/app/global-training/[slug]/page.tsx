import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IntlSeoLandingPage from "@/components/IntlSeoLanding";
import { INTL_SEO_LANDINGS } from "@/lib/intl-seo-landings";
import { intlLandingMetadata } from "@/lib/seo-metadata";
import type { IntlMarketSlug } from "@/lib/international-markets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(INTL_SEO_LANDINGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = INTL_SEO_LANDINGS[slug as IntlMarketSlug];
  if (!landing) return {};
  return intlLandingMetadata(landing);
}

export default async function GlobalTrainingMarketPage({ params }: Props) {
  const { slug } = await params;
  const landing = INTL_SEO_LANDINGS[slug as IntlMarketSlug];
  if (!landing) notFound();
  return <IntlSeoLandingPage landing={landing} />;
}
