import type { Metadata } from "next";
import CourseRedirect from "@/components/CourseRedirect";

// The customized Agentic AI & FDE batch was stopped. Keep the URL so links already
// shared on WhatsApp land on the live FDE cohort instead of a 404.
export const metadata: Metadata = {
  title: "Agentic AI and FDE batch closed",
  alternates: { canonical: "https://rajinikanthvadla.com/courses/fde/" },
  robots: { index: false, follow: true },
};

export default function AgenticFdeClosedPage() {
  return (
    <CourseRedirect
      title="This batch is closed"
      message="The customized Agentic AI and FDE batch is no longer running. The live Forward Deployed AI Engineering cohort starts 7 December 2026."
      href="/courses/fde/"
      cta="See the FDE course"
    />
  );
}
