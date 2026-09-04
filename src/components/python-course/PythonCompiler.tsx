"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  hint?: string;
  tall?: boolean;
};

const RUN_TIMEOUT_MS = 20000;
// Downloading the runtime and heavy wheels such as scikit-learn is slow on a
// first visit, so the loading phase gets a much larger budget than execution.
const LOAD_TIMEOUT_MS = 150000;

function createWorker(): Worker {
  return new Worker("/python-worker.js");
}

export default function PythonCompiler({
  starter,
  packages = [],
  title = "Try it — in-browser Python",
  hint,
  tall = false,
}: Props) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState("Python runs in your browser. First run downloads the runtime.");
  const [running, setRunning] = useState(false);
  const [readyOnce, setReadyOnce] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const runIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const resetWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = createWorker();
  }, []);

  useEffect(() => {
    workerRef.current = createWorker();
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    setCode(starter);
    setOutput("");
  }, [starter]);

  const run = useCallback(() => {
    const worker = workerRef.current;
    if (!worker || running) return;

    const id = `run-${Date.now()}-${++runIdRef.current}`;
    setRunning(true);
    setOutput("");
    setImages([]);
    setStatus(readyOnce ? "Running…" : "Starting Python (first load can take 10–20 seconds)…");

    const armTimeout = (ms: number) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        worker.removeEventListener("message", onMessage);
        resetWorker();
        setRunning(false);
        setStatus("Timed out");
        setOutput(
          ms === RUN_TIMEOUT_MS
            ? "This run exceeded 20 seconds and was stopped. Check for infinite loops, then press Run again."
            : "Loading the Python packages took too long. Check your connection and press Run again.",
        );
      }, ms);
    };

    const onMessage = (event: MessageEvent<WorkerResult>) => {
      const data = event.data;
      if (data.type === "status" && data.message) {
        setStatus(data.message);
        armTimeout(data.message === "Running…" ? RUN_TIMEOUT_MS : LOAD_TIMEOUT_MS);
        return;
      }
      if (data.id !== id || data.type !== "result") return;

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      worker.removeEventListener("message", onMessage);
      setRunning(false);
      setReadyOnce(true);
      setImages(data.images ?? []);

      if (!data.ok) {
        setStatus("Error");
        setOutput(data.error || "The program failed.");
        return;
      }

      const chunks: string[] = [];
      if (data.stdout) chunks.push(data.stdout.replace(/\n$/, ""));
      if (data.stderr) chunks.push(data.stderr.replace(/\n$/, ""));
      if (data.result) chunks.push(data.result);
      setStatus("Done");
      const hasImages = (data.images ?? []).length > 0;
      setOutput(
        chunks.filter(Boolean).join("\n") ||
          (hasImages ? "" : "(no output — add a print() to see results)"),
      );
    };

    worker.addEventListener("message", onMessage);
    worker.postMessage({ id, code, packages });
    armTimeout(LOAD_TIMEOUT_MS);
  }, [code, packages, readyOnce, resetWorker, running]);

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
      window.requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  }

  const outputIsError = status === "Error" || status === "Timed out";

  return (
    <div className="border-2 border-slate-900 rounded-lg overflow-hidden bg-white shadow-[4px_4px_0_#0f172a]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 bg-slate-900 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide">{title}</p>
          {packages.length > 0 && (
            <p className="text-[10px] text-slate-400 mt-0.5">Packages: {packages.join(", ")}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <CopyButton text={code} label="Copy code" />
          <button
            type="button"
            onClick={() => {
              setCode(starter);
              setOutput("");
              setImages([]);
              setStatus("Editor reset to the starter example.");
            }}
            className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded border-2 border-white bg-transparent text-white hover:bg-slate-800"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded border-2 border-orange-500 bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {running ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      {hint && (
        <p className="px-3 py-2 text-xs text-slate-600 bg-[#fef9c3] border-b-2 border-slate-900">{hint}</p>
      )}

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        aria-label="Python code editor"
        className={`w-full bg-[#0f172a] text-slate-100 font-mono text-[13px] leading-relaxed p-4 outline-none resize-y ${
          tall ? "min-h-[320px]" : "min-h-[220px]"
        }`}
      />

      <div className="border-t-2 border-slate-900 bg-slate-50">
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Output</p>
          <p className={`text-[11px] font-semibold ${outputIsError ? "text-red-600" : "text-blue-700"}`}>
            {status}
          </p>
        </div>
        {(output || images.length === 0) && (
          <pre
            className={`px-4 py-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap min-h-[88px] ${
              outputIsError ? "text-red-700 bg-red-50" : "text-slate-800"
            }`}
          >
            {output || "Press Run (or Ctrl+Enter) to execute."}
          </pre>
        )}
        {images.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 bg-white space-y-3">
            {images.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={`data:image/png;base64,${src}`}
                alt={`Chart ${index + 1} generated by your Python code`}
                className="max-w-full h-auto border border-slate-200 rounded"
              />
            ))}
          </div>
        )}
      </div>
      <p className="px-3 py-2 text-[11px] text-slate-500 bg-white border-t border-slate-200">
        CPython in WebAssembly. Stdlib works. NumPy, pandas, scikit-learn and Matplotlib load on demand, and charts render below.
        No <code>input()</code>, no GPU, no network installs.
      </p>
    </div>
  );
}
