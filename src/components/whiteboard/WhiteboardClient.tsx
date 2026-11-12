"use client";

import dynamic from "next/dynamic";

const ExcalidrawBoard = dynamic(() => import("./ExcalidrawBoard"), {
  ssr: false,
  loading: () => (
    <div className="wb-loading" role="status">
      Loading whiteboard…
    </div>
  ),
});

export default function WhiteboardClient() {
  return <ExcalidrawBoard />;
}
