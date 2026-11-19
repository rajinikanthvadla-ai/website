"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { TEACHING_LIBRARY } from "@/lib/whiteboard-library";
import { loadDroppedImage, shouldAcceptBoardDrag } from "@/lib/whiteboard-drag-image";
import WhiteboardReference from "./WhiteboardReference";

const STORAGE_KEY = "rv-class-whiteboard-v1";
const PANEL_WIDTH_KEY = "rv-wb-panel-width";
const PANEL_DEFAULT = 360;
const PANEL_MIN = 260;
const PANEL_MAX = 720;

type Scene = {
  elements: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

type BoardAppState = Record<string, unknown> & {
  width?: number;
  height?: number;
  scrollX?: number;
  scrollY?: number;
  zoom?: number | { value: number };
  viewBackgroundColor?: unknown;
  currentItemStrokeColor?: unknown;
  currentItemBackgroundColor?: unknown;
  gridSize?: unknown;
};

type BoardApi = {
  getSceneElements: () => unknown[];
  getAppState: () => BoardAppState;
  getFiles: () => Record<string, unknown>;
  resetScene: () => void;
  addFiles: (files: Array<{
    id: string;
    dataURL: string;
    mimeType: string;
    created: number;
  }>) => void;
  updateScene: (scene: { elements: unknown[] }) => void;
};

type InsertOpts = {
  clientX?: number;
  clientY?: number;
};

function fileId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function elementId() {
  return fileId().slice(0, 20);
}

function loadImageSize(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 400, height: img.naturalHeight || 300 });
    img.onerror = () => reject(new Error("bad image"));
    img.src = dataUrl;
  });
}

function clampPanelWidth(width: number) {
  return Math.min(PANEL_MAX, Math.max(PANEL_MIN, Math.round(width)));
}

