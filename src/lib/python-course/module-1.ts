import type { PythonLesson } from "./types";

export const MODULE_1_LESSONS: PythonLesson[] = [
  {
    slug: "why-python-for-ai",
    title: "Python Intro",
    moduleId: "foundations",
    level: "beginner",
    minutes: 12,
    summary:
      "Learn why Python is used for AI, how this course is organised, and run your first program.",
    whyForAi:
      "Most ML and GenAI tools are written in Python. Start here, then build up.",
    packages: [],
    sections: [
      {
        heading: "What is this course?",
        basicTip: "Print a short message.",
        basicCode: `print("Hello, AI engineer")`,
        body: `This is a free Python course for AI, ML, and GenAI beginners.

You will learn:

- Basic Python syntax
- Data and ML libraries later
- GenAI habits at the end

Each lesson has short text, a tiny example, and a live editor.`,
      },
      {
        heading: "Why Python?",
        basicTip: "Store a name, then print it.",
        basicCode: `model = "gpt-4.1-mini"
print(model)`,
        body: `Python is popular for AI because of its libraries:

- NumPy and pandas for data
- scikit-learn and PyTorch for models
- FastAPI for APIs

You write clear glue code: load data, call a model, show a result.`,
      },
      {
        heading: "Your First Program",
        basicTip: "Comments and print.",
        basicCode: `# This is a comment
print("Python runs top to bottom")
print(2 + 2)`,
        body: `Python runs from top to bottom.

- \`print()\` shows output
- \`#\` starts a comment
- Indentation matters (use four spaces)

Common mistake: treating indentation as optional. A wrong indent is a syntax error.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: tiny config",
        note: "Store settings in variables, then print them.",
        aiMl: "Training scripts start with small config values like this.",
        code: `model_name = "bert-base"
batch_size = 32
print(model_name)
print(batch_size)`,
      },
    ],
    tryIt: {
      title: "Run your first program",
      hint: "Change the role string and press Run.",
      starter: `role = "GenAI engineer"
print("I am learning Python to become a", role)
print(2 + 2)`,
    },
    takeaways: [
      "Python is the main language for ML and GenAI.",
      "print() shows output. # starts a comment.",
      "Indentation is required in Python.",
    ],
  },
  {
    slug: "variables-types-operators",
    title: "Python Variables",
    moduleId: "foundations",
    level: "beginner",
    minutes: 18,
    summary:
      "Create variables, check types, and use operators. These are the building blocks of every script.",
    whyForAi:
      "Learning rates, batch sizes, and scores are ordinary Python values.",
    packages: [],
    sections: [
      {
        heading: "Creating Variables",
        basicTip: "A name holds a value.",
        basicCode: `score = 0.91
print(score)
print(type(score))`,
        body: `A variable is a name bound to a value.

Common types:

- \`int\` - whole numbers like \`32\`
- \`float\` - decimals like \`0.001\`
- \`bool\` - \`True\` or \`False\`
- \`None\` - no value

Use \`type(x)\` to check the type.
Common mistake: treating \`None\` like the string \`"None"\`.`,
      },
      {
        heading: "Operators",
        basicTip: "Compare a score to a threshold.",
        basicCode: `score = 0.82
threshold = 0.7
print(score >= threshold)`,
        body: `Arithmetic: \`+\` \`-\` \`*\` \`/\` \`//\` \`%\` \`**\`

Comparisons return bools: \`==\` \`!=\` \`<\` \`>\` \`<=\` \`>=\`

Logic: \`and\`, \`or\`, \`not\`

\`/\` always returns a float. Use \`//\` for a whole number.
Common mistake: using \`/\` when you need an int index.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: inspect types",
        note: "type() shows what Python thinks a value is.",
        aiMl: "Hyperparameters mix ints, floats, bools, and None.",
        code: `epochs = 10
learning_rate = 3e-5
enabled = True
print(type(epochs))
print(type(learning_rate))
print(type(enabled))`,
      },
      {
        title: "AI / ML: threshold check",
        note: "A comparison turns a score into keep or drop.",
        aiMl: "Classifiers often keep predictions only above a threshold.",
        code: `score = 0.82
threshold = 0.7
print(score >= threshold)`,
      },
    ],
    tryIt: {
      title: "Practice variables",
      hint: "Change learning_rate and press Run.",
      starter: `learning_rate = 3e-5
batch_size = 16
print(type(learning_rate).__name__)
print(learning_rate > 0.01)
print(1000 // batch_size)`,
    },
    takeaways: [
      "Values have types. Names point at values.",
      "Use / for float divide and // for whole numbers.",
      "True, False, and None are capitalized.",
    ],
  },
  {
    slug: "strings-and-text",
    title: "Python Strings",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Create strings, use f-strings, slice text, and clean whitespace.",
    whyForAi:
      "Prompts, chunks, and log lines are all strings.",
    packages: [],
    sections: [
      {
        heading: "Creating Strings",
        basicTip: "Make a string and print its length.",
        basicCode: `name = "RAG"
print(name)
print(len(name))`,
        body: `Use single or double quotes. Use triple quotes for multi-line text.

Prefer f-strings: \`f"Model {name}"\`

\`len(s)\` counts characters.

Strings are immutable. \`s.upper()\` returns a new string.
Common mistake: expecting \`s.upper()\` to change \`s\` in place.`,
      },
      {
        heading: "Slicing and Cleaning",
        basicTip: "Strip spaces, then take a slice.",
        basicCode: `text = "  Hello GenAI  "
clean = text.strip()
print(clean)
print(clean[:5])`,
        body: `\`s[0]\` is the first character. \`s[-1]\` is the last.

\`s[0:5]\` is the first 5 characters (end index not included).

\`strip()\` removes leading and trailing spaces.
\`split()\` breaks text into a list of words.
Common mistake: sending padded text to a model without stripping.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: f-string prompt",
        note: "Put variables into a prompt with curly braces.",
        aiMl: "Chat apps build prompts from system text and user questions.",
        code: `question = "What is MLOps?"
context = "MLOps deploys and monitors models."
prompt = f"Context: {context}\\nQ: {question}"
print(prompt)`,
      },
      {
        title: "AI / ML: clean user text",
        note: "strip() removes extra spaces before a model call.",
        aiMl: "Before RAG or chat, engineers strip and reject empty prompts.",
        code: `raw = "   What is RAG?   "
clean = raw.strip()
print(clean)
print(clean == "")`,
      },
    ],
    tryIt: {
      title: "Build a short prompt",
      hint: "Edit the question, then check the length.",
      starter: `system = "Answer briefly."
question = "Why do AI teams use Python?"
prompt = f"{system}\\nUser: {question}"
print(prompt)
print(len(prompt))`,
    },
    takeaways: [
      "f-strings are the clean way to build text.",
      "strip() cleans spaces. len() counts characters.",
      "String methods return new strings.",
    ],
  },
  {
    slug: "lists-tuples-sets",
    title: "Python Lists",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Store ordered items in lists, fixed records in tuples, and unique values in sets.",
    whyForAi:
      "Batches of texts are lists. Unique document ids often use sets.",
    packages: [],
    sections: [
      {
        heading: "Lists",
        basicTip: "Make a list, then print length and the first item.",
        basicCode: `chunks = ["intro", "method", "results"]
print(len(chunks))
print(chunks[0])`,
        body: `A list is ordered and changeable: \`docs = ["a", "b"]\`

- Index: \`docs[0]\`, \`docs[-1]\`
- Slice: \`docs[:2]\`
- Add: \`append()\`
- Length: \`len(docs)\`

Keep list items the same type when you can.
Common mistake: writing \`docs = docs.append(x)\`. \`append\` returns \`None\`.`,
      },
      {
        heading: "Tuples and Sets",
        basicTip: "A fixed tuple and a set that drops duplicates.",
        basicCode: `shape = (8, 768)
ids = {"d1", "d1", "d2"}
print(shape)
print(ids)`,
        body: `A tuple is ordered and cannot change: \`shape = (32, 768)\`

A set stores unique unordered values. Duplicates are removed.

Use sets to drop duplicate ids. Use \`x in seen\` for fast checks.
Common mistake: expecting a set to keep display order.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: mini batch",
        note: "Slice a list to take the first n items.",
        aiMl: "Training and RAG code store texts in lists, then slice them.",
        code: `chunks = ["a", "b", "c", "d"]
batch = chunks[:3]
print(len(batch))
print(batch[-1])`,
      },
      {
        title: "AI / ML: unique ids",
        note: "Sets remove duplicate document ids.",
        aiMl: "RAG retrievers often return the same id twice.",
        code: `retrieved = ["d1", "d4", "d1", "d9"]
print(set(retrieved))`,
      },
    ],
    tryIt: {
      title: "Keep the top-k chunks",
      hint: "Change k and press Run.",
      starter: `chunks = ["MLOps", "RAG", "Eval"]
k = 2
top_k = chunks[:k]
print(top_k)
print(len(top_k))`,
    },
    takeaways: [
      "Lists are ordered and changeable.",
      "Never assign the result of append().",
      "Sets drop duplicates. Tuples hold fixed records.",
    ],
  },
  {
    slug: "dictionaries",
    title: "Python Dictionaries",
    moduleId: "foundations",
    level: "beginner",
    minutes: 18,
    summary:
      "Store data as key-value pairs. Dicts map to JSON, configs, and API payloads.",
    whyForAi:
      "LLM requests are dicts: model, messages, temperature.",
    packages: [],
    sections: [
      {
        heading: "Keys and Values",
        basicTip: "Create a dict and read a key.",
        basicCode: `config = {"model": "gpt-4.1-mini"}
print(config["model"])
print(config.get("top_p", 1.0))`,
        body: `A dict maps keys to values:

\`config = {"model": "mini", "temperature": 0.2}\`

- Read: \`config["model"]\`
- Safe read: \`config.get("top_p", 1.0)\`
- Write: \`config["max_tokens"] = 256\`
- Check: \`"model" in config\`

Use \`.get()\` for optional fields.
Common mistake: defaulting a required setting and shipping the wrong run.`,
      },
      {
        heading: "Looping Dicts",
        basicTip: "Loop key and value pairs.",
        basicCode: `metrics = {"accuracy": 0.91, "latency_ms": 120}
for name, value in metrics.items():
    print(name, value)`,
        body: `\`config.items()\` gives \`(key, value)\` pairs.

Nested access looks like \`payload["messages"][0]["content"]\`.

Print \`payload.keys()\` when you are unsure of the shape.
Common mistake: guessing nested keys instead of inspecting first.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: LLM request body",
        note: "This is the shape many chat APIs expect.",
        aiMl: "An LLM call is a dict with model and messages.",
        code: `request = {
    "model": "gpt-4.1-mini",
    "messages": [
        {"role": "user", "content": "Define RAG."},
    ],
}
print(request["model"])
print(request.get("temperature", 0.0))`,
      },
      {
        title: "AI / ML: metrics dict",
        note: "Named scores make runs easy to compare.",
        aiMl: "Trackers log accuracy and latency as key-value maps.",
        code: `metrics = {"accuracy": 0.91, "latency_ms": 128}
metrics["latency_ms"] = 141
print(metrics)`,
      },
    ],
    tryIt: {
      title: "Read a chat payload",
      hint: "Print the model and message count.",
      starter: `payload = {
    "model": "local-llama",
    "messages": [
        {"role": "user", "content": "What is a vector DB?"},
    ],
}
print(payload.get("model"))
print(len(payload["messages"]))`,
    },
    takeaways: [
      "Dicts are key-value maps (like JSON objects).",
      "Use .get() for optional fields.",
      "Nested dicts store chat messages.",
    ],
  },
  {
    slug: "control-flow",
    title: "Python If Else",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Make decisions with if, and repeat work with for and while.",
    whyForAi:
      "Training loops are for-loops. Filters use if. Early stop uses break.",
    packages: [],
    sections: [
      {
        heading: "If / Elif / Else",
        basicTip: "One condition. Two paths.",
        basicCode: `score = 0.82
if score >= 0.7:
    print("keep")
else:
    print("drop")`,
        body: `\`if\` runs a block when a condition is True.

\`elif\` tries another condition. \`else\` runs when none matched.

Indent with four spaces.

Empty values like \`0\`, \`""\`, and \`None\` are falsy. For scores, compare explicitly: \`if score >= 0.7:\`
Common mistake: using \`if score:\` and treating \`0.0\` as missing.`,
      },
      {
        heading: "For and While",
        basicTip: "Loop over each item.",
        basicCode: `labels = ["pos", "neg", "pos"]
for label in labels:
    print(label)`,
        body: `\`for item in sequence:\` is the default loop.

Use \`range(n)\` for integers. Use \`enumerate()\` when you need an index.

\`break\` leaves the loop. \`continue\` skips to the next item.

\`while\` repeats until a condition fails.
Common mistake: an infinite while loop.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: filter by score",
        note: "Keep high scores. Drop the rest.",
        aiMl: "Classifiers often keep only predictions above a threshold.",
        code: `preds = [0.92, 0.41, 0.77]
kept = []
for score in preds:
    if score >= 0.7:
        kept.append(score)
print(kept)`,
      },
      {
        title: "AI / ML: early stop idea",
        note: "Stop when loss stops improving.",
        aiMl: "Training scripts watch validation loss and stop early.",
        code: `losses = [0.9, 0.7, 0.61, 0.66]
best = losses[0]
for loss in losses:
    if loss < best:
        best = loss
print(best)`,
      },
    ],
    tryIt: {
      title: "Keep short chunks",
      hint: "Change the budget and press Run.",
      starter: `chunks = ["short", "a bit longer text", "x"]
budget = 10
selected = []
for chunk in chunks:
    if len(chunk) <= budget:
        selected.append(chunk)
print(selected)`,
    },
    takeaways: [
      "if / elif / else branch on conditions.",
      "for-loops walk lists and ranges.",
      "break stops a loop early.",
    ],
  },
];
