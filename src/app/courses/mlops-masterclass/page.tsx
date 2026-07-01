import type { Metadata } from "next";
import CourseRedirect from "@/components/CourseRedirect";

export const metadata: Metadata = {
  title: "Enterprise MLOps Training",
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
};

export default function EnterpriseMLOpsCoursePage() {
  return (
    <CourseRedirect
      title="MLOps masterclass"
      message="This program is now the unified MLOps, AIOps, LLMOps and AI Agents masterclass."
      href="/mlops-aiops-masterclass/"
      cta="View masterclass"
    />
  );
}
