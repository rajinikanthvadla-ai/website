import type { PythonLesson } from "./types";

export const MODULE_4_LESSONS: PythonLesson[] = [
  {
    slug: "async-python",
    title: "Async Python and concurrency",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 22,
    summary:
      "Run many slow I/O calls at once with async/await, and know when threads or processes are the right tool instead.",
    whyForAi:
      "An LLM call takes one to five seconds, and almost all of it is waiting on the network. Sequential calls make a batch of 50 documents take minutes. Async turns that into seconds. FastAPI endpoints that call models are async for exactly this reason.",
    packages: [],
    sections: [
      {
        heading: "Why async exists",
        body: `Python's GIL means threads do not speed up CPU-bound work. But most AI application code is **I/O-bound**: waiting on an HTTP response, a vector database, or a disk read. While waiting, the CPU is idle.

\`async def\` defines a coroutine. \`await\` says "pause here, let other work run, resume when this finishes". \`asyncio.gather(...)\` runs many coroutines concurrently.

The rule of thumb:

| Work type | Right tool |
| --- | --- |
| Many API calls, DB reads | \`asyncio\` |
| Blocking libraries you cannot change | threads (\`ThreadPoolExecutor\`) |
| Heavy CPU: tokenizing millions of docs | processes (\`ProcessPoolExecutor\`) |
| GPU training | the framework's own loaders |`,
      },
      {
        heading: "Rules that trip people up",
        body: `You can only \`await\` inside an \`async def\`. Calling a coroutine without awaiting it returns a coroutine object and runs nothing — a silent no-op bug.

**Never call blocking code inside async.** One \`time.sleep(2)\` or a synchronous \`requests.get\` freezes the entire event loop, including every other in-flight request on your server. Use \`asyncio.sleep\` and an async HTTP client (\`httpx.AsyncClient\`), or push blocking work to \`asyncio.to_thread\`.

Bound your concurrency with \`asyncio.Semaphore\`. Firing 500 simultaneous requests at an LLM provider earns you 429 rate limits, not speed. Twenty concurrent calls with retry is the practical shape.

Locally you start the loop with \`asyncio.run(main())\`. The compiler on this page already runs inside an event loop, so the examples below use top-level \`await\` directly.`,
      },
    ],
    examples: [
      {
        title: "Sequential vs concurrent",
        note: "Five calls of 0.3s each: 1.5s sequential, about 0.3s concurrent.",
        code: `import asyncio
import time

async def fake_llm_call(i):
    await asyncio.sleep(0.3)
    return f"answer-{i}"

start = time.perf_counter()
sequential = []
for i in range(5):
    sequential.append(await fake_llm_call(i))
seq_ms = (time.perf_counter() - start) * 1000

start = time.perf_counter()
concurrent = await asyncio.gather(*(fake_llm_call(i) for i in range(5)))
conc_ms = (time.perf_counter() - start) * 1000

print("sequential:", sequential, f"{seq_ms:.0f} ms")
print("concurrent:", concurrent, f"{conc_ms:.0f} ms")
print(f"speedup: {seq_ms / conc_ms:.1f}x")`,
      },
      {
        title: "Limit concurrency with a semaphore",
        note: "Protects you from provider rate limits. Twenty is a sane default.",
        code: `import asyncio

limit = asyncio.Semaphore(3)
in_flight = {"now": 0, "peak": 0}

async def guarded_call(i):
    async with limit:
        in_flight["now"] += 1
        in_flight["peak"] = max(in_flight["peak"], in_flight["now"])
        await asyncio.sleep(0.1)
        in_flight["now"] -= 1
        return i

results = await asyncio.gather(*(guarded_call(i) for i in range(12)))
print("completed:", len(results))
print("peak concurrent calls:", in_flight["peak"])`,
      },
      {
        title: "Handle partial failures",
        note: "return_exceptions=True keeps one bad call from killing the whole batch.",
        code: `import asyncio

async def maybe_fail(i):
    await asyncio.sleep(0.05)
    if i % 3 == 0:
        raise TimeoutError(f"call {i} timed out")
    return f"ok-{i}"

results = await asyncio.gather(*(maybe_fail(i) for i in range(6)), return_exceptions=True)

succeeded = [r for r in results if not isinstance(r, Exception)]
failed = [r for r in results if isinstance(r, Exception)]
print("succeeded:", succeeded)
print("failed:", [str(e) for e in failed])
print(f"success rate: {len(succeeded) / len(results):.0%}")`,
      },
      {
        title: "Async LLM batch (run locally)",
        note: "Real shape with httpx. Copy into your project after pip install httpx.",
        code: `# pip install httpx
import asyncio
import httpx

API_URL = "https://api.openai.com/v1/chat/completions"

async def ask(client, semaphore, question, api_key):
    async with semaphore:
        response = await client.post(
            API_URL,
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": "gpt-4.1-mini",
                "messages": [{"role": "user", "content": question}],
                "temperature": 0,
            },
            timeout=30.0,
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

async def main(questions, api_key):
    semaphore = asyncio.Semaphore(20)
    async with httpx.AsyncClient() as client:
        tasks = [ask(client, semaphore, q, api_key) for q in questions]
        return await asyncio.gather(*tasks, return_exceptions=True)

# asyncio.run(main(["What is RAG?", "What is MLOps?"], "sk-..."))`,
      },
    ],
    tryIt: {
      title: "Batch 10 calls with bounded concurrency",
      hint: "Change the semaphore limit to 1 and compare the elapsed time.",
      starter: `import asyncio
import time

limit = asyncio.Semaphore(5)

async def embed(text):
    async with limit:
        await asyncio.sleep(0.2)
        return len(text)

docs = [f"document number {i}" for i in range(10)]

start = time.perf_counter()
lengths = await asyncio.gather(*(embed(d) for d in docs))
elapsed = (time.perf_counter() - start) * 1000

print("lengths:", lengths)
print(f"elapsed: {elapsed:.0f} ms for {len(docs)} calls")`,
    },
    takeaways: [
      "async/await wins on I/O-bound work: LLM calls, HTTP, database reads.",
      "One blocking call inside async freezes the whole event loop.",
      "Bound concurrency with a Semaphore and use return_exceptions for partial failures.",
    ],
  },
  {
    slug: "calling-llm-apis",
    title: "Calling LLM APIs in Python",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 24,
    summary:
      "HTTP, JSON payloads, structured output, token accounting, and cost control — the real mechanics of a GenAI integration.",
    whyForAi:
      "Every GenAI feature is HTTP plus JSON underneath the SDK. Knowing the payload shape lets you switch providers, debug a 400, parse a tool call, and explain your bill. It is also the most common live-coding topic in GenAI interviews.",
    packages: [],
    sections: [
      {
        heading: "The request shape",
        body: `Almost every chat provider — OpenAI, Anthropic, Bedrock, Gemini, vLLM, Ollama — accepts the same core structure:

- **model** — which weights to run
- **messages** — a list of \`{role, content}\` dicts with roles \`system\`, \`user\`, \`assistant\`
- **temperature** — 0 for deterministic extraction, 0.7+ for creative writing
- **max_tokens** — cap on the response length

The response carries the text plus a \`usage\` block with \`prompt_tokens\` and \`completion_tokens\`. That usage block is what your finance team eventually asks about, so log it from day one.

Set \`temperature=0\` for anything you parse programmatically. Creative sampling in an extraction pipeline produces intermittent, unreproducible failures.`,
      },
      {
        heading: "Structured output",
        body: `Do not regex free-form prose. Ask for JSON and validate it.

Three layers of reliability, in order of strength:

1. Ask for JSON in the prompt and \`json.loads\` the result.
2. Use the provider's JSON mode or schema-constrained decoding.
3. Validate against a pydantic model and retry once on failure with the validation error fed back in.

Always wrap parsing in \`try/except json.JSONDecodeError\`. Models occasionally wrap JSON in markdown fences — strip those before parsing.`,
      },
      {
        heading: "Tokens, cost, and safety",
        body: `Tokens are sub-word pieces. English averages roughly four characters per token, so \`len(text) / 4\` is a workable estimate when \`tiktoken\` is not available.

Cost is \`(prompt_tokens * input_price + completion_tokens * output_price) / 1000\`. Long retrieved contexts are usually the expensive part, not the answer.

Four production habits:

- Set an explicit **timeout** on every call — the default of "forever" will hang your service.
- **Retry** 429 and 5xx with backoff; never retry a 400 or 401.
- **Cache** identical prompts; repeated identical questions are common and free to serve from a cache.
- **Truncate** context to a token budget before sending, or you will hit context-limit errors in production, not in testing.`,
      },
    ],
    examples: [
      {
        title: "Build and inspect a request payload",
        note: "Runs here — this is the exact JSON an OpenAI-compatible endpoint expects.",
        code: `import json

def build_request(question, context, model="gpt-4.1-mini"):
    return {
        "model": model,
        "temperature": 0,
        "max_tokens": 300,
        "messages": [
            {"role": "system", "content": "Answer only from the context. If missing, say you do not know."},
            {"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {question}"},
        ],
    }

payload = build_request("What is MLOps?", "MLOps is the practice of running ML in production.")
print(json.dumps(payload, indent=2))
print("estimated prompt tokens:", sum(len(m["content"]) for m in payload["messages"]) // 4)`,
      },
      {
        title: "Parse structured JSON output defensively",
        note: "Models sometimes wrap JSON in markdown fences. Strip, parse, validate.",
        code: `import json

def parse_model_json(raw, required_keys):
    text = raw.strip()
    if text.startswith("\`\`\`"):
        lines = [ln for ln in text.splitlines() if not ln.startswith("\`\`\`")]
        text = "\\n".join(lines)
    try:
        data = json.loads(text)
    except json.JSONDecodeError as err:
        raise ValueError(f"model did not return valid JSON: {err}") from err
    missing = [k for k in required_keys if k not in data]
    if missing:
        raise ValueError(f"missing keys: {missing}")
    return data

good = '\`\`\`json\\n{"sentiment": "positive", "confidence": 0.92}\\n\`\`\`'
print(parse_model_json(good, ["sentiment", "confidence"]))

bad = "Sure! The sentiment is positive."
try:
    parse_model_json(bad, ["sentiment"])
except ValueError as err:
    print("rejected:", err)`,
      },
      {
        title: "Token estimate and cost calculator",
        note: "Swap in tiktoken locally for exact counts; this estimate is close enough for budgeting.",
        code: `PRICES_PER_1K = {
    "gpt-4.1-mini": {"input": 0.00015, "output": 0.0006},
    "gpt-4.1":      {"input": 0.002,   "output": 0.008},
}

def estimate_tokens(text):
    return max(1, len(text) // 4)

def estimate_cost(model, prompt, completion):
    price = PRICES_PER_1K[model]
    p_tokens = estimate_tokens(prompt)
    c_tokens = estimate_tokens(completion)
    cost = (p_tokens * price["input"] + c_tokens * price["output"]) / 1000
    return p_tokens, c_tokens, cost

context = "Retrieved context. " * 200
prompt = f"{context}\\n\\nQuestion: summarize the above."
answer = "The context repeats a placeholder sentence about retrieval."

for model in PRICES_PER_1K:
    p, c, cost = estimate_cost(model, prompt, answer)
    print(f"{model:14s} prompt={p:5d} completion={c:3d} cost=\${cost:.6f}")

print("monthly at 100k calls (mini):", round(estimate_cost("gpt-4.1-mini", prompt, answer)[2] * 100_000, 2), "USD")`,
      },
      {
        title: "Production client with timeout, retry, and cache (run locally)",
        note: "Copy into your project. pip install openai. Key comes from the environment.",
        code: `# pip install openai
import functools
import json
import os
import time
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"], timeout=30.0)

RETRYABLE = (429, 500, 502, 503, 504)

@functools.lru_cache(maxsize=512)
def ask(question: str, context: str = "", model: str = "gpt-4.1-mini") -> str:
    messages = [
        {"role": "system", "content": "Answer only from the context."},
        {"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {question}"},
    ]
    for attempt in range(4):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0,
                max_tokens=500,
            )
            usage = response.usage
            print(json.dumps({
                "event": "llm_call",
                "model": model,
                "prompt_tokens": usage.prompt_tokens,
                "completion_tokens": usage.completion_tokens,
            }))
            return response.choices[0].message.content
        except Exception as err:
            status = getattr(err, "status_code", None)
            if status not in RETRYABLE or attempt == 3:
                raise
            time.sleep(2 ** attempt)
    raise RuntimeError("unreachable")`,
      },
    ],
    tryIt: {
      title: "Fit context into a token budget",
      hint: "Lower max_context_tokens to 60 and watch chunks get dropped.",
      starter: `def estimate_tokens(text):
    return max(1, len(text) // 4)

chunks = [
    "MLOps covers deployment, monitoring, and retraining of models.",
    "LLMOps adds prompt versioning, evaluation, and token cost control.",
    "RAG retrieves relevant chunks before the model generates an answer.",
    "Agents call tools in a loop until a goal is reached.",
    "Guardrails validate inputs and outputs before they reach users.",
]

max_context_tokens = 40
used = 0
selected = []

for chunk in chunks:
    cost = estimate_tokens(chunk)
    if used + cost > max_context_tokens:
        print("skip (budget):", chunk[:35], "...")
        continue
    selected.append(chunk)
    used += cost

print("---")
print("chunks used:", len(selected), "of", len(chunks))
print("tokens used:", used, "of", max_context_tokens)
print("context:\\n" + "\\n".join(f"- {c}" for c in selected))`,
    },
    takeaways: [
      "Every provider takes the same core payload: model, messages, temperature, max_tokens.",
      "Use temperature=0 and validate JSON whenever you parse the output programmatically.",
      "Always set timeouts, retry only transient errors, log usage, and budget context tokens.",
    ],
  },
  {
    slug: "numpy-to-pytorch",
    title: "From NumPy to PyTorch tensors",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 20,
    summary:
      "Tensors, autograd, and a training loop — the Python patterns behind every model you will fine-tune.",
    whyForAi:
      "PyTorch is the default framework for training and fine-tuning. A tensor is a NumPy array that also tracks gradients and can live on a GPU. Once you can read a training loop, model code stops being intimidating.",
    packages: ["numpy"],
    sections: [
      {
        heading: "Tensors are arrays with two extras",
        body: `A PyTorch tensor behaves like a NumPy array — same shapes, same broadcasting, same indexing — plus two capabilities:

1. **Device placement**: \`tensor.to("cuda")\` moves data to a GPU.
2. **Autograd**: with \`requires_grad=True\`, PyTorch records operations and computes gradients by calling \`.backward()\`.

Conversion is cheap: \`torch.from_numpy(arr)\` and \`tensor.numpy()\`. On CPU they can share memory, so modifying one changes the other.

The error you will meet most: **"Expected all tensors to be on the same device"**. Your model is on the GPU and your batch is still on the CPU. Move both.`,
      },
      {
        heading: "The training loop, every time",
        body: `Five steps repeated for each batch:

1. \`optimizer.zero_grad()\` — clear old gradients (forget this and gradients accumulate, which silently ruins training)
2. \`outputs = model(inputs)\` — forward pass
3. \`loss = criterion(outputs, targets)\` — measure the error
4. \`loss.backward()\` — compute gradients
5. \`optimizer.step()\` — update weights

At inference wrap the forward pass in \`with torch.no_grad():\` and call \`model.eval()\`. Skipping \`no_grad\` wastes memory tracking gradients you never use; skipping \`eval()\` leaves dropout and batch-norm in training mode and gives wrong predictions.`,
      },
      {
        heading: "Gradient descent, demystified",
        body: `Training is: guess parameters, measure the error, nudge parameters in the direction that reduces the error, repeat.

The gradient is the slope of the loss with respect to each parameter. The learning rate controls the step size — too large and the loss diverges, too small and training crawls.

PyTorch is not available in this browser sandbox, so the runnable example below implements gradient descent in pure NumPy. The mechanics are identical; PyTorch just computes the derivatives for you.`,
      },
    ],
    examples: [
      {
        title: "Gradient descent in NumPy",
        note: "Runs here. Fits y = 3x + 2 from scratch — this is what .backward() automates.",
        code: `import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(-1, 1, size=(200, 1)).astype(np.float32)
y = 3.0 * x + 2.0 + rng.normal(0, 0.05, size=(200, 1)).astype(np.float32)

w = np.zeros((1, 1), dtype=np.float32)
b = np.zeros((1,), dtype=np.float32)
lr = 0.5

for epoch in range(1, 61):
    pred = x @ w + b
    error = pred - y
    loss = float((error ** 2).mean())

    grad_w = 2.0 * (x.T @ error) / len(x)
    grad_b = 2.0 * error.mean(axis=0)

    w -= lr * grad_w
    b -= lr * grad_b

    if epoch % 15 == 0:
        print(f"epoch {epoch:3d} loss={loss:.5f} w={w[0, 0]:.3f} b={b[0]:.3f}")

print("learned: y =", round(float(w[0, 0]), 2), "* x +", round(float(b[0]), 2))`,
      },
      {
        title: "The PyTorch equivalent (run locally)",
        note: "Same maths, autograd handles the derivatives. pip install torch.",
        code: `# pip install torch
import torch
import torch.nn as nn

torch.manual_seed(0)
x = torch.rand(200, 1) * 2 - 1
y = 3.0 * x + 2.0 + torch.randn(200, 1) * 0.05

model = nn.Linear(1, 1)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

for epoch in range(1, 61):
    optimizer.zero_grad()
    pred = model(x)
    loss = criterion(pred, y)
    loss.backward()
    optimizer.step()
    if epoch % 15 == 0:
        print(f"epoch {epoch:3d} loss={loss.item():.5f}")

print("weight:", model.weight.item(), "bias:", model.bias.item())

model.eval()
with torch.no_grad():
    print("prediction at x=0.5:", model(torch.tensor([[0.5]])).item())`,
      },
      {
        title: "A model class and a device-safe loop (run locally)",
        note: "nn.Module subclass plus the .to(device) pattern that avoids device mismatch errors.",
        code: `# pip install torch
import torch
import torch.nn as nn

class Classifier(nn.Module):
    def __init__(self, in_features=768, hidden=256, n_classes=3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(hidden, n_classes),
        )

    def forward(self, x):
        return self.net(x)

device = "cuda" if torch.cuda.is_available() else "cpu"
model = Classifier().to(device)
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
criterion = nn.CrossEntropyLoss()

def train_one_epoch(loader):
    model.train()
    total = 0.0
    for inputs, targets in loader:
        inputs, targets = inputs.to(device), targets.to(device)
        optimizer.zero_grad()
        loss = criterion(model(inputs), targets)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        total += loss.item()
    return total / max(1, len(loader))`,
      },
    ],
    tryIt: {
      title: "Tune the learning rate",
      hint: "Set lr to 2.5 and watch the loss diverge; set it to 0.01 and watch it crawl.",
      starter: `import numpy as np

rng = np.random.default_rng(1)
x = rng.uniform(-1, 1, size=(150, 1)).astype(np.float32)
y = -2.0 * x + 0.5 + rng.normal(0, 0.03, size=(150, 1)).astype(np.float32)

w = np.zeros((1, 1), dtype=np.float32)
b = np.zeros((1,), dtype=np.float32)
lr = 0.3

for epoch in range(1, 41):
    error = (x @ w + b) - y
    loss = float((error ** 2).mean())
    w -= lr * (2.0 * (x.T @ error) / len(x))
    b -= lr * (2.0 * error.mean(axis=0))
    if epoch % 10 == 0:
        print(f"epoch {epoch:3d} loss={loss:.6f}")

print("target: w=-2.0 b=0.5")
print("learned:", f"w={float(w[0, 0]):.3f}", f"b={float(b[0]):.3f}")`,
    },
    takeaways: [
      "A tensor is a NumPy array plus device placement and autograd.",
      "zero_grad, forward, loss, backward, step — the five lines of every training loop.",
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
      "Chunk, embed, retrieve, rank, and assemble a grounded prompt — the whole retrieval pipeline with no frameworks.",
    whyForAi:
      "RAG is the most common GenAI system in production. LangChain and LlamaIndex hide these five steps; building them once means you can debug bad retrieval, tune chunk size, and explain the design in an interview.",
    packages: ["numpy"],
    sections: [
      {
        heading: "The five steps",
        body: `1. **Chunk** documents into passages that fit a context window.
2. **Embed** each chunk into a vector.
3. **Index** the vectors (a NumPy matrix here, FAISS or pgvector in production).
4. **Retrieve** the top-k most similar chunks for a query.
5. **Assemble** a prompt containing only those chunks, and generate.

When RAG gives bad answers, the failure is almost always in steps 1 to 4 — not the model. Print the retrieved chunks before blaming the LLM. That single habit resolves most RAG debugging.`,
      },
      {
        heading: "Chunking is a real decision",
        body: `Too small and a chunk loses the context that makes it meaningful. Too large and you waste tokens and dilute the embedding.

Practical starting point: **400 to 800 tokens with 10 to 15 percent overlap**. Overlap prevents an answer being split across a boundary.

Split on structure first — paragraphs, markdown headings, code blocks — then by size. Splitting mid-sentence produces embeddings that match nothing.

Keep metadata with each chunk: source document, page, section, and timestamp. Users ask "where did that come from", and answers without citations do not get trusted.`,
      },
      {
        heading: "Retrieval quality",
        body: `Pure vector search misses exact terms — error codes, product SKUs, function names. **Hybrid search** combines keyword (BM25) with vector similarity and usually beats either alone.

A **reranker** (a cross-encoder) rescores the top 20 candidates and keeps the best 4. Slower per document, much more accurate, and worth it when the answer quality matters.

Set a **similarity floor**. If the best score is below it, answer "I do not have that information" instead of stuffing irrelevant context into the prompt. Confidently wrong answers cost more trust than admitting a gap.`,
      },
    ],
    examples: [
      {
        title: "Chunk with overlap and metadata",
        note: "Word-based chunking keeps sentences intact better than character slicing.",
        code: `def chunk_document(text, doc_id, words_per_chunk=12, overlap=3):
    words = text.split()
    step = words_per_chunk - overlap
    chunks = []
    for start in range(0, len(words), step):
        piece = words[start:start + words_per_chunk]
        if not piece:
            break
        chunks.append({
            "doc_id": doc_id,
            "chunk_id": f"{doc_id}-{len(chunks)}",
            "text": " ".join(piece),
        })
        if start + words_per_chunk >= len(words):
            break
    return chunks

doc = ("MLOps is the practice of deploying and maintaining machine learning models in production. "
       "It covers CI/CD, monitoring, retraining, and governance for model systems.")

for chunk in chunk_document(doc, "mlops-intro"):
    print(chunk["chunk_id"], "|", chunk["text"])`,
      },
      {
        title: "A complete retrieval pipeline",
        note: "Deterministic hashing stands in for a real embedding model — the pipeline shape is identical.",
        code: `import numpy as np

VOCAB = ["mlops", "llmops", "rag", "python", "kubernetes", "monitoring",
         "retrieval", "model", "production", "agents", "vector", "prompt"]

def embed(text):
    vec = np.zeros(len(VOCAB), dtype=np.float32)
    words = text.lower().replace(",", " ").replace(".", " ").split()
    for word in words:
        if word in VOCAB:
            vec[VOCAB.index(word)] += 1.0
    norm = np.linalg.norm(vec)
    return vec / norm if norm > 0 else vec

corpus = [
    {"id": "c1", "text": "MLOps handles model deployment monitoring and production reliability"},
    {"id": "c2", "text": "RAG uses retrieval to ground a prompt in your own documents"},
    {"id": "c3", "text": "Kubernetes runs containers and scales model serving workloads"},
    {"id": "c4", "text": "LLMOps adds prompt versioning and evaluation for production agents"},
]

matrix = np.vstack([embed(c["text"]) for c in corpus])

def retrieve(query, top_k=2, floor=0.15):
    scores = matrix @ embed(query)
    order = np.argsort(-scores)[:top_k]
    return [
        {**corpus[i], "score": float(scores[i])}
        for i in order
        if scores[i] >= floor
    ]

for query in ["how do I ground a prompt in documents", "scaling model serving"]:
    print("query:", query)
    hits = retrieve(query)
    if not hits:
        print("  no confident match — answer: I do not know")
    for hit in hits:
        print(f"  {hit['id']} score={hit['score']:.3f} :: {hit['text'][:50]}")
    print()`,
      },
      {
        title: "Assemble a grounded prompt with citations",
        note: "Numbered sources plus an explicit refusal instruction — this is what reduces hallucination.",
        code: `def build_rag_prompt(question, chunks):
    if not chunks:
        return None
    sources = "\\n\\n".join(
        f"[{i}] (source: {c['id']})\\n{c['text']}"
        for i, c in enumerate(chunks, start=1)
    )
    return (
        "You are a precise assistant.\\n"
        "Answer using ONLY the numbered sources below.\\n"
        "Cite sources inline like [1].\\n"
        "If the sources do not contain the answer, reply exactly: I do not know.\\n\\n"
        f"SOURCES:\\n{sources}\\n\\n"
        f"QUESTION: {question}\\n"
        "ANSWER:"
    )

chunks = [
    {"id": "c2", "text": "RAG uses retrieval to ground a prompt in your own documents."},
    {"id": "c4", "text": "LLMOps adds prompt versioning and evaluation."},
]
prompt = build_rag_prompt("What is RAG?", chunks)
print(prompt)
print("\\nprompt chars:", len(prompt), "| est. tokens:", len(prompt) // 4)`,
      },
      {
        title: "Hybrid search: keyword plus vector",
        note: "Weighted blend. Keyword catches exact terms that embeddings miss.",
        code: `import numpy as np

corpus = [
    "error code E1042 means the model server ran out of GPU memory",
    "vector databases store embeddings for semantic retrieval",
    "the training job failed because the batch size was too large",
]

def keyword_score(query, text):
    q = set(query.lower().split())
    t = set(text.lower().split())
    return len(q & t) / max(1, len(q))

def vector_score(query, text):
    q = set(query.lower().split())
    t = set(text.lower().split())
    return len(q & t) / max(1, len(q | t))

query = "E1042 GPU memory"
alpha = 0.6

ranked = sorted(
    (
        (alpha * keyword_score(query, doc) + (1 - alpha) * vector_score(query, doc), doc)
        for doc in corpus
    ),
    reverse=True,
)
for score, doc in ranked:
    print(f"{score:.3f}  {doc[:60]}")`,
      },
    ],
    tryIt: {
      title: "Run the full pipeline end to end",
      hint: "Change the query, or drop the floor to 0.05 and see weaker matches appear.",
      starter: `import numpy as np

VOCAB = ["python", "mlops", "rag", "agents", "docker", "monitoring",
         "vector", "prompt", "training", "deployment", "evaluation"]

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
    {"id": "d4", "text": "evaluation and monitoring keep agents reliable"},
]
matrix = np.vstack([embed(c["text"]) for c in corpus])

query = "how does rag build a prompt"
floor = 0.2
top_k = 2

scores = matrix @ embed(query)
hits = [
    {**corpus[i], "score": float(scores[i])}
    for i in np.argsort(-scores)[:top_k]
    if scores[i] >= floor
]

print("query:", query)
for h in hits:
    print(f"  {h['id']} score={h['score']:.3f} :: {h['text']}")

if hits:
    sources = "\\n".join(f"[{i}] {h['text']}" for i, h in enumerate(hits, start=1))
    print("\\nPROMPT\\n------")
    print(f"Use only these sources:\\n{sources}\\n\\nQuestion: {query}")
else:
    print("no confident match — respond: I do not know")`,
    },
    takeaways: [
      "RAG is chunk, embed, index, retrieve, assemble — debug retrieval before blaming the model.",
      "Chunk on structure with overlap, and always keep source metadata for citations.",
      "Use a similarity floor and hybrid search; refuse to answer when nothing is relevant.",
    ],
  },
  {
    slug: "fastapi-model-service",
    title: "Serving models with FastAPI",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 22,
    summary:
      "Turn a model or RAG pipeline into a validated, documented, containerized HTTP service.",
    whyForAi:
      "A model in a notebook has no business value. FastAPI is the standard way Python teams expose inference — request validation from type hints, automatic OpenAPI docs, and async support for concurrent LLM calls.",
    packages: [],
    sections: [
      {
        heading: "Why FastAPI",
        body: `You write a pydantic model for the request; FastAPI validates it and returns a clear 422 on bad input before your code runs. It generates interactive docs at \`/docs\` for free, and \`async def\` endpoints handle many concurrent LLM calls on one worker.

The critical pattern: **load the model once at startup**, not per request. Loading a transformer inside the handler adds seconds to every call and exhausts memory. Use the lifespan context manager and keep the model in application state.`,
      },
      {
        heading: "Endpoints every service needs",
        body: `- \`GET /health\` — liveness. Returns 200 if the process is up. Kubernetes restarts the pod when this fails.
- \`GET /ready\` — readiness. Returns 200 only when the model is loaded. Keeps traffic away until you can actually serve.
- \`POST /predict\` or \`/chat\` — the real work.
- \`GET /metrics\` — Prometheus scrape endpoint for latency, throughput, and errors.

Return proper status codes: 400 for bad input, 404 for missing resources, 429 when rate limited, 503 when a dependency is down. Never return 200 with an error message inside — monitoring cannot see it.`,
      },
      {
        heading: "Deployment shape",
        body: `Run with \`uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4\`. Rough sizing: workers equal to CPU cores for CPU inference; **one worker per GPU** for GPU inference, since each worker loads its own copy of the model.

Containerize with a slim base image, install pinned requirements, copy the code, expose the port, and add a \`HEALTHCHECK\`. Run as a non-root user.

Set request timeouts, cap the maximum request body size, and add a rate limit. Log a request id, model version, latency, and token counts on every call — that is what you will need when someone reports the service was slow last Tuesday.`,
      },
    ],
    examples: [
      {
        title: "A complete FastAPI service (run locally)",
        note: "pip install fastapi uvicorn pydantic, then: uvicorn app:app --reload",
        code: `# app.py — pip install fastapi uvicorn pydantic
import logging
import time
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("service")

STATE = {"model": None, "ready": False}

def load_model():
    time.sleep(0.5)          # stand-in for real model loading
    return lambda text: {"label": "positive" if "good" in text.lower() else "neutral"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("loading model...")
    STATE["model"] = load_model()
    STATE["ready"] = True
    yield
    STATE["model"] = None
    STATE["ready"] = False

app = FastAPI(title="Inference API", version="1.0.0", lifespan=lifespan)

class PredictRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    threshold: float = Field(default=0.5, ge=0.0, le=1.0)

class PredictResponse(BaseModel):
    request_id: str
    label: str
    latency_ms: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/ready")
def ready():
    if not STATE["ready"]:
        raise HTTPException(status_code=503, detail="model not loaded")
    return {"status": "ready"}

@app.post("/predict", response_model=PredictResponse)
async def predict(payload: PredictRequest, request: Request):
    if not STATE["ready"]:
        raise HTTPException(status_code=503, detail="model not loaded")
    request_id = request.headers.get("x-request-id", str(uuid.uuid4()))
    start = time.perf_counter()
    result = STATE["model"](payload.text)
    latency_ms = (time.perf_counter() - start) * 1000
    logger.info("predict request_id=%s chars=%d latency_ms=%.1f",
                request_id, len(payload.text), latency_ms)
    return PredictResponse(request_id=request_id, label=result["label"], latency_ms=latency_ms)`,
      },
      {
        title: "Dockerfile",
        note: "Slim base, pinned deps, non-root user, healthcheck.",
        code: `# Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends curl \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --create-home appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD curl -fsS http://localhost:8000/health || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`,
      },
      {
        title: "Request validation logic (runs here)",
        note: "The same rules pydantic enforces, written by hand so you can see the checks.",
        code: `def validate_request(payload):
    errors = []
    text = payload.get("text")
    if not isinstance(text, str) or not text.strip():
        errors.append("text: must be a non-empty string")
    elif len(text) > 5000:
        errors.append("text: exceeds 5000 characters")

    threshold = payload.get("threshold", 0.5)
    try:
        threshold = float(threshold)
        if not 0.0 <= threshold <= 1.0:
            errors.append("threshold: must be between 0 and 1")
    except (TypeError, ValueError):
        errors.append("threshold: must be a number")

    if errors:
        return {"status": 422, "errors": errors}
    return {"status": 200, "text": text.strip(), "threshold": threshold}

for payload in [
    {"text": "This service is good", "threshold": 0.7},
    {"text": "   "},
    {"text": "ok", "threshold": 5},
]:
    print(payload, "->", validate_request(payload))`,
      },
      {
        title: "Client with retry (run locally)",
        note: "How another service should call yours: timeout, retry on 5xx, never on 4xx.",
        code: `# pip install requests
import requests
import time

def call_predict(text, url="http://localhost:8000/predict", attempts=3):
    for attempt in range(attempts):
        try:
            response = requests.post(url, json={"text": text}, timeout=10)
            if response.status_code >= 500:
                raise requests.HTTPError(f"server error {response.status_code}")
            response.raise_for_status()
            return response.json()
        except (requests.Timeout, requests.HTTPError) as err:
            if attempt == attempts - 1:
                raise
            wait = 2 ** attempt
            print(f"retry in {wait}s after: {err}")
            time.sleep(wait)

# print(call_predict("this product is good"))`,
      },
    ],
    tryIt: {
      title: "Simulate the request lifecycle",
      hint: "Add a request that exceeds the length limit and confirm it returns 422.",
      starter: `import time
import uuid

MODEL_READY = True

def handle(payload):
    request_id = str(uuid.uuid4())[:8]
    start = time.perf_counter()

    if not MODEL_READY:
        return {"status": 503, "request_id": request_id, "detail": "model not loaded"}

    text = payload.get("text", "")
    if not text.strip():
        return {"status": 422, "request_id": request_id, "detail": "text is required"}
    if len(text) > 100:
        return {"status": 422, "request_id": request_id, "detail": "text too long"}

    label = "positive" if "good" in text.lower() else "neutral"
    latency_ms = (time.perf_counter() - start) * 1000
    return {
        "status": 200,
        "request_id": request_id,
        "label": label,
        "latency_ms": round(latency_ms, 3),
    }

for payload in [{"text": "the training was good"}, {"text": ""}, {"text": "x" * 150}]:
    result = handle(payload)
    print(result["status"], "|", result)`,
    },
    takeaways: [
      "Load the model once at startup with lifespan — never inside the request handler.",
      "Ship /health and /ready separately so orchestrators route traffic correctly.",
      "Validate with pydantic, return real status codes, and log request id plus latency.",
    ],
  },
  {
    slug: "production-python-checklist",
    title: "Production Python for AI teams",
    moduleId: "genai-production",
    level: "advanced",
    minutes: 20,
    summary:
      "Tooling, project structure, CI, and the habits that separate a demo from a system people depend on.",
    whyForAi:
      "The gap between a notebook that works and a service on call is process: formatting, linting, typing, tests, pinned dependencies, and reproducible runs. Interviewers probe this because it is what actually breaks in production.",
    packages: [],
    sections: [
      {
        heading: "The toolchain",
        body: `Four tools cover most of it:

| Tool | Purpose |
| --- | --- |
| **ruff** | Lint and format, extremely fast, replaces flake8/isort/black |
| **mypy** | Static type checking against your hints |
| **pytest** | Tests, fixtures, parametrization |
| **uv** or **poetry** | Dependency resolution and lockfiles |

Add **pre-commit** so these run before code is committed rather than after review. Configure them in \`pyproject.toml\` so the editor, CLI, and CI all read one source of truth. Arguments about formatting disappear when a tool decides.`,
      },
      {
        heading: "Reproducibility",
        body: `An ML result you cannot reproduce is an anecdote. Five things to control:

1. **Pin dependencies** with a committed lockfile.
2. **Seed** every random source: Python, NumPy, and the framework.
3. **Version data**, not just code — DVC, or at minimum a dataset hash recorded with the run.
4. **Log the config** for every run: hyperparameters, data version, git commit.
5. **Track experiments** with MLflow or Weights & Biases so results are comparable months later.

For LLM systems add: prompt version, model version, and temperature. "The model got worse" is unanswerable unless you know which prompt and which model version produced last week's output.`,
      },
      {
        heading: "Performance, when it matters",
        body: `Profile before optimizing. \`cProfile\` for a whole script, \`time.perf_counter\` for a block. Optimizing the wrong function is the most common wasted week in ML engineering.

Usual wins in order: **vectorize** instead of looping, **batch** API and GPU calls, **cache** repeated work, then reach for concurrency. Rewriting in a faster language is almost never the first answer.

Memory: stream with generators rather than building giant lists, use \`float32\` instead of \`float64\`, and delete large intermediates. Out-of-memory kills in a container are usually a data-loading pattern, not the model.`,
      },
      {
        heading: "Habits that compound",
        body: `- Write the function signature and its test before the body.
- Small pull requests. A 2000-line PR gets a rubber stamp, not a review.
- Log the event and the context, never a bare "error occurred".
- Delete dead code — the repository is not an archive; git already is one.
- Write the README as you build: what it does, how to run it, how to test it.
- Read the source of the libraries you depend on. It is ordinary Python, and the answer is usually there.`,
      },
    ],
    examples: [
      {
        title: "pyproject.toml for tooling",
        note: "One config file that ruff, mypy, and pytest all read.",
        code: `# pyproject.toml
[project]
name = "ai-service"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "fastapi==0.115.5",
    "uvicorn==0.32.1",
    "pydantic==2.10.3",
    "numpy==2.1.3",
    "pandas==2.2.3",
]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP", "SIM"]

[tool.mypy]
python_version = "3.11"
warn_unused_ignores = true
disallow_untyped_defs = true
ignore_missing_imports = true

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-q --strict-markers"`,
      },
      {
        title: "GitHub Actions CI",
        note: "Lint, type-check, and test on every push. Cheap insurance.",
        code: `# .github/workflows/ci.yml
name: ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip
      - run: pip install -r requirements.txt -r requirements-dev.txt
      - run: ruff check .
      - run: ruff format --check .
      - run: mypy src
      - run: pytest --cov=src --cov-report=term-missing`,
      },
      {
        title: "Seed everything for reproducibility",
        note: "Runs here with NumPy. Add the torch lines in a real training script.",
        code: `import os
import random

import numpy as np

def set_seed(seed: int = 42) -> None:
    os.environ["PYTHONHASHSEED"] = str(seed)
    random.seed(seed)
    np.random.seed(seed)
    # torch.manual_seed(seed)
    # torch.cuda.manual_seed_all(seed)
    # torch.backends.cudnn.deterministic = True

set_seed(42)
first = [random.random(), float(np.random.rand())]

set_seed(42)
second = [random.random(), float(np.random.rand())]

print("run 1:", [round(v, 6) for v in first])
print("run 2:", [round(v, 6) for v in second])
print("reproducible:", first == second)`,
      },
      {
        title: "Profile before you optimize",
        note: "Measure first. The slow part is rarely where you assume.",
        code: `import time
from contextlib import contextmanager

@contextmanager
def timer(label):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label:14s} {(time.perf_counter() - start) * 1000:7.2f} ms")

data = [f"document number {i}" for i in range(50_000)]

with timer("naive concat"):
    joined = ""
    for d in data[:5000]:
        joined += d

with timer("str.join"):
    joined = "".join(data[:5000])

with timer("list comp"):
    lengths = [len(d) for d in data]

with timer("sum builtin"):
    total = sum(len(d) for d in data)

print("total chars:", total)`,
      },
      {
        title: "Run manifest for every experiment",
        note: "Log config, data version, and git commit — future you needs this.",
        code: `import json
import hashlib
from datetime import datetime, timezone

def data_fingerprint(rows):
    payload = json.dumps(rows, sort_keys=True).encode()
    return hashlib.sha256(payload).hexdigest()[:12]

rows = [{"text": "sample a", "label": 1}, {"text": "sample b", "label": 0}]

manifest = {
    "run_id": "exp-2026-09-03-01",
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "git_commit": "a1b2c3d",
    "config": {"model": "bert-base", "epochs": 3, "lr": 2e-5, "seed": 42},
    "data": {"n_rows": len(rows), "fingerprint": data_fingerprint(rows)},
    "metrics": {"accuracy": 0.913, "f1": 0.897},
}
print(json.dumps(manifest, indent=2))`,
      },
    ],
    tryIt: {
      title: "Score your own project",
      hint: "Set your real answers to True or False and see where the gaps are.",
      starter: `checklist = {
    "dependencies pinned in a lockfile": True,
    "ruff or black formatting enforced": True,
    "type hints on public functions": False,
    "tests run in CI on every PR": False,
    "seeds set for reproducibility": True,
    "secrets loaded from environment": True,
    "structured logs with request ids": False,
    "health and ready endpoints": False,
    "experiment tracking (MLflow / W&B)": False,
    "README with run and test steps": True,
}

done = [k for k, v in checklist.items() if v]
todo = [k for k, v in checklist.items() if not v]

print(f"score: {len(done)}/{len(checklist)}")
print("\\nin place:")
for item in done:
    print("  +", item)
print("\\nnext up:")
for item in todo:
    print("  -", item)`,
    },
    takeaways: [
      "ruff, mypy, pytest, and a lockfile in pre-commit and CI cover most quality problems.",
      "Reproducibility needs pinned deps, seeds, versioned data, and a logged config per run.",
      "Profile before optimizing; vectorize and batch before reaching for concurrency.",
    ],
  },
];
