"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
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

  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded border-2 border-slate-900 bg-white text-slate-800 hover:bg-[#fef9c3] transition-colors"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
