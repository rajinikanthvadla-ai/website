import type { Metadata } from "next";
import SeoAlias from "@/components/SeoAlias";
import { aliasPageMetadata } from "@/lib/seo-alias";

export const metadata: Metadata = aliasPageMetadata("/mlops-aiops-masterclass/", "MLOps training");

export default function MLOpsTrainingPage() {
  return (
    <SeoAlias
      title="MLOps training"
      message="MLOps training is the same live masterclass as the MLOps course. Syllabus, fees, and enrollment are on that page."
      href="/mlops-aiops-masterclass/"
      cta="View the masterclass"
    />
  );
}
