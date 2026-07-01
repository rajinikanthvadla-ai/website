import type { Metadata } from "next";
import SeoCourseLanding from "@/components/SeoCourseLanding";
import { SEO_LANDINGS } from "@/lib/seo-landings";
import { seoLandingMetadata } from "@/lib/seo-metadata";

const landing = SEO_LANDINGS["mlops-course-india"];

export const metadata: Metadata = seoLandingMetadata(landing);

export default function MLOpsCourseIndiaPage() {
  return <SeoCourseLanding landing={landing} />;
}
