import type { PythonLesson } from "./types";

/** Additional Module 2 lessons: lambda, iterators, scope, OOP depth, regex, dates, stdlib. */
export const MODULE_2B_LESSONS: PythonLesson[] = [
  {
    slug: "lambda-map-filter",
    title: "Python Lambda",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 16,
    summary:
      "Write short anonymous functions and use them with sorted, map, and filter.",
    whyForAi:
      "Ranking chunks by score and sorting model runs by latency usually means key=lambda.",
    packages: [],
    sections: [
      {
        heading: "Lambda",
        basicTip: "Use a lambda as a sort key.",
        basicCode: `chunks = [{"score": 0.4}, {"score": 0.9}]
print(sorted(chunks, key=lambda c: c["score"]))`,
        body: `\`lambda args: expression\` makes a small function without a name.

It holds one expression only. No loops or assignments.

If the function needs a name, use \`def\`. Lambda belongs inline, often as \`key=\`.`,
      },
      {
        heading: "sorted with key",
        basicTip: "Sort scores from high to low.",
        basicCode: `scores = [0.4, 0.9, 0.7]
print(sorted(scores, reverse=True))`,
        body: `\`sorted(iterable, key=..., reverse=...)\` returns a new list.

The \`key\` function runs on each item. Results are compared.

For multi-level sort, return a tuple: \`key=lambda r: (-r["score"], r["id"])\`.
Negating a number flips sort direction.`,
      },
      {
        heading: "map and filter",
        basicTip: "Keep high scores with filter.",
        basicCode: `scores = [0.9, 0.4, 0.8]
print(list(filter(lambda s: s >= 0.7, scores)))`,
        body: `\`map(fn, iterable)\` applies a function to each item. \`filter(fn, iterable)\` keeps truthy results.

Both return lazy iterators. Wrap with \`list()\` to see values.

In modern Python, a comprehension is often clearer: \`[s for s in scores if s >= 0.7]\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: rank retrieved chunks",
        note: "Sort by score descending, then pick the best.",
        why: "Reranking by score is the clearest everyday use of sorted with key.",
        aiMl: "RAG pipelines sort chunks by score before packing the prompt.",
        code: `chunks = [
    {"id": "c1", "score": 0.71},
    {"id": "c3", "score": 0.94},
    {"id": "c2", "score": 0.71},
]
ranked = sorted(chunks, key=lambda c: c["score"], reverse=True)
print(ranked)
print("best:", max(chunks, key=lambda c: c["score"])["id"])`,
      },
      {
        title: "AI / ML: model leaderboard sort",
        note: "Sort by accuracy first, then by latency.",
        why: "Tuple keys break ties with a second field.",
        aiMl: "Model comparison tables sort by score, then latency.",
        code: `runs = [
    {"model": "b", "score": 0.90, "latency": 300},
    {"model": "a", "score": 0.90, "latency": 120},
    {"model": "c", "score": 0.85, "latency": 100},
]
ranked = sorted(runs, key=lambda r: (-r["score"], r["latency"]))
for r in ranked:
    print(r["model"], r["score"], r["latency"])`,
      },
    ],
    tryIt: {
      title: "Build a model leaderboard",
      hint: "Change the sort key to latency and see the ranking flip.",
      starter: `runs = [
    {"model": "gpt-4.1-mini", "accuracy": 0.913, "latency_ms": 640, "cost": 0.0004},
    {"model": "llama-3-8b",   "accuracy": 0.847, "latency_ms": 1520, "cost": 0.0},
    {"model": "claude-haiku", "accuracy": 0.900, "latency_ms": 460, "cost": 0.0012},
]

leaderboard = sorted(runs, key=lambda r: (-r["accuracy"], r["latency_ms"]))

print(f"{'#':<3}{'model':<15}{'acc':>8}{'latency':>10}{'cost':>10}")
print("-" * 46)
for rank, r in enumerate(leaderboard, start=1):
    print(f"{rank:<3}{r['model']:<15}{r['accuracy']:>7.1%}{r['latency_ms']:>9}ms{r['cost']:>10.4f}")

fastest = min(runs, key=lambda r: r["latency_ms"])
free = list(filter(lambda r: r["cost"] == 0.0, runs))
print("\\nfastest:", fastest["model"])
print("free models:", [r["model"] for r in free])`,
    },
    takeaways: [
      "lambda holds one expression and fits well as a key= argument.",
      "sorted with a tuple key does multi-level ranking.",
      "Prefer comprehensions over map/filter when either works.",
    ],
  },
  {
    slug: "iterators-and-iterables",
    title: "Python Iterators",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "How for-loops work, why iterators are single-use, and how zip and enumerate pair values.",
    whyForAi:
      "DataLoaders, streaming APIs, and file readers are iterators. A spent generator looks like an empty dataset.",
    packages: [],
    sections: [
      {
        heading: "iter and next",
        basicTip: "Walk a list with iter and next by hand.",
        basicCode: `it = iter(["a", "b"])
print(next(it))
print(next(it))`,
        body: `An iterable can make an iterator (\`__iter__\`). Lists and strings are iterables.

An iterator gives values one at a time with \`next()\`. When done, it raises \`StopIteration\`.

\`for x in items:\` is shorthand for that loop.
Common mistake: looping a generator twice and wondering why the second pass is empty.`,
      },
      {
        heading: "zip and enumerate",
        basicTip: "Pair names with scores using zip.",
        basicCode: `names = ["rag", "mlops"]
scores = [0.9, 0.8]
print(list(zip(names, scores)))`,
        body: `\`zip(a, b)\` pairs items by position. It stops at the shortest input.

Use \`strict=True\` (Python 3.10+) to raise if lengths differ.

\`enumerate(seq, start=1)\` gives index and value together.`,
      },
      {
        heading: "Write a Generator",
        basicTip: "Yield a short countdown.",
        basicCode: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))`,
        body: `A generator function with \`yield\` is an iterator for free.

Prefer generators over custom iterator classes unless you need extra methods.

\`itertools\` adds helpers like \`islice\`, \`chain\`, and \`product\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: iterators are single-use",
        note: "The second pass over the generator is empty.",
        why: "Reusing a spent generator silently yields nothing.",
        aiMl: "A second epoch over a spent loader looks like empty data.",
        code: `def batches(n):
    for i in range(n):
        yield f"batch-{i}"

gen = batches(3)
print("first:", list(gen))
print("second:", list(gen))
print("again:", list(batches(3)))`,
      },
      {
        title: "AI / ML: pair predictions with labels",
        note: "strict=True catches length mismatches.",
        why: "Silent zip truncation drops leftover rows.",
        aiMl: "Eval code must not drop leftover predictions without warning.",
        code: `preds = ["pos", "neg", "pos"]
labels = ["pos", "pos"]
try:
    print(list(zip(preds, labels, strict=True)))
except ValueError as err:
    print("mismatch:", err)
print("safe slice:", list(zip(preds[:2], labels)))`,
      },
    ],
    tryIt: {
      title: "Pair predictions with labels safely",
      hint: "Remove a label from the list and watch strict=True catch the mismatch.",
      starter: `predictions = ["positive", "negative", "positive", "neutral"]
labels =      ["positive", "positive", "positive", "neutral"]

try:
    paired = list(zip(predictions, labels, strict=True))
except ValueError as err:
    print("length mismatch:", err)
    paired = []

correct = 0
for i, (pred, truth) in enumerate(paired, start=1):
    mark = "PASS" if pred == truth else "FAIL"
    correct += pred == truth
    print(f"{i}. {mark}  predicted={pred:9} actual={truth}")

if paired:
    print(f"\\naccuracy: {correct / len(paired):.1%}")`,
    },
    takeaways: [
      "for-loops call iter() then next() until StopIteration.",
      "Generators and zip objects are consumed once.",
      "Use zip(..., strict=True) when lengths must match.",
    ],
  },
  {
    slug: "scope-and-closures",
    title: "Python Scope",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "Where names live, how mutable arguments behave, and how closures capture variables.",
    whyForAi:
      "Shared lists and late-bound closures cause bugs that only show up on the second call.",
    packages: [],
    sections: [
      {
        heading: "LEGB Rule",
        basicTip: "Read a global name from inside a function.",
        basicCode: `model = "mini"
def show():
    print(model)

show()`,
        body: `Python looks up names in this order:

1. Local
2. Enclosing (outer function)
3. Global (module)
4. Built-in (\`len\`, \`print\`, ...)

Reading a global is fine. Assigning creates a new local unless you use \`global\`.
Common mistake: naming a variable \`list\` or \`sum\` and shadowing the built-in.`,
      },
      {
        heading: "Mutable Arguments",
        basicTip: "Appending inside a function changes the caller's list.",
        basicCode: `batch = ["a"]
def add(items):
    items.append("b")

add(batch)
print(batch)`,
        body: `Python passes object references.

Immutable values (int, str, tuple) cannot be changed by the callee.

Mutable values (list, dict, set) can. \`items.append(x)\` changes the caller's list. \`items = items + [x]\` does not.

Copy first with \`list(items)\` when you do not want shared changes.`,
      },
      {
        heading: "Closures",
        basicTip: "A factory returns a filter closed over a threshold.",
        basicCode: `def make_keep(threshold):
    def keep(score):
        return score >= threshold
    return keep

print(make_keep(0.7)(0.8))`,
        body: `A closure is a nested function that keeps variables from the outer scope.

Closures capture the variable, not a snapshot of its value.

In loops, bind the value with a default: \`lambda s, t=t: s >= t\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: mutate vs rebind",
        note: "append changes the caller. Rebinding does not.",
        why: "Shared batch lists inside helpers can corrupt later steps.",
        aiMl: "Message histories and batch collectors must not mutate by accident.",
        code: `def mutates(items):
    items.append("x")

def rebinds(items):
    items = items + ["x"]
    return items

a = ["start"]
mutates(a)
print("mutated:", a)

b = ["start"]
rebinds(b)
print("rebound caller:", b)`,
      },
      {
        title: "AI / ML: late-binding trap",
        note: "Bind each threshold at creation time.",
        why: "Closures capture variables, not snapshots.",
        aiMl: "Score filters built in a loop must bind each threshold.",
        code: `broken = [lambda s: s >= t for t in (0.5, 0.7, 0.9)]
fixed = [lambda s, t=t: s >= t for t in (0.5, 0.7, 0.9)]
print([f(0.8) for f in broken])
print([f(0.8) for f in fixed])`,
      },
    ],
    tryIt: {
      title: "Find the shared-state bug",
      hint: "Both trackers share one list. Fix add_result by giving each tracker its own store.",
      starter: `def make_tracker(store=[]):        # bug: default list is shared
    def add(value):
        store.append(value)
        return list(store)
    return add

tracker_a = make_tracker()
tracker_b = make_tracker()

print("a:", tracker_a(1))
print("a:", tracker_a(2))
print("b:", tracker_b(99), "<- should be [99] only")

def make_tracker_fixed(store=None):
    store = [] if store is None else store
    def add(value):
        store.append(value)
        return list(store)
    return add

fixed_a = make_tracker_fixed()
fixed_b = make_tracker_fixed()
print("\\nfixed a:", fixed_a(1), fixed_a(2))
print("fixed b:", fixed_b(99))`,
    },
    takeaways: [
      "Names resolve Local, Enclosing, Global, Built-in.",
      "Mutable arguments can change the caller's data.",
      "Closures capture variables; bind loop values with defaults.",
    ],
  },
  {
    slug: "inheritance-and-polymorphism",
    title: "Python Inheritance",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "Subclassing, duck typing, abstract base classes, and special methods.",
    whyForAi:
      "Custom models, tools, and estimators share interfaces like fit/predict or search.",
    packages: [],
    sections: [
      {
        heading: "Inheritance and super()",
        basicTip: "Subclass calls super().__init__ then stores extra state.",
        basicCode: `class Base:
    def __init__(self, name):
        self.name = name

class Child(Base):
    def __init__(self, name, k):
        super().__init__(name)
        self.k = k

print(Child("rag", 3).name)`,
        body: `\`class Child(Parent):\` inherits attributes and methods.

Override a method by redefining it. Call \`super().method()\` to extend the parent.

Always call \`super().__init__(...)\` in subclass constructors.
Keep hierarchies shallow.`,
      },
      {
        heading: "Duck Typing",
        basicTip: "Call the same method name on two different objects.",
        basicCode: `class A:
    def search(self, q):
        return ["a:" + q]

class B:
    def search(self, q):
        return ["b:" + q]

print(A().search("x"), B().search("x"))`,
        body: `If an object has the method you need, it works. No shared base class is required.

That is duck typing. Pipelines only care about \`.search(query)\` or \`.predict(X)\`.

Use \`abc.ABC\` with \`@abstractmethod\` when you want Python to enforce the contract.`,
      },
      {
        heading: "Dunder Methods",
        basicTip: "Implement __len__ so len(obj) works.",
        basicCode: `class Chunks:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

print(len(Chunks(["a", "b"])))`,
        body: `Special methods hook into Python syntax:

- \`__repr__\` - debug print
- \`__len__\` - \`len(obj)\`
- \`__getitem__\` - \`obj[i]\`
- \`__call__\` - \`obj(...)\`

\`@property\` turns a method into a read-only attribute like \`budget.remaining\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: shared search interface",
        note: "The pipeline only needs .search().",
        why: "Pipelines care about the method name, not the class tree.",
        aiMl: "You can swap a vector store for a keyword store if both expose search.",
        code: `class VectorStore:
    def search(self, query):
        return [f"vector:{query}"]

class SqlStore:
    def search(self, query):
        return [f"sql:{query}"]

for store in [VectorStore(), SqlStore()]:
    print(store.search("mlops"))`,
      },
      {
        title: "AI / ML: abstract retriever base",
        note: "Incomplete subclasses fail at construction time.",
        why: "ABCs fail fast when a required method is missing.",
        aiMl: "Retriever bases force search() to exist before you deploy.",
        code: `from abc import ABC, abstractmethod

class BaseRetriever(ABC):
    @abstractmethod
    def search(self, query):
        pass

class EchoRetriever(BaseRetriever):
    def search(self, query):
        return [query]

print(EchoRetriever().search("rag"))`,
      },
    ],
    tryIt: {
      title: "Implement a scikit-learn style estimator",
      hint: "Add a third estimator class with its own fit/predict and append it to the list.",
      starter: `from abc import ABC, abstractmethod

class Estimator(ABC):
    @abstractmethod
    def fit(self, X, y):
        ...

    @abstractmethod
    def predict(self, X):
        ...

    def __repr__(self):
        return f"{self.__class__.__name__}()"

class MeanRegressor(Estimator):
    def fit(self, X, y):
        self.mean_ = sum(y) / len(y)
        return self

    def predict(self, X):
        return [self.mean_ for _ in X]

class LastValueRegressor(Estimator):
    def fit(self, X, y):
        self.last_ = y[-1]
        return self

    def predict(self, X):
        return [self.last_ for _ in X]

X_train = [[1], [2], [3], [4]]
y_train = [10.0, 12.0, 14.0, 20.0]
X_test = [[5], [6]]

for model in [MeanRegressor(), LastValueRegressor()]:
    preds = model.fit(X_train, y_train).predict(X_test)
    print(f"{model!r:24} -> {preds}")`,
    },
    takeaways: [
      "Always call super().__init__() in a subclass constructor.",
      "Duck typing means any object with the right method works.",
      "Define __repr__ and use @property for computed attributes.",
    ],
  },
  {
    slug: "regular-expressions",
    title: "Python RegEx",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "Search, findall, groups, and substitution with the re module.",
    whyForAi:
      "Extract JSON from LLM replies, parse logs, and redact emails before prompts leave your system.",
    packages: [],
    sections: [
      {
        heading: "re.search and findall",
        basicTip: "Find digits in a short log line.",
        basicCode: `import re
print(re.findall(r"\\d+", "latency_ms=120"))`,
        body: `Import \`re\`, then:

- \`re.search\` - first match anywhere
- \`re.findall\` - every match as a list
- \`re.sub\` - replace
- \`re.compile\` - compile once, reuse

Always write patterns as raw strings: \`r"\\d+"\`.
A match object is truthy, so \`if re.search(...):\` works.`,
      },
      {
        heading: "Pattern Basics",
        basicTip: "Use a lazy match between two markers.",
        basicCode: `import re
text = "<a>one</a><a>two</a>"
print(re.findall(r"<a>(.*?)</a>", text))`,
        body: `Useful pieces:

- \`\\d\` digit, \`\\w\` word char, \`\\s\` whitespace
- \`*\` \`+\` \`?\` for counts
- \`( ... )\` capture group
- \`.*?\` lazy match (stops early)

Quantifiers are greedy by default. Use \`?\` after \`*\` or \`+\` when extracting between markers.`,
      },
      {
        heading: "When Not to Use RegEx",
        basicTip: "Prefer json.loads for nested JSON.",
        basicCode: `import json
print(json.loads('{"score": 0.9}')["score"])`,
        body: `Do not parse nested JSON or HTML with regex. Use \`json.loads\` or an HTML parser.

Compile patterns used inside loops with \`re.compile\`.

Keep patterns simple. Nested quantifiers can become very slow.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: extract JSON from a reply",
        note: "Find the first {...} block, then parse it.",
        why: "Models often wrap JSON in prose.",
        aiMl: "Structured-output helpers search for JSON before json.loads.",
        code: `import json
import re

reply = 'Sure! {"sentiment": "positive", "confidence": 0.92} done.'
match = re.search(r"\\{.*\\}", reply)
data = json.loads(match.group())
print(data["confidence"])`,
      },
      {
        title: "AI / ML: redact emails",
        note: "Replace emails before sending text to a model.",
        why: "PII should be stripped at the boundary.",
        aiMl: "Pre-LLM redaction replaces emails and phones in prompts.",
        code: `import re

text = "Contact priya@example.com today."
clean = re.sub(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "[EMAIL]", text)
print(clean)`,
      },
    ],
    tryIt: {
      title: "Extract hyperparameters from a training log",
      hint: "Add a new key=value pair to the log line and confirm it is captured.",
      starter: `import re

log = ("2026-09-04 10:22:31 INFO run=exp-12 model=bert-base lr=2e-5 "
       "batch_size=32 epochs=3 accuracy=0.9134 loss=0.2871")

pairs = re.findall(r"(\\w+)=([\\w.\\-]+)", log)

config = {}
for key, value in pairs:
    try:
        config[key] = float(value) if re.fullmatch(r"[\\d.e+-]+", value) else value
    except ValueError:
        config[key] = value

for key, value in config.items():
    print(f"{key:12} = {value!r}")

timestamp = re.search(r"^(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})", log)
print("\\ntimestamp:", timestamp.group(1) if timestamp else "not found")
print("accuracy above 0.9:", config.get("accuracy", 0) > 0.9)`,
    },
    takeaways: [
      "Write patterns as raw strings; compile patterns used in loops.",
      "Use .*? when extracting between markers.",
      "Never parse nested JSON or HTML with regex.",
    ],
  },
  {
    slug: "dates-and-times",
    title: "Python Dates",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "Create datetimes, add durations, format and parse timestamps, and prefer UTC.",
    whyForAi:
      "Log timestamps, training windows, and daily token reports all use datetime.",
    packages: [],
    sections: [
      {
        heading: "datetime Objects",
        basicTip: "Create an aware UTC datetime and print ISO format.",
        basicCode: `from datetime import datetime, timezone
now = datetime(2026, 9, 4, tzinfo=timezone.utc)
print(now.isoformat())`,
        body: `The \`datetime\` module gives you \`date\`, \`datetime\`, \`timedelta\`, and \`timezone\`.

Prefer UTC for stored data: \`datetime.now(timezone.utc)\`.

A datetime is naive (no timezone) or aware (has one). Mixing them raises \`TypeError\`.`,
      },
      {
        heading: "Format and Parse",
        basicTip: "Parse a log timestamp with strptime.",
        basicCode: `from datetime import datetime
print(datetime.strptime("2026-09-04 10:22:31", "%Y-%m-%d %H:%M:%S"))`,
        body: `\`strftime\` formats a datetime as text. \`strptime\` parses text into a datetime.

For machine data use ISO: \`dt.isoformat()\` and \`datetime.fromisoformat()\`.

Common codes: \`%Y\` year, \`%m\` month, \`%d\` day, \`%H\` hour, \`%M\` minute, \`%S\` second.`,
      },
      {
        heading: "timedelta and Timing",
        basicTip: "Measure a short loop with perf_counter.",
        basicCode: `import time
start = time.perf_counter()
_ = sum(range(1000))
print(round((time.perf_counter() - start) * 1000, 3), "ms")`,
        body: `\`timedelta\` is a duration. Subtract two datetimes to get one.

Store UTC, display local. Use aware datetimes at API and database boundaries.

Measure work time with \`time.perf_counter()\`, not \`datetime.now()\` differences.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: training window duration",
        note: "Subtract two aware datetimes to get hours.",
        why: "Training windows and retention cutoffs are timedelta math.",
        aiMl: "Run manifests store started/finished UTC stamps and derive duration.",
        code: `from datetime import datetime, timedelta, timezone

start = datetime(2026, 9, 1, 9, 0, tzinfo=timezone.utc)
end = datetime(2026, 9, 4, 17, 30, tzinfo=timezone.utc)
duration = end - start
print(round(duration.total_seconds() / 3600, 2), "hours")
print("next run:", (end + timedelta(hours=6)).isoformat())`,
      },
      {
        title: "AI / ML: group tokens by day",
        note: "Key each call on its UTC date.",
        why: "Cost reports group events by calendar day.",
        aiMl: "Token-usage rollups key on the UTC date of each LLM call.",
        code: `from collections import defaultdict
from datetime import datetime, timezone

calls = [
    {"ts": "2026-09-02T10:00:00+00:00", "tokens": 500},
    {"ts": "2026-09-02T18:30:00+00:00", "tokens": 700},
    {"ts": "2026-09-03T09:15:00+00:00", "tokens": 1200},
]
by_day = defaultdict(int)
for call in calls:
    day = datetime.fromisoformat(call["ts"]).astimezone(timezone.utc).date()
    by_day[day] += call["tokens"]
print(dict(by_day))`,
      },
    ],
    tryIt: {
      title: "Build a run manifest with timestamps",
      hint: "Change the training duration and confirm the finish time and rate update.",
      starter: `from datetime import datetime, timedelta, timezone

started = datetime(2026, 9, 4, 9, 0, tzinfo=timezone.utc)
training_time = timedelta(hours=2, minutes=45)
finished = started + training_time
samples = 120_000

manifest = {
    "run_id": "exp-" + started.strftime("%Y%m%d-%H%M"),
    "started_utc": started.isoformat(),
    "finished_utc": finished.isoformat(),
    "duration_minutes": round(training_time.total_seconds() / 60, 1),
    "samples_per_second": round(samples / training_time.total_seconds(), 2),
    "expires_on": (finished + timedelta(days=90)).date().isoformat(),
}

for key, value in manifest.items():
    print(f"{key:20} {value}")

print("\\nhuman readable:", finished.strftime("%A, %d %B %Y at %H:%M UTC"))`,
    },
    takeaways: [
      "Store UTC with aware datetimes; convert to local only for display.",
      "Use isoformat/fromisoformat for machine data.",
      "Measure elapsed time with time.perf_counter.",
    ],
  },
  {
    slug: "standard-library-toolkit",
    title: "Python Standard Library",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "collections, itertools, functools, hashlib, uuid, os, and sys for everyday tasks.",
    whyForAi:
      "Counting labels, grouping records, caching embeds, and making request ids are daily stdlib jobs.",
    packages: [],
    sections: [
      {
        heading: "collections",
        basicTip: "Count labels with Counter.",
        basicCode: `from collections import Counter
print(Counter(["pos", "neg", "pos"]))`,
        body: `Handy types:

- \`Counter\` - counts with \`.most_common(n)\`
- \`defaultdict\` - auto-creates missing keys
- \`deque\` - fast ends, optional \`maxlen\` rolling window

Use Counter for label distributions and token frequencies.`,
      },
      {
        heading: "functools and itertools",
        basicTip: "Build a tiny hyperparameter grid with product.",
        basicCode: `import itertools
print(list(itertools.product([1e-5, 2e-5], [16, 32])))`,
        body: `\`functools.lru_cache\` memoizes pure functions. \`partial\` pre-fills arguments.

\`itertools.product\` builds grids. \`groupby\` needs sorted input first. \`islice\` takes a slice from a long stream.`,
      },
      {
        heading: "uuid, hashlib, os",
        basicTip: "Make a short request id with uuid4.",
        basicCode: `import uuid
print(str(uuid.uuid4())[:8])`,
        body: `\`uuid.uuid4()\` makes unique request and run ids.

\`hashlib.sha256\` fingerprints datasets and cache keys.

\`os.getenv\` reads config. \`sys.version_info\` checks the Python version.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: label distribution",
        note: "Class imbalance shows up immediately.",
        why: "Counting labels is the first dataset audit step.",
        aiMl: "Dataset checks print Counter(labels).most_common before training.",
        code: `from collections import Counter

labels = ["positive"] * 7 + ["negative"] * 2 + ["neutral"]
counts = Counter(labels)
print(counts)
print(counts.most_common(2))`,
      },
      {
        title: "AI / ML: request id and fingerprint",
        note: "Unique id for a call, hash for a dataset.",
        why: "Tracing and reproducibility need stable helpers.",
        aiMl: "LLM traces use uuid. Dataset checks use sha256 fingerprints.",
        code: `import hashlib
import json
import uuid

print("request:", str(uuid.uuid4())[:8])
rows = [{"text": "a", "label": 1}]
fp = hashlib.sha256(json.dumps(rows, sort_keys=True).encode()).hexdigest()
print("fingerprint:", fp[:16])`,
      },
    ],
    tryIt: {
      title: "Analyse a batch of model calls",
      hint: "Add more calls and watch the Counter and rolling window update.",
      starter: `from collections import Counter, defaultdict, deque

calls = [
    {"model": "mini", "status": "ok", "latency": 620},
    {"model": "large", "status": "ok", "latency": 1800},
    {"model": "mini", "status": "timeout", "latency": 30000},
    {"model": "mini", "status": "ok", "latency": 540},
    {"model": "large", "status": "error", "latency": 900},
]

status_counts = Counter(c["status"] for c in calls)
by_model = defaultdict(list)
for c in calls:
    by_model[c["model"]].append(c["latency"])

print("status distribution:", dict(status_counts))
print("success rate:", f"{status_counts['ok'] / len(calls):.0%}")

print("\\nper-model latency:")
for model, latencies in by_model.items():
    print(f"  {model:6} n={len(latencies)} avg={sum(latencies) / len(latencies):8.1f} max={max(latencies)}")

recent = deque(maxlen=3)
for c in calls:
    recent.append(c["latency"])
print("\\nlast 3 latencies:", list(recent))`,
    },
    takeaways: [
      "Counter for distributions, defaultdict for grouping, deque for windows.",
      "lru_cache memoizes pure functions; groupby needs sorted input.",
      "uuid4 for ids, sha256 for fingerprints.",
    ],
  },
];
