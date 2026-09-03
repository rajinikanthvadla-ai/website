"use client";

import { useState } from "react";
import PythonCompiler from "./PythonCompiler";

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
    [0.9, 0.3, 0.1, 0.0],
    [0.8, 0.6, 0.1, 0.0],
    [0.4, 0.2, 0.9, 0.0],
    [0.0, 0.1, 0.0, 0.9],
], dtype=np.float32)

query = np.array([0.85, 0.5, 0.1, 0.0], dtype=np.float32)

docs_n = docs / np.linalg.norm(docs, axis=1, keepdims=True)
scores = docs_n @ (query / np.linalg.norm(query))

for idx in np.argsort(-scores):
    print(f"{labels[idx]:20s} {scores[idx]:.4f}")
`,
  },
  {
    id: "pandas",
    label: "pandas report",
    description: "Group LLM calls by model and compute cost.",
    packages: ["pandas", "numpy"],
    code: `import pandas as pd

calls = pd.DataFrame({
    "model": ["mini", "mini", "large", "large", "mini"],
    "prompt_tokens": [500, 700, 1200, 900, 400],
    "completion_tokens": [120, 200, 450, 380, 90],
    "latency_ms": [620, 700, 1800, 1650, 540],
})

price_per_1k = {"mini": 0.0006, "large": 0.009}
calls["total_tokens"] = calls["prompt_tokens"] + calls["completion_tokens"]
calls["cost_usd"] = [
    row.total_tokens / 1000 * price_per_1k[row.model] for row in calls.itertuples()
]

summary = calls.groupby("model").agg(
    calls=("model", "size"),
    tokens=("total_tokens", "sum"),
    avg_latency=("latency_ms", "mean"),
    cost_usd=("cost_usd", "sum"),
).round(4)

print(calls)
print("---")
print(summary)
`,
  },
  {
    id: "async",
    label: "Async batching",
    description: "Concurrent calls with a semaphore.",
    packages: [],
    code: `import asyncio
import time

limit = asyncio.Semaphore(5)

async def fake_llm(i):
    async with limit:
        await asyncio.sleep(0.2)
        return f"answer-{i}"

start = time.perf_counter()
results = await asyncio.gather(*(fake_llm(i) for i in range(10)))
elapsed = (time.perf_counter() - start) * 1000

print(results)
print(f"10 calls in {elapsed:.0f} ms (sequential would be ~2000 ms)")
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
  const [active, setActive] = useState(PRESETS[0]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <span className="notion-eyebrow">
        <span className="notion-eyebrow-dot" />
        Online Python compiler
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
        Python playground
      </h1>
      <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
        Real CPython running in your browser. Write anything, load a preset, and press Run. Nothing is
        installed and your code never leaves this tab.
      </p>

      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">Load an example</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActive(preset)}
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
      </div>

      <PythonCompiler
        key={active.id}
        starter={active.code}
        packages={active.packages}
        title={`Playground — ${active.label}`}
        tall
      />
    </div>
  );
}
