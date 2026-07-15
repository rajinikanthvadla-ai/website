import type { Metadata } from "next";
import SeoCourseLanding from "@/components/SeoCourseLanding";
import { SEO_LANDINGS } from "@/lib/seo-landings";
import { seoLandingMetadata } from "@/lib/seo-metadata";

const landing = SEO_LANDINGS["genai-course"];

export const metadata: Metadata = seoLandingMetadata(landing);

export default function GenAICoursePage() {
  return <SeoCourseLanding landing={landing} />;
}
