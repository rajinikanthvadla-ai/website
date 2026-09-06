"use client";

import CopyButton from "./CopyButton";

type Props = {
  title: string;
  note: string;
  code: string;
  index?: number;
  featured?: boolean;
  why?: string;
  aiMl?: string;
  analogy?: string;
  onTry?: (code: string) => void;
};

function plain(text: string): string {
  return text.replace(/\u2014/g, " - ").replace(/\u2013/g, " - ");
}

export default function CodeExample({
  title,
  note,
  code,
  index,
  featured = false,
  aiMl,
  onTry,
}: Props) {
  const meaning = plain(note);
  const aiMlText = aiMl ? plain(aiMl) : "";

  return (
    <figure className="border-t border-slate-200 pt-4">
      <figcaption className="mb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">
              {featured ? "AI / ML example" : `AI / ML example ${index ?? ""}`}
            </p>
            <p className="text-[16px] font-bold text-slate-900 leading-snug">{title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {onTry && (
              <button
                type="button"
                onClick={() => onTry(code)}
                className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md bg-blue-700 text-white hover:bg-blue-800"
              >
                Try in lab
              </button>
            )}
            <CopyButton text={code} label="Copy" />
          </div>
        </div>
      </figcaption>

      <p className="text-[15px] text-slate-700 leading-7 mb-3">{meaning}</p>
      {aiMlText && (
        <p className="text-[14px] text-slate-600 leading-6 mb-3">
          <span className="font-semibold text-slate-800">In AI / ML: </span>
          {aiMlText}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-zinc-700">
        <div className="bg-[#121212] px-3 py-1.5 flex items-center justify-between border-b border-zinc-800">
          <p className="text-[11px] font-mono text-zinc-400">example.py</p>
          <p className="text-[11px] font-mono text-zinc-500">Python</p>
        </div>
        <pre className="bg-black text-[#e6edf3] text-[13px] sm:text-[14px] p-3 overflow-x-auto font-mono leading-relaxed [tab-size:2]">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
