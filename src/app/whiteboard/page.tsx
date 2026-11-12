import type { Metadata } from "next";
import WhiteboardClient from "@/components/whiteboard/WhiteboardClient";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Class whiteboard",
  description:
    "Live class whiteboard with Azure, AWS, Kubernetes and AI-agent teaching stencils.",
  alternates: { canonical: `${SITE.url}/whiteboard/` },
  robots: { index: true, follow: true },
};

export default function WhiteboardPage() {
  return <WhiteboardClient />;
}
