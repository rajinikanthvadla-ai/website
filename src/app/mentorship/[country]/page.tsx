import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoAlias from "@/components/SeoAlias";
import { MENTORSHIP_MARKETS } from "@/lib/mentorship-markets";
import { aliasPageMetadata } from "@/lib/seo-alias";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return MENTORSHIP_MARKETS.map((market) => ({ country: market.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!MENTORSHIP_MARKETS.some((market) => market.slug === country)) return {};
  return aliasPageMetadata("/mentorship/", "Mentorship");
}

export default async function CountryMentorshipPage({ params }: Props) {
  const { country } = await params;
  const market = MENTORSHIP_MARKETS.find((item) => item.slug === country);
  if (!market) notFound();

  return (
    <SeoAlias
      title={`Mentorship for ${market.name}`}
      message={`Mentorship for engineers in ${market.name} is the same 1:1 practice as everywhere else. Plans, time zones, and pay ranges are on the mentorship page.`}
      href="/mentorship/"
      cta="View mentorship"
    />
  );
}
