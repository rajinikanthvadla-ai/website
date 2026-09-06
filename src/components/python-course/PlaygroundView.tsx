"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PythonCompiler from "./PythonCompiler";
import {
  decodeShareCode,
  encodeShareCode,
  loadPlaygroundDraft,
  savePlaygroundDraft,
} from "@/lib/python-course/code-storage";

type Preset = {
  id: string;
  label: string;
  description: string;
  packages: string[];
  code: string;
};

const PRESETS: Preset[] = [
  {
    id: "blank",
    label: "Blank",
    description: "Start from an empty editor.",
    packages: [],
    code: `# Write any Python here and press Run (or Ctrl+Enter)
print("Hello from Python in the browser")
`,
  },
  {
    id: "basics",
    label: "Language basics",
    description: "Variables, f-strings, loops, and a dict.",
    packages: [],
    code: `config = {"model": "gpt-4.1-mini", "temperature": 0.2, "max_tokens": 300}

for key, value in config.items():
    print(f"{key:12s} = {value!r}")

scores = [0.91, 0.44, 0.78, 0.62]
kept = [s for s in scores if s >= 0.7]
print("kept:", kept)
print(f"mean of kept: {sum(kept) / len(kept):.3f}")
`,
  },
  {
    id: "functions",
    label: "Functions and classes",
    description: "A small retriever class with a scoring method.",
    packages: [],
    code: `class KeywordRetriever:
    def __init__(self, documents):
        self.documents = documents

    def search(self, query, top_k=2):
        terms = set(query.lower().split())
        scored = []
        for doc in self.documents:
            overlap = len(terms & set(doc.lower().split()))
            if overlap:
                scored.append((overlap, doc))
        scored.sort(reverse=True)
        return [doc for _, doc in scored[:top_k]]

    def __repr__(self):
        return f"KeywordRetriever(n={len(self.documents)})"

retriever = KeywordRetriever([
    "python powers machine learning pipelines",
    "kubernetes runs containers in production",
    "python serves llm apis with fastapi",
])
print(retriever)
for hit in retriever.search("python llm"):
    print("-", hit)
`,
  },
  {
    id: "numpy",
    label: "NumPy similarity",
    description: "Cosine similarity search over vectors.",
    packages: ["numpy"],
    code: `import numpy as np

labels = ["mlops", "llmops", "data engineering", "frontend"]
docs = np.array([
    [1.0, 0.8, 0.2, 0.1],
    [0.7, 1.0, 0.3, 0.0],
    [0.4, 0.2, 1.0, 0.1],
    [0.1, 0.0, 0.2, 1.0],
], dtype=np.float32)

query = np.array([0.9, 0.7, 0.2, 0.0], dtype=np.float32)
query = query / np.linalg.norm(query)
sims = docs @ query
order = np.argsort(-sims)

print("query similar to:")
for i in order[:3]:
    print(f"  {labels[i]:18s}  score={sims[i]:.3f}")
`,
  },
  {
    id: "pandas",
    label: "pandas filter",
    description: "Tiny dataframe of model scores.",
    packages: ["pandas"],
    code: `import pandas as pd

df = pd.DataFrame({
    "id": ["a", "b", "c", "d"],
    "label": ["pos", "neg", "pos", "neu"],
    "score": [0.91, 0.42, 0.77, 0.55],
})
kept = df[df["score"] >= 0.7]
print(kept)
print("mean kept score:", round(kept["score"].mean(), 3))
`,
  },
  {
    id: "rag",
    label: "Mini RAG",
    description: "Chunk, embed, retrieve, and build a grounded prompt.",
    packages: ["numpy"],
    code: `import numpy as np

VOCAB = ["python", "mlops", "rag", "agents", "docker",
         "monitoring", "vector", "prompt", "training", "deployment"]

def embed(text):
    vec = np.zeros(len(VOCAB), dtype=np.float32)
    for word in text.lower().split():
        if word in VOCAB:
            vec[VOCAB.index(word)] += 1.0
    norm = np.linalg.norm(vec)
    return vec / norm if norm > 0 else vec

corpus = [
    {"id": "d1", "text": "python is used for training and deployment of models"},
    {"id": "d2", "text": "rag combines vector retrieval with a grounded prompt"},
    {"id": "d3", "text": "docker packages services for deployment"},
]
matrix = np.vstack([embed(c["text"]) for c in corpus])

query = "how does rag build a prompt"
scores = matrix @ embed(query)
hits = [corpus[i] for i in np.argsort(-scores)[:2] if scores[i] >= 0.2]

sources = "\\n".join(f"[{i}] {h['text']}" for i, h in enumerate(hits, start=1))
print("Use only these sources:")
print(sources)
print()
print("Question:", query)
`,
  },
];