export default function ExcalidrawBoard() {
  const [api, setApi] = useState<BoardApi | null>(null);
  const [ready, setReady] = useState(false);
  const [initial, setInitial] = useState<Scene | null>(null);
  const [refOpen, setRefOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT);
  const [dropActive, setDropActive] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<BoardApi | null>(null);
  const resizingRef = useRef(false);
  const refOpenRef = useRef(refOpen);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  useEffect(() => {
    refOpenRef.current = refOpen;
  }, [refOpen]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Scene;
        setInitial({
          elements: parsed.elements ?? [],
          appState: parsed.appState,
          files: parsed.files,
        });
      } else {
        setInitial({ elements: [] });
      }
      const savedWidth = Number(localStorage.getItem(PANEL_WIDTH_KEY));
      if (Number.isFinite(savedWidth) && savedWidth > 0) {
        setPanelWidth(clampPanelWidth(savedWidth));
      }
    } catch {
      setInitial({ elements: [] });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PANEL_WIDTH_KEY, String(panelWidth));
    } catch {
      /* private mode */
    }
  }, [panelWidth]);

  const onResizeStart = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    resizingRef.current = true;
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    document.body.classList.add("wb-resizing");

    const onMove = (moveEvent: PointerEvent) => {
      if (!resizingRef.current || !mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const next = clampPanelWidth(rect.right - moveEvent.clientX);
      setPanelWidth(next);
    };

    const onUp = (upEvent: PointerEvent) => {
      resizingRef.current = false;
      document.body.classList.remove("wb-resizing");
      try {
        handle.releasePointerCapture(upEvent.pointerId);
      } catch {
        /* already released */
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("wb-focus", focusMode);
    return () => document.documentElement.classList.remove("wb-focus");
  }, [focusMode]);

  const persist = useCallback(() => {
    if (!api) return;
    const elements = api.getSceneElements();
    const appState = api.getAppState();
    const files = api.getFiles();
    const payload = {
      elements,
      appState: {
        viewBackgroundColor: appState.viewBackgroundColor,
        currentItemStrokeColor: appState.currentItemStrokeColor,
        currentItemBackgroundColor: appState.currentItemBackgroundColor,
        gridSize: appState.gridSize,
      },
      files,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* quota / private mode */
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const t = window.setInterval(persist, 15000);
    return () => window.clearInterval(t);
  }, [api, persist]);

  const insertDataUrl = useCallback(async (dataURL: string, mimeType: string, _name?: string, opts?: InsertOpts) => {
    const board = apiRef.current;
    if (!board) throw new Error("board not ready");
    const id = fileId();
    const { width: naturalW, height: naturalH } = await loadImageSize(dataURL);
    const maxW = 420;
    const scale = Math.min(1, maxW / naturalW);
    const width = Math.round(naturalW * scale);
    const height = Math.round(naturalH * scale);

    board.addFiles([
      {
        id,
        dataURL,
        mimeType: mimeType.startsWith("image/") ? mimeType : "image/png",
        created: Date.now(),
      },
    ]);

    const appState = board.getAppState();
    const zoomRaw = appState.zoom;
    const zoom = typeof zoomRaw === "number" ? zoomRaw : typeof zoomRaw === "object" && zoomRaw ? zoomRaw.value : 1;
    const scrollX = Number(appState.scrollX ?? 0);
    const scrollY = Number(appState.scrollY ?? 0);
    const viewW = Number(appState.width ?? 800);
    const viewH = Number(appState.height ?? 600);
    const z = zoom || 1;

    let x: number;
    let y: number;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (opts?.clientX != null && opts?.clientY != null && rect) {
      x = (opts.clientX - rect.left) / z - scrollX - width / 2;
      y = (opts.clientY - rect.top) / z - scrollY - height / 2;
    } else {
      x = -scrollX + viewW / (2 * z) - width / 2;
      y = -scrollY + viewH / (2 * z) - height / 2;
    }

    const [imageElement] = convertToExcalidrawElements([
      {
        type: "image",
        id: elementId(),
        fileId: id,
        x,
        y,
        width,
        height,
        status: "saved",
      },
    ] as never[]);

    board.updateScene({
      elements: [...(board.getSceneElements() as object[]), imageElement],
    });
  }, []);

  // Capture-phase so Excalidraw does not swallow Google image drops.
  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;

    const clearDrop = () => setDropActive(false);

    const onDragEnter = (event: DragEvent) => {
      const types = [...(event.dataTransfer?.types ?? [])];
      if (!shouldAcceptBoardDrag(types, refOpenRef.current)) return;
      if ((event.target as Node | null) && !node.contains(event.target as Node)) return;
      setDropActive(true);
    };

    const onDragOver = (event: DragEvent) => {
      const types = [...(event.dataTransfer?.types ?? [])];
      if (!shouldAcceptBoardDrag(types, refOpenRef.current)) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
      setDropActive(true);
    };

    const onDragLeave = (event: DragEvent) => {
      const related = event.relatedTarget as Node | null;
      if (related && node.contains(related)) return;
      clearDrop();
    };

    const onDrop = (event: DragEvent) => {
      const dt = event.dataTransfer;
      if (!dt || !shouldAcceptBoardDrag([...dt.types], refOpenRef.current)) return;
      event.preventDefault();
      event.stopPropagation();
      clearDrop();

      void loadDroppedImage(
        dt,
        { clientX: event.clientX, clientY: event.clientY },
        (dataUrl, mimeType, coords) =>
          insertDataUrl(dataUrl, mimeType, undefined, {
            clientX: coords.clientX,
            clientY: coords.clientY,
          }),
      );
    };

    node.addEventListener("dragenter", onDragEnter, true);
    node.addEventListener("dragover", onDragOver, true);
    node.addEventListener("dragleave", onDragLeave, true);
    node.addEventListener("drop", onDrop, true);
    node.addEventListener("dragend", clearDrop, true);
    return () => {
      node.removeEventListener("dragenter", onDragEnter, true);
      node.removeEventListener("dragover", onDragOver, true);
      node.removeEventListener("dragleave", onDragLeave, true);
      node.removeEventListener("drop", onDrop, true);
      node.removeEventListener("dragend", clearDrop, true);
    };
  }, [insertDataUrl, ready]);

  function clearBoard() {
    if (!api) return;
    if (!window.confirm("Clear this board?")) return;
    api.resetScene();
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!ready || !initial) {
    return (
      <div className="wb-shell">
        <div className="wb-loading" role="status">
          Loading whiteboard…
        </div>
      </div>
    );
  }

  return (
    <div className={`wb-shell${refOpen ? " wb-shell--split" : ""}${focusMode ? " wb-shell--focus" : ""}`}>
      <div className="wb-toolbar">
        <strong className="wb-title">
          Class whiteboard <span className="wb-title-name">Rajinikanth Vadla</span>
        </strong>
        <div className="wb-toolbar-actions">
          <button
            type="button"
            className={`wb-btn${refOpen ? "" : " wb-btn--accent"}`}
            onClick={() => setRefOpen((v) => !v)}
          >
            {refOpen ? "Hide images" : "Images"}
          </button>
          <button type="button" className="wb-btn wb-btn--ghost" onClick={() => setFocusMode((v) => !v)}>
            {focusMode ? "Exit focus" : "Focus"}
          </button>
          <button type="button" className="wb-btn" onClick={persist}>
            Save
          </button>
          <button type="button" className="wb-btn wb-btn--ghost" onClick={clearBoard}>
            Clear
          </button>
        </div>
      </div>

      <div className="wb-main" ref={mainRef}>
        <div className={`wb-canvas${dropActive ? " wb-canvas--drop-active" : ""}`} ref={canvasRef}>
          {dropActive && (
            <div className="wb-drop-hint" aria-hidden>
              Drop image on board
            </div>
          )}
          <Excalidraw
            excalidrawAPI={(instance) => setApi(instance as unknown as BoardApi)}
            initialData={{
              elements: initial.elements as never[],
              appState: {
                ...(initial.appState as object),
                currentItemFontFamily: 1,
              },
              files: initial.files as never,
              libraryItems: TEACHING_LIBRARY as never,
              scrollToContent: true,
            }}
            UIOptions={{
              canvasActions: {
                loadScene: true,
                saveToActiveFile: false,
                export: { saveFileToDisk: true },
              },
            }}
            theme="light"
            name="Rajinikanth Vadla — class whiteboard"
          />
        </div>

        {refOpen && (
          <div
            className="wb-splitter"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize image panel"
            aria-valuenow={panelWidth}
            aria-valuemin={PANEL_MIN}
            aria-valuemax={PANEL_MAX}
            tabIndex={0}
            onPointerDown={onResizeStart}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                setPanelWidth((w) => clampPanelWidth(w + 16));
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                setPanelWidth((w) => clampPanelWidth(w - 16));
              }
            }}
          />
        )}

        <WhiteboardReference
          open={refOpen}
          width={panelWidth}
          onClose={() => setRefOpen(false)}
          onInsertDataUrl={insertDataUrl}
        />
      </div>
    </div>
  );
}
