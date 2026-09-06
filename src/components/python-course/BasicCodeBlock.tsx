"use client";

import CopyButton from "./CopyButton";

type Props = {
  code: string;
  tip?: string;
  onTry?: (code: string) => void;
};

export default function BasicCodeBlock({ code, tip, onTry }: Props) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-zinc-700 bg-black shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#121212] border-b border-zinc-800">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-400">Tiny example</p>
          {tip && <p className="text-[13px] text-zinc-400 leading-5 mt-0.5">{tip}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onTry && (
            <button
              type="button"
              onClick={() => onTry(code)}
              className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md bg-[#27c93f] text-black hover:bg-[#3ddc55]"
            >
              Try it
            </button>
          )}
          <CopyButton text={code} label="Copy" tone="dark" />
        </div>
      </div>
      <pre className="bg-black text-[#d1fae5] text-[13px] sm:text-[14px] p-3 overflow-x-auto font-mono leading-relaxed [tab-size:2]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
