import type { PythonLesson } from "./types";

export const MODULE_3_LESSONS: PythonLesson[] = [
  {
    slug: "type-hints-and-dataclasses",
    title: "Type hints and dataclasses",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 20,
    summary:
      "Add type hints and dataclasses so editors catch shape mistakes early.",
    whyForAi:
      "ML configs and eval rows are typed records. Wrong types (a string \"0.2\" as a float) cause silent bugs.",
    packages: [],
    sections: [
      {
        heading: "Annotating functions",
        basicTip: "Add types to parameters and the return value.",
        basicCode: `def score(text: str) -> int:
    return len(text)
print(score("prompt"))`,
        body: `Type hints are optional. Python does not check them at runtime.

They help editors, autocomplete, and tools like \`mypy\`.

Modern syntax: \`list[str]\`, \`dict[str, float]\`, \`str | None\`.

Common mistake: annotating every local variable. Annotate public function signatures instead.`,
      },
      {
        heading: "Dataclasses",
        basicTip: "Build a small frozen config and print a field.",
        basicCode: `from dataclasses import dataclass

@dataclass(frozen=True)
class Cfg:
    model: str
    lr: float = 2e-5
print(Cfg("mini").lr)`,
        body: `\`@dataclass\` builds \`__init__\`, \`__repr__\`, and \`__eq__\` from annotated fields.

\`frozen=True\` makes the object immutable. Good for configs.

For mutable defaults use \`field(default_factory=list)\`, not \`= []\`.`,
      },
      {
        heading: "Validation note",
        basicTip: "Check a value at a boundary with a plain assert.",
        basicCode: `req = {"temperature": "0.2"}
temp = float(req["temperature"])
assert 0.0 <= temp <= 2.0
print("ok", temp)`,
        body: `Dataclasses do not validate values. They only store them.

In production, libraries like pydantic parse and check fields at the API boundary.

In this sandbox we keep checks simple with \`float(...)\` and \`assert\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: typed train config",
        note: "A frozen dataclass holds model settings safely.",
        why: "Configs should not change mid-run by accident.",
        aiMl: "Training scripts pass typed configs into fit loops and eval jobs.",
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class TrainConfig:
    model_name: str
    epochs: int = 3
    learning_rate: float = 2e-5

cfg = TrainConfig(model_name="bert-base")
print(cfg.model_name, cfg.learning_rate)`,
      },
      {
        title: "AI / ML: retrieved chunk record",
        note: "One dataclass per hit keeps scores and tags together.",
        why: "Retrieval results are easier to sort when they are objects.",
        aiMl: "RAG pipelines sort Chunk objects by score before building context.",
        code: `from dataclasses import dataclass, field

@dataclass
class Chunk:
    doc_id: str
    text: str
    score: float = 0.0
    tags: list[str] = field(default_factory=list)

hits = [Chunk("d1", "Python ML", 0.91, ["python"]), Chunk("d2", "K8s", 0.55)]
hits.sort(key=lambda c: c.score, reverse=True)
print(hits[0].doc_id, hits[0].score)`,
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
]
accuracy = sum(r.correct for r in rows) / len(rows)
print("accuracy:", round(accuracy, 2))`,
    },
    takeaways: [
      "Type hints document intent; tools check them, runtime does not.",
      "Dataclasses turn dict bags into clear internal objects.",
      "Validate at boundaries; keep configs frozen when possible.",
    ],
  },
  {
    slug: "numpy-arrays",
    title: "NumPy arrays and vectors",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 24,
    summary:
      "Create arrays, check shape and dtype, then compute cosine similarity.",
    whyForAi:
      "Embeddings are vectors. Batches are matrices. Similarity search is a dot product of normalized vectors.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Arrays, shape, and dtype",
        basicTip: "Make a small vector and print shape and dtype.",
        basicCode: `import numpy as np
a = np.array([0.1, 0.9, 0.3], dtype=np.float32)
print(a.shape, a.dtype)`,
        body: `A NumPy array is a typed block of numbers. Operations run over the whole array at once.

Check these first when debugging:

- \`shape\` - sizes of each axis, e.g. \`(32, 768)\`
- \`dtype\` - usually \`float32\` in ML code

Common mistake: mixing dtypes and silently doubling memory.`,
      },
      {
        heading: "Vectorization and broadcasting",
        basicTip: "Subtract the column mean from a tiny batch.",
        basicCode: `import numpy as np
batch = np.array([[1.0, 2.0], [3.0, 4.0]])
print(batch - batch.mean(axis=0))`,
        body: `Vectorization means writing \`a * 2 + b\` instead of a Python loop.

Broadcasting lets arrays of compatible shapes combine. A \`(768,)\` mean can subtract from a \`(32, 768)\` batch.

Shapes must match from the right: equal size, or one side is 1.`,
      },
      {
        heading: "Cosine similarity",
        basicTip: "Normalize two vectors, then take the dot product.",
        basicCode: `import numpy as np
a = np.array([1.0, 0.0])
b = np.array([0.8, 0.2])
a_n = a / np.linalg.norm(a)
b_n = b / np.linalg.norm(b)
print(float(a_n @ b_n))`,
        body: `Cosine similarity is the dot product of two unit vectors.

Normalize each vector (divide by its L2 norm), then multiply with \`@\`.

Values near 1 mean similar direction. This is the core of vector search.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: center a batch of embeddings",
        note: "One broadcast subtracts the mean from every row.",
        why: "Centering is a common prep step before similarity or clustering.",
        aiMl: "Embedding batches are matrices; mean vectors broadcast across rows.",
        code: `import numpy as np

embeddings = np.array([[1.0, 2.0, 3.0], [2.0, 4.0, 6.0]], dtype=np.float32)
mean_vec = embeddings.mean(axis=0)
centered = embeddings - mean_vec
print(mean_vec)
print(centered)`,
      },
      {
        title: "AI / ML: rank docs by cosine score",
        note: "Normalize, then score a query against a small doc matrix.",
        why: "This is the same math a vector database uses.",
        aiMl: "Semantic search ranks documents by cosine similarity to a query vector.",
        code: `import numpy as np

def normalize(m):
    norms = np.linalg.norm(m, axis=1, keepdims=True)
    return m / np.clip(norms, 1e-9, None)

docs = np.array([[0.9, 0.1], [0.1, 0.9], [0.8, 0.2]], dtype=np.float32)
labels = ["python", "k8s", "tools"]
query = np.array([[0.85, 0.15]], dtype=np.float32)
scores = (normalize(query) @ normalize(docs).T)[0]
for i in np.argsort(-scores):
    print(labels[i], round(float(scores[i]), 3))`,
      },
    ],
    tryIt: {
      title: "Rank documents against a query vector",
      hint: "Change the query values and watch the ranking reorder.",
      starter: `import numpy as np

labels = ["mlops", "llmops", "data", "frontend"]
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
for i in np.argsort(-scores):
    print(f"{labels[i]:12} {scores[i]:.4f}")`,
    },
    takeaways: [
      "Check .shape and .dtype first when debugging arrays.",
      "Prefer vectorized ops; broadcasting applies a small array across a large one.",
      "Cosine similarity on normalized vectors powers semantic search.",
    ],
  },
  {
    slug: "pandas-dataframes",
    title: "pandas for datasets",
    moduleId: "data-ml",
    level: "intermediate",
    minutes: 24,
    summary:
      "Build, filter, group, and clean tables with pandas before you train.",
    whyForAi:
      "Eval results, feature tables, and cost logs are DataFrames. Bad rows beat a good model.",
    packages: ["pandas", "numpy"],
    sections: [
      {
        heading: "DataFrame and Series",
        basicTip: "Build a tiny table and print shape and mean.",
        basicCode: `import pandas as pd
df = pd.DataFrame({"score": [0.9, 0.7], "model": ["mini", "large"]})
print(df.shape)
print(df["score"].mean())`,
        body: `A DataFrame is a table. A Series is one column.

First checks on new data:

- \`df.head()\`
- \`df.shape\`
- \`df.dtypes\`
- \`df.describe()\`

Common mistake: a numeric column loaded as \`object\` because of stray text.`,
      },
      {
        heading: "Filter and add columns",
        basicTip: "Keep rows with score >= 0.7.",
        basicCode: `import pandas as pd
df = pd.DataFrame({"score": [0.9, 0.4, 0.8]})
print(df[df["score"] >= 0.7])`,
        body: `Filter with a boolean mask: \`df[df["score"] >= 0.7]\`.

Combine conditions with \`&\` and \`|\`, and wrap each part in parentheses.

Add a column with assignment: \`df["passed"] = df["score"] >= 0.7\`.

For assignment to filtered rows, prefer \`.loc\`.`,
      },
      {
        heading: "groupby and missing data",
        basicTip: "Group by model and print mean score.",
        basicCode: `import pandas as pd
df = pd.DataFrame({"model": ["a", "a", "b"], "score": [0.9, 0.7, 0.8]})
print(df.groupby("model")["score"].mean())`,
        body: `\`groupby\` splits rows, applies a function, and combines results.

Count nulls with \`df.isna().sum()\`. Then choose \`dropna()\` or \`fillna(...)\` on purpose.

Also check \`df.duplicated().sum()\` before training.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: filter eval rows",
        note: "Keep fast, high-score calls and sort them.",
        why: "Eval tables are filtered before you report quality.",
        aiMl: "LLM eval logs are DataFrames of model, latency, and score.",
        code: `import pandas as pd

df = pd.DataFrame({
    "model": ["a", "a", "b", "b"],
    "latency_ms": [400, 1200, 300, 900],
    "score": [0.9, 0.6, 0.85, 0.45],
})
df["passed"] = df["score"] >= 0.7
kept = df[(df["latency_ms"] < 1000) & (df["score"] >= 0.7)]
print(kept.sort_values("score", ascending=False))`,
      },
      {
        title: "AI / ML: per-model quality report",
        note: "groupby().agg() builds a small metrics table.",
        why: "One table per model is what reports need.",
        aiMl: "Cost and quality dashboards start as groupby aggregates.",
        code: `import pandas as pd

df = pd.DataFrame({
    "model": ["mini", "mini", "large", "large"],
    "latency_ms": [820, 640, 1500, 1320],
    "score": [0.91, 0.72, 0.65, 0.80],
})
report = df.groupby("model").agg(
    n=("model", "size"),
    avg_latency=("latency_ms", "mean"),
    avg_score=("score", "mean"),
).round(2)
print(report)`,
      },
    ],
    tryIt: {
      title: "Cost report per model",
      hint: "Change the price per 1K tokens and see the cost column update.",
      starter: `import pandas as pd

calls = pd.DataFrame({
    "model": ["mini", "mini", "large", "large"],
    "prompt_tokens": [500, 700, 1200, 900],
    "completion_tokens": [120, 200, 450, 380],
})
price_per_1k = {"mini": 0.0006, "large": 0.009}
calls["total_tokens"] = calls["prompt_tokens"] + calls["completion_tokens"]
calls["cost_usd"] = calls.apply(
    lambda row: row["total_tokens"] / 1000 * price_per_1k[row["model"]], axis=1
)
print(calls.groupby("model")["cost_usd"].sum().round(4))`,
    },
    takeaways: [
      "Run head, shape, dtypes, and describe before anything else.",
      "Filter with masks and parentheses; assign with .loc when needed.",
      "groupby().agg() builds the per-segment metrics reports need.",
    ],
  },
  {
    slug: "testing-with-pytest",
    title: "Testing ML code with pytest",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 20,
    summary:
      "Assert contracts and invariants. Mock the LLM. Gate quality with a floor.",
    whyForAi:
      "You cannot assert exact LLM text. You can assert JSON shape, score ranges, and accuracy floors.",
    packages: [],
    sections: [
      {
        heading: "pytest basics",
        basicTip: "Assert a score stays inside [0, 1].",
        basicCode: `def clamp(x):
    return max(0.0, min(1.0, x))
assert 0.0 <= clamp(1.5) <= 1.0
print("ok", clamp(1.5))`,
        body: `Name files \`test_*.py\` and functions \`test_*\`. Use plain \`assert\`.

Arrange inputs, act (call the function), assert the result.

One behaviour per test. Name the expectation in the function name.`,
      },
      {
        heading: "Fixtures and parametrize",
        basicTip: "Loop a few edge inputs the way parametrize would.",
        basicCode: `cases = ["", "   ", "ok"]
for text in cases:
    print(repr(text), "empty?", not text.strip())`,
        body: `Fixtures share setup across tests (sample data, temp folders).

\`@pytest.mark.parametrize\` runs one test on many inputs.

Cover edges: empty, whitespace, long text, non-ASCII.`,
      },
      {
        heading: "Testing non-deterministic AI",
        basicTip: "Assert a JSON contract, not an exact string.",
        basicCode: `import json
raw = '{"label": "pass", "score": 0.91}'
data = json.loads(raw)
assert "label" in data and 0 <= data["score"] <= 1
print(data["label"])`,
        body: `Assert what stays stable:

1. Contract - JSON keys and types
2. Invariants - chunking keeps all text; scores stay in range
3. Thresholds - accuracy on a small golden set stays above a floor

Mock the LLM in unit tests. Keep live API checks separate.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: mock the LLM client",
        note: "Test parsing without network calls or token spend.",
        why: "Unit tests should be fast and stable.",
        aiMl: "Prompt builders and JSON parsers are tested against a fake client.",
        code: `import json

class FakeLLM:
    def __init__(self, reply):
        self.reply = reply

    def complete(self, prompt):
        return self.reply

def extract_entities(llm, text):
    raw = llm.complete(f"entities for: {text}")
    data = json.loads(raw)
    return data["entities"]

print(extract_entities(FakeLLM('{"entities": ["Python"]}'), "Python ML"))`,
      },
      {
        title: "AI / ML: accuracy regression gate",
        note: "Fail when a golden set drops below a floor.",
        why: "Quality gates catch silent model or prompt regressions.",
        aiMl: "CI runs a tiny golden set and blocks deploy if accuracy falls.",
        code: `golden = [
    {"q": "2 + 2", "expected": "4"},
    {"q": "capital of France", "expected": "paris"},
]

def fake_system(q):
    return {"2 + 2": "4", "capital of France": "Paris"}[q]

hits = sum(1 for row in golden if fake_system(row["q"]).lower() == row["expected"])
accuracy = hits / len(golden)
floor = 0.8
print("accuracy", accuracy)
print("PASS" if accuracy >= floor else "FAIL")`,
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
print("all assertions passed")`,
    },
    takeaways: [
      "Test contracts, invariants, and thresholds - not exact LLM wording.",
      "Mock the model in unit tests; run live checks separately.",
      "Parametrize edge cases: empty, whitespace, huge, non-ASCII.",
    ],
  },
  {
    slug: "logging-and-configuration",
    title: "Logging, configuration, and secrets",
    moduleId: "data-ml",
    level: "advanced",
    minutes: 18,
    summary:
      "Use structured logs, read config from the environment, and keep secrets out of code.",
    whyForAi:
      "When an LLM call fails at night, logs are the trail. Leaked API keys are expensive.",
    packages: [],
    sections: [
      {
        heading: "logging instead of print",
        basicTip: "Log one INFO line with a latency value.",
        basicCode: `import logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger("rag")
log.info("retrieved %d chunks in %d ms", 4, 87)`,
        body: `\`print\` has no levels and no easy off switch. \`logging\` does.

Levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.

Use \`logging.getLogger(__name__)\`. Configure handlers once at the entry point.

Log the event plus context: request id, model, tokens, latency.`,
      },
      {
        heading: "Structured logs",
        basicTip: "Print one JSON log line with a request id.",
        basicCode: `import json
print(json.dumps({"event": "llm_call", "request_id": "r1", "ms": 640}))`,
        body: `One JSON object per line is easy to query in log tools.

Include a correlation id on every line for one request.

Do not log full prompts with personal data. Log length and a short preview.`,
      },
      {
        heading: "Config and secrets",
        basicTip: "Read an optional env var with a default.",
        basicCode: `import os
level = os.getenv("LOG_LEVEL", "INFO")
print("log_level:", level)`,
        body: `Read config from environment variables.

Required: \`os.environ["OPENAI_API_KEY"]\`. Optional: \`os.getenv("LOG_LEVEL", "INFO")\`.

Keep \`.env\` local and gitignored. Commit \`.env.example\` with key names only.

Never hardcode API keys in source or notebooks.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: log an LLM call",
        note: "One INFO line with model, size, and latency.",
        why: "Production debugging needs request context, not bare prints.",
        aiMl: "Every model call should log request id, model, tokens, and latency.",
        code: `import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("service")

def log_llm_call(request_id, model, prompt, latency_ms):
    log.info(
        "llm_call id=%s model=%s chars=%d ms=%d",
        request_id, model, len(prompt), latency_ms,
    )

log_llm_call("req-1", "mini", "What is RAG?", 640)`,
      },
      {
        title: "AI / ML: redact secrets before logging",
        note: "Hash and truncate; never write the raw key.",
        why: "Logs are widely readable. Secrets must not appear in them.",
        aiMl: "API keys and PII prompts are redacted before any log line is written.",
        code: `import hashlib

def redact(secret):
    if not secret:
        return "<unset>"
    digest = hashlib.sha256(secret.encode()).hexdigest()[:8]
    return f"{secret[:3]}***{digest}"

print("key:", redact("sk-live-abc123def456"))
print("chars:", len("My account number is 998877"))`,
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
log_llm_call("req-2", "large", "Summarize this doc", 2450, 3100)`,
    },
    takeaways: [
      "Use logging with levels and context; keep print for scratch work.",
      "JSON logs plus a request id make production debugging possible.",
      "Secrets come from the environment - never from source control.",
    ],
  },
];
