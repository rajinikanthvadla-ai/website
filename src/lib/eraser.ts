/** Class whiteboard — Eraser.io workspace (hardcoded). */
export const ERASER_WORKSPACE_ID = "QAPDi0qTh5PkOpmJpTtT";

export const ERASER_WORKSPACE_URL =
  `https://app.eraser.io/workspace/${ERASER_WORKSPACE_ID}`;

/**
 * In-page board URL. Prefer a signed /embed?token=… URL if you get one from
 * Eraser API (those allow framing). Workspace URL is used until then.
 */
export const ERASER_BOARD_URL = ERASER_WORKSPACE_URL;
