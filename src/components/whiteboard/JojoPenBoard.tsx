"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/constants";
import { JOJOPEN_BOARD_URL } from "@/lib/jojopen";

/**
 * JojoPen cannot run inside an iframe when you Sign in with Google
 * (Google returns 403). Open it top-level so login and My boards work.
 */
export default function JojoPenBoard() {
  useEffect(() => {
    window.location.replace(JOJOPEN_BOARD_URL);
  }, []);

  return (
    <div className="wb-shell wb-shell--eraser wb-shell--portal">
      <div className="wb-eraser-portal">
        <p className="wb-eraser-portal-title">{SITE.name}</p>
        <p className="wb-eraser-portal-copy">Opening the class whiteboard on JojoPen…</p>
        <p className="wb-eraser-portal-hint">
          Google sign-in does not work inside an embedded frame, so this page sends you to JojoPen directly.
        </p>
        <a className="wb-btn" href={JOJOPEN_BOARD_URL}>
          Open JojoPen
        </a>
      </div>
    </div>
  );
}
