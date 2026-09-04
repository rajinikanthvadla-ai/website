"use client";

import CopyButton from "./CopyButton";

type Props = {
  title: string;
  note: string;
  code: string;
  onTry?: (code: string) => void;
};

export default function CodeExample({ title, note, code, onTry }: Props) {
  return (
    <figure className="border border-slate-200 rounded-xl overflow-hidden bg-white my-5 shadow-sm">
      <figcaption className="flex flex-col gap-3 px-4 py-3 bg-white border-b border-slate-200 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-1">Example</p>
          <p className="text-base font-bold text-slate-900 leading-snug">{title}</p>
          <p className="text-sm text-slate-600 leading-relaxed mt-1">{note}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {onTry && (
            <button
              type="button"
              onClick={() => onTry(code)}
              className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md border border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
            >
              Try in compiler
            </button>
          )}
          <CopyButton text={code} />
        </div>
      </figcaption>
      <pre className="bg-[#0f172a] text-slate-100 text-[13px] p-4 overflow-x-auto font-mono leading-relaxed [tab-size:2]">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
