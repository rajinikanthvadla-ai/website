import type { Metadata } from "next";
import SeoAlias from "@/components/SeoAlias";
import { aliasPageMetadata } from "@/lib/seo-alias";

export const metadata: Metadata = aliasPageMetadata("/mlops-aiops-masterclass/", "MLOps course India");

export default function MLOpsCourseIndiaPage() {
  return (
    <SeoAlias
      title="MLOps course in India"
      message="The India cohort is the same live masterclass: ₹40,000 with mentorship, or ₹30,000 for recordings. Evening classes are 8:00–9:45 PM IST."
      href="/mlops-aiops-masterclass/"
      cta="View the masterclass"
    />
  );
}
