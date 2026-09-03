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
    <figure className="border-2 border-slate-900 rounded-lg overflow-hidden bg-white my-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b-2 border-slate-900">
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600 mt-0.5">{note}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {onTry && (
            <button
              type="button"
              onClick={() => onTry(code)}
              className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded border-2 border-slate-900 bg-blue-700 text-white hover:bg-blue-800"
            >
              Load in compiler
            </button>
          )}
          <CopyButton text={code} />
        </div>
      </figcaption>
      <pre className="bg-[#0f172a] text-slate-100 text-[13px] p-4 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