export default function PlaygroundView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<Preset>(PRESETS[0]);
  const [starter, setStarter] = useState(PRESETS[0].code);
  const [editorKey, setEditorKey] = useState("blank");
  const [ready, setReady] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [draftCode, setDraftCode] = useState(PRESETS[0].code);

  useEffect(() => {
    const encoded = searchParams.get("c");
    const shared = encoded ? decodeShareCode(encoded) : null;
    if (shared) {
      const sharedPreset: Preset = {
        id: "shared",
        label: "Shared",
        description: "Loaded from a share link.",
        packages: [],
        code: shared,
      };
      setActive(sharedPreset);
      setStarter(shared);
      setDraftCode(shared);
      setEditorKey(`shared-${(encoded || "link").slice(0, 12)}`);
      setReady(true);
      return;
    }

    const draft = loadPlaygroundDraft();
    if (draft) {
      const preset = PRESETS.find((item) => item.id === draft.presetId) || {
        id: "draft",
        label: "Saved draft",
        description: "Restored from this device.",
        packages: draft.packages,
        code: draft.code,
      };
      setActive({ ...preset, code: draft.code, packages: draft.packages.length ? draft.packages : preset.packages });
      setStarter(draft.code);
      setDraftCode(draft.code);
      setEditorKey(preset.id);
      setReady(true);
      return;
    }

    setReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      savePlaygroundDraft(draftCode, active.packages, active.id);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [draftCode, active.packages, active.id, ready]);

  function loadPreset(preset: Preset) {
    setActive(preset);
    setStarter(preset.code);
    setDraftCode(preset.code);
    setEditorKey(`${preset.id}-${Date.now()}`);
    setShareNote("");
    router.replace(pathname);
  }

  async function copyShareLink() {
    try {
      const encoded = encodeShareCode(draftCode);
      if (encoded.length > 1800) {
        setShareNote("Code is a bit long for a link. Shorten it, or keep using save on this device.");
        return;
      }
      const url = `${window.location.origin}${pathname}?c=${encoded}`;
      await navigator.clipboard.writeText(url);
      setShareNote("Share link copied. Anyone with the link can open this code.");
      router.replace(`${pathname}?c=${encoded}`);
    } catch {
      setShareNote("Could not copy the link. Your code is still saved on this device.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <span className="notion-eyebrow">
        <span className="notion-eyebrow-dot" />
        Online Python compiler
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
        Python playground
      </h1>
      <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl">
        Real CPython in your browser. Your last draft is saved on this device. You can also copy a share link.
      </p>

      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Load an example</p>
          <button
            type="button"
            onClick={copyShareLink}
            className="text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-md border-2 border-slate-900 bg-white hover:bg-[#fef9c3]"
          >
            Copy share link
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => loadPreset(preset)}
              className={`text-sm font-semibold px-3.5 py-2 rounded-lg border-2 border-slate-900 transition-colors ${
                active.id === preset.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-800 hover:bg-[#fef9c3]"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-600 mt-3">{active.description}</p>
        {shareNote && <p className="text-sm text-emerald-700 mt-2">{shareNote}</p>}
      </div>

      {ready ? (
        <PythonCompiler
          key={editorKey}
          starter={starter}
          packages={active.packages}
          title={`Playground - ${active.label}`}
          tall
          onCodeChange={setDraftCode}
        />
      ) : (
        <div className="rounded-xl border border-zinc-700 bg-black text-zinc-400 px-4 py-16 text-center font-mono text-sm">
          Loading editor...
        </div>
      )}
    </div>
  );
}
