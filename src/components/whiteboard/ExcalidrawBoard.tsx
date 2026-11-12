"use client";

import { useCallback, useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { DRAWIO_EMBED, TEACHING_LIBRARY } from "@/lib/whiteboard-library";

const STORAGE_KEY = "rv-class-whiteboard-v1";

type Scene = {
  elements: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

// Excalidraw's imperative API surface we use for save/clear.
type BoardApi = {
  getSceneElements: () => unknown[];
  getAppState: () => Record<string, unknown>;
  getFiles: () => Record<string, unknown>;
  resetScene: () => void;
};

export default function ExcalidrawBoard() {
  const [api, setApi] = useState<BoardApi | null>(null);
  const [ready, setReady] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [initial, setInitial] = useState<Scene | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Scene & { savedAt?: string };
        setInitial({
          elements: parsed.elements ?? [],
          appState: parsed.appState,
          files: parsed.files,
        });
        if (parsed.savedAt) setSavedAt(parsed.savedAt);
      } else {
        setInitial({ elements: [] });
      }
    } catch {
      setInitial({ elements: [] });
    }
    setReady(true);
  }, []);

  const persist = useCallback(() => {
    if (!api) return;
    const elements = api.getSceneElements();
    const appState = api.getAppState();
    const files = api.getFiles();
    const stamp = new Date().toISOString();
    const payload = {
      elements,
      appState: {
        viewBackgroundColor: appState.viewBackgroundColor,
        currentItemStrokeColor: appState.currentItemStrokeColor,
        currentItemBackgroundColor: appState.currentItemBackgroundColor,
        gridSize: appState.gridSize,
      },
      files,
      savedAt: stamp,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedAt(stamp);
    } catch {
      /* quota / private mode */
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const t = window.setInterval(persist, 15000);
    return () => window.clearInterval(t);
  }, [api, persist]);

  function clearBoard() {
    if (!api) return;
    if (!window.confirm("Clear this board? Your browser copy will be wiped.")) return;
    api.resetScene();
    localStorage.removeItem(STORAGE_KEY);
    setSavedAt(null);
  }

  if (!ready || !initial) {
    return (
      <div className="wb-loading" role="status">
        Loading whiteboard…
      </div>
    );
  }

  return (
    <div className="wb-shell">
      <div className="wb-toolbar">
        <div className="wb-toolbar-copy">
          <strong>Class whiteboard</strong>
          <span>
            Excalidraw + cloud teaching stencils (Azure / AWS / K8s / agents). Open Library (bookshelf icon) to drag shapes.
            {savedAt ? ` · Saved locally ${new Date(savedAt).toLocaleTimeString()}` : " · Autosaves in this browser"}
          </span>
        </div>
        <div className="wb-toolbar-actions">
          <button type="button" className="wb-btn" onClick={persist}>
            Save now
          </button>
          <button type="button" className="wb-btn wb-btn--ghost" onClick={clearBoard}>
            Clear
          </button>
          <a
            className="wb-btn wb-btn--drawio"
            href={DRAWIO_EMBED}
            target="_blank"
            rel="noopener noreferrer"
            data-track="Whiteboard: open draw.io"
          >
            Full draw.io icons →
          </a>
        </div>
      </div>
      <div className="wb-canvas">
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
    </div>
  );
}
