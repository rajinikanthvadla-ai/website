"use client";

import { SITE } from "@/lib/constants";
import { JOJOPEN_BOARD_URL } from "@/lib/jojopen";

/** Full-bleed JojoPen board on this site — name only, no top chrome. */
export default function JojoPenBoard() {
  return (
    <div className="wb-shell wb-shell--eraser wb-shell--bleed">
      <p className="wb-eraser-nameplate">{SITE.name}</p>
      <iframe
        className="wb-eraser-frame"
        title={`${SITE.name} — class whiteboard`}
        src={JOJOPEN_BOARD_URL}
        allow="clipboard-read; clipboard-write; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
