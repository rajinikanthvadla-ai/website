import type { Metadata } from "next";
import WhiteboardClient from "@/components/whiteboard/WhiteboardClient";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Class whiteboard",
  description:
    "Teach live on an Excalidraw whiteboard with Azure, AWS, Kubernetes and AI-agent stencils. Export drawings; open draw.io for full vendor icon packs.",
  alternates: { canonical: `${SITE.url}/whiteboard/` },
  robots: { index: true, follow: true },
};

export default function WhiteboardPage() {
  return <WhiteboardClient />;
}
