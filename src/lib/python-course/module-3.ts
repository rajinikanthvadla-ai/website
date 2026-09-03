import type { PythonLesson } from "./types";

export const MODULE_3_LESSONS: PythonLesson[] = [
  {
    slug: "type-hints-and-dataclasses",
    title: "Type hints and dataclasses",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 20,
    summary:
      "Describe the shape of your data so editors, reviewers, and mypy catch mistakes before runtime.",
    whyForAi:
      "Pydantic (FastAPI, LangChain) is built entirely on type hints. Typed configs and typed records stop the classic ML bug where a string \"0.2\" flows into a float parameter and silently changes behaviour three layers down.",
    packages: [],
    sections: [
      {
        heading: "Annotating functions",
        body: `Hints are optional and **not enforced at runtime** — Python does not check them. Their value is tooling: autocomplete, editor warnings, and \`mypy\` in CI.

\`def chunk(text: str, size: int = 512) -> list[str]:\`

Modern syntax (Python 3.9+): \`list[str]\`, \`dict[str, float]\`, \`tuple[int, int]\`. For "may be None" use \`str | None\` (3.10+) instead of \`Optional[str]\`.

Annotate the **public boundary** of your code — function signatures, config objects, API models. Do not annotate every local variable; that is noise.`,
      },
      {
        heading: "Dataclasses",
        body: `\`@dataclass\` generates \`__init__\`, \`__repr__\`, and \`__eq__\` from annotated attributes. It turns a bag of dict keys into a real object with autocomplete.

\`frozen=True\` makes instances immutable — ideal for configs that should not mutate mid-run.

Mutable defaults need \`field(default_factory=list)\`, the same trap as mutable function defaults.

Dict vs dataclass: use a dict for data crossing a JSON boundary; use a dataclass for structures your own code passes around. Typos become errors instead of silent \`None\`.`,
      },
      {
        heading: "Validation with pydantic (production note)",
        body: `Dataclasses do not validate. **Pydantic** does: it parses and coerces at construction and raises a clear error when a field is wrong.

FastAPI request bodies are pydantic models, so an invalid payload is rejected with a 422 before your code runs. Pydantic is not available in this browser sandbox, so the example below is copy-paste for your local environment.`,
      },
    ],
    examples: [
      {
        title: "Typed functions",
        note: "Hints do not run, but they document intent precisely.",
        code: `def chunk_text(text: str, size: int = 40) -> list[str]:
    return [text[i:i + size] for i in range(0, len(text), size)]

def mean_score(scores: list[float]) -> float:
    return sum(scores) / len(scores) if scores else 0.0

def find_doc(doc_id: str, index: dict[str, str]) -> str | None:
    return index.get(doc_id)

print(chunk_text("Python type hints help teams read code faster.", 20))
print(mean_score([0.9, 0.8, 0.7]))
print(find_doc("missing", {"d1": "text"}))`,
      },
      {
        title: "A frozen config dataclass",
        note: "frozen=True prevents accidental mutation of run configuration.",
        code: `from dataclasses import dataclass, field

@dataclass(frozen=True)
class TrainConfig:
    model_name: str
    epochs: int = 3
    learning_rate: float = 2e-5
    tags: tuple[str, ...] = ()

cfg = TrainConfig(model_name="bert-base", tags=("nlp", "baseline"))
print(cfg)
print("lr:", cfg.learning_rate)

try:
    cfg.epochs = 10
except Exception as err:
    print("immutable:", type(err).__name__)`,
      },
      {
        title: "Dataclass for retrieved chunks",
        note: "default_factory avoids the shared-mutable-default bug.",
        code: `from dataclasses import dataclass, field

@dataclass
class Chunk:
    doc_id: str
    text: str
    score: float = 0.0
    tags: list[str] = field(default_factory=list)

hits = [
    Chunk("d1", "Python powers ML pipelines", 0.91, ["python"]),
    Chunk("d2", "Kubernetes runs containers", 0.55),
]
hits.sort(key=lambda c: c.score, reverse=True)
for h in hits:
    print(f"{h.doc_id}: {h.score:.2f} {h.tags} -> {h.text}")`,
      },
      {
        title: "Pydantic model (run locally)",
        note: "Copy into your own project after pip install pydantic. This is what FastAPI validates with.",
        code: `# pip install pydantic
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
    top_k: int = Field(default=4, ge=1, le=20)

req = ChatRequest(question="What is RAG?", temperature="0.7")  # coerced to float
print(req.temperature, type(req.temperature))
print(req.model_dump())`,
      },
    ],
    tryIt: {
      title: "Model an eval record",
      hint: "Add a latency_ms field with a default and print the average.",
      starter: `from dataclasses import dataclass

@dataclass
class EvalRow:
    question: str
    expected: str
    predicted: str

    @property
    def correct(self) -> bool:
        return self.expected.strip().lower() == self.predicted.strip().lower()

rows = [
    EvalRow("2+2?", "4", "4"),
    EvalRow("capital of France?", "Paris", "paris"),
    EvalRow("what is RAG?", "retrieval augmented generation", "a database"),
]
accuracy = sum(r.correct for r in rows) / len(rows)
for r in rows:
    print(("PASS" if r.correct else "FAIL"), r.question)
print(f"accuracy: {accuracy:.2%}")`,
    },
    takeaways: [
      "Type hints are documentation your editor and mypy can check; they do not run.",
      "Dataclasses replace anonymous dicts for internal structures.",
      "Use pydantic when data crosses a boundary and must be validated.",
    ],
  },
  {
    slug: "numpy-arrays",
    title: "NumPy arrays and vectors",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 24,
    summary:
      "Arrays, shapes, broadcasting, and cosine similarity — the numeric layer under every ML and embedding workflow.",
    whyForAi:
      "Embeddings are vectors, batches are matrices, and similarity search is a dot product. NumPy semantics — shape, dtype, broadcasting, vectorization — carry directly into PyTorch tensors. Shape mismatch is the single most common ML error message.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Why arrays beat lists",
        body: `A NumPy array is a fixed-type block of memory. Operations run in compiled code over the whole array at once — often 10 to 100 times faster than a Python loop.

Two attributes you check constantly:

- **shape** — a tuple, e.g. \`(32, 768)\` = 32 rows of a 768-dimensional embedding
- **dtype** — \`float32\` for models, \`float64\` by default in NumPy, \`int64\` for token ids

Mixing dtypes silently upcasts and doubles memory. Model code standardises on \`float32\`.`,
      },
      {
        heading: "Vectorization and broadcasting",
        body: `**Vectorization** means expressing computation over whole arrays: \`a * 2 + b\` rather than looping element by element.

**Broadcasting** lets arrays of different shapes combine when dimensions are compatible (equal, or one of them is 1). Subtracting a \`(768,)\` mean vector from a \`(32, 768)\` batch works: the mean is applied to every row.

Rules, right to left: dimensions must be equal or one must be 1. \`(32, 768)\` with \`(768,)\` is fine. \`(32, 768)\` with \`(32,)\` fails — you must reshape to \`(32, 1)\`.`,
      },
      {
        heading: "Cosine similarity",
        body: `Vector search ranks by cosine similarity: the dot product of two **normalized** vectors.

Normalize each vector to unit length (divide by its L2 norm), then a dot product gives a value in [-1, 1] where 1 means identical direction.

Every vector database — FAISS, Pinecone, pgvector, Chroma — implements this at scale. Writing it once in NumPy demystifies the whole retrieval step.`,
      },
    ],
    examples: [
      {
        title: "Shapes and dtypes",
        note: "First run downloads NumPy into the browser sandbox — give it a few seconds.",
        code: `import numpy as np

batch = np.random.rand(4, 8).astype(np.float32)
print("shape:", batch.shape)
print("dtype:", batch.dtype)
print("ndim:", batch.ndim, "| total values:", batch.size)
print("first row:", np.round(batch[0], 3))
print("column means:", np.round(batch.mean(axis=0), 3))
print("row means:", np.round(batch.mean(axis=1), 3))`,
      },
      {
        title: "Vectorization vs a Python loop",
        note: "Same result, very different speed at scale.",
        code: `import numpy as np
import time

values = np.random.rand(200_000).astype(np.float32)

start = time.perf_counter()
loop_total = 0.0
for v in values.tolist():
    loop_total += v * 2
loop_ms = (time.perf_counter() - start) * 1000

start = time.perf_counter()
vector_total = float((values * 2).sum())
vector_ms = (time.perf_counter() - start) * 1000

print(f"loop      : {loop_total:.2f} in {loop_ms:.1f} ms")
print(f"vectorized: {vector_total:.2f} in {vector_ms:.1f} ms")`,
      },
      {
        title: "Broadcasting a mean vector",
        note: "Centering a batch of embeddings — one line, no loop.",
        code: `import numpy as np

embeddings = np.array([
    [1.0, 2.0, 3.0],
    [2.0, 4.0, 6.0],
    [3.0, 6.0, 9.0],
], dtype=np.float32)

mean_vec = embeddings.mean(axis=0)
centered = embeddings - mean_vec

print("mean vector:", mean_vec)
print("centered:\\n", centered)
print("shapes:", embeddings.shape, mean_vec.shape, centered.shape)`,
      },
      {
        title: "Cosine similarity search",
        note: "This is exactly what a vector database does, minus the indexing.",
        code: `import numpy as np

def normalize(matrix):
    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    return matrix / np.clip(norms, 1e-9, None)

docs = np.array([
    [0.9, 0.1, 0.0],   # python
    [0.1, 0.9, 0.0],   # kubernetes
    [0.8, 0.2, 0.1],   # python tooling
], dtype=np.float32)
labels = ["python", "kubernetes", "python tooling"]

query = np.array([[0.85, 0.15, 0.0]], dtype=np.float32)

scores = (normalize(query) @ normalize(docs).T)[0]
order = np.argsort(-scores)

for rank, idx in enumerate(order, start=1):
    print(f"{rank}. {labels[idx]:16s} score={scores[idx]:.4f}")`,
      },
    ],
    tryIt: {
      title: "Rank documents against a query vector",
      hint: "Change the query values and watch the ranking reorder.",
      starter: `import numpy as np

labels = ["mlops", "llmops", "data engineering", "frontend"]
docs = np.array([
    [0.9, 0.3, 0.1, 0.0],
    [0.8, 0.6, 0.1, 0.0],
    [0.4, 0.2, 0.9, 0.0],
    [0.0, 0.1, 0.0, 0.9],
], dtype=np.float32)

query = np.array([0.85, 0.5, 0.1, 0.0], dtype=np.float32)

docs_n = docs / np.linalg.norm(docs, axis=1, keepdims=True)
query_n = query / np.linalg.norm(query)
scores = docs_n @ query_n

for idx in np.argsort(-scores):
    print(f"{labels[idx]:20s} {scores[idx]:.4f}")
print("best match:", labels[int(np.argmax(scores))])`,
    },
    takeaways: [
      "Check .shape and .dtype first when debugging numeric code.",
      "Vectorize instead of looping; broadcasting applies a smaller array across a larger one.",
      "Cosine similarity on normalized vectors is the core of semantic search.",
    ],
  },
  {
    slug: "pandas-dataframes",
    title: "pandas for datasets",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 24,
    summary:
      "Load, filter, group, and clean tabular data — the step before every model and the place most data bugs live.",
    whyForAi:
      "Training data, eval results, feature tables, and LLM cost logs are tables. pandas is how you inspect them, find nulls and duplicates, and compute per-segment metrics. Bad data beats a good model every time.",
    packages: ["pandas", "numpy"],
    sections: [
      {
        heading: "DataFrame and Series",
        body: `A **DataFrame** is a table; a **Series** is one column. \`df["score"]\` gives a Series; \`df[["id", "score"]]\` gives a smaller DataFrame.

First four commands on any new dataset:

- \`df.head()\` — look at actual rows
- \`df.shape\` — rows and columns
- \`df.dtypes\` — is that numeric column secretly a string?
- \`df.describe()\` — ranges, means, and obvious outliers

Numeric columns loaded as \`object\` dtype means the CSV has stray text — fix that before training, not after.`,
      },
      {
        heading: "Selecting, filtering, and adding columns",
        body: `Boolean masks filter rows: \`df[df["score"] >= 0.7]\`. Combine with \`&\` and \`|\` and wrap each condition in parentheses — \`and\`/\`or\` do not work on Series.

\`.loc[rows, cols]\` selects by label; \`.iloc[]\` by position.

Add a column by assignment: \`df["passed"] = df["score"] >= 0.7\`.

Chained assignment (\`df[df.a > 1]["b"] = 0\`) may silently do nothing. Use \`.loc\` for assignment: \`df.loc[df["a"] > 1, "b"] = 0\`.`,
      },
      {
        heading: "groupby and missing data",
        body: `\`df.groupby("model")["latency_ms"].mean()\` is the split-apply-combine pattern behind every metric breakdown. \`.agg()\` computes several statistics at once.

Missing data: \`df.isna().sum()\` counts nulls per column. Then decide deliberately — \`dropna()\` when rows are unusable, \`fillna(value)\` when a default is meaningful. Silently filling with 0 corrupts metrics.

Duplicates: \`df.duplicated().sum()\`, then \`drop_duplicates()\`. Duplicate training rows leak between train and test splits and inflate scores.`,
      },
    ],
    examples: [
      {
        title: "Build and inspect a DataFrame",
        note: "First run loads pandas into the browser — allow a few seconds.",
        code: `import pandas as pd

df = pd.DataFrame({
    "request_id": ["r1", "r2", "r3", "r4", "r5"],
    "model": ["gpt-4.1-mini", "gpt-4.1-mini", "llama-3", "llama-3", "gpt-4.1-mini"],
    "latency_ms": [820, 640, 1500, 1320, 700],
    "tokens": [512, 340, 900, 810, 410],
    "score": [0.91, 0.72, 0.65, 0.80, 0.55],
})

print(df.head())
print("shape:", df.shape)
print(df.dtypes)
print(df[["latency_ms", "score"]].describe().round(2))`,
      },
      {
        title: "Filter, derive, and sort",
        note: "Parentheses around each condition are required when combining with &.",
        code: `import pandas as pd

df = pd.DataFrame({
    "model": ["a", "a", "b", "b"],
    "latency_ms": [400, 1200, 300, 900],
    "score": [0.9, 0.6, 0.85, 0.45],
})

df["passed"] = df["score"] >= 0.7
fast_and_good = df[(df["latency_ms"] < 1000) & (df["score"] >= 0.7)]

print(df)
print("---")
print(fast_and_good.sort_values("score", ascending=False))`,
      },
      {
        title: "groupby with multiple aggregates",
        note: "This is how you produce a per-model quality and cost report.",
        code: `import pandas as pd

df = pd.DataFrame({
    "model": ["gpt-4.1-mini", "gpt-4.1-mini", "llama-3", "llama-3", "llama-3"],
    "latency_ms": [820, 640, 1500, 1320, 1410],
    "tokens": [512, 340, 900, 810, 850],
    "score": [0.91, 0.72, 0.65, 0.80, 0.70],
})

report = df.groupby("model").agg(
    n=("model", "size"),
    avg_latency=("latency_ms", "mean"),
    p95_latency=("latency_ms", lambda s: s.quantile(0.95)),
    avg_score=("score", "mean"),
    total_tokens=("tokens", "sum"),
).round(2)

print(report)`,
      },
      {
        title: "Find and handle dirty data",
        note: "Always count nulls and duplicates before you train on anything.",
        code: `import numpy as np
import pandas as pd

df = pd.DataFrame({
    "id": ["a", "b", "c", "c", "e"],
    "text": ["hello", None, "world", "world", "  spaced  "],
    "score": [0.9, 0.5, np.nan, np.nan, 0.7],
})

print("nulls per column:\\n", df.isna().sum())
print("duplicate rows:", int(df.duplicated().sum()))

clean = (
    df.drop_duplicates()
      .dropna(subset=["text"])
      .assign(text=lambda d: d["text"].str.strip())
)
clean["score"] = clean["score"].fillna(clean["score"].median())
print("---")
print(clean)`,
      },
    ],
    tryIt: {
      title: "Cost report per model",
      hint: "Change the price per 1K tokens and see the cost column update.",
      starter: `import pandas as pd

calls = pd.DataFrame({
    "model": ["mini", "mini", "large", "large", "mini"],
    "prompt_tokens": [500, 700, 1200, 900, 400],
    "completion_tokens": [120, 200, 450, 380, 90],
})

price_per_1k = {"mini": 0.0006, "large": 0.009}

calls["total_tokens"] = calls["prompt_tokens"] + calls["completion_tokens"]
calls["cost_usd"] = calls.apply(
    lambda row: row["total_tokens"] / 1000 * price_per_1k[row["model"]], axis=1
)

summary = calls.groupby("model").agg(
    calls=("model", "size"),
    tokens=("total_tokens", "sum"),
    cost_usd=("cost_usd", "sum"),
).round(4)

print(calls)
print("---")
print(summary)
print("total spend:", round(calls["cost_usd"].sum(), 4), "USD")`,
    },
    takeaways: [
      "head, shape, dtypes, describe — run these before anything else.",
      "Filter with boolean masks and parentheses; assign with .loc.",
      "groupby().agg() produces the per-segment metrics that reports need.",
    ],
  },
  {
    slug: "testing-with-pytest",
    title: "Testing ML code with pytest",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 20,
    summary:
      "Write tests that catch data and logic regressions, including the non-deterministic parts of ML systems.",
    whyForAi:
      "You cannot assert that an LLM returns an exact string. You can assert the JSON parses, the schema matches, chunking never loses text, and accuracy stays above a floor. Teams that test their data and glue code ship far fewer incidents.",
    packages: [],
    sections: [
      {
        heading: "pytest basics",
        body: `Put tests in \`tests/\`, name files \`test_*.py\` and functions \`test_*\`. Assert with plain \`assert\` — pytest rewrites it to show both sides on failure.

Run with \`pytest -q\`. Add \`--cov\` for coverage once the basics pass.

**Arrange, Act, Assert**: build inputs, call the function, check the result. One behaviour per test, and a name that states the expectation: \`test_chunker_preserves_all_text\`.`,
      },
      {
        heading: "Fixtures and parametrize",
        body: `\`@pytest.fixture\` builds shared setup (a sample DataFrame, a temp directory, a fake client) and injects it by parameter name.

\`@pytest.mark.parametrize\` runs one test over many inputs — perfect for edge cases: empty string, whitespace only, very long text, non-ASCII.

\`tmp_path\` is a built-in fixture giving a clean temp directory per test, so file tests never collide.`,
      },
      {
        heading: "Testing non-deterministic AI systems",
        body: `Four things you can reliably assert:

1. **Contract** — output parses as JSON and has the required keys and types.
2. **Invariants** — chunking loses no characters; embeddings have the expected dimension; scores stay in [0, 1].
3. **Thresholds** — accuracy on a small golden set stays above a floor (a regression gate, not a unit test).
4. **Determinism where you control it** — seed random number generators; set \`temperature=0\` for reproducible generations.

**Mock the LLM** in unit tests. Real API calls make tests slow, flaky, and expensive. Test your prompt-building and response-parsing logic against a fake client, and run a small live suite separately on a schedule.`,
      },
    ],
    examples: [
      {
        title: "Test file layout",
        note: "Copy into tests/test_chunking.py and run pytest -q locally.",
        code: `# tests/test_chunking.py
import pytest
from myproject.chunking import chunk_text

def test_chunker_preserves_all_text():
    text = "a" * 100
    chunks = chunk_text(text, size=30, overlap=0)
    assert "".join(chunks) == text

def test_chunker_respects_size():
    chunks = chunk_text("x" * 95, size=30, overlap=0)
    assert all(len(c) <= 30 for c in chunks)

@pytest.mark.parametrize("bad", ["", "   ", None])
def test_chunker_rejects_empty(bad):
    with pytest.raises((ValueError, TypeError)):
        chunk_text(bad, size=10)`,
      },
      {
        title: "Mock the LLM client",
        note: "Test your parsing logic without spending tokens or waiting on the network.",
        code: `import json

class FakeLLM:
    def __init__(self, reply):
        self.reply = reply
        self.calls = []

    def complete(self, prompt):
        self.calls.append(prompt)
        return self.reply

def extract_entities(llm, text):
    raw = llm.complete(f"Return JSON with key entities for: {text}")
    data = json.loads(raw)
    if "entities" not in data:
        raise ValueError("missing entities key")
    return data["entities"]

llm = FakeLLM('{"entities": ["Python", "Kubernetes"]}')
print(extract_entities(llm, "We run Python on Kubernetes"))
print("prompt sent:", llm.calls[0][:40], "...")

bad_llm = FakeLLM('{"stuff": []}')
try:
    extract_entities(bad_llm, "text")
except ValueError as err:
    print("caught:", err)`,
      },
      {
        title: "Assert an invariant, not an exact string",
        note: "Runs here as plain asserts; the same body works inside pytest.",
        code: `def chunk_text(text, size=30, overlap=0):
    if not text or not text.strip():
        raise ValueError("text must not be empty")
    step = size - overlap
    return [text[i:i + size] for i in range(0, len(text), step)]

text = "Testing ML glue code prevents silent data corruption."
chunks = chunk_text(text, size=20, overlap=0)

assert "".join(chunks) == text, "chunker lost characters"
assert all(len(c) <= 20 for c in chunks), "chunk too large"
assert len(chunks) == 3, f"expected 3 chunks, got {len(chunks)}"
print("all invariants hold:", chunks)`,
      },
      {
        title: "Accuracy regression gate",
        note: "Run against a small golden set in CI; fail the build if quality drops.",
        code: `golden = [
    {"q": "capital of France", "expected": "paris"},
    {"q": "2 + 2", "expected": "4"},
    {"q": "language of ML", "expected": "python"},
]

def fake_system(question):
    answers = {"capital of France": "Paris", "2 + 2": "4", "language of ML": "Java"}
    return answers[question]

hits = sum(1 for row in golden if fake_system(row["q"]).lower() == row["expected"])
accuracy = hits / len(golden)
floor = 0.8

print(f"accuracy={accuracy:.2f} floor={floor}")
if accuracy < floor:
    print("FAIL: quality regression — block the deploy")
else:
    print("PASS")`,
      },
    ],
    tryIt: {
      title: "Write assertions for a scoring function",
      hint: "Break normalize_score (return raw) and see which assertion fires first.",
      starter: `def normalize_score(raw, lo=0.0, hi=100.0):
    if hi <= lo:
        raise ValueError("hi must be greater than lo")
    clamped = max(lo, min(hi, raw))
    return (clamped - lo) / (hi - lo)

assert normalize_score(50) == 0.5
assert normalize_score(-10) == 0.0
assert normalize_score(999) == 1.0
assert 0.0 <= normalize_score(73.4) <= 1.0

try:
    normalize_score(10, lo=5, hi=5)
except ValueError as err:
    print("guard works:", err)

print("all assertions passed")`,
    },
    takeaways: [
      "Test contracts, invariants, and thresholds — not exact LLM wording.",
      "Mock the model in unit tests; run live checks separately.",
      "parametrize covers edge cases: empty, whitespace, huge, non-ASCII.",
    ],
  },
  {
    slug: "logging-and-configuration",
    title: "Logging, configuration, and secrets",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 18,
    summary:
      "Replace print with structured logs, read config from the environment, and keep API keys out of your repository.",
    whyForAi:
      "When an LLM endpoint misbehaves at 2am, logs are all you have. Leaked API keys in a public notebook are a real and expensive incident. Twelve-factor config is what lets the same image run in dev, staging, and prod.",
    packages: [],
    sections: [
      {
        heading: "logging instead of print",
        body: `\`print\` has no levels, no timestamps, and no way to turn off in production. The \`logging\` module gives you all three.

Levels: DEBUG (developer detail), INFO (normal operation), WARNING (something odd), ERROR (operation failed), CRITICAL (service is down).

Get a module-level logger: \`logger = logging.getLogger(__name__)\`. Configure handlers **once** at the entry point, never inside library code.

Log the **event and its context** — request id, model, token count, latency — not a vague "something failed".`,
      },
      {
        heading: "Structured logs",
        body: `Log aggregators (CloudWatch, Datadog, Loki) parse JSON far better than prose. Emitting one JSON object per line makes \`latency_ms > 2000\` a query instead of a regex.

Include a **correlation id** on every line for a request so you can reconstruct one user's journey through retrieval, generation, and post-processing.

Never log full prompts or responses containing personal data. Log a hash, a length, and a truncated preview.`,
      },
      {
        heading: "Config and secrets",
        body: `Read configuration from **environment variables**: \`os.environ["OPENAI_API_KEY"]\` when required, \`os.getenv("LOG_LEVEL", "INFO")\` when optional.

Keep a \`.env\` file locally, load it with \`python-dotenv\`, and add \`.env\` to \`.gitignore\`. Commit a \`.env.example\` with **key names only** so teammates know what to set.

In production, use a secret manager (AWS Secrets Manager, GCP Secret Manager, Kubernetes secrets). Never hardcode keys, never put them in notebooks, never paste them into a prompt.

If a key does leak: rotate it immediately. Deleting the commit does not remove it from git history or from anyone who already cloned.`,
      },
    ],
    examples: [
      {
        title: "Basic logging setup",
        note: "Configure once at the entry point; use getLogger(__name__) everywhere else.",
        code: `import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(name)s | %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("rag.pipeline")

logger.debug("this is hidden at INFO level")
logger.info("retrieved %d chunks in %d ms", 4, 87)
logger.warning("low similarity: %.2f", 0.31)
try:
    1 / 0
except ZeroDivisionError:
    logger.exception("scoring failed")`,
      },
      {
        title: "Structured JSON logs",
        note: "One JSON object per line — queryable in any log platform.",
        code: `import json
import logging

class JsonFormatter(logging.Formatter):
    def format(self, record):
        payload = {
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        extra = getattr(record, "context", None)
        if extra:
            payload.update(extra)
        return json.dumps(payload)

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logger = logging.getLogger("llm")
logger.handlers = [handler]
logger.setLevel(logging.INFO)
logger.propagate = False

logger.info("llm_call", extra={"context": {
    "request_id": "req-8891",
    "model": "gpt-4.1-mini",
    "prompt_chars": 812,
    "latency_ms": 743,
}})`,
      },
      {
        title: "Environment-based config",
        note: "Required keys fail fast; optional ones have defaults.",
        code: `import os

os.environ["LOG_LEVEL"] = "DEBUG"          # normally set outside the app
os.environ["MODEL_NAME"] = "gpt-4.1-mini"

def require(name):
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"missing required environment variable: {name}")
    return value

log_level = os.getenv("LOG_LEVEL", "INFO")
model_name = require("MODEL_NAME")
print("log_level:", log_level)
print("model_name:", model_name)

try:
    require("OPENAI_API_KEY")
except RuntimeError as err:
    print("startup check caught it:", err)`,
      },
      {
        title: "Redact before logging",
        note: "Never write raw keys, prompts with personal data, or full documents to logs.",
        code: `import hashlib

def redact(secret):
    if not secret:
        return "<unset>"
    digest = hashlib.sha256(secret.encode()).hexdigest()[:8]
    return f"{secret[:3]}***{digest}"

def preview(text, limit=40):
    return text[:limit] + ("..." if len(text) > limit else "")

api_key = "sk-live-abc123def456"
prompt = "My name is Priya and my account number is 998877. Summarize my bill."

print("key:", redact(api_key))
print("prompt_chars:", len(prompt))
print("prompt_preview:", preview(prompt))`,
      },
    ],
    tryIt: {
      title: "Log an LLM call with context",
      hint: "Change latency_ms above 2000 and let the warning branch fire.",
      starter: `import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)-8s %(message)s")
logger = logging.getLogger("service")

def log_llm_call(request_id, model, prompt, latency_ms, tokens):
    logger.info(
        "llm_call request_id=%s model=%s prompt_chars=%d tokens=%d latency_ms=%d",
        request_id, model, len(prompt), tokens, latency_ms,
    )
    if latency_ms > 2000:
        logger.warning("slow_call request_id=%s latency_ms=%d", request_id, latency_ms)

log_llm_call("req-1", "mini", "What is RAG?", 640, 210)
log_llm_call("req-2", "large", "Summarize this 20 page document", 2450, 3100)`,
    },
    takeaways: [
      "Use logging with levels and context; keep print for scratch work only.",
      "Structured JSON logs with a request id make production debugging possible.",
      "Secrets come from the environment or a secret manager — never from source control.",
    ],
  },
];
