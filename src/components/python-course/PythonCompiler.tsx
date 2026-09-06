"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CopyButton from "./CopyButton";

type WorkerResult = {
  id: string;
  type: "result" | "status";
  ok?: boolean;
  stdout?: string;
  stderr?: string;
  result?: string;
  error?: string;
  message?: string;
  images?: string[];
};

type Props = {
  starter: string;
  packages?: string[];
  title?: string;
  tall?: boolean;
  onCodeChange?: (code: string) => void;
};

export type PythonCompilerHandle = {
  run: () => void;
  isRunning: () => boolean;
};

const RUN_TIMEOUT_MS = 20000;
const LOAD_TIMEOUT_MS = 150000;
const READY_ONCE_KEY = "python-course-runtime-ready-v1";

function createWorker(): Worker {
  return new Worker("/python-worker.js");
}

function hasRuntimeReadyFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(READY_ONCE_KEY) === "1";
  } catch {
    return false;
  }
}

function setRuntimeReadyFlag(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(READY_ONCE_KEY, "1");
  } catch {
    // ignore quota / private mode
  }
}

const PythonCompiler = forwardRef<PythonCompilerHandle, Props>(function PythonCompiler(
  { starter, packages = [], title = "Python console", tall = false, onCodeChange },
  ref,
) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState("ready");
  const [running, setRunning] = useState(false);
  const [readyOnce, setReadyOnce] = useState(false);
  const [showFirstLoadSplash, setShowFirstLoadSplash] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const runIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  const resetWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = createWorker();
  }, []);

  useEffect(() => {
    workerRef.current = createWorker();
    setReadyOnce(hasRuntimeReadyFlag());
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    setCode(starter);
    setOutput("");
    setImages([]);
    setStatus("loaded");
  }, [starter]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  const run = useCallback(() => {
    const worker = workerRef.current;
    if (!worker || runningRef.current) return;

    const id = `run-${Date.now()}-${++runIdRef.current}`;
    const firstLoad = !readyOnce && !hasRuntimeReadyFlag();
    runningRef.current = true;
    setRunning(true);
    setOutput("");
    setImages([]);
    setStatus(firstLoad ? "loading" : "running");
    setShowFirstLoadSplash(firstLoad);

    const armTimeout = (ms: number) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        worker.removeEventListener("message", onMessage);
        resetWorker();
        runningRef.current = false;
        setRunning(false);
        setShowFirstLoadSplash(false);
        setStatus("timeout");
        setOutput(
          ms === RUN_TIMEOUT_MS
            ? "Timed out after 20 seconds. Check for infinite loops, then run again."
            : "Package load timed out. Check your connection and run again.",
        );
      }, ms);
    };

    const onMessage = (event: MessageEvent<WorkerResult>) => {
      const data = event.data;
      if (data.type === "status" && data.message) {
        const loading = data.message.toLowerCase().includes("load");
        setStatus(loading ? "loading" : "running");
        if (!loading) setShowFirstLoadSplash(false);
        armTimeout(
          data.message === "Running..." || data.message === "Running…" ? RUN_TIMEOUT_MS : LOAD_TIMEOUT_MS,
        );
        return;
      }
      if (data.id !== id || data.type !== "result") return;

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      worker.removeEventListener("message", onMessage);
      runningRef.current = false;
      setRunning(false);
      setShowFirstLoadSplash(false);
      setReadyOnce(true);
      setRuntimeReadyFlag();
      setImages(data.images ?? []);

      if (!data.ok) {
        setStatus("error");
        setOutput(data.error || "The program failed.");
        return;
      }

      const chunks: string[] = [];
      if (data.stdout) chunks.push(data.stdout.replace(/\n$/, ""));
      if (data.stderr) chunks.push(data.stderr.replace(/\n$/, ""));
      if (data.result) chunks.push(data.result);
      setStatus("done");
      const hasImages = (data.images ?? []).length > 0;
      setOutput(
        chunks.filter(Boolean).join("\n") ||
          (hasImages ? "" : "(no output - add a print() to see results)"),
      );
    };

    worker.addEventListener("message", onMessage);
    worker.postMessage({ id, code, packages });
    armTimeout(LOAD_TIMEOUT_MS);
  }, [code, packages, readyOnce, resetWorker]);

  useImperativeHandle(
    ref,
    () => ({
      run,
      isRunning: () => runningRef.current,
    }),
    [run],
  );

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const el = event.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = `${code.slice(0, start)}    ${code.slice(end)}`;
      setCode(next);
      onCodeChange?.(next);
      window.requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  }

  const outputIsError = status === "error" || status === "timeout";
  const statusLabel =
    status === "ready"
      ? "ready"
      : status === "loaded"
        ? "example loaded"
        : status === "loading"
          ? "loading python..."
          : status === "running"
            ? "running..."
            : status === "done"
              ? "done"
              : status === "error"
                ? "error"
                : status === "timeout"
                  ? "timed out"
                  : status;

  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-700 shadow-[0_16px_40px_rgba(0,0,0,0.35)] bg-[#0a0a0a]">
      {showFirstLoadSplash && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center">
          <div
            className="h-9 w-9 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin"
            aria-hidden="true"
          />
          <p className="text-sm font-bold text-emerald-300 tracking-wide">Loading Python...</p>
          <p className="text-[13px] text-zinc-400 leading-5 max-w-[240px]">
            First run downloads the runtime once for this tab. Later runs start faster.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#111111] border-b border-zinc-800">
        <div className="min-w-0 flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 truncate">
              python console
            </p>
            <p className="text-[12px] text-zinc-500 truncate">{title}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <CopyButton text={code} label="Copy" tone="dark" />
          <button
            type="button"
            onClick={() => {
              setCode(starter);
              setOutput("");
              setImages([]);
              setStatus("loaded");
            }}
            className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-md border border-zinc-600 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md bg-[#27c93f] text-black hover:bg-[#3ddc55] disabled:opacity-60"
          >
            {running ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {packages.length > 0 && (
        <p className="px-3 py-1.5 text-[11px] font-mono text-zinc-500 bg-[#0f0f0f] border-b border-zinc-800">
          # packages: {packages.join(", ")}
        </p>
      )}

      <div className="px-3 py-1.5 bg-[#0f0f0f] border-b border-zinc-800 flex items-center justify-between">
        <p className="text-[11px] font-mono text-emerald-400">~/lesson.py</p>
        <p className="text-[11px] font-mono text-zinc-500">Ctrl+Enter</p>
      </div>

      <textarea
        value={code}
        onChange={(e) => {
          const next = e.target.value;
          setCode(next);
          onCodeChange?.(next);
        }}
        onKeyDown={onKeyDown}
        spellCheck={false}
        aria-label="Python code editor"
        className={`w-full bg-black text-[#e6edf3] font-mono text-[13px] sm:text-[14px] leading-relaxed p-3 outline-none resize-y [tab-size:2] caret-emerald-400 ${
          tall ? "min-h-[300px]" : "min-h-[220px]"
        }`}
      />

      <div className="border-t border-zinc-800 bg-black">
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-[#0d0d0d]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <p className="text-[11px] font-mono text-emerald-300 tracking-wide">console output</p>
          </div>
          <p
            className={`text-[11px] font-mono ${
              outputIsError ? "text-red-400" : status === "done" ? "text-emerald-400" : "text-zinc-500"
            }`}
          >
            {statusLabel}
          </p>
        </div>
        <div className={`relative min-h-[150px] ${outputIsError ? "bg-[#140808]" : "bg-black"}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(126,231,135,0.35) 1px, transparent 1px)",
              backgroundSize: "100% 22px",
            }}
          />
          <pre
            className={`relative px-3 py-3 font-mono text-[13px] sm:text-[14px] leading-relaxed whitespace-pre-wrap min-h-[150px] ${
              outputIsError ? "text-red-400" : "text-[#7ee787]"
            }`}
          >
            <span className="text-zinc-500 select-none">$ </span>
            {output || "waiting for Run..."}
          </pre>
        </div>
        {images.length > 0 && (
          <div className="px-3 pb-3 space-y-2 bg-black border-t border-zinc-800">
            {images.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={`data:image/png;base64,${src}`}
                alt={`Chart ${index + 1} generated by your Python code`}
                className="max-w-full h-auto border border-zinc-700 rounded-md bg-white"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default PythonCompiler;
