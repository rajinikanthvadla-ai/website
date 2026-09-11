import type { PythonLesson } from "./types";

export const MODULE_4_LESSONS: PythonLesson[] = [
  {
    slug: "async-python",
    title: "Async Python and concurrency",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 22,
    summary:
      "Run many slow I/O calls at once with async/await, and know when threads or processes fit better.",
    whyForAi:
      "LLM calls wait on the network. Async runs many of them together so a batch finishes in seconds, not minutes.",
    packages: [],
    sections: [
      {
        heading: "What async does",
        basicTip: "Await two short sleeps at the same time.",
        basicCode: `import asyncio
import time

async def ping(i):
    await asyncio.sleep(0.05)
    return i

start = time.perf_counter()
print(await asyncio.gather(ping(1), ping(2)))
print("sec", round(time.perf_counter() - start, 3))`,
        body: `\`async def\` makes a coroutine. \`await\` pauses it so other work can run.

\`asyncio.gather(...)\` runs several coroutines together. That helps I/O (HTTP, DB, LLM APIs), not heavy CPU math.

Common mistake: calling a coroutine without \`await\` - nothing runs.`,
      },
      {
        heading: "Bound concurrency",
        basicTip: "Limit how many jobs run at once.",
        basicCode: `import asyncio

sem = asyncio.Semaphore(2)

async def job(i):
    async with sem:
        await asyncio.sleep(0.01)
        return i

print(await asyncio.gather(*(job(i) for i in range(4))))`,
        body: `A \`Semaphore\` caps how many tasks run at once. Unlimited gather calls can hit rate limits (429).

Do not use blocking \`time.sleep\` or sync \`requests\` inside async - that freezes the whole event loop. Prefer \`asyncio.sleep\` or \`asyncio.to_thread\`.

Rule of thumb: asyncio for many API waits; threads for blocking libs; processes for heavy CPU.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: sequential vs concurrent LLM waits",
        note: "Five fake 0.3s calls: about 1.5s in a row, about 0.3s together.",
        why: "Shows why batch embedding and chat jobs use gather.",
        aiMl: "LLM and embedding HTTP calls are I/O waits - async cuts wall time.",
        analogy: "Like cooking five pans on one stove instead of one pan at a time.",
        code: `import asyncio
import time

async def fake_llm(i):
    await asyncio.sleep(0.3)
    return f"answer-{i}"

start = time.perf_counter()
seq = [await fake_llm(i) for i in range(5)]
seq_ms = (time.perf_counter() - start) * 1000

start = time.perf_counter()
conc = await asyncio.gather(*(fake_llm(i) for i in range(5)))
conc_ms = (time.perf_counter() - start) * 1000

print("seq", seq, f"{seq_ms:.0f} ms")
print("conc", conc, f"{conc_ms:.0f} ms")`,
      },
      {
        title: "AI / ML: keep going when one call fails",
        note: "return_exceptions=True saves the whole batch.",
        why: "One timeout should not cancel every other document.",
        aiMl: "Production LLM batches often log failures and keep successes.",
        analogy: "Like grading a class - one missing paper does not stop the rest.",
        code: `import asyncio

async def maybe_fail(i):
    await asyncio.sleep(0.05)
    if i % 3 == 0:
        raise TimeoutError(f"call {i}")
    return f"ok-{i}"

results = await asyncio.gather(
    *(maybe_fail(i) for i in range(6)),
    return_exceptions=True,
)
ok = [r for r in results if not isinstance(r, Exception)]
bad = [str(r) for r in results if isinstance(r, Exception)]
print("ok:", ok)
print("bad:", bad)`,
      },
    ],
    tryIt: {
      title: "Batch 10 calls with a semaphore",
      hint: "Set the semaphore to 1 and compare elapsed time.",
      starter: `import asyncio
import time

limit = asyncio.Semaphore(5)

async def embed(text):
    async with limit:
        await asyncio.sleep(0.2)
        return len(text)

docs = [f"document {i}" for i in range(10)]
start = time.perf_counter()
lengths = await asyncio.gather(*(embed(d) for d in docs))
print(lengths)
print(f"{(time.perf_counter() - start) * 1000:.0f} ms")`,
    },
    takeaways: [
      "async/await helps I/O waits like LLM and HTTP calls.",
      "Never block the event loop with sync sleep or sync HTTP.",
      "Use a Semaphore and return_exceptions for safe batches.",
    ],
  },
  {
    slug: "calling-llm-apis",
    title: "Calling LLM APIs in Python",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 24,
    summary:
      "HTTP JSON payloads, structured output, and simple token cost habits for GenAI calls.",
    whyForAi:
      "Every GenAI feature is HTTP plus JSON. Knowing the payload helps you debug, switch providers, and control cost.",
    packages: [],
    sections: [
      {
        heading: "The chat request shape",
        basicTip: "Build a tiny chat payload and print JSON.",
        basicCode: `import json
payload = {
    "model": "mini",
    "messages": [{"role": "user", "content": "What is RAG?"}],
}
print(json.dumps(payload, indent=2))`,
        body: `Most chat APIs take:

- \`model\` - which model to run
- \`messages\` - list of \`{role, content}\` with roles \`system\`, \`user\`, \`assistant\`
- \`temperature\` - 0 for stable extraction, higher for creative text
- \`max_tokens\` - response length cap

The response includes text plus a \`usage\` block. Log usage from day one.

Common mistake: high temperature when you need parseable JSON.`,
      },
      {
        heading: "Parse JSON output safely",
        basicTip: "Load model JSON and require a key.",
        basicCode: `import json
raw = '{"label": "pass", "score": 0.91}'
data = json.loads(raw)
print(data["label"], data.get("score"))`,
        body: `Ask the model for JSON. Do not scrape free prose with regex.

Validate required keys. Wrap \`json.loads\` in \`try/except\`. Models sometimes wrap JSON in markdown fences - strip those first.

For production, provider JSON mode plus a schema check is stronger than prompt-only JSON.`,
      },
      {
        heading: "Tokens and cost",
        basicTip: "Estimate tokens from characters.",
        basicCode: `text = "RAG uses docs as context."
tokens = max(1, len(text) // 4)
print("tokens", tokens)`,
        body: `English is roughly four characters per token. \`len(text) // 4\` is a rough budget estimate.

Long retrieved context usually costs more than the short answer.

Production habits: set timeouts, retry 429/5xx only, cache identical prompts, and truncate context to a token budget.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: build a grounded chat payload",
        note: "System + context + question is the usual RAG message shape.",
        why: "You can inspect the JSON before any real API call.",
        aiMl: "OpenAI-compatible chat endpoints expect this messages list.",
        analogy: "Like handing a student a textbook page, then asking one question.",
        code: `import json

def build_request(question, context):
    return {
        "model": "gpt-4.1-mini",
        "temperature": 0,
        "messages": [
            {"role": "system", "content": "Answer only from the context."},
            {"role": "user", "content": f"Context:\\n{context}\\n\\nQ: {question}"},
        ],
    }

payload = build_request("What is MLOps?", "MLOps runs ML in production.")
print(json.dumps(payload, indent=2))
print("est tokens:", sum(len(m["content"]) for m in payload["messages"]) // 4)`,
      },
      {
        title: "AI / ML: strip fences and validate keys",
        note: "Models often wrap JSON in markdown fences.",
        why: "Defensive parsing stops brittle pipelines.",
        aiMl: "Labeling and extraction jobs need valid JSON every time.",
        analogy: "Like opening a gift box before reading the note inside.",
        code: `import json

def parse_model_json(raw, required):
    text = raw.strip()
    if text.startswith("\`\`\`"):
        lines = [ln for ln in text.splitlines() if not ln.startswith("\`\`\`")]
        text = "\\n".join(lines)
    data = json.loads(text)
    missing = [k for k in required if k not in data]
    if missing:
        raise ValueError(f"missing: {missing}")
    return data

raw = '\`\`\`json\\n{"sentiment": "positive", "confidence": 0.92}\\n\`\`\`'
print(parse_model_json(raw, ["sentiment", "confidence"]))`,
      },
    ],
    tryIt: {
      title: "Fit chunks into a token budget",
      hint: "Lower max_context_tokens to 60 and watch chunks get skipped.",
      starter: `def estimate_tokens(text):
    return max(1, len(text) // 4)

chunks = [
    "MLOps covers deployment and monitoring.",
    "LLMOps adds prompt versioning and eval.",
    "RAG retrieves chunks before generation.",
    "Agents call tools in a loop.",
]
budget = 40
used = 0
selected = []
for chunk in chunks:
    cost = estimate_tokens(chunk)
    if used + cost > budget:
        print("skip:", chunk[:30], "...")
        continue
    selected.append(chunk)
    used += cost
print("used", used, "of", budget)
print(selected)`,
    },
    takeaways: [
      "Chat APIs share model, messages, temperature, and max_tokens.",
      "Use temperature=0 and validate JSON when you parse output.",
      "Budget tokens, set timeouts, and retry only transient errors.",
    ],
  },
  {
    slug: "numpy-to-pytorch",
    title: "From NumPy to PyTorch tensors",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 20,
    summary:
      "Tensors, gradients, and the training loop pattern behind fine-tuning code.",
    whyForAi:
      "PyTorch is the default for training and fine-tuning. A tensor is like a NumPy array with gradients and a device.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Arrays and tensor ideas",
        basicTip: "A NumPy array shows the same shape idea as a tensor.",
        basicCode: `import numpy as np
x = np.array([[1.0, 2.0], [3.0, 4.0]], dtype=np.float32)
print(x.shape, x.dtype)
print(x * 2)`,
        body: `A PyTorch tensor acts like a NumPy array, plus:

1. Device placement - move data to GPU with \`.to("cuda")\`
2. Autograd - with \`requires_grad=True\`, \`.backward()\` computes gradients

Convert with \`torch.from_numpy(arr)\` and \`tensor.numpy()\`.

Common mistake: model on GPU, batch still on CPU - "tensors on different devices".`,
      },
      {
        heading: "One training step",
        basicTip: "One hand-written gradient step on y = w * x.",
        basicCode: `w = 0.0
x, y = 2.0, 4.0
pred = w * x
w = w - 0.1 * (pred - y) * x
print("w", w)`,
        body: `Every training step repeats:

1. \`optimizer.zero_grad()\` - clear old gradients
2. forward - \`outputs = model(inputs)\`
3. loss - \`loss = criterion(outputs, targets)\`
4. \`loss.backward()\` - gradients
5. \`optimizer.step()\` - update weights

For inference: \`model.eval()\` and \`with torch.no_grad():\`.`,
      },
      {
        heading: "Gradient descent in NumPy",
        basicTip: "A few NumPy steps toward the right weight.",
        basicCode: `import numpy as np
x = np.array([1.0, 2.0, 3.0])
y = np.array([2.0, 4.0, 6.0])
w = 0.0
for _ in range(20):
    pred = w * x
    w -= 0.1 * float(((pred - y) * x).mean())
print(round(w, 3))`,
        body: `Training means: guess parameters, measure error, nudge parameters to reduce error, repeat.

The learning rate is the step size. Too large and loss blows up. Too small and training crawls.

The browser lab uses NumPy to show the same learning process. PyTorch adds automatic derivatives, but the training steps stay the same.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: fit a line with NumPy GD",
        note: "Fits y = 3x + 2. This is what .backward() automates.",
        why: "You see loss fall and weights move toward the truth.",
        aiMl: "Linear regression is the smallest version of a neural training loop.",
        analogy: "Like turning a dial until the prediction matches the target.",
        code: `import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(-1, 1, size=(200, 1)).astype(np.float32)
y = 3.0 * x + 2.0 + rng.normal(0, 0.05, size=(200, 1)).astype(np.float32)
w = np.zeros((1, 1), dtype=np.float32)
b = np.zeros((1,), dtype=np.float32)
lr = 0.5

for epoch in range(1, 61):
    pred = x @ w + b
    err = pred - y
    loss = float((err ** 2).mean())
    w -= lr * (2.0 * (x.T @ err) / len(x))
    b -= lr * (2.0 * err.mean(axis=0))
    if epoch % 20 == 0:
        print(f"epoch {epoch} loss={loss:.4f} w={w[0,0]:.3f} b={b[0]:.3f}")
print("learned:", round(float(w[0, 0]), 2), "* x +", round(float(b[0]), 2))`,
      },
      {
        title: "AI / ML: understand the PyTorch loop",
        note: "See the five training steps in a simple runnable form.",
        why: "The browser example teaches the order without extra setup.",
        aiMl: "Fine-tuning scripts use this zero_grad / backward / step pattern.",
        code: `training_steps = [
    "zero_grad",
    "forward",
    "loss",
    "backward",
    "step",
]
print(" -> ".join(training_steps))`,
      },
    ],
    tryIt: {
      title: "Tune the learning rate",
      hint: "Try lr = 2.5 (diverges) and lr = 0.01 (slow).",
      starter: `import numpy as np

rng = np.random.default_rng(1)
x = rng.uniform(-1, 1, size=(150, 1)).astype(np.float32)
y = -2.0 * x + 0.5 + rng.normal(0, 0.03, size=(150, 1)).astype(np.float32)
w = np.zeros((1, 1), dtype=np.float32)
b = np.zeros((1,), dtype=np.float32)
lr = 0.3

for epoch in range(1, 41):
    err = (x @ w + b) - y
    loss = float((err ** 2).mean())
    w -= lr * (2.0 * (x.T @ err) / len(x))
    b -= lr * (2.0 * err.mean(axis=0))
    if epoch % 10 == 0:
        print(f"epoch {epoch} loss={loss:.6f}")
print("target w=-2.0 b=0.5")
print(f"learned w={float(w[0,0]):.3f} b={float(b[0]):.3f}")`,
    },
    takeaways: [
      "A tensor is like a NumPy array plus device and autograd.",
      "zero_grad, forward, loss, backward, step is the training loop.",
      "Use model.eval() and torch.no_grad() for inference.",
    ],
  },
  {
    slug: "rag-from-scratch",
    title: "Build a RAG pipeline in pure Python",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 26,
    summary:
      "Chunk, embed, retrieve, and assemble a grounded prompt - the retrieval pipeline without frameworks.",
    whyForAi:
      "RAG is the most common GenAI system. Building the steps once helps you debug bad retrieval and explain the design.",
    packages: ["numpy"],
    sections: [
      {
        heading: "The five steps",
        basicTip: "Print the RAG stages in order.",
        basicCode: `steps = ["ingest", "chunk", "embed", "retrieve", "generate"]
for i, s in enumerate(steps, 1):
    print(i, s)`,
        body: `1. Chunk documents into passages
2. Embed each chunk as a vector
3. Index the vectors
4. Retrieve top-k similar chunks for a query
5. Assemble a prompt with only those chunks, then generate

Bad answers usually come from steps 1-4, not the model. Print retrieved chunks before blaming the LLM.`,
      },
      {
        heading: "Chunking",
        basicTip: "Chunk text with size and overlap.",
        basicCode: `text = "abcdefghijklmnopqrstuvwxyz"
size, overlap = 8, 2
step = size - overlap
chunks = [text[i:i + size] for i in range(0, len(text), step)]
print(chunks)`,
        body: `Too small loses meaning. Too large wastes tokens.

Start around 400-800 tokens with about 10-15% overlap. Prefer splitting on paragraphs or headings, then by size.

Keep metadata: source, page, section. Users ask where an answer came from.`,
      },
      {
        heading: "Retrieval quality",
        basicTip: "Rank docs with a simple keyword score.",
        basicCode: `docs = ["python mlops", "rag with embeddings", "css flexbox"]
query = "rag"
scored = sorted(((d.count(query), d) for d in docs), reverse=True)
print(scored[0][1])`,
        body: `Pure vector search can miss exact terms like error codes. Hybrid search mixes keyword and vector scores.

A similarity floor helps: if nothing is close enough, say you do not know instead of stuffing weak context into the prompt.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: retrieve with a tiny embedder",
        note: "A bag-of-words vector stands in for a real embedding model.",
        why: "The pipeline shape matches production RAG.",
        aiMl: "Real systems swap this embed() for OpenAI or sentence-transformers.",
        analogy: "Like finding library books whose topics match your question.",
        code: `import numpy as np

VOCAB = ["mlops", "rag", "python", "retrieval", "model", "prompt"]

def embed(text):
    vec = np.zeros(len(VOCAB), dtype=np.float32)
    for word in text.lower().split():
        if word in VOCAB:
            vec[VOCAB.index(word)] += 1.0
    n = np.linalg.norm(vec)
    return vec / n if n > 0 else vec

corpus = [
    {"id": "c1", "text": "MLOps handles model deployment and monitoring"},
    {"id": "c2", "text": "RAG uses retrieval to ground a prompt"},
    {"id": "c3", "text": "Python is used to train and serve models"},
]
matrix = np.vstack([embed(c["text"]) for c in corpus])
query = "how does rag build a prompt"
scores = matrix @ embed(query)
for i in np.argsort(-scores)[:2]:
    print(corpus[i]["id"], round(float(scores[i]), 3), corpus[i]["text"])`,
      },
      {
        title: "AI / ML: assemble a grounded prompt",
        note: "Numbered sources plus a refuse instruction.",
        why: "Clear citations reduce hallucination.",
        aiMl: "This is the prompt shape most RAG services send to the LLM.",
        analogy: "Like an open-book test with page numbers you must cite.",
        code: `def build_rag_prompt(question, chunks):
    if not chunks:
        return None
    sources = "\\n\\n".join(
        f"[{i}] ({c['id']})\\n{c['text']}"
        for i, c in enumerate(chunks, start=1)
    )
    return (
        "Answer ONLY from the sources. Cite like [1].\\n"
        "If missing, reply: I do not know.\\n\\n"
        f"SOURCES:\\n{sources}\\n\\nQUESTION: {question}\\nANSWER:"
    )

chunks = [
    {"id": "c2", "text": "RAG uses retrieval to ground a prompt."},
]
print(build_rag_prompt("What is RAG?", chunks))`,
      },
    ],
    tryIt: {
      title: "Run retrieve + prompt end to end",
      hint: "Change the query, or lower floor to 0.05.",
      starter: `import numpy as np

VOCAB = ["python", "mlops", "rag", "vector", "prompt", "deployment"]

def embed(text):
    vec = np.zeros(len(VOCAB), dtype=np.float32)
    for word in text.lower().split():
        if word in VOCAB:
            vec[VOCAB.index(word)] += 1.0
    n = np.linalg.norm(vec)
    return vec / n if n > 0 else vec

corpus = [
    {"id": "d1", "text": "python is used for deployment of models"},
    {"id": "d2", "text": "rag combines vector retrieval with a prompt"},
    {"id": "d3", "text": "mlops covers monitoring after deployment"},
]
matrix = np.vstack([embed(c["text"]) for c in corpus])
query = "how does rag build a prompt"
floor = 0.2
scores = matrix @ embed(query)
hits = [
    {**corpus[i], "score": float(scores[i])}
    for i in np.argsort(-scores)[:2]
    if scores[i] >= floor
]
print("query:", query)
for h in hits:
    print(h["id"], round(h["score"], 3), h["text"])
if not hits:
    print("I do not know")`,
    },
    takeaways: [
      "RAG is chunk, embed, index, retrieve, assemble.",
      "Debug retrieval before blaming the model.",
      "Use overlap, source metadata, and a similarity floor.",
    ],
  },
  {
    slug: "fastapi-model-service",
    title: "Serving models with FastAPI",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 22,
    summary:
      "Turn a model or RAG pipeline into a validated HTTP service with health checks.",
    whyForAi:
      "A notebook model has no product value until it is an API. FastAPI is the usual Python choice for inference endpoints.",
    packages: [],
    sections: [
      {
        heading: "Why FastAPI",
        basicTip: "Validate a request dict like an API model would.",
        basicCode: `def validate(body):
    if not body.get("question"):
        raise ValueError("question required")
    return {"ok": True, "q": body["question"]}
print(validate({"question": "What is RAG?"}))`,
        body: `You describe the request with types. FastAPI validates and returns 422 on bad input. It also builds docs at \`/docs\`.

Load the model once at startup, not per request. Loading a large model inside the handler wastes seconds and memory every call.

The browser lab simulates each FastAPI step, so you can learn the full request flow on this website.`,
      },
      {
        heading: "Health and predict shapes",
        basicTip: "Sketch health and predict responses.",
        basicCode: `health = {"status": "ok"}
predict = {"label": "pass", "score": 0.91}
print(health)
print(predict)`,
        body: `Useful endpoints:

- \`GET /health\` - process is up
- \`GET /ready\` - model is loaded
- \`POST /predict\` or \`/chat\` - real work

Return real status codes: 400 bad input, 422 validation, 503 not ready. Do not hide errors inside a 200 body.`,
      },
      {
        heading: "Deploy checklist",
        basicTip: "Print a short run checklist.",
        basicCode: `checks = ["health", "ready", "timeouts", "auth"]
for c in checks:
    print("[ ]", c)`,
        body: `Run with uvicorn. For GPU inference, usually one worker per GPU because each worker loads its own model copy.

Add timeouts, body size limits, and rate limits. Log request id, model version, latency, and token counts.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: request validation for predict",
        note: "Same rules pydantic enforces, written by hand.",
        why: "You see why invalid payloads must fail before inference.",
        aiMl: "Inference APIs reject empty text and bad thresholds early.",
        analogy: "Like a bouncer checking tickets before anyone enters.",
        code: `def validate_request(payload):
    errors = []
    text = payload.get("text")
    if not isinstance(text, str) or not text.strip():
        errors.append("text required")
    elif len(text) > 5000:
        errors.append("text too long")
    thr = payload.get("threshold", 0.5)
    try:
        thr = float(thr)
        if not 0.0 <= thr <= 1.0:
            errors.append("threshold out of range")
    except (TypeError, ValueError):
        errors.append("threshold must be a number")
    if errors:
        return {"status": 422, "errors": errors}
    return {"status": 200, "text": text.strip(), "threshold": thr}

for p in [{"text": "good"}, {"text": "  "}, {"text": "ok", "threshold": 5}]:
    print(p, "->", validate_request(p))`,
      },
      {
        title: "AI / ML: FastAPI request flow",
        note: "Learn the endpoint flow without installing anything.",
        why: "Shows the lifespan and /predict shape without a long listing.",
        aiMl: "Production inference services follow this health + predict pattern.",
        code: `flow = [
    "load model once",
    "check health",
    "validate request",
    "predict",
    "log latency",
]
for step in flow:
    print(step)`,
      },
    ],
    tryIt: {
      title: "Simulate the request lifecycle",
      hint: "Add a payload over 100 chars and confirm status 422.",
      starter: `import time
import uuid

READY = True

def handle(payload):
    rid = str(uuid.uuid4())[:8]
    start = time.perf_counter()
    if not READY:
        return {"status": 503, "request_id": rid}
    text = payload.get("text", "")
    if not text.strip():
        return {"status": 422, "request_id": rid, "detail": "text required"}
    if len(text) > 100:
        return {"status": 422, "request_id": rid, "detail": "too long"}
    label = "positive" if "good" in text.lower() else "neutral"
    return {
        "status": 200,
        "request_id": rid,
        "label": label,
        "latency_ms": round((time.perf_counter() - start) * 1000, 3),
    }

for p in [{"text": "training was good"}, {"text": ""}, {"text": "x" * 150}]:
    print(handle(p))`,
    },
    takeaways: [
      "Load the model once at startup, never per request.",
      "Ship /health and /ready separately.",
      "Validate input and return real HTTP status codes.",
    ],
  },
  {
    slug: "production-python-checklist",
    title: "Production Python for AI teams",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 20,
    summary:
      "Tooling, reproducibility, and habits that separate a demo from a dependable system.",
    whyForAi:
      "Interviewers probe process because that is what breaks in production: pins, seeds, tests, and logged configs.",
    packages: [],
    sections: [
      {
        heading: "The toolchain",
        basicTip: "Print a few pinned dependency lines.",
        basicCode: `pins = ["numpy==2.1.0", "pandas==2.2.3", "pytest==8.3.0"]
for p in pins:
    print(p)`,
        body: `Core tools:

- **ruff** - lint and format
- **mypy** - type checks
- **pytest** - tests
- **uv** or **poetry** - lockfiles

Add pre-commit so checks run before review. Keep config in \`pyproject.toml\` so editor, CLI, and CI agree.`,
      },
      {
        heading: "Reproducibility",
        basicTip: "Seed NumPy and print the same sample twice.",
        basicCode: `import numpy as np
rng = np.random.default_rng(42)
print(rng.integers(0, 10, size=5))`,
        body: `Pin dependencies. Seed Python, NumPy, and the ML framework. Version data (or at least hash it). Log config per run: hyperparams, data version, git commit.

For LLM systems also log prompt version, model version, and temperature.`,
      },
      {
        heading: "Measure before you optimize",
        basicTip: "Time a tiny loop with perf_counter.",
        basicCode: `import time
start = time.perf_counter()
total = sum(i * i for i in range(10_000))
print(total, "ms", round((time.perf_counter() - start) * 1000, 3))`,
        body: `Profile first. Usual wins: vectorize, batch API/GPU calls, then cache. Concurrency comes after.

Prefer generators over giant lists. Prefer \`float32\` over \`float64\` for model arrays.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: seed for a reproducible run",
        note: "Same seed, same random draws.",
        why: "You cannot debug a model if every run differs.",
        aiMl: "Training and eval scripts set seeds before shuffling data.",
        analogy: "Like resetting a shuffle deck to the same order each demo.",
        code: `import os
import random
import numpy as np

def set_seed(seed=42):
    os.environ["PYTHONHASHSEED"] = str(seed)
    random.seed(seed)
    np.random.seed(seed)

set_seed(42)
a = [random.random(), float(np.random.rand())]
set_seed(42)
b = [random.random(), float(np.random.rand())]
print([round(v, 6) for v in a])
print([round(v, 6) for v in b])
print("same:", a == b)`,
      },
      {
        title: "AI / ML: experiment manifest",
        note: "Log config, data fingerprint, and metrics together.",
        why: "Future you needs to know what produced a score.",
        aiMl: "MLflow and W&B store the same idea at larger scale.",
        analogy: "Like a lab notebook page for one experiment.",
        code: `import json
import hashlib

rows = [{"text": "a", "label": 1}, {"text": "b", "label": 0}]
fp = hashlib.sha256(json.dumps(rows, sort_keys=True).encode()).hexdigest()[:12]
manifest = {
    "run_id": "exp-01",
    "config": {"model": "bert-base", "lr": 2e-5, "seed": 42},
    "data": {"n": len(rows), "fingerprint": fp},
    "metrics": {"accuracy": 0.913},
}
print(json.dumps(manifest, indent=2))`,
      },
    ],
    tryIt: {
      title: "Score your own project",
      hint: "Flip True/False to match your real project.",
      starter: `checklist = {
    "deps pinned": True,
    "formatter in CI": True,
    "type hints on public APIs": False,
    "tests on every PR": False,
    "seeds set": True,
    "secrets from env": True,
    "structured logs": False,
    "health + ready endpoints": False,
}
done = [k for k, v in checklist.items() if v]
todo = [k for k, v in checklist.items() if not v]
print(f"score {len(done)}/{len(checklist)}")
print("done:", done)
print("todo:", todo)`,
    },
    takeaways: [
      "ruff, mypy, pytest, and a lockfile cover most quality basics.",
      "Reproducibility needs pins, seeds, versioned data, and logged config.",
      "Measure first; vectorize and batch before rewriting for speed.",
    ],
  },
];
