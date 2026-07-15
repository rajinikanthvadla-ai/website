import type { Metadata } from "next";
import CourseRedirect from "@/components/CourseRedirect";

export const metadata: Metadata = {
  title: "AI Agents & GenAI Course",
  alternates: { canonical: "https://www.rajinikanthvadla.com/ai-agents-course/" },
};

export default function AIAgentsGenAIPage() {
  return (
    <CourseRedirect
      title="AI Agents and GenAI"
      message="This content lives on the dedicated AI Agents course page, with free YouTube labs embedded. Full enrollment is through the masterclass."
      href="/ai-agents-course/"
      cta="Open AI Agents course"
    />
  );
}
