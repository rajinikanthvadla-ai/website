import type { Metadata } from "next";
import SeoAlias from "@/components/SeoAlias";
import { aliasPageMetadata } from "@/lib/seo-alias";

export const metadata: Metadata = aliasPageMetadata("/mlops-aiops-masterclass/", "MLOps course");

export default function MLOpsCoursePage() {
  return (
    <SeoAlias
      title="MLOps course"
      message="The MLOps course is the live MLOps, AIOps, LLMOps and AI Agents masterclass. Syllabus, India and international fees, and enrollment are on that page."
      href="/mlops-aiops-masterclass/"
      cta="View the masterclass"
    />
  );
}
