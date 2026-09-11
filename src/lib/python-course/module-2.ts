import type { PythonLesson } from "./types";

export const MODULE_2_LESSONS: PythonLesson[] = [
  {
    slug: "functions",
    title: "Python Functions",
    moduleId: "core-language",
    level: "beginner",
    minutes: 22,
    summary:
      "Create reusable blocks of code with def, arguments, defaults, and return values.",
    whyForAi:
      "Chunking, prompt building, scoring, and metric helpers are all functions you can test and reuse.",
    packages: [],
    sections: [
      {
        heading: "Creating a Function",
        basicTip: "Define a function, call it, print the result.",
        basicCode: `def greet(name):
    return "hello " + name

print(greet("model"))`,
        body: `A function is a block of code that only runs when you call it.

Use \`def\` to define it. Put parameters in parentheses. Use \`return\` to send a value back.

If you do not return anything, the function returns \`None\`.
Common mistake: forgetting parentheses when you call the function.`,
      },
      {
        heading: "Arguments and Defaults",
        basicTip: "Pass a keyword argument so the option is clear.",
        basicCode: `def score(text, threshold=0.7):
    return len(text) > 3

print(score("rag", threshold=0.5))`,
        body: `You can give parameters default values. Callers may skip them.

Keyword arguments make calls readable: \`score("rag", threshold=0.5)\`.

Never use a mutable default like \`[]\`. Use \`None\` and create the list inside the function.
Common mistake: \`def f(items=[])\` shares one list across every call.`,
      },
      {
        heading: "Return Multiple Values",
        basicTip: "Return two values, then unpack them.",
        basicCode: `def stats(scores):
    return sum(scores) / len(scores), min(scores)

mean, worst = stats([0.9, 0.7])
print(mean, worst)`,
        body: `Names created inside a function are local. They disappear when the function ends.

Return several values as a tuple: \`return mean, worst\`. Unpack on the call side.

For more than two or three values, prefer a dict so the meaning stays clear.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: build a prompt",
        note: "Defaults keep the call site short and clear.",
        why: "Reusable prompt helpers keep templates in one place.",
        aiMl: "GenAI code wraps system and user text in small builder functions.",
        code: `def build_prompt(question, style="concise"):
    return f"Answer in a {style} style.\\nQuestion: {question}"

print(build_prompt("What is RAG?"))
print(build_prompt("What is RAG?", style="detailed"))`,
      },
      {
        title: "AI / ML: mutable default trap",
        note: "The broken version grows across calls. The fixed one does not.",
        why: "Shared default lists cause silent bugs on later calls.",
        aiMl: "Message histories and bucket collectors must not use [] as a default.",
        code: `def broken(item, bucket=[]):
    bucket.append(item)
    return bucket

def fixed(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

print(broken("a"), broken("b"))
print(fixed("a"), fixed("b"))`,
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
      "def creates a function; return sends a value back.",
      "Use keyword arguments for options; never use a mutable default.",
      "Return a tuple for two values, or a dict when names matter.",
    ],
  },
  {
    slug: "comprehensions-and-generators",
    title: "Python Comprehensions",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Build lists and dicts in one line, and stream values with generators.",
    whyForAi:
      "Comprehensions filter scores and clean text. Generators stream large datasets without loading everything into memory.",
    packages: [],
    sections: [
      {
        heading: "List Comprehension",
        basicTip: "Keep only high scores in one line.",
        basicCode: `scores = [0.9, 0.4, 0.8]
kept = [s for s in scores if s >= 0.7]
print(kept)`,
        body: `A list comprehension builds a list from a loop:

\`[expr for item in seq]\`

Add a filter with \`if\`:

\`[x for x in scores if x > 0.7]\`

Keep it to one loop and one condition. Longer logic belongs in a normal for-loop.`,
      },
      {
        heading: "Dict and Set Comprehension",
        basicTip: "Build a small dict from names and lengths.",
        basicCode: `words = ["rag", "ml"]
lengths = {w: len(w) for w in words}
print(lengths)`,
        body: `Dict comprehension uses braces and a key:value pair:

\`{k: v for k, v in pairs}\`

Set comprehension uses braces with one expression:

\`{x.lower() for x in words}\`

Same idea as lists: short transform, easy to read.`,
      },
      {
        heading: "Generators",
        basicTip: "Yield one batch name at a time.",
        basicCode: `def batches(n):
    for i in range(n):
        yield f"batch-{i}"

print(list(batches(3)))`,
        body: `A generator function uses \`yield\` instead of \`return\`. Each \`yield\` pauses and sends one value.

Generator expressions use parentheses: \`(x * 2 for x in nums)\`.

Values are made on demand, so memory stays low. Generators are single-use. Call the function again to restart.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: clean and filter chunks",
        note: "Strip, lowercase, and keep only long enough text.",
        why: "Short cleaning steps read well as comprehensions.",
        aiMl: "RAG prep often cleans and filters documents in one line.",
        code: `docs = ["  Python  ", "AI", "  Machine Learning "]
cleaned = [d.strip().lower() for d in docs if len(d.strip()) > 2]
print(cleaned)`,
      },
      {
        title: "AI / ML: yield training batches",
        note: "Memory stays flat while you walk the data.",
        why: "Batching with yield is the shape of a data loader.",
        aiMl: "Training loops stream rows in batches instead of one giant list.",
        code: `def batched(items, size):
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

for batch in batched(range(7), 3):
    print(batch)`,
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
      "Comprehensions build lists, dicts, or sets in one readable line.",
      "Keep them short: one loop and one filter.",
      "Generators yield values lazily and are single-use.",
    ],
  },
  {
    slug: "errors-and-exceptions",
    title: "Python Try Except",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Handle errors with try and except. Catch specific problems and fail clearly on the rest.",
    whyForAi:
      "LLM APIs time out, rate-limit, and return bad JSON. Catch what you can retry, and do not hide real bugs.",
    packages: [],
    sections: [
      {
        heading: "Reading Errors",
        basicTip: "Catch a missing key and print a message.",
        basicCode: `payload = {"model": "mini"}
try:
    print(payload["temperature"])
except KeyError as err:
    print("missing:", err)`,
        body: `Read a traceback from the bottom up. The last line names the error.

Common types:

- \`KeyError\` - missing dict key
- \`ValueError\` - right type, bad value
- \`TypeError\` - wrong type
- \`FileNotFoundError\` - path not found
- \`ZeroDivisionError\` - divide by zero`,
      },
      {
        heading: "try / except / finally",
        basicTip: "Fall back when a float parse fails.",
        basicCode: `raw = "hot"
try:
    temperature = float(raw)
except ValueError:
    temperature = 0.2
print(temperature)`,
        body: `Put risky code in \`try\`. Handle known problems in \`except\`.

Catch specific exceptions. A bare \`except:\` hides bugs and can catch Ctrl+C.

\`else\` runs when no error happened. \`finally\` always runs.
Common mistake: \`except Exception:\` around everything.`,
      },
      {
        heading: "Raise and Retry",
        basicTip: "Show backoff wait times for each attempt.",
        basicCode: `for attempt in range(4):
    wait = 2 ** attempt
    print(attempt, "wait", wait)`,
        body: `Use \`raise\` to signal a problem. \`raise ... from err\` keeps the original cause.

Retry timeouts and rate limits. Do not retry bad auth or bad input.

A simple pattern: try, catch the transient error, wait \`2 ** attempt\`, try again.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: safe config parse",
        note: "Missing or bad temperature falls back to a default.",
        why: "Specific catches recover cleanly without hiding bugs.",
        aiMl: "LLM configs often miss keys or send temperature as a string.",
        code: `payload = {"model": "gpt-4.1-mini"}
try:
    temperature = float(payload["temperature"])
except KeyError:
    temperature = 0.2
except (TypeError, ValueError):
    temperature = 0.2
print("temperature =", temperature)`,
      },
      {
        title: "AI / ML: retry a flaky call",
        note: "Simulate a timeout, then succeed on a later attempt.",
        why: "Transient failures deserve retries. Permanent ones should fail fast.",
        aiMl: "LLM gateways hit rate limits and timeouts in production.",
        code: `attempts = {"count": 0}

def flaky_call():
    attempts["count"] += 1
    if attempts["count"] < 3:
        raise TimeoutError("timeout")
    return {"answer": "ok"}

for attempt in range(5):
    try:
        print(flaky_call())
        break
    except TimeoutError:
        print("retry", attempt + 1)`,
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
      "Read tracebacks from the bottom up.",
      "Catch specific exceptions, not bare except.",
      "Retry transient failures; fail fast on bad input.",
    ],
  },
  {
    slug: "files-and-json",
    title: "Python File Handling",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 20,
    summary:
      "Read and write files with with open, work with JSON, and build paths safely.",
    whyForAi:
      "Datasets arrive as JSONL, configs as JSON, and eval results go back out as files. Path bugs hide between Windows and Linux.",
    packages: [],
    sections: [
      {
        heading: "Open and Close with with",
        basicTip: "Write a short file, then read it back.",
        basicCode: `with open("note.txt", "w", encoding="utf-8") as f:
    f.write("hello")
with open("note.txt", "r", encoding="utf-8") as f:
    print(f.read())`,
        body: `Always open files with \`with\`. The file closes even if an error happens.

Pass \`encoding="utf-8"\` so Windows and Linux behave the same.

Modes: \`"r"\` read, \`"w"\` write (overwrites), \`"a"\` append. Add \`b\` for bytes.
Common mistake: using open() without with, then forgetting to close.`,
      },
      {
        heading: "JSON",
        basicTip: "Dump a dict to JSON text and load it back.",
        basicCode: `import json
s = json.dumps({"model": "mini"})
print(s)
print(json.loads(s)["model"])`,
        body: `\`json.dumps(obj)\` turns a Python object into a string. \`json.loads(s)\` parses it back.

For files use \`json.dump(obj, f)\` and \`json.load(f)\`.

JSONL means one JSON object per line. Fine-tuning and eval datasets often use this format.`,
      },
      {
        heading: "pathlib Paths",
        basicTip: "Join a path with / and print the suffix.",
        basicCode: `from pathlib import Path
p = Path("artifacts") / "metrics.json"
print(p)
print(p.suffix)`,
        body: `Use \`Path\` instead of string joins. The \`/\` operator works on every OS.

Useful methods: \`.exists()\`, \`.mkdir(parents=True, exist_ok=True)\`, \`.read_text()\`, \`.write_text()\`, \`.glob("*.json")\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: save a model config",
        note: "Write JSON, then load it again.",
        why: "Configs move between files and Python as dicts.",
        aiMl: "Model settings and eval reports are saved as JSON constantly.",
        code: `import json

config = {"model": "gpt-4.1-mini", "temperature": 0.2}
with open("config.json", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2)
with open("config.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded)`,
      },
      {
        title: "AI / ML: stream a JSONL file",
        note: "One object per line, read line by line.",
        why: "JSONL streams without loading the whole dataset.",
        aiMl: "Fine-tuning rows are almost always stored as JSONL.",
        code: `import json

rows = [
    {"prompt": "What is RAG?", "completion": "Retrieval plus generation."},
]
with open("train.jsonl", "w", encoding="utf-8") as f:
    for row in rows:
        f.write(json.dumps(row) + "\\n")
with open("train.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        print(json.loads(line))`,
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
      "Always use with open(..., encoding=\"utf-8\").",
      "json.dumps/loads for strings; dump/load for files.",
      "Build paths with pathlib, not string concatenation.",
    ],
  },
  {
    slug: "classes-and-objects",
    title: "Python Classes",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 22,
    summary:
      "Bundle data and behaviour with classes, methods, and inheritance.",
    whyForAi:
      "Retrievers, tokenizers, and model clients are classes you create once and call many times.",
    packages: [],
    sections: [
      {
        heading: "Create a Class",
        basicTip: "Store a model name on self, then print it.",
        basicCode: `class Client:
    def __init__(self, model):
        self.model = model

print(Client("mini").model)`,
        body: `A class is a blueprint. An object is one instance built from it.

\`__init__\` runs when you create the object. \`self\` is the instance.

Put expensive setup in \`__init__\` once. Reuse it in methods.`,
      },
      {
        heading: "Methods and __call__",
        basicTip: "Make an instance callable with __call__.",
        basicCode: `class Doubler:
    def __call__(self, x):
        return x * 2

print(Doubler()(5))`,
        body: `Methods are functions that take \`self\` first.

\`__repr__\` controls how the object looks when printed. Add one for easier debugging.

\`__call__\` lets you write \`obj(x)\` like a function. That is why model code often looks like \`model(inputs)\`.`,
      },
      {
        heading: "Inheritance",
        basicTip: "Call super().__init__ from a subclass.",
        basicCode: `class Base:
    def __init__(self, name):
        self.name = name

class Child(Base):
    def __init__(self, name):
        super().__init__(name)

print(Child("rag").name)`,
        body: `A subclass reuses a parent class: \`class Child(Base):\`.

Call \`super().__init__(...)\` so the parent still sets up its state.

In your own code, prefer composition (hold other objects) over deep inheritance trees.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: a tiny retriever",
        note: "Build the index once in __init__, then search many times.",
        why: "Classes hold setup once and reuse it on every call.",
        aiMl: "Retrievers and embedders load indexes or models in __init__.",
        code: `class KeywordRetriever:
    def __init__(self, documents):
        self.documents = documents

    def search(self, query):
        q = query.lower()
        return [d for d in self.documents if q in d.lower()]

r = KeywordRetriever(["python ml", "kubernetes", "python llm"])
print(r.search("python"))`,
      },
      {
        title: "AI / ML: callable scaler",
        note: "An object that behaves like a function.",
        why: "Callable objects keep state while looking like a simple call.",
        aiMl: "PyTorch modules are called as model(x) because of __call__.",
        code: `class Scaler:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, values):
        return [v * self.factor for v in values]

scale = Scaler(0.5)
print(scale([1.0, 2.0, 3.0]))`,
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
      "__init__ sets up state once; methods reuse it.",
      "__call__ makes an object work like a function.",
      "Use inheritance carefully; prefer composition in your own code.",
    ],
  },
  {
    slug: "modules-and-environments",
    title: "Python Modules",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "Import code from modules, guard entry points, and pin dependencies.",
    whyForAi:
      "Pinned requirements and clean imports are what make a training run reproduce on another machine.",
    packages: [],
    sections: [
      {
        heading: "Import a Module",
        basicTip: "Import a stdlib module and use one function.",
        basicCode: `import math
print(math.sqrt(9))`,
        body: `Every \`.py\` file is a module. Import with \`import math\` or \`from math import sqrt\`.

Keep imports at the top of the file. Group stdlib, third-party, then your own code.

Avoid \`from module import *\`. It hides where names come from.`,
      },
      {
        heading: "The Main Guard",
        basicTip: "Run main only when the file is executed directly.",
        basicCode: `def main():
    print("run entry")

if __name__ == "__main__":
    main()`,
        body: `\`if __name__ == "__main__":\` runs code only when you execute the file, not when you import it.

Put CLI entry points there so tests can import helpers without starting a job.`,
      },
      {
        heading: "Virtual Environments",
        basicTip: "Print a pinned requirement line.",
        basicCode: `pin = "pandas==2.2.3"
print("pin:", pin)`,
        body: `A virtual environment gives each project its own packages.

Create one with \`python -m venv .venv\`, activate it, then install from \`requirements.txt\`.

Pin versions (\`pandas==2.2.3\`, not \`pandas\`) so rebuilds stay stable.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: script entry point",
        note: "Importing defines helpers. Running the file starts the demo.",
        why: "Importing a module should not start training by accident.",
        aiMl: "Preprocess and train scripts sit under if __name__ == \"__main__\".",
        code: `def preprocess(text):
    return text.strip().lower()

def main():
    print(preprocess("  Hello "))

if __name__ == "__main__":
    main()`,
      },
      {
        title: "AI / ML: pin requirements",
        note: "Exact versions, one per line.",
        why: "Pinned versions make rebuilds reproducible months later.",
        aiMl: "CI and Docker images lock torch, pandas, and fastapi versions.",
        code: `# requirements.txt shape
pins = [
    "numpy==2.1.3",
    "pandas==2.2.3",
    "scikit-learn==1.5.2",
]
for line in pins:
    print(line)`,
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
      "Imports go at the top, grouped by source.",
      "Guard entry points with if __name__ == \"__main__\".",
      "One virtual environment per project, and pin every version.",
    ],
  },
  {
    slug: "packages-and-pip",
    title: "Python Packages and pip",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 14,
    summary:
      "Learn what packages are, how pip installs them, and how requirements files keep projects repeatable.",
    whyForAi:
      "AI projects depend on packages such as NumPy, pandas, scikit-learn, PyTorch, and FastAPI.",
    packages: [],
    sections: [
      {
        heading: "Modules and Packages",
        basicTip: "Check whether Python can find a package.",
        basicCode: `import importlib.util

name = "json"
found = importlib.util.find_spec(name) is not None
print(name, "available:", found)`,
        body: `A module is one Python file. A package is a folder of related modules.

Python includes standard-library packages such as \`json\`. Third-party packages add tools such as NumPy and pandas.

Use \`import package_name\` after a package is available.`,
      },
      {
        heading: "Install with pip",
        basicTip: "See the common pip commands as a small list.",
        basicCode: `commands = [
    "python -m pip install pandas",
    "python -m pip list",
]
for command in commands:
    print(command)`,
        body: `\`pip\` is Python's package installer.

- Install: \`python -m pip install pandas\`
- Upgrade: \`python -m pip install --upgrade pandas\`
- List: \`python -m pip list\`
- Remove: \`python -m pip uninstall pandas\`

The browser lab loads supported packages automatically, so students can practise here without setup.`,
      },
      {
        heading: "Requirements Files",
        basicTip: "Create a short repeatable package list.",
        basicCode: `requirements = [
    "numpy==2.1.3",
    "pandas==2.2.3",
]
print("\\n".join(requirements))`,
        body: `A \`requirements.txt\` file lists the packages a project needs.

Pin versions with \`==\` when repeatable builds matter. Install the full list with \`python -m pip install -r requirements.txt\`.

Common mistake: installing packages without recording their versions.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: check project dependencies",
        note: "Check which common data packages are available.",
        why: "A clear dependency check explains missing-import errors quickly.",
        aiMl: "Training and data projects usually depend on NumPy, pandas, and scikit-learn.",
        code: `import importlib.util

packages = ["numpy", "pandas", "sklearn"]
for name in packages:
    available = importlib.util.find_spec(name) is not None
    print(name, "available:", available)`,
      },
      {
        title: "AI / ML: build a requirements list",
        note: "Keep one readable list of project dependencies.",
        why: "A requirements file lets another environment rebuild the same project.",
        aiMl: "Model services pin data, model, and API libraries before deployment.",
        code: `project_packages = {
    "numpy": "2.1.3",
    "pandas": "2.2.3",
    "scikit-learn": "1.5.2",
}
for name, version in project_packages.items():
    print(f"{name}=={version}")`,
      },
    ],
    tryIt: {
      title: "Check packages in this browser",
      hint: "Add another import name such as json, math, or pathlib.",
      starter: `import importlib.util

names = ["json", "numpy", "pandas"]
for name in names:
    found = importlib.util.find_spec(name) is not None
    print(f"{name}: {'ready' if found else 'not loaded'}")`,
    },
    takeaways: [
      "A module is one file; a package groups modules.",
      "pip installs and manages third-party packages.",
      "Requirements files make projects easier to rebuild.",
    ],
  },
  {
    slug: "decorators-and-context-managers",
    title: "Python Decorators",
    moduleId: "core-language",
    level: "advanced",
    minutes: 20,
    summary:
      "Wrap functions with decorators and manage setup and teardown with context managers.",
    whyForAi:
      "FastAPI routes, caching, retries, and torch.no_grad() all use these patterns.",
    packages: [],
    sections: [
      {
        heading: "Functions as Values",
        basicTip: "Pass a function as an argument and call it.",
        basicCode: `def apply(fn, x):
    return fn(x)

print(apply(len, "prompt"))`,
        body: `You can pass functions as arguments and return them from other functions.

A decorator takes a function and returns a wrapped version.

\`@timed\` above a definition means \`fn = timed(fn)\`.`,
      },
      {
        heading: "Write a Decorator",
        basicTip: "Print a message before the real call.",
        basicCode: `def noisy(fn):
    def wrap(x):
        print("calling", fn.__name__)
        return fn(x)
    return wrap

@noisy
def embed(t):
    return len(t)

print(embed("rag"))`,
        body: `The wrapper usually calls the original function and adds behaviour around it.

Use \`@functools.wraps(fn)\` so the original name stays intact.

Decorators with arguments need one extra layer: a function that returns a decorator.`,
      },
      {
        heading: "Context Managers",
        basicTip: "Use with on a tiny custom context manager.",
        basicCode: `class Stage:
    def __enter__(self):
        print("start")
        return self
    def __exit__(self, *a):
        print("end")

with Stage():
    print("work")`,
        body: `\`with\` calls \`__enter__\` on the way in and \`__exit__\` on the way out, even after errors.

You can also write one with \`@contextlib.contextmanager\`: setup before \`yield\`, teardown after.

Real uses: open files, time a block, or disable gradients during inference.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: timing decorator",
        note: "Measure how long a call takes without changing its body.",
        why: "Timing wrappers add logs without rewriting every function.",
        aiMl: "Inference latency logs often come from timed decorators.",
        code: `import functools
import time

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        print(fn.__name__, "ms:", round((time.perf_counter() - start) * 1000, 2))
        return result
    return wrapper

@timed
def embed(texts):
    return [len(t) for t in texts]

print(embed(["python", "genai"]))`,
      },
      {
        title: "AI / ML: cache repeated embeds",
        note: "The second call with the same text skips the print.",
        why: "Pure repeated calls should hit a cache.",
        aiMl: "Embedding the same prompt twice in one process is a classic cache win.",
        code: `import functools

@functools.lru_cache(maxsize=128)
def fake_embed(text):
    print("computing:", text)
    return sum(ord(c) for c in text) % 997

print(fake_embed("python"))
print(fake_embed("python"))
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
      "A decorator wraps a function and returns a new one.",
      "Use functools.wraps to keep the original name.",
      "Context managers guarantee teardown with with.",
    ],
  },
];
