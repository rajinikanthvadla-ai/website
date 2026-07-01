import type { Metadata } from "next";
import SeoCourseLanding from "@/components/SeoCourseLanding";
import { SEO_LANDINGS } from "@/lib/seo-landings";
import { seoLandingMetadata } from "@/lib/seo-metadata";

const landing = SEO_LANDINGS["mlops-training"];

export const metadata: Metadata = seoLandingMetadata(landing);

export default function MLOpsTrainingPage() {
  return <SeoCourseLanding landing={landing} />;
}
