"use client";

import dynamic from "next/dynamic";

const ExcalidrawBoard = dynamic(() => import("./ExcalidrawBoard"), {
  ssr: false,
  loading: () => (
    <div className="wb-shell">
      <div className="wb-loading" role="status">
        Loading whiteboard…
      </div>
    </div>
  ),
});

export default function WhiteboardClient() {
  return <ExcalidrawBoard />;
}
