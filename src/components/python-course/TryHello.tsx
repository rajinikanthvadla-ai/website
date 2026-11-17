"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PythonCompiler = dynamic(() => import("./PythonCompiler"), {
  ssr: false,
  loading: () => <p className="text-sm text-slate-700">Opening the editor...</p>,
});

const STARTER = `print("Hello, I am learning Python")
scores = [0.82, 0.74, 0.91]
average = sum(scores) / len(scores)
print("average", round(average, 2))
`;

export default function TryHello() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="border-2 border-slate-900 rounded-lg bg-white p-4 shadow-[4px_4px_0_#0f172a]">
        <p className="font-display text-lg font-bold text-slate-900 mb-1">Try one program before you scroll</p>
        <p className="text-sm text-slate-700 leading-6 mb-3">
          It prints a hello, then averages three scores. Python downloads only after you press Run.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="notion-btn notion-btn--ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Open the editor
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-700 leading-6 mb-2">
        Change a score, then press Run. The first run downloads Python into this tab. Later runs are faster.
      </p>
      <PythonCompiler starter={STARTER} title="Hello and an average" />
    </div>
  );
}
