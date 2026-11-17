import type { Metadata } from "next";
import SeoAlias from "@/components/SeoAlias";
import { aliasPageMetadata } from "@/lib/seo-alias";

export const metadata: Metadata = aliasPageMetadata("/genai-course/", "GenAI training");

export default function GenAITrainingPage() {
  return (
    <SeoAlias
      title="GenAI training"
      message="GenAI training and the GenAI course are the same module. The course page has the outline and class videos."
      href="/genai-course/"
      cta="View the GenAI course"
    />
  );
}
