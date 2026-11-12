"use client";

import { useCallback, useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { TEACHING_LIBRARY } from "@/lib/whiteboard-library";

const STORAGE_KEY = "rv-class-whiteboard-v1";

type Scene = {
  elements: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

type BoardApi = {
  getSceneElements: () => unknown[];
  getAppState: () => Record<string, unknown>;
  getFiles: () => Record<string, unknown>;
  resetScene: () => void;
};

export default function ExcalidrawBoard() {
  const [api, setApi] = useState<BoardApi | null>(null);
  const [ready, setReady] = useState(false);
  const [initial, setInitial] = useState<Scene | null>(null);

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

  function clearBoard() {
    if (!api) return;
    if (!window.confirm("Clear this board?")) return;
    api.resetScene();
    localStorage.removeItem(STORAGE_KEY);
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
        <strong className="wb-title">Class whiteboard</strong>
        <div className="wb-toolbar-actions">
          <button type="button" className="wb-btn" onClick={persist}>
            Save
          </button>
          <button type="button" className="wb-btn wb-btn--ghost" onClick={clearBoard}>
            Clear
          </button>
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
