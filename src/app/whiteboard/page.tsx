import type { Metadata } from "next";
import WhiteboardClient from "@/components/whiteboard/WhiteboardClient";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Class whiteboard",
  description:
    "Live class whiteboard on JojoPen — architecture diagrams for MLOps, LLMOps, AI agents and platform engineering.",
  alternates: { canonical: `${SITE.url}/whiteboard/` },
  robots: { index: true, follow: true },
};

export default function WhiteboardPage() {
  return <WhiteboardClient />;
}
