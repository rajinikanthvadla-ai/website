"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
  tone?: "light" | "dark";
};

export default function CopyButton({ text, label = "Copy", tone = "light" }: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const className =
    tone === "dark"
      ? "text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-md border border-zinc-600 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 transition-colors"
      : "text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors";

  return (
    <button type="button" onClick={onCopy} className={className}>
      {copied ? "Copied" : label}
    </button>
  );
}
