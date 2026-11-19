"use client";

const DRAG_MIME = "application/x-rv-wb-image";

/** Real Google Images only — one search bar (inside Google), no duplicate chrome. */
const GOOGLE_IMAGES_EMBED =
  "https://www.google.com/search?tbm=isch&igu=1&hl=en";

type Props = {
  open: boolean;
  width?: number;
  onClose?: () => void;
  onInsertDataUrl?: (
    dataUrl: string,
    mimeType: string,
    name?: string,
  ) => Promise<void> | void;
};

export default function WhiteboardReference({ open, width }: Props) {
  if (!open) return null;

  return (
    <aside
      className="wb-ref wb-ref--embed"
      aria-label="Google Images"
      style={width ? { width: `${width}px`, flexBasis: `${width}px` } : undefined}
    >
      <iframe
        className="wb-g-frame"
        title="Google Images"
        src={GOOGLE_IMAGES_EMBED}
        referrerPolicy="no-referrer"
        allow="clipboard-read; clipboard-write"
      />
    </aside>
  );
}

export { DRAG_MIME };