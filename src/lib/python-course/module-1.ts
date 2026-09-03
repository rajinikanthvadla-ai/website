import type { PythonLesson } from "./types";

export const MODULE_1_LESSONS: PythonLesson[] = [
  {
    slug: "why-python-for-ai",
    title: "Why Python for AI, ML, and GenAI",
    moduleId: "foundations",
    level: "beginner",
    minutes: 12,
    summary:
      "Start here. See why Python is the default language for machine learning and generative AI, how this course is organised, and run your first program in the on-site compiler.",
    whyForAi:
      "Job descriptions for ML engineers, GenAI engineers, MLOps, and LLMOps almost always list Python first. PyTorch, Hugging Face, LangChain, FastAPI, pandas, and most RAG tooling are Python-native. You will write training scripts, data jobs, APIs, and agent glue in this language.",
    packages: [],
    sections: [
      {
        heading: "What you will learn in this course",
        body: `This is a **free, self-paced Python course** written for people who want to become AI/ML engineers or GenAI engineers — including those starting from zero.

You will move through four modules:

1. **Foundations** — how Python stores values, text, collections, and decisions.
2. **Core language** — functions, files, errors, classes, and how to structure programs.
3. **Data and ML Python** — type hints, NumPy, pandas, tests, and logging.
4. **GenAI and production** — HTTP/JSON, tensor thinking, prompts, FastAPI-style services, RAG building blocks, and production habits.

Every lesson has a short explanation, copy-paste examples, and a **live compiler** so you can run code without installing anything. The compiler is real CPython running in your browser (WebAssembly). It is perfect for learning. Production libraries such as PyTorch and FastAPI are shown as copy-paste examples you run locally later.`,
      },
      {
        heading: "Why teams standardised on Python",
        body: `Python is not the fastest language. Teams use it because **the ecosystem is unmatched** for data and models:

- **NumPy / pandas** for arrays and tables
- **PyTorch / scikit-learn** for training
- **Hugging Face** for models and tokenizers
- **FastAPI** for model and agent APIs
- **LangChain / LangGraph** for LLM apps

Readability matters. An ML pipeline is mostly glue: load data, transform it, call a model, write metrics, expose an endpoint. Clear Python is easier to review, test, and hand to the next engineer.

Three places you will use Python on the job:

| Place | Typical file | What it does |
| --- | --- | --- |
| Research | notebook or \`train.py\` | Experiment and fit a model |
| Service | \`app.py\` / FastAPI | Serve predictions or an LLM |
| Ops | jobs, CI, eval scripts | Data, monitoring, evaluation |`,
      },
      {
        heading: "Your first program",
        body: `Python runs **top to bottom**. \`print()\` writes text to the output. Lines starting with \`#\` are comments and are ignored.

Indentation is syntax, not style. Other languages use braces \`{}\`. Python uses spaces. We will use **four spaces** everywhere. Mixing tabs and spaces causes errors — a common beginner trap.

Names should describe the value: \`learning_rate\` not \`lr1\`. That habit pays off when you read training configs six months later.`,
      },
    ],
    examples: [
      {
        title: "Hello, engineer",
        note: "print() shows values. Comments start with #.",
        code: `# Python runs line by line.
print("Hello, AI engineer")
print("Python is the language of ML, GenAI, and MLOps.")`,
      },
      {
        title: "A tiny config you will see in every training script",
        note: "You are just storing numbers and text in names. Next lesson covers types in detail.",
        code: `model_name = "bert-base-uncased"
batch_size = 32
learning_rate = 0.00002
print("model:", model_name)
print("batch_size:", batch_size)
print("learning_rate:", learning_rate)`,
      },
    ],
    tryIt: {
      title: "Run your first program",
      hint: "Change the role string and press Run. Use Ctrl+Enter as a shortcut.",
      starter: `role = "GenAI engineer"
print("I am learning Python to become a", role)
print(2 + 2)`,
    },
    takeaways: [
      "Python is the shared language of ML training, GenAI apps, and MLOps glue code.",
      "This site includes a real in-browser compiler — use it on every lesson.",
      "print() displays output; # starts a comment; indentation is required.",
    ],
  },
  {
    slug: "variables-types-operators",
    title: "Variables, types, and operators",
    moduleId: "foundations",
    level: "beginner",
    minutes: 18,
    summary:
      "Names, numbers, booleans, and None — the values every hyperparameter, metric, and flag is built from.",
    whyForAi:
      "Learning rates, batch sizes, temperature, max tokens, and confidence thresholds are ordinary Python values. Getting types wrong (string \"0.2\" instead of float 0.2) is a real production bug in config files and LLM API calls.",
    packages: [],
    sections: [
      {
        heading: "Names are labels, not boxes",
        body: `A variable is a **name bound to a value**. Python does not make you declare a type. The value has a type; the name can be rebound later.

\`type(x)\` tells you the type. Use it while learning. In production you will prefer type hints (a later lesson) plus tests.

Common built-in types:

- **int** — whole numbers: \`32\`, \`0\`, \`-1\`
- **float** — decimals: \`0.001\`, \`3.14\`
- **bool** — \`True\` or \`False\` (capital T/F)
- **str** — text (next lesson)
- **None** — “no value”, used for missing optional settings

\`None\` is not the string \`"None"\` and not \`0\`. Model APIs often use \`None\` to mean “use the server default”.`,
      },
      {
        heading: "Operators you will actually use",
        body: `Arithmetic: \`+\` \`-\` \`*\` \`/\` (always float) \`//\` (integer divide) \`%\` (remainder) \`**\` (power).

Comparisons return bools: \`==\` \`!=\` \`<\` \`>\` \`<=\` \`>=\`.

Logic: \`and\`, \`or\`, \`not\`. These show up in filters (“keep rows where score > 0.7 and label is not None”).

Division with \`/\` on two ints still returns a float (\`5 / 2\` is \`2.5\`). Use \`//\` when you need an int index into a list.`,
      },
    ],
    examples: [
      {
        title: "Inspect types",
        note: "type() is a learning tool. Read the output carefully.",
        code: `epochs = 10
learning_rate = 3e-5
enabled = True
api_key = None

print(type(epochs), epochs)
print(type(learning_rate), learning_rate)
print(type(enabled), enabled)
print(type(api_key), api_key)`,
      },
      {
        title: "Thresholds and flags",
        note: "This is the same logic you will write for confidence filtering.",
        code: `score = 0.82
threshold = 0.7
is_confident = score >= threshold
print("confident:", is_confident)

temperature = 0.2
use_greedy = temperature == 0
print("greedy decoding:", use_greedy)`,
      },
      {
        title: "Integer vs float division",
        note: "Batching often needs // to get a whole number of steps.",
        code: `n_samples = 1000
batch_size = 32
n_batches = n_samples // batch_size
leftover = n_samples % batch_size
print("full batches:", n_batches)
print("leftover samples:", leftover)
print("true divide:", n_samples / batch_size)`,
      },
    ],
    tryIt: {
      title: "Practice: learning-rate sanity check",
      hint: "Change learning_rate to 3e-2 and see whether the warning prints.",
      starter: `learning_rate = 3e-5
batch_size = 16
max_tokens = 512

print("lr type:", type(learning_rate).__name__)
print("too high?", learning_rate > 0.01)
print("steps for 1000 rows:", 1000 // batch_size)
print("max_tokens is set:", max_tokens is not None)`,
    },
    takeaways: [
      "Values have types (int, float, bool, None). Names just point at values.",
      "Use / for real division and // when you need a whole number.",
      "True/False/None are capitalized. They are not strings.",
    ],
  },
  {
    slug: "strings-and-text",
    title: "Strings and text",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Text is the raw material of NLP and GenAI. Learn quotes, f-strings, slicing, and the methods you will use on prompts and documents.",
    whyForAi:
      "Prompts, system messages, retrieved chunks, JSON payloads, and log lines are all strings. Token counts correlate with length. Cleaning whitespace and building prompts with f-strings is daily work for GenAI engineers.",
    packages: [],
    sections: [
      {
        heading: "Creating and combining strings",
        body: `Use single or double quotes. For multi-line text (prompts, docs) use triple quotes \`"""..."""\`.

Concatenate with \`+\`, or better, **f-strings**: \`f"Model {name} scored {score:.2f}"\`. F-strings keep prompts readable.

\`len(s)\` is the number of characters, not tokens. Character length is still a useful proxy when you do not have a tokenizer loaded.

Strings are **immutable**. \`s.upper()\` returns a new string; \`s\` does not change unless you assign the result back.`,
      },
      {
        heading: "Slicing, splitting, and stripping",
        body: `Indexing: \`s[0]\` is the first character. \`s[-1]\` is the last. Slices: \`s[0:50]\` is the first 50 characters (end index is exclusive).

\`split()\` breaks on whitespace by default — useful for a crude word count. \`strip()\` removes leading/trailing whitespace, which you should do on every user prompt before sending it to a model.

\`in\` checks substring membership: \`"error" in message.lower()\`.

Escape sequences: \`\\n\` is a newline. In prompts, extra blank lines change model behaviour more than people expect — keep prompt templates tidy.`,
      },
    ],
    examples: [
      {
        title: "F-string prompt template",
        note: "This is the pattern behind most LLM wrappers before you add a library.",
        code: `user_question = "What is MLOps?"
context = "MLOps is how teams deploy and monitor ML models."

prompt = f"""You are a precise assistant.
Use only the context.

Context:
{context}

Question: {user_question}
Answer:"""

print(prompt)
print("---")
print("characters:", len(prompt))`,
      },
      {
        title: "Clean user text before it hits a model",
        note: "strip, lower, and a length guard prevent empty or huge prompts.",
        code: `raw = "   What is RAG?   \\n"
clean = raw.strip()
print(repr(raw))
print(repr(clean))
print("empty?", clean == "")
print("too long?", len(clean) > 4000)
print("words (rough):", len(clean.split()))`,
      },
      {
        title: "Slice a long document into a preview",
        note: "End index is exclusive. Add an ellipsis when truncated.",
        code: `doc = "Retrieval-Augmented Generation grounds an LLM in your own documents."
preview = doc[:40]
print(preview + ("..." if len(doc) > 40 else ""))
print("starts with Retrieval?", doc.startswith("Retrieval"))
print("mentions LLM?", "LLM" in doc)`,
      },
    ],
    tryIt: {
      title: "Build a system + user prompt",
      hint: "Edit the context and question, then print character counts for each part.",
      starter: `system = "You answer only from context. If unsure, say you do not know."
context = "Python is the main language for ML and GenAI stacks."
question = "Why do AI teams use Python?"

prompt = f"{system}\\n\\nContext:\\n{context}\\n\\nUser: {question}"
print(prompt)
print("total chars:", len(prompt))
print("question words:", len(question.split()))`,
    },
    takeaways: [
      "f-strings are the clean way to build prompts and log lines.",
      "strip() user text; len() is characters, not tokens.",
      "Strings never change in place — methods return new strings.",
    ],
  },
  {
    slug: "lists-tuples-sets",
    title: "Lists, tuples, and sets",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Ordered collections and unique sets — how Python stores batches, token ids, labels, and vocabularies.",
    whyForAi:
      "A batch of texts is a list. Token ids are a list of ints. Evaluation labels are lists. A set is the right tool for unique document ids or a stopword list. You will loop these structures in every training and RAG script.",
    packages: [],
    sections: [
      {
        heading: "Lists: the workhorse",
        body: `A list is an ordered, **mutable** sequence: \`docs = ["a", "b"]\`.

- Index: \`docs[0]\`, \`docs[-1]\`
- Slice: \`docs[:2]\` (first two — think “mini batch”)
- Add: \`append\`, \`extend\`
- Length: \`len(docs)\`

Lists can hold mixed types, but in ML code **keep them homogeneous** (all strings, or all floats). Mixed lists become bugs at tensor conversion time.

\`list.append(x)\` returns \`None\`. A classic bug is \`docs = docs.append(x)\`, which wipes the list. Append in place; do not assign the result.`,
      },
      {
        heading: "Tuples and sets",
        body: `A **tuple** is ordered and **immutable**: \`shape = (32, 768)\`. Use tuples for records that should not grow — image size, embedding dim, (train, val, test) split sizes.

A **set** stores unique unordered values: \`seen = {"id-1", "id-2"}\`. Membership tests (\`x in seen\`) are fast. Use sets to drop duplicate retrieved ids in RAG.

Convert: \`set(list_of_ids)\` deduplicates. \`list(the_set)\` if you need order back — but set order is not meaningful, so sort if you need stability: \`sorted(set(ids))\`.`,
      },
    ],
    examples: [
      {
        title: "A mini batch of documents",
        note: "Slicing a list is how you take the first n chunks into a context window.",
        code: `chunks = [
    "Python is used for ML pipelines.",
    "NumPy stores arrays for tensors.",
    "pandas cleans tabular data.",
    "FastAPI serves models.",
]
batch = chunks[:3]
print("batch size:", len(batch))
print("last in batch:", batch[-1])
batch.append("LangChain wires LLM calls.")
print("after append:", len(batch))`,
      },
      {
        title: "Deduplicate retrieved document ids",
        note: "RAG retrievers often return the same chunk twice. Sets fix that.",
        code: `retrieved = ["d1", "d4", "d1", "d9", "d4"]
unique_ids = list(dict.fromkeys(retrieved))  # unique, keep order
print("raw:", retrieved)
print("unique ordered:", unique_ids)
print("as set:", set(retrieved))`,
      },
      {
        title: "Tuple for a tensor-like shape",
        note: "Shapes are tuples in NumPy and PyTorch. Do not use a list for a shape you will not change.",
        code: `batch_size = 8
hidden = 768
shape = (batch_size, hidden)
print("shape:", shape)
print("rank (ndim):", len(shape))
print("total values:", shape[0] * shape[1])`,
      },
    ],
    tryIt: {
      title: "Keep the top-k chunks",
      hint: "Change k and confirm the printed list length matches.",
      starter: `chunks = [
    "MLOps deploys models.",
    "LLMOps serves LLMs.",
    "RAG retrieves documents.",
    "Agents call tools.",
    "Eval measures quality.",
]
k = 3
top_k = chunks[:k]
print("using", len(top_k), "chunks")
for i, text in enumerate(top_k, start=1):
    print(f"{i}. {text}")`,
    },
    takeaways: [
      "Lists are ordered and mutable — batches, token lists, labels.",
      "Never assign the result of append(); it returns None.",
      "Sets drop duplicates; tuples hold fixed records like shapes.",
    ],
  },
  {
    slug: "dictionaries",
    title: "Dictionaries",
    moduleId: "foundations",
    level: "beginner",
    minutes: 18,
    summary:
      "Key–value maps are how Python represents JSON, API payloads, model configs, and metadata.",
    whyForAi:
      "Every LLM HTTP request is a dict that becomes JSON: model, messages, temperature. Hugging Face model cards, MLflow params, and feature rows are dicts. If you can navigate nested dicts, you can work with real APIs.",
    packages: [],
    sections: [
      {
        heading: "Keys, values, and safe lookup",
        body: `A dict maps keys to values: \`config = {"model": "gpt-4.1-mini", "temperature": 0.2}\`.

Keys are usually strings. Values can be anything, including lists and other dicts (nested JSON).

- Read: \`config["model"]\` raises \`KeyError\` if missing
- Safe read: \`config.get("top_p", 1.0)\` returns the default
- Write: \`config["max_tokens"] = 256\`
- Check: \`"model" in config\`

Prefer \`.get()\` for optional API fields. Prefer \`["key"]\` when the key **must** exist — failing loudly is better than silently using the wrong default in a training job.`,
      },
      {
        heading: "Looping and nesting",
        body: `\`config.items()\` gives \`(key, value)\` pairs. \`config.keys()\` and \`config.values()\` exist too.

Nested access: \`payload["messages"][0]["content"]\`. Walk one level at a time when debugging.

Building JSON-ready dicts is a core GenAI skill. Keep structures close to the API you call so you are not translating shapes in three places.`,
      },
    ],
    examples: [
      {
        title: "An LLM request body",
        note: "This is the shape OpenAI-style APIs expect, before json.dumps.",
        code: `request = {
    "model": "gpt-4.1-mini",
    "temperature": 0.2,
    "messages": [
        {"role": "system", "content": "You are concise."},
        {"role": "user", "content": "Define RAG in one sentence."},
    ],
}
print(request["model"])
print(request["messages"][-1]["content"])
print("top_p" in request)
print("top_p default:", request.get("top_p", 1.0))`,
      },
      {
        title: "Metrics dict (what you log to MLflow-style tracking)",
        note: "Keep metric names stable so dashboards do not fragment.",
        code: `metrics = {"accuracy": 0.91, "latency_ms": 128, "tokens_in": 412}
metrics["latency_ms"] = 141
for name, value in metrics.items():
    print(f"{name}={value}")`,
      },
      {
        title: "Merge default config with overrides",
        note: "{**defaults, **overrides} is a common pattern for experiment configs.",
        code: `defaults = {"epochs": 3, "lr": 2e-5, "fp16": True}
overrides = {"lr": 1e-5, "run_name": "exp-12"}
config = {**defaults, **overrides}
print(config)`,
      },
    ],
    tryIt: {
      title: "Read a nested chat payload",
      hint: "Print the system message and count how many messages are in the list.",
      starter: `payload = {
    "model": "local-llama",
    "messages": [
        {"role": "system", "content": "Answer using context only."},
        {"role": "user", "content": "What is a vector database?"},
    ],
}

print("model:", payload.get("model"))
print("n_messages:", len(payload["messages"]))
print("last role:", payload["messages"][-1]["role"])
print("temperature:", payload.get("temperature", 0.0))`,
    },
    takeaways: [
      "Dicts are JSON objects in Python form — the language of APIs.",
      "Use .get(key, default) for optional fields; [] when the key is required.",
      "Nested dicts + lists are how chat messages and tool calls are stored.",
    ],
  },
  {
    slug: "control-flow",
    title: "Control flow: if, for, while",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Decisions and loops — training steps, early stopping, filtering predictions, and walking documents.",
    whyForAi:
      "A training loop is a for-loop over epochs and batches. RAG pipelines filter chunks with if. Eval scripts loop examples and branch on pass/fail. This is the control surface of every ML job.",
    packages: [],
    sections: [
      {
        heading: "if / elif / else",
        body: `Conditions use the comparisons you already know. Indent the block. \`elif\` is “else if”.

Truthy / falsy: empty string, \`0\`, \`[]\`, \`{}\`, and \`None\` are falsy. A non-empty list is truthy. That is handy (\`if chunks:\`) and dangerous (\`if score:\` is false for \`0.0\`, which may be a valid score). For numbers, compare explicitly: \`if score is not None:\`.

Compound conditions: \`and\`, \`or\`, \`not\`. Parentheses help readers.`,
      },
      {
        heading: "for and while",
        body: `\`for item in sequence:\` is the default loop. \`enumerate(seq, start=1)\` when you need an index. \`range(n)\` when you need integers.

\`break\` leaves the loop. \`continue\` skips to the next item. Early stopping is \`break\` when validation loss stops improving.

\`while\` is for “until a condition”. Avoid \`while True\` unless you also have a clear \`break\` — infinite loops freeze the browser compiler (it will time out after 20 seconds).`,
      },
    ],
    examples: [
      {
        title: "Filter predictions by confidence",
        note: "Same idea as dropping low-confidence classifier outputs before they reach users.",
        code: `preds = [
    {"label": "positive", "score": 0.92},
    {"label": "negative", "score": 0.41},
    {"label": "positive", "score": 0.77},
]
kept = []
for p in preds:
    if p["score"] >= 0.7:
        kept.append(p)
    else:
        print("drop", p)
print("kept:", kept)`,
      },
      {
        title: "Mini training loop with early stop",
        note: "Toy numbers — the control flow is what production trainers use.",
        code: `val_losses = [0.90, 0.70, 0.61, 0.62, 0.66]
best = float("inf")
patience = 1
bad_epochs = 0

for epoch, loss in enumerate(val_losses, start=1):
    print(f"epoch {epoch} val_loss={loss}")
    if loss < best:
        best = loss
        bad_epochs = 0
    else:
        bad_epochs += 1
        if bad_epochs > patience:
            print("early stop at epoch", epoch)
            break
print("best:", best)`,
      },
      {
        title: "range and enumerate",
        note: "range(n) is 0..n-1. That matches computer-science indexing, not human page numbers.",
        code: `docs = ["intro", "method", "results"]
for i in range(len(docs)):
    print(i, docs[i])
print("---")
for i, name in enumerate(docs, start=1):
    print(i, name)`,
      },
    ],
    tryIt: {
      title: "Keep chunks under a character budget",
      hint: "This is a simplified context-window packer. Raise the budget and see more chunks kept.",
      starter: `chunks = [
    "Python is used across the ML stack.",
    "Prompts are strings you template carefully.",
    "Dicts map onto JSON API bodies.",
    "Loops drive training and evaluation.",
]
budget = 80
used = 0
selected = []

for chunk in chunks:
    if used + len(chunk) > budget:
        continue
    selected.append(chunk)
    used += len(chunk)

print("selected:", len(selected))
print("chars used:", used)
for c in selected:
    print("-", c)`,
    },
    takeaways: [
      "if/elif/else branch on explicit comparisons — be careful with falsy 0 and empty lists.",
      "for-loops walk batches, epochs, documents, and eval rows.",
      "break implements early stopping; the compiler kills infinite loops after 20s.",
    ],
  },
];
