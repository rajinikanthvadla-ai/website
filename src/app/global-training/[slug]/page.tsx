import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoAlias from "@/components/SeoAlias";
import { INTL_MARKETS } from "@/lib/international-markets";
import { aliasPageMetadata } from "@/lib/seo-alias";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INTL_MARKETS.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!INTL_MARKETS.some((market) => market.slug === slug)) return {};
  return aliasPageMetadata("/global-training/", "Global training");
}

export default async function GlobalTrainingMarketPage({ params }: Props) {
  const { slug } = await params;
  const market = INTL_MARKETS.find((item) => item.slug === slug);
  if (!market) notFound();

  return (
    <SeoAlias
      title={`Training for ${market.name}`}
      message={`Engineers in ${market.name} join the same live online cohort. Class times, fees, and typical pay are on the global training page.`}
      href="/global-training/"
      cta="View global training"
    />
  );
}
