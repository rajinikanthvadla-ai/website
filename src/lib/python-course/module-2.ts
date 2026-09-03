import type { PythonLesson } from "./types";

export const MODULE_2_LESSONS: PythonLesson[] = [
  {
    slug: "functions",
    title: "Functions and arguments",
    moduleId: "core-language",
    level: "beginner",
    minutes: 22,
    summary:
      "Package logic into reusable, testable units — the unit of work in every data pipeline and LLM wrapper.",
    whyForAi:
      "Chunking, embedding, prompt building, scoring, and metric computation are all functions. Once logic lives in a function you can unit-test it, reuse it in a notebook and a FastAPI service, and change one place instead of ten.",
    packages: [],
    sections: [
      {
        heading: "Defining and calling",
        body: `\`def name(parameters):\` starts a function. The indented block is its body. \`return\` sends a value back; a function with no \`return\` returns \`None\`.

Parameters vs arguments: parameters are the names in the definition, arguments are the values you pass.

Keep functions **small and single-purpose**. \`clean_text\`, \`chunk_document\`, \`build_prompt\` — three functions beat one \`process()\` that does everything, because you can test each one.`,
      },
      {
        heading: "Defaults, keywords, and *args / **kwargs",
        body: `Default values make optional settings readable: \`def summarize(text, max_words=50):\`.

**Never use a mutable default** (\`def f(items=[])\`). The list is created once and shared across calls — a genuinely nasty bug. Use \`items=None\` and build inside.

Keyword arguments at the call site self-document: \`generate(prompt, temperature=0.2, max_tokens=256)\`. In LLM code this matters, because \`generate(p, 0.2, 256)\` is unreadable.

\`*args\` collects extra positional arguments into a tuple; \`**kwargs\` collects extra keyword arguments into a dict. LLM SDK wrappers use \`**kwargs\` to pass provider-specific options through.`,
      },
      {
        heading: "Scope and returning multiple values",
        body: `Names created inside a function are **local** — they disappear when it returns. Reading a global is allowed; rebinding one requires \`global\`, which you should almost always avoid.

Return several values as a tuple: \`return mean, std\`, then \`mean, std = stats(values)\`. For more than three, return a dict or a dataclass (covered later) so callers are not guessing positions.`,
      },
    ],
    examples: [
      {
        title: "A prompt builder function",
        note: "Defaults + keyword arguments make the call site readable.",
        code: `def build_prompt(question, context="", style="concise"):
    header = f"Answer in a {style} style."
    if context:
        return f"{header}\\n\\nContext:\\n{context}\\n\\nQuestion: {question}"
    return f"{header}\\n\\nQuestion: {question}"

print(build_prompt("What is RAG?"))
print("=====")
print(build_prompt("What is RAG?", context="RAG retrieves then generates.", style="detailed"))`,
      },
      {
        title: "The mutable default argument trap",
        note: "Run this. The first function keeps growing across calls — that is the bug.",
        code: `def broken(item, bucket=[]):
    bucket.append(item)
    return bucket

def fixed(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

print("broken:", broken("a"), broken("b"), broken("c"))
print("fixed :", fixed("a"), fixed("b"), fixed("c"))`,
      },
      {
        title: "Return multiple values and pass through kwargs",
        note: "**kwargs is how thin LLM wrappers forward provider options.",
        code: `def score_stats(scores):
    mean = sum(scores) / len(scores)
    worst = min(scores)
    return mean, worst

mean, worst = score_stats([0.91, 0.72, 0.85])
print(f"mean={mean:.3f} worst={worst:.2f}")

def call_model(prompt, **kwargs):
    options = {"temperature": 0.2, **kwargs}
    return {"prompt": prompt[:20], "options": options}

print(call_model("Explain embeddings", max_tokens=128, temperature=0.0))`,
      },
    ],
    tryIt: {
      title: "Write a text chunker",
      hint: "Change chunk_size to 30 and watch the number of chunks change.",
      starter: `def chunk_text(text, chunk_size=40, overlap=10):
    step = chunk_size - overlap
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start:start + chunk_size])
        start += step
    return chunks

doc = "Python powers ML pipelines, GenAI apps, and MLOps automation everywhere."
pieces = chunk_text(doc)
print("chunks:", len(pieces))
for i, piece in enumerate(pieces, start=1):
    print(i, repr(piece))`,
    },
    takeaways: [
      "Small single-purpose functions are testable and reusable across notebook and service.",
      "Use keyword arguments for model options; never use a mutable default.",
      "Return tuples for two values, dicts or dataclasses for more.",
    ],
  },
  {
    slug: "comprehensions-and-generators",
    title: "Comprehensions and generators",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Transform collections in one readable line, and stream large datasets without loading them into memory.",
    whyForAi:
      "Comprehensions build token lists, filter chunks, and reshape records constantly. Generators matter more: training data and log files are too big for RAM, so you yield batches instead of building a giant list.",
    packages: [],
    sections: [
      {
        heading: "List, dict, and set comprehensions",
        body: `\`[expr for item in seq]\` builds a list. Add a filter: \`[x for x in scores if x > 0.7]\`.

Dict version: \`{k: v for k, v in pairs}\`. Set version uses braces with a single expression.

Rule of thumb: **one loop and one condition is fine**; anything more nested belongs in a normal for-loop. Readability wins — a reviewer should understand it at a glance.`,
      },
      {
        heading: "Generators: lazy sequences",
        body: `Replace the brackets with parentheses and you get a **generator expression** — values are produced on demand, not stored.

A generator function uses \`yield\` instead of \`return\`. Each \`yield\` hands one value to the caller and pauses; the next iteration resumes right there.

Why it matters: streaming a 50 GB JSONL of training records with \`for record in read_records(path)\` uses constant memory. The same pattern powers token streaming from an LLM, where each chunk arrives one at a time.

Generators are **single-use**. Once consumed, iterate again by calling the function again.`,
      },
    ],
    examples: [
      {
        title: "Clean and filter in one line",
        note: "Read it as: keep the stripped lowercase text for each doc that is long enough.",
        code: `docs = ["  Python  ", "AI", "  Machine Learning ", "ML"]
cleaned = [d.strip().lower() for d in docs if len(d.strip()) > 2]
print(cleaned)

lengths = {d.strip(): len(d.strip()) for d in docs}
print(lengths)`,
      },
      {
        title: "Generator that yields batches",
        note: "This is the shape of a data loader. Memory stays flat regardless of dataset size.",
        code: `def batched(items, size):
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

rows = list(range(10))
for i, batch in enumerate(batched(rows, 4), start=1):
    print("batch", i, batch)`,
      },
      {
        title: "Streaming tokens (simulated)",
        note: "Real LLM streaming has the same interface: iterate and handle each piece.",
        code: `def stream_tokens(text):
    for word in text.split():
        yield word

collected = ""
for token in stream_tokens("Retrieval augmented generation grounds answers"):
    collected += token + " "
    print("received:", token)
print("final:", collected.strip())`,
      },
    ],
    tryIt: {
      title: "Filter retrieved chunks by score",
      hint: "Lower the threshold to 0.5 and compare how many chunks survive.",
      starter: `retrieved = [
    {"id": "d1", "score": 0.91, "text": "Python for ML"},
    {"id": "d2", "score": 0.44, "text": "Unrelated page"},
    {"id": "d3", "score": 0.78, "text": "RAG pipelines"},
]
threshold = 0.7

kept = [r for r in retrieved if r["score"] >= threshold]
ids = [r["id"] for r in kept]
by_id = {r["id"]: round(r["score"], 2) for r in kept}

print("kept:", len(kept), "of", len(retrieved))
print("ids:", ids)
print("scores:", by_id)`,
    },
    takeaways: [
      "Comprehensions replace short build-a-list loops; keep them to one loop and one filter.",
      "Generators use yield and stream data with constant memory.",
      "Generators are single-use — call the function again to re-iterate.",
    ],
  },
  {
    slug: "errors-and-exceptions",
    title: "Errors and exceptions",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Read tracebacks, catch what you can handle, and fail loudly on everything else.",
    whyForAi:
      "LLM APIs time out, rate-limit, and return malformed JSON. GPUs run out of memory. Files go missing mid-pipeline. Retrying the right exceptions — and not swallowing the rest — is the difference between a resilient service and a silent data-corruption incident.",
    packages: [],
    sections: [
      {
        heading: "Reading a traceback",
        body: `Read tracebacks **bottom-up**. The last line is the exception type and message; the lines above are the call stack, most recent last.

Types you will meet constantly:

- \`KeyError\` — dict key missing (bad API response shape)
- \`TypeError\` — wrong type (a string where a float belongs)
- \`ValueError\` — right type, bad value (\`float("abc")\`)
- \`IndexError\` — list index out of range
- \`FileNotFoundError\` — path wrong or file not mounted
- \`ZeroDivisionError\` — empty batch used as a denominator`,
      },
      {
        heading: "try / except / else / finally",
        body: `Catch **specific** exceptions. \`except Exception:\` swallows bugs; a bare \`except:\` also catches Ctrl+C and should never appear in your code.

\`else\` runs when no exception occurred. \`finally\` always runs — use it to release resources.

\`raise\` re-raises the current exception after logging. \`raise ValueError("msg") from err\` preserves the original cause, which keeps the traceback useful.

Define your own exception types for domain errors: \`class RetrievalError(Exception): pass\`. Callers can then handle your failure mode without guessing at strings.`,
      },
      {
        heading: "Retry with backoff",
        body: `Transient failures (429 rate limits, 503, timeouts) deserve a retry. Permanent ones (401 auth, 400 bad request) do not — retrying them just burns quota.

Standard shape: try, catch the transient type, sleep for an increasing delay (\`2 ** attempt\`), try again up to N times, then give up and raise. Production code adds jitter so a fleet of workers does not retry in lockstep.`,
      },
    ],
    examples: [
      {
        title: "Catch specific exceptions",
        note: "Each block handles one failure mode with a useful message.",
        code: `payload = {"model": "gpt-4.1-mini"}

try:
    temperature = float(payload["temperature"])
except KeyError:
    temperature = 0.2
    print("temperature missing, using default")
except (TypeError, ValueError):
    temperature = 0.2
    print("temperature unparseable, using default")
else:
    print("parsed temperature")
finally:
    print("temperature =", temperature)`,
      },
      {
        title: "Custom exception + raise from",
        note: "Domain errors let callers handle your failure without string matching.",
        code: `class RetrievalError(Exception):
    pass

def retrieve(query, index):
    try:
        return index[query]
    except KeyError as err:
        raise RetrievalError(f"no documents for: {query}") from err

index = {"python": ["doc-1", "doc-2"]}
print(retrieve("python", index))

try:
    retrieve("rust", index)
except RetrievalError as err:
    print("handled:", err)
    print("caused by:", type(err.__cause__).__name__)`,
      },
      {
        title: "Retry with exponential backoff",
        note: "Simulated flaky API. Real code sleeps with time.sleep and adds jitter.",
        code: `attempts = {"count": 0}

def flaky_call():
    attempts["count"] += 1
    if attempts["count"] < 3:
        raise TimeoutError("upstream timeout")
    return {"answer": "ok"}

def call_with_retry(fn, max_attempts=5):
    for attempt in range(max_attempts):
        try:
            return fn()
        except TimeoutError as err:
            wait = 2 ** attempt
            print(f"attempt {attempt + 1} failed ({err}); retry in {wait}s")
    raise RuntimeError("all retries exhausted")

print(call_with_retry(flaky_call))`,
      },
    ],
    tryIt: {
      title: "Validate an LLM config safely",
      hint: "Set temperature to \"hot\" or delete the key and see which branch runs.",
      starter: `def load_config(raw):
    if "model" not in raw:
        raise ValueError("model is required")
    try:
        temperature = float(raw.get("temperature", 0.2))
    except (TypeError, ValueError) as err:
        raise ValueError(f"bad temperature: {raw.get('temperature')!r}") from err
    if not 0.0 <= temperature <= 2.0:
        raise ValueError("temperature must be between 0 and 2")
    return {"model": raw["model"], "temperature": temperature}

for raw in [{"model": "m1"}, {"model": "m1", "temperature": "0.7"}, {"model": "m1", "temperature": "hot"}, {}]:
    try:
        print("ok:", load_config(raw))
    except ValueError as err:
        print("rejected:", err)`,
    },
    takeaways: [
      "Read tracebacks bottom-up; the last line names the real problem.",
      "Catch specific exceptions — never use a bare except.",
      "Retry transient failures with backoff; fail fast on auth and validation errors.",
    ],
  },
  {
    slug: "files-and-json",
    title: "Files, JSON, and paths",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Read and write data safely with context managers, and move between Python objects and JSON.",
    whyForAi:
      "Datasets arrive as JSONL, configs as YAML/JSON, prompts as text files, and eval results go back out as JSON. Every LLM API call is JSON on the wire. Path handling is where Windows/Linux bugs hide.",
    packages: [],
    sections: [
      {
        heading: "with open(...) — always",
        body: `\`with open(path, "r", encoding="utf-8") as f:\` opens the file and **guarantees it closes**, even if the block raises. Never call \`open()\` without \`with\` in real code.

Always pass \`encoding="utf-8"\`. Without it, Python uses the OS default, and a script that works on Linux CI crashes on a Windows laptop the moment a document contains an accented character or emoji.

Modes: \`"r"\` read, \`"w"\` write (truncates), \`"a"\` append, add \`"b"\` for bytes.`,
      },
      {
        heading: "JSON and JSONL",
        body: `\`json.dumps(obj)\` turns a dict into a string; \`json.loads(s)\` parses it back. The file variants are \`json.dump(obj, f)\` and \`json.load(f)\`.

**JSONL** (one JSON object per line) is the standard format for fine-tuning datasets and eval sets, because you can stream it line by line without parsing the whole file.

\`json.dumps(obj, indent=2)\` for human-readable config. Use \`ensure_ascii=False\` when your text contains non-English characters, otherwise they are escaped into unreadable \\u sequences.`,
      },
      {
        heading: "pathlib over string concatenation",
        body: `Use \`from pathlib import Path\`. Join with \`/\`: \`Path("data") / "train.jsonl"\`. It produces correct separators on every OS.

Useful methods: \`.exists()\`, \`.mkdir(parents=True, exist_ok=True)\`, \`.suffix\`, \`.stem\`, \`.read_text()\`, \`.write_text()\`, and \`.glob("*.jsonl")\` to list matching files.`,
      },
    ],
    examples: [
      {
        title: "Write and read JSON",
        note: "Runs in the browser compiler — Pyodide gives you a virtual filesystem.",
        code: `import json

config = {"model": "gpt-4.1-mini", "temperature": 0.2, "tools": ["search", "calc"]}

with open("config.json", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2)

with open("config.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

print(loaded)
print("tools:", loaded["tools"])
print(json.dumps(loaded, indent=2))`,
      },
      {
        title: "Stream a JSONL dataset",
        note: "One object per line — the format fine-tuning and eval pipelines expect.",
        code: `import json

rows = [
    {"prompt": "What is MLOps?", "completion": "Operating ML in production."},
    {"prompt": "What is RAG?", "completion": "Retrieval plus generation."},
]

with open("train.jsonl", "w", encoding="utf-8") as f:
    for row in rows:
        f.write(json.dumps(row, ensure_ascii=False) + "\\n")

with open("train.jsonl", "r", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        record = json.loads(line)
        print(i, record["prompt"], "->", record["completion"])`,
      },
      {
        title: "pathlib basics",
        note: "Never build paths with string + '/' — pathlib handles Windows and Linux.",
        code: `from pathlib import Path

data_dir = Path("artifacts") / "run-12"
data_dir.mkdir(parents=True, exist_ok=True)

metrics_path = data_dir / "metrics.json"
metrics_path.write_text('{"accuracy": 0.91}', encoding="utf-8")

print("exists:", metrics_path.exists())
print("suffix:", metrics_path.suffix, "| stem:", metrics_path.stem)
print("content:", metrics_path.read_text(encoding="utf-8"))
print("files:", [str(p) for p in data_dir.glob("*.json")])`,
      },
    ],
    tryIt: {
      title: "Save an eval report",
      hint: "Add another result row and confirm the accuracy recomputes.",
      starter: `import json
from pathlib import Path

results = [
    {"id": "q1", "correct": True},
    {"id": "q2", "correct": False},
    {"id": "q3", "correct": True},
]
accuracy = sum(1 for r in results if r["correct"]) / len(results)
report = {"n": len(results), "accuracy": round(accuracy, 3), "results": results}

path = Path("eval_report.json")
path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(path.read_text(encoding="utf-8"))`,
    },
    takeaways: [
      "Always use with open(..., encoding=\"utf-8\") — it closes the file and avoids OS encoding bugs.",
      "JSONL is the standard for training and eval datasets because it streams.",
      "Build paths with pathlib, not string concatenation.",
    ],
  },
  {
    slug: "classes-and-objects",
    title: "Classes and objects",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 22,
    summary:
      "Bundle state and behaviour together — the pattern behind PyTorch modules, retrievers, and LLM clients.",
    whyForAi:
      "PyTorch models subclass nn.Module. LangChain retrievers, tokenizers, and Hugging Face pipelines are classes you instantiate once and call many times. Understanding __init__, self, and inheritance makes those libraries readable instead of magic.",
    packages: [],
    sections: [
      {
        heading: "__init__, self, and attributes",
        body: `A class is a template. An instance is one object built from it.

\`__init__\` runs at construction and sets up attributes on \`self\`. \`self\` is just the instance, passed automatically — you write it in the definition, not at the call site.

Load expensive things **once** in \`__init__\` (a model, a client, an index) and reuse them in methods. That is exactly why Hugging Face pipelines and vector-store clients are classes: constructing is slow, calling is fast.`,
      },
      {
        heading: "Methods, __repr__, and __call__",
        body: `Regular methods take \`self\` first. \`@staticmethod\` needs no instance; \`@classmethod\` receives the class and is commonly used for alternate constructors like \`Config.from_json(path)\`.

\`__repr__\` controls what you see when you print the object. Add one — debugging a list of nameless objects is miserable.

\`__call__\` makes an instance callable like a function: \`model(inputs)\`. That is why PyTorch code calls the module directly instead of \`model.forward(inputs)\`.`,
      },
      {
        heading: "Inheritance — use sparingly",
        body: `A subclass reuses and extends a parent: \`class BM25Retriever(BaseRetriever):\`. Call \`super().__init__(...)\` to run the parent setup.

Frameworks are built on inheritance (\`nn.Module\`), so you must read it. In your own code, prefer **composition**: a \`RagPipeline\` that holds a retriever and a generator is easier to test and swap than a five-level class hierarchy.`,
      },
    ],
    examples: [
      {
        title: "A retriever class",
        note: "Index built once in __init__, reused on every search call.",
        code: `class KeywordRetriever:
    def __init__(self, documents):
        self.documents = documents
        self.index = {i: set(d.lower().split()) for i, d in enumerate(documents)}

    def search(self, query, top_k=2):
        terms = set(query.lower().split())
        scored = []
        for i, words in self.index.items():
            overlap = len(terms & words)
            if overlap:
                scored.append((overlap, self.documents[i]))
        scored.sort(reverse=True)
        return [doc for _, doc in scored[:top_k]]

    def __repr__(self):
        return f"KeywordRetriever(n_docs={len(self.documents)})"

retriever = KeywordRetriever([
    "python powers machine learning pipelines",
    "kubernetes runs containers in production",
    "python serves llm apis with fastapi",
])
print(retriever)
for hit in retriever.search("python llm"):
    print("-", hit)`,
      },
      {
        title: "__call__ makes an object behave like a function",
        note: "This is why PyTorch code writes model(x) rather than model.forward(x).",
        code: `class Scaler:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, values):
        return [v * self.factor for v in values]

scale = Scaler(0.5)
print(scale([1.0, 2.0, 3.0]))
print(callable(scale))`,
      },
      {
        title: "Inheritance with super()",
        note: "The subclass reuses parent setup and overrides one method.",
        code: `class BaseGenerator:
    def __init__(self, model_name):
        self.model_name = model_name

    def generate(self, prompt):
        return f"[{self.model_name}] {prompt}"

class CautiousGenerator(BaseGenerator):
    def __init__(self, model_name, refusal="I do not know."):
        super().__init__(model_name)
        self.refusal = refusal

    def generate(self, prompt):
        if "context:" not in prompt.lower():
            return self.refusal
        return super().generate(prompt)

gen = CautiousGenerator("local-llm")
print(gen.generate("Context: RAG grounds answers. Question: what is RAG?"))
print(gen.generate("Just guess something"))`,
      },
    ],
    tryIt: {
      title: "Build a token-budget tracker",
      hint: "Add more calls until the budget is exceeded and see the guard trigger.",
      starter: `class TokenBudget:
    def __init__(self, limit):
        self.limit = limit
        self.used = 0

    def spend(self, tokens):
        if self.used + tokens > self.limit:
            raise RuntimeError(f"budget exceeded: {self.used} + {tokens} > {self.limit}")
        self.used += tokens
        return self.remaining

    @property
    def remaining(self):
        return self.limit - self.used

    def __repr__(self):
        return f"TokenBudget(used={self.used}, limit={self.limit})"

budget = TokenBudget(1000)
print(budget.spend(400))
print(budget.spend(350))
print(budget)
try:
    budget.spend(500)
except RuntimeError as err:
    print("blocked:", err)`,
    },
    takeaways: [
      "__init__ sets up state once; methods reuse it — the pattern behind model and client classes.",
      "__call__ is why PyTorch modules are invoked like functions.",
      "Read inheritance in frameworks, but prefer composition in your own code.",
    ],
  },
  {
    slug: "modules-and-environments",
    title: "Modules, packages, and virtual environments",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "Split code into files, import cleanly, and isolate dependencies so your project is reproducible.",
    whyForAi:
      "\"It works on my machine\" is the number one ML reproducibility failure. Pinned requirements and a clean package layout are what let a training run reproduce in CI and a Docker image behave like your laptop.",
    packages: [],
    sections: [
      {
        heading: "Modules and imports",
        body: `Every \`.py\` file is a module. \`import chunking\` then \`chunking.split()\`, or \`from chunking import split\`.

Keep imports **at the top of the file**, grouped: standard library, third party, then your own code. Avoid \`from module import *\` — it hides where names come from and breaks tooling.

\`if __name__ == "__main__":\` guards code that should only run when the file is executed directly, not when it is imported. Put your CLI entry point there so importing the module for tests does not kick off a training run.`,
      },
      {
        heading: "A layout that scales",
        body: `A workable project structure:

\`\`\`
myproject/
  src/myproject/__init__.py
  src/myproject/data.py
  src/myproject/model.py
  src/myproject/api.py
  tests/test_data.py
  requirements.txt
  pyproject.toml
  README.md
\`\`\`

\`__init__.py\` marks a package. Import as \`from myproject.data import load_rows\`. Flat repos with twenty files in the root become unnavigable within a month.`,
      },
      {
        heading: "Virtual environments and pinning",
        body: `A virtual environment is a per-project Python with its own packages, so project A on torch 2.1 does not break project B on torch 2.4.

\`\`\`bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
pip freeze > requirements.txt
\`\`\`

**Pin versions** (\`pandas==2.2.2\`, not \`pandas\`). Unpinned dependencies mean a rebuild three months later silently installs a new version and your metrics move. Modern teams use \`uv\` or Poetry, but the principle is identical: a lockfile, committed.`,
      },
    ],
    examples: [
      {
        title: "The main guard",
        note: "Importing this file defines the function; running it executes the demo.",
        code: `def preprocess(text):
    return text.strip().lower()

def main():
    samples = ["  Hello ", "WORLD  "]
    for s in samples:
        print(repr(s), "->", repr(preprocess(s)))

if __name__ == "__main__":
    main()`,
      },
      {
        title: "Import order convention",
        note: "Standard library, blank line, third party, blank line, local imports.",
        code: `import json
import logging
from pathlib import Path

# third-party (not installed in this browser sandbox, shown for shape)
# import numpy as np
# import pandas as pd

# local
# from myproject.data import load_rows

logging.basicConfig(level=logging.INFO)
logging.info("imports grouped: stdlib, third-party, local")
print("config path:", Path("configs") / "train.json")
print(json.dumps({"ok": True}))`,
      },
      {
        title: "requirements.txt with pinned versions",
        note: "Copy this shape into your own project. Exact versions, one per line.",
        code: `# requirements.txt
# numpy==2.1.3
# pandas==2.2.3
# scikit-learn==1.5.2
# fastapi==0.115.5
# uvicorn==0.32.1
# pydantic==2.10.3
# python-dotenv==1.0.1

print("Pin every dependency. Commit the file. Rebuild reproducibly.")`,
      },
    ],
    tryIt: {
      title: "Inspect the runtime and stdlib",
      hint: "Try importing another stdlib module such as random or datetime.",
      starter: `import sys
import platform
from pathlib import Path

print("python:", sys.version.split()[0])
print("platform:", platform.system())
print("cwd:", Path.cwd())
print("__name__ is:", __name__)`,
    },
    takeaways: [
      "Imports go at the top, grouped stdlib / third-party / local. Never import *.",
      "Guard entry points with if __name__ == \"__main__\".",
      "One virtual environment per project, and pin every version.",
    ],
  },
  {
    slug: "decorators-and-context-managers",
    title: "Decorators and context managers",
    moduleId: "core-language",
    level: "advanced",
    minutes: 20,
    summary:
      "Wrap functions with reusable behaviour and manage resources cleanly — the mechanics behind @app.get, @task, and torch.no_grad().",
    whyForAi:
      "FastAPI routes, Airflow tasks, LangChain tools, pytest fixtures, and caching all use decorators. Context managers open and close model sessions, database connections, and inference modes. You will read them daily, and writing a timing or retry decorator saves repetition.",
    packages: [],
    sections: [
      {
        heading: "Functions are objects",
        body: `You can pass a function as an argument, return it from another function, and store it in a dict. A **decorator** is just a function that takes a function and returns a replacement.

\`@timed\` above a definition is shorthand for \`fn = timed(fn)\`. Nothing magic.

Always apply \`@functools.wraps(fn)\` to the inner wrapper so the original name and docstring survive — otherwise every decorated function reports itself as \`wrapper\`, which wrecks tracebacks and API docs.`,
      },
      {
        heading: "Practical decorators",
        body: `Three you will actually write:

- **Timing** — log how long an inference call took
- **Retry** — re-run on transient API errors
- **Caching** — \`@functools.lru_cache\` memoizes pure functions; great for embedding lookups of repeated strings in a single process

Decorators with arguments need one more layer: a function that returns a decorator (\`@retry(max_attempts=3)\`).`,
      },
      {
        heading: "Context managers",
        body: `\`with\` calls \`__enter__\` on entry and \`__exit__\` on exit — even when an exception is raised. That is the guarantee that makes \`with open(...)\` safe.

Write one quickly with \`@contextlib.contextmanager\`: code before \`yield\` is setup, code after is teardown, and a \`try/finally\` ensures teardown always runs.

Real uses: timing a block, opening a DB session, \`torch.no_grad()\` to disable gradient tracking during inference, and temporarily swapping a config value in tests.`,
      },
    ],
    examples: [
      {
        title: "A timing decorator",
        note: "functools.wraps keeps the original function name intact.",
        code: `import functools
import time

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        print(f"{fn.__name__} took {elapsed_ms:.2f} ms")
        return result
    return wrapper

@timed
def embed(texts):
    return [[len(t) * 0.1] * 3 for t in texts]

print(embed(["python", "genai"]))
print("name preserved:", embed.__name__)`,
      },
      {
        title: "Decorator with arguments (retry)",
        note: "Three layers: retry -> decorator -> wrapper. Read it from the inside out.",
        code: `import functools

def retry(max_attempts=3, exceptions=(TimeoutError,)):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            last = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return fn(*args, **kwargs)
                except exceptions as err:
                    last = err
                    print(f"attempt {attempt} failed: {err}")
            raise last
        return wrapper
    return decorator

state = {"calls": 0}

@retry(max_attempts=4)
def call_llm(prompt):
    state["calls"] += 1
    if state["calls"] < 3:
        raise TimeoutError("gateway timeout")
    return f"answer to: {prompt}"

print(call_llm("what is llmops?"))`,
      },
      {
        title: "A context manager for timing a block",
        note: "Same shape as torch.no_grad() — setup, yield, guaranteed teardown.",
        code: `import contextlib
import time

@contextlib.contextmanager
def stage(name):
    print(f"-> start {name}")
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed_ms = (time.perf_counter() - start) * 1000
        print(f"<- done {name} in {elapsed_ms:.2f} ms")

with stage("retrieve"):
    docs = [f"doc-{i}" for i in range(1000)]

with stage("generate"):
    answer = " ".join(docs[:3])
print(answer)`,
      },
      {
        title: "Caching repeated work",
        note: "lru_cache only works when arguments are hashable and the function is pure.",
        code: `import functools

@functools.lru_cache(maxsize=128)
def fake_embed(text):
    print("computing embedding for:", text)
    return sum(ord(c) for c in text) % 997

print(fake_embed("python"))
print(fake_embed("python"))   # cached, no recompute line
print(fake_embed("genai"))
print(fake_embed.cache_info())`,
      },
    ],
    tryIt: {
      title: "Combine a decorator and a context manager",
      hint: "Add a second @timed function and call it inside the with block.",
      starter: `import contextlib
import functools
import time

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        out = fn(*args, **kwargs)
        print(f"{fn.__name__}: {(time.perf_counter() - start) * 1000:.2f} ms")
        return out
    return wrapper

@contextlib.contextmanager
def pipeline(name):
    print("pipeline start:", name)
    try:
        yield
    finally:
        print("pipeline end:", name)

@timed
def rerank(chunks):
    return sorted(chunks, key=len, reverse=True)

with pipeline("rag"):
    print(rerank(["short", "a much longer chunk", "mid size"]))`,
    },
    takeaways: [
      "A decorator is a function returning a wrapped function — always use functools.wraps.",
      "Decorators with arguments need an extra layer: retry(...) returns the decorator.",
      "Context managers guarantee teardown; write them with @contextlib.contextmanager.",
    ],
  },
];
