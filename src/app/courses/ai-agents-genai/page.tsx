import type { Metadata } from "next";
import CourseRedirect from "@/components/CourseRedirect";

export const metadata: Metadata = {
  title: "AI Agents and GenAI Course",
  alternates: { canonical: "https://www.rajinikanthvadla.com/mlops-aiops-masterclass/" },
};

export default function AIAgentsGenAIPage() {
  return (
    <CourseRedirect
      title="AI Agents and GenAI"
      message="This content is part of the masterclass. See Module 5 for agents, MCP and multi-agent systems."
      href="/mlops-aiops-masterclass/"
      cta="View masterclass"
    />
  );
}
