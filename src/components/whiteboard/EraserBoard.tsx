"use client";

import { SITE } from "@/lib/constants";
import { ERASER_BOARD_URL } from "@/lib/eraser";

/** Full-bleed Eraser board on this site — name only, no top chrome. */
export default function EraserBoard() {
  return (
    <div className="wb-shell wb-shell--eraser wb-shell--bleed">
      <p className="wb-eraser-nameplate">{SITE.name}</p>
      <iframe
        className="wb-eraser-frame"
        title={`${SITE.name} — class whiteboard`}
        src={ERASER_BOARD_URL}
        allow="clipboard-read; clipboard-write; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
