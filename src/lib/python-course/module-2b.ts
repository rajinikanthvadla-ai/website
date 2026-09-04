import type { PythonLesson } from "./types";

/** Additional Module 2 lessons: lambda, iterators, scope, OOP depth, regex, dates, stdlib. */
export const MODULE_2B_LESSONS: PythonLesson[] = [
  {
    slug: "lambda-map-filter",
    title: "Lambda, map, filter, and sorting",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 16,
    summary:
      "Anonymous functions and the functional built-ins used for sorting, ranking, and transforming records.",
    whyForAi:
      "Ranking retrieved chunks by score, sorting model results by latency, and applying a transform across a pandas column all use a `key=lambda` or a callable. It is the most common place a one-line function belongs.",
    packages: [],
    sections: [
      {
        heading: "lambda",
        body: `\`lambda args: expression\` creates a function without naming it. It holds a **single expression** — no statements, no loops, no assignments — and returns its value automatically.

\`add = lambda a, b: a + b\` works but is bad style. If it deserves a name, use \`def\`; PEP 8 says so explicitly, and \`def\` gives a useful name in tracebacks.

Lambda's real home is as an argument: \`sorted(items, key=lambda x: x["score"])\`.`,
      },
      {
        heading: "sorted with key and reverse",
        body: `\`sorted(iterable, key=..., reverse=...)\` returns a new list; \`list.sort(...)\` sorts in place and returns \`None\`.

The \`key\` function is applied to each element and the results are compared. Sorting dicts by a field, strings by length, or tuples by their second item are all one-liners.

Multi-level sort: return a tuple from \`key\`. \`key=lambda r: (-r["score"], r["id"])\` sorts by score descending, then id ascending. Negating a number is the standard trick for mixing directions.

Python's sort is **stable**: equal keys keep their original order, so you can sort by one field, then another, and the earlier order survives inside ties.

\`operator.itemgetter("score")\` and \`attrgetter("score")\` are faster, clearer alternatives to lambda for simple field access.`,
      },
      {
        heading: "map, filter, and reduce",
        body: `\`map(fn, iterable)\` applies a function to each item. \`filter(fn, iterable)\` keeps items where the function is truthy. Both return lazy iterators — wrap in \`list()\` to see them.

In modern Python a **comprehension is usually preferred**: \`[f(x) for x in xs]\` reads better than \`list(map(f, xs))\`. Reach for \`map\` when the function already exists by name.

\`functools.reduce(fn, iterable, initial)\` folds a sequence into one value. Most uses are better served by \`sum\`, \`min\`, \`max\`, or \`math.prod\` — keep \`reduce\` for genuinely custom accumulation.

\`min\` and \`max\` also accept \`key\`, which is the cleanest way to pick the best-scoring record.`,
      },
    ],
    examples: [
      {
        title: "Ranking retrieved chunks",
        note: "This is the reranking step of a RAG pipeline in one line.",
        code: `chunks = [
    {"id": "c1", "score": 0.71, "text": "python basics"},
    {"id": "c3", "score": 0.94, "text": "rag pipelines"},
    {"id": "c2", "score": 0.71, "text": "vector search"},
]

ranked = sorted(chunks, key=lambda c: c["score"], reverse=True)
for c in ranked:
    print(f"{c['id']} {c['score']:.2f} {c['text']}")

print("\\nbest:", max(chunks, key=lambda c: c["score"])["id"])
print("worst:", min(chunks, key=lambda c: c["score"])["id"])`,
      },
      {
        title: "Multi-level sort and stability",
        note: "Tuple keys sort by several fields; negate a number to flip direction.",
        code: `runs = [
    {"model": "b", "score": 0.90, "latency": 300},
    {"model": "a", "score": 0.90, "latency": 120},
    {"model": "c", "score": 0.85, "latency": 100},
]

by_score_then_latency = sorted(runs, key=lambda r: (-r["score"], r["latency"]))
for r in by_score_then_latency:
    print(f"{r['model']}  score={r['score']:.2f}  latency={r['latency']}")

from operator import itemgetter
print("\\nitemgetter version:", [r["model"] for r in sorted(runs, key=itemgetter("latency"))])`,
      },
      {
        title: "map, filter, and comprehension side by side",
        note: "Same result three ways — the comprehension is usually clearest.",
        code: `scores = [0.91, 0.44, 0.78, 0.62, 0.95]

as_percent_map = list(map(lambda s: round(s * 100), scores))
as_percent_comp = [round(s * 100) for s in scores]

high_filter = list(filter(lambda s: s >= 0.7, scores))
high_comp = [s for s in scores if s >= 0.7]

print("map        :", as_percent_map)
print("comprehension:", as_percent_comp)
print("filter     :", high_filter)
print("comprehension:", high_comp)

print("map with a named function:", list(map(str.upper, ["mlops", "rag"])))`,
      },
      {
        title: "reduce and its better alternatives",
        note: "Use reduce only when no built-in fits.",
        code: `import functools
import math

tokens = [120, 340, 88, 502]

print("sum built-in :", sum(tokens))
print("reduce sum   :", functools.reduce(lambda a, b: a + b, tokens))
print("math.prod    :", math.prod([2, 3, 4]))

# A genuine reduce: merge a list of config dicts left to right.
configs = [{"lr": 1e-3}, {"epochs": 3}, {"lr": 2e-5, "fp16": True}]
merged = functools.reduce(lambda acc, d: {**acc, **d}, configs, {})
print("merged config:", merged)`,
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
      "lambda holds one expression and belongs inline as a key= argument.",
      "sorted(key=lambda r: (-r.score, r.id)) does multi-level sorting; Python's sort is stable.",
      "Prefer comprehensions over map/filter; use min/max with key to pick the best record.",
    ],
  },
  {
    slug: "iterators-and-iterables",
    title: "Iterators, iterables, and zip",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "How for-loops really work, building your own iterator, and the pairing tools zip, enumerate, and itertools.",
    whyForAi:
      "PyTorch DataLoaders, Hugging Face datasets, streaming API responses, and file readers are all iterators. Understanding the protocol explains why a dataset can be consumed only once and why a generator uses no memory.",
    packages: [],
    sections: [
      {
        heading: "The iteration protocol",
        body: `An **iterable** can produce an iterator: it implements \`__iter__\`. Lists, strings, dicts, sets, and files are iterables.

An **iterator** produces values one at a time: it implements \`__next__\` and raises \`StopIteration\` when exhausted.

\`for x in items:\` is shorthand for: call \`iter(items)\` to get an iterator, then call \`next()\` repeatedly until \`StopIteration\`.

The key consequence: an iterator is **consumed**. A list can be looped many times; a generator or a \`zip\` object cannot. Looping it a second time yields nothing — a silent bug that shows up as an empty second epoch or an empty validation set.

If you need to iterate twice, materialise with \`list()\` first, or rebuild the iterator.`,
      },
      {
        heading: "zip, enumerate, and unpacking",
        body: `\`zip(a, b)\` pairs elements positionally and **stops at the shortest** input. That silent truncation is the classic bug when features and labels have different lengths — pass \`strict=True\` (Python 3.10+) to raise instead.

\`enumerate(seq, start=1)\` gives index and value together, which is cleaner than \`range(len(seq))\`.

Unzip with \`zip(*pairs)\`. Tuple unpacking in the loop header (\`for name, score in pairs:\`) keeps loops readable, and \`for i, (name, score) in enumerate(pairs):\` combines both.`,
      },
      {
        heading: "Writing your own iterator",
        body: `Implement \`__iter__\` (returning \`self\`) and \`__next__\` (returning the next value or raising \`StopIteration\`).

In practice a **generator function is almost always simpler** — \`yield\` gives you the same protocol for free. Write a class only when the iterator needs to carry substantial state or extra methods.

\`itertools\` covers the standard patterns: \`islice\` (take n from an infinite stream), \`chain\` (join iterables), \`cycle\`, \`count\`, \`groupby\`, \`product\` (hyperparameter grids), and \`combinations\`.`,
      },
    ],
    examples: [
      {
        title: "What a for-loop actually does",
        note: "Manual iteration makes StopIteration visible.",
        code: `items = ["a", "b", "c"]
it = iter(items)

print(next(it))
print(next(it))
print(next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration -> the for-loop would end here")

print("list is re-iterable:", list(items), list(items))`,
      },
      {
        title: "Iterators are consumed once",
        note: "Run this — the second loop over the generator prints nothing.",
        code: `def batches(n):
    for i in range(n):
        yield f"batch-{i}"

gen = batches(3)
print("first pass :", list(gen))
print("second pass:", list(gen), "<- empty, already consumed")

pairs = zip([1, 2, 3], ["a", "b", "c"])
print("zip first  :", list(pairs))
print("zip second :", list(pairs), "<- also empty")

materialised = list(batches(3))
print("materialised twice:", materialised, materialised)`,
      },
      {
        title: "zip truncation and strict mode",
        note: "Mismatched feature and label lengths fail silently without strict=True.",
        code: `features = [[1, 2], [3, 4], [5, 6]]
labels = [0, 1]

print("silently truncated:", list(zip(features, labels)))

try:
    list(zip(features, labels, strict=True))
except ValueError as err:
    print("strict caught it:", err)

names = ["mlops", "rag", "agents"]
scores = [0.9, 0.8, 0.7]
for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{i}. {name:8} {score:.2f}")

unzipped_names, unzipped_scores = zip(*zip(names, scores))
print("unzipped:", unzipped_names, unzipped_scores)`,
      },
      {
        title: "A custom iterator class vs a generator",
        note: "Both satisfy the protocol; the generator is four lines shorter.",
        code: `class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

def countdown(start):
    while start > 0:
        yield start
        start -= 1

print("class    :", list(Countdown(4)))
print("generator:", list(countdown(4)))`,
      },
      {
        title: "itertools for real tasks",
        note: "product builds hyperparameter grids; islice safely samples an infinite stream.",
        code: `import itertools

grid = list(itertools.product([1e-5, 2e-5], [16, 32], ["adam", "adamw"]))
print("grid size:", len(grid))
for lr, batch, opt in grid[:4]:
    print(f"  lr={lr} batch={batch} optimizer={opt}")

infinite = itertools.count(start=100, step=50)
print("\\nfirst 4 of an infinite counter:", list(itertools.islice(infinite, 4)))
print("chained:", list(itertools.chain([1, 2], [3, 4])))
print("pairs:", list(itertools.combinations(["a", "b", "c"], 2)))`,
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
      "Generators and zip objects are consumed once — materialise with list() to reuse.",
      "zip truncates to the shortest input unless you pass strict=True.",
    ],
  },
  {
    slug: "scope-and-closures",
    title: "Scope, closures, and mutability",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "Where names live, why a function cannot reassign a global, and how passing a list differs from passing a number.",
    whyForAi:
      "Mutable default arguments and accidentally shared state cause bugs that only appear on the second call — exactly the kind that survive testing and break in production batch jobs.",
    packages: [],
    sections: [
      {
        heading: "The LEGB rule",
        body: `Python resolves a name by searching four scopes in order:

1. **Local** — inside the current function
2. **Enclosing** — an outer function, for nested definitions
3. **Global** — module level
4. **Built-in** — \`len\`, \`print\`, \`sum\`, and friends

Reading a global from inside a function is fine. **Assigning** to that name creates a new local instead, which produces \`UnboundLocalError\` if you read it before assigning in the same function.

\`global x\` and \`nonlocal x\` opt out of that behaviour. Both are usually a design smell — prefer passing values in and returning results out, which keeps functions testable.

Never shadow built-ins. Naming a variable \`list\`, \`dict\`, \`sum\`, \`id\`, or \`type\` breaks the built-in for the rest of that scope.`,
      },
      {
        heading: "Mutable vs immutable arguments",
        body: `Python passes **references to objects**. What changes is whether the object itself can be modified.

- **Immutable** (int, float, str, tuple, frozenset): a function cannot alter the caller's value. Rebinding inside the function is purely local.
- **Mutable** (list, dict, set, and most custom objects): a function *can* modify the caller's object in place, and that change is visible outside.

So \`items.append(x)\` inside a function affects the caller, while \`items = items + [x]\` does not — the second creates a new list bound to a local name.

Either mutate deliberately and document it, or copy first. \`list(original)\` and \`dict(original)\` give shallow copies; \`copy.deepcopy\` handles nested structures, at a cost.`,
      },
      {
        heading: "Closures",
        body: `A closure is a nested function that captures variables from its enclosing scope and keeps them alive after the outer function returns.

That is the machinery behind decorators, and behind factory functions like \`make_scorer(threshold)\` that produce a configured function.

The classic trap: closures capture the **variable**, not its value at creation time. Creating functions in a loop that all reference the loop variable gives every one of them the final value. Bind the value with a default argument (\`lambda x, t=threshold: ...\`) or use \`functools.partial\`.`,
      },
    ],
    examples: [
      {
        title: "LEGB and UnboundLocalError",
        note: "Reading a global works; assigning to it makes the name local.",
        code: `model_name = "global-model"

def read_only():
    return f"reading: {model_name}"

def shadowed():
    model_name = "local-model"        # new local, global untouched
    return f"local: {model_name}"

def broken():
    print(model_name)                 # error: local assigned below
    model_name = "oops"

print(read_only())
print(shadowed())
print("global still:", model_name)

try:
    broken()
except UnboundLocalError as err:
    print("UnboundLocalError:", err)`,
      },
      {
        title: "Mutable arguments change the caller's data",
        note: "append mutates; rebinding does not. Run it and compare.",
        code: `def mutates(items):
    items.append("added inside")
    return items

def rebinds(items):
    items = items + ["added inside"]
    return items

original_a = ["start"]
mutates(original_a)
print("after mutates :", original_a, "<- caller changed")

original_b = ["start"]
rebinds(original_b)
print("after rebinds :", original_b, "<- caller untouched")

def safe(items):
    local = list(items)               # copy first
    local.append("added inside")
    return local

original_c = ["start"]
print("safe returns  :", safe(original_c), "| original:", original_c)`,
      },
      {
        title: "Shallow vs deep copy",
        note: "A shallow copy shares the nested objects.",
        code: `import copy

config = {"model": "m1", "params": {"lr": 1e-3}}

shallow = dict(config)
shallow["params"]["lr"] = 999
print("after shallow edit, original lr:", config["params"]["lr"], "<- changed too")

config["params"]["lr"] = 1e-3
deep = copy.deepcopy(config)
deep["params"]["lr"] = 999
print("after deep edit, original lr   :", config["params"]["lr"], "<- safe")`,
      },
      {
        title: "Closures and the late-binding trap",
        note: "The first list of functions all return the same value. The fix binds the value.",
        code: `def make_threshold_filter(threshold):
    def keep(score):
        return score >= threshold
    return keep

strict = make_threshold_filter(0.9)
loose = make_threshold_filter(0.5)
print("strict(0.7):", strict(0.7), "| loose(0.7):", loose(0.7))

broken = [lambda s: s >= t for t in (0.5, 0.7, 0.9)]
fixed = [lambda s, t=t: s >= t for t in (0.5, 0.7, 0.9)]

print("\\nbroken (all use 0.9):", [f(0.8) for f in broken])
print("fixed  (0.5/0.7/0.9):", [f(0.8) for f in fixed])`,
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
      "Names resolve Local, Enclosing, Global, Built-in; assigning makes a name local.",
      "Mutable arguments can be changed by the callee — copy first if that is not intended.",
      "Closures capture variables, not values; bind with a default argument inside loops.",
    ],
  },
  {
    slug: "inheritance-and-polymorphism",
    title: "Inheritance, polymorphism, and dunder methods",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "Subclassing, method resolution order, abstract base classes, properties, and the special methods that make objects feel built-in.",
    whyForAi:
      "Every custom PyTorch model subclasses nn.Module, every LangChain tool subclasses a base class, and scikit-learn estimators all expose the same fit/predict interface. Polymorphism is why you can swap one retriever for another without changing the pipeline.",
    packages: [],
    sections: [
      {
        heading: "Inheritance and super()",
        body: `\`class Child(Parent):\` inherits every attribute and method. Override by redefining; extend by calling \`super().method()\` inside the override.

Always call \`super().__init__(...)\` in a subclass constructor. Forgetting it in a PyTorch \`nn.Module\` is a classic error — the module's internal registries never get set up and parameters go missing.

**Method resolution order** (MRO) decides which implementation wins with multiple inheritance. Inspect it with \`Class.__mro__\`. Python uses C3 linearisation: left to right, depth first, and no class appears before its subclasses.

Keep hierarchies shallow. Two levels is usually plenty; beyond that, composition is easier to follow and test.`,
      },
      {
        heading: "Polymorphism and duck typing",
        body: `Polymorphism means different classes respond to the same call in their own way. A loop over mixed retrievers calling \`.search(query)\` does not care which class each one is.

Python uses **duck typing**: if it has the method, it works. No shared base class is required. This is why scikit-learn estimators interoperate — they all implement \`fit\` and \`predict\`.

When you want the contract enforced, use \`abc.ABC\` with \`@abstractmethod\`. Python then refuses to instantiate a subclass that has not implemented every abstract method, turning a runtime \`AttributeError\` into an immediate, clear failure.

\`typing.Protocol\` offers the same guarantee for static checkers without requiring inheritance.`,
      },
      {
        heading: "Dunder methods and properties",
        body: `Special methods let your objects work with Python's own syntax:

| Method | Enables |
| --- | --- |
| \`__init__\` | construction |
| \`__repr__\` | debugging output |
| \`__str__\` | \`print()\` / \`str()\` |
| \`__len__\` | \`len(obj)\` |
| \`__getitem__\` | \`obj[i]\`, and iteration |
| \`__iter__\` | \`for x in obj\` |
| \`__eq__\` | \`==\` |
| \`__call__\` | \`obj(...)\` |
| \`__contains__\` | \`x in obj\` |
| \`__enter__\` / \`__exit__\` | \`with obj:\` |

Define \`__repr__\` on every class you debug. Without it you get \`<Chunk object at 0x7f...>\`, which tells you nothing.

\`@property\` turns a method into a read-only attribute, so a computed value like \`remaining\` is accessed as \`budget.remaining\`. It lets you add validation later without changing every call site.`,
      },
    ],
    examples: [
      {
        title: "An abstract base class with two implementations",
        note: "Python refuses to instantiate a subclass that skips an abstract method.",
        code: `from abc import ABC, abstractmethod

class BaseRetriever(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def search(self, query, top_k=2):
        """Return a list of matching documents."""

    def describe(self):
        return f"{self.__class__.__name__}(name={self.name!r})"

class KeywordRetriever(BaseRetriever):
    def __init__(self, docs):
        super().__init__("keyword")
        self.docs = docs

    def search(self, query, top_k=2):
        terms = set(query.lower().split())
        hits = [d for d in self.docs if terms & set(d.lower().split())]
        return hits[:top_k]

class EchoRetriever(BaseRetriever):
    def __init__(self):
        super().__init__("echo")

    def search(self, query, top_k=2):
        return [f"echo: {query}"]

class Incomplete(BaseRetriever):
    pass

docs = ["python for ml", "kubernetes scaling", "python rag apps"]
for retriever in [KeywordRetriever(docs), EchoRetriever()]:
    print(retriever.describe(), "->", retriever.search("python rag"))

try:
    Incomplete("broken")
except TypeError as err:
    print("blocked:", err)`,
      },
      {
        title: "Duck typing: no shared base needed",
        note: "The pipeline only cares that each object has .search().",
        code: `class VectorStore:
    def search(self, query):
        return [f"vector-hit for {query}"]

class SqlStore:
    def search(self, query):
        return [f"sql-row for {query}"]

def run_pipeline(stores, query):
    results = []
    for store in stores:
        results.extend(store.search(query))
    return results

print(run_pipeline([VectorStore(), SqlStore()], "mlops"))`,
      },
      {
        title: "Dunder methods make a class feel built-in",
        note: "len(), indexing, iteration, printing, and == all come from special methods.",
        code: `class ChunkSet:
    def __init__(self, chunks):
        self.chunks = list(chunks)

    def __len__(self):
        return len(self.chunks)

    def __getitem__(self, index):
        return self.chunks[index]

    def __contains__(self, text):
        return any(text in c for c in self.chunks)

    def __eq__(self, other):
        return isinstance(other, ChunkSet) and self.chunks == other.chunks

    def __repr__(self):
        return f"ChunkSet({len(self.chunks)} chunks)"

    def __str__(self):
        return " | ".join(self.chunks)

cs = ChunkSet(["python basics", "rag pipeline", "vector search"])
print(repr(cs))
print(str(cs))
print("len       :", len(cs))
print("index     :", cs[1])
print("slice     :", cs[:2])
print("membership:", "rag" in cs)
print("iteration :", [c.split()[0] for c in cs])
print("equality  :", cs == ChunkSet(["python basics", "rag pipeline", "vector search"]))`,
      },
      {
        title: "Properties with validation",
        note: "Computed and guarded attributes without changing the call site.",
        code: `class TokenBudget:
    def __init__(self, limit):
        self._limit = limit
        self._used = 0

    @property
    def used(self):
        return self._used

    @property
    def remaining(self):
        return self._limit - self._used

    @property
    def limit(self):
        return self._limit

    @limit.setter
    def limit(self, value):
        if value < self._used:
            raise ValueError("limit cannot be below tokens already used")
        self._limit = value

    def spend(self, tokens):
        if tokens > self.remaining:
            raise RuntimeError("budget exceeded")
        self._used += tokens

budget = TokenBudget(1000)
budget.spend(300)
print("used:", budget.used, "remaining:", budget.remaining)

budget.limit = 2000
print("raised limit, remaining:", budget.remaining)

try:
    budget.limit = 100
except ValueError as err:
    print("setter guard:", err)`,
      },
      {
        title: "Method resolution order",
        note: "MRO decides which parent method wins with multiple inheritance.",
        code: `class Timed:
    def run(self):
        return "timed"

class Cached:
    def run(self):
        return "cached"

class Service(Timed, Cached):
    pass

print("result:", Service().run())
print("MRO:", [c.__name__ for c in Service.__mro__])`,
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
      "Duck typing means any object with the right method works; ABCs enforce the contract.",
      "Define __repr__ everywhere, and use @property for computed or validated attributes.",
    ],
  },
  {
    slug: "regular-expressions",
    title: "Regular expressions",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "Pattern matching for logs, scraped text, and model output — search, findall, groups, and substitution.",
    whyForAi:
      "Extracting JSON from a chatty LLM response, stripping markdown fences, pulling error codes out of logs, redacting emails and phone numbers before they reach a model, and cleaning scraped documents are all regex jobs.",
    packages: [],
    sections: [
      {
        heading: "The core functions",
        body: `\`import re\`, then:

- \`re.search(pattern, text)\` — first match anywhere, or \`None\`
- \`re.match(pattern, text)\` — must match at the **start**
- \`re.fullmatch\` — must match the whole string
- \`re.findall\` — every match as a list
- \`re.finditer\` — every match as objects, with positions
- \`re.sub(pattern, repl, text)\` — replace
- \`re.split(pattern, text)\` — split on a pattern
- \`re.compile(pattern)\` — compile once, reuse in a loop

Always write patterns as **raw strings**: \`r"\\d+"\`. Without the \`r\`, Python interprets the backslash first and the pattern breaks.

A match object is truthy, so \`if re.search(...)\` reads naturally. Get the text with \`.group()\`, and the position with \`.start()\`.`,
      },
      {
        heading: "Pattern syntax",
        body: `| Pattern | Matches |
| --- | --- |
| \`.\` | any character except newline |
| \`\\d\` \`\\D\` | digit / non-digit |
| \`\\w\` \`\\W\` | word character / non-word |
| \`\\s\` \`\\S\` | whitespace / non-whitespace |
| \`^\` \`$\` | start / end of string |
| \`\\b\` | word boundary |
| \`*\` \`+\` \`?\` | 0+, 1+, 0 or 1 |
| \`{2,5}\` | between 2 and 5 |
| \`[abc]\` \`[^abc]\` | character set / negated |
| \`(...)\` | capture group |
| \`(?:...)\` | group without capturing |
| \`(?P<name>...)\` | named group |
| \`a|b\` | either |

Quantifiers are **greedy** by default — \`.*\` grabs as much as possible. Add \`?\` to make them lazy: \`.*?\` stops at the first opportunity. Extracting content between two markers almost always needs the lazy form.

Useful flags: \`re.IGNORECASE\`, \`re.MULTILINE\` (\`^\`/\`$\` match each line), and \`re.DOTALL\` (\`.\` also matches newlines).`,
      },
      {
        heading: "When not to use regex",
        body: `Regex is the wrong tool for **nested** structures. Do not parse HTML, JSON, or code with it — use \`json.loads\`, an HTML parser, or \`ast\`. A regex that half-works on nested data fails on the input that matters.

Watch out for catastrophic backtracking: patterns with nested quantifiers such as \`(a+)+b\` can take exponential time on adversarial input. Keep patterns simple and anchor them.

Compile patterns used inside loops. \`re.compile\` once outside the loop avoids re-parsing the pattern on every iteration.`,
      },
    ],
    examples: [
      {
        title: "Extract JSON from a chatty LLM reply",
        note: "The single most common regex task in GenAI code.",
        code: `import json
import re

reply = '''Sure! Here is the result:

\`\`\`json
{"sentiment": "positive", "confidence": 0.92}
\`\`\`

Let me know if you need anything else.'''

fenced = re.search(r"\`\`\`(?:json)?\\s*(\\{.*?\\})\\s*\`\`\`", reply, re.DOTALL)
if fenced:
    data = json.loads(fenced.group(1))
    print("from fence:", data)

bare = re.search(r"\\{.*\\}", reply, re.DOTALL)
print("fallback match:", bare.group()[:40] if bare else None)
print("confidence:", data["confidence"])`,
      },
      {
        title: "Parse a log line with named groups",
        note: "Named groups turn a match into a labelled dict.",
        code: `import re

pattern = re.compile(
    r"(?P<date>\\d{4}-\\d{2}-\\d{2})\\s+"
    r"(?P<level>DEBUG|INFO|WARNING|ERROR)\\s+"
    r"(?P<message>.+?)\\s+"
    r"latency_ms=(?P<latency>\\d+)"
)

lines = [
    "2026-09-04 ERROR model call failed latency_ms=2450",
    "2026-09-04 INFO retrieved 4 chunks latency_ms=87",
    "malformed line without fields",
]

for line in lines:
    match = pattern.search(line)
    if not match:
        print("no match:", line)
        continue
    fields = match.groupdict()
    fields["latency"] = int(fields["latency"])
    print(fields)`,
      },
      {
        title: "Redact personal data before it reaches a model",
        note: "Substitution with a replacement string, applied in sequence.",
        code: `import re

text = ("Contact Priya at priya.sharma@example.com or +91 91000 28801. "
        "Card 4111-1111-1111-1111, account 998877.")

rules = [
    (r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "[EMAIL]"),
    (r"\\+?\\d[\\d\\s-]{8,}\\d", "[PHONE]"),
    (r"\\b(?:\\d{4}[- ]?){3}\\d{4}\\b", "[CARD]"),
]

redacted = text
for pattern, replacement in rules:
    redacted = re.sub(pattern, replacement, redacted)

print("before:", text)
print("after :", redacted)`,
      },
      {
        title: "Greedy vs lazy",
        note: "Greedy .* swallows everything up to the last marker.",
        code: `import re

text = "<title>First</title> and <title>Second</title>"

greedy = re.findall(r"<title>(.*)</title>", text)
lazy = re.findall(r"<title>(.*?)</title>", text)

print("greedy:", greedy)
print("lazy  :", lazy)

print("\\nfindall with groups:", re.findall(r"(\\w+)=(\\d+)", "lr=5 epochs=30 batch=16"))
print("split on punctuation:", re.split(r"[.,;!?]\\s*", "One. Two, three; four!"))
print("word boundary:", re.findall(r"\\bml\\b", "ml mlops ml-ops ml"))`,
      },
      {
        title: "Clean scraped text for embedding",
        note: "A short pipeline of substitutions before chunking.",
        code: `import re

raw = """  # Heading with **markdown**

Visit https://example.com/docs for   more    info.
Contact: support@example.com   <br/>
Footnote [1] and [2].  """

steps = [
    (r"https?://\\S+", " "),
    (r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", " "),
    (r"<[^>]+>", " "),
    (r"\\[\\d+\\]", " "),
    (r"[#*_\`]+", " "),
    (r"\\s+", " "),
]

clean = raw
for pattern, replacement in steps:
    clean = re.sub(pattern, replacement, clean)
clean = clean.strip()

print("raw chars  :", len(raw))
print("clean chars:", len(clean))
print("clean text :", clean)`,
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
      "Always write patterns as raw strings; compile patterns used in loops.",
      "Quantifiers are greedy — use .*? when extracting between markers.",
      "Named groups give you a labelled dict; never parse HTML or JSON with regex.",
    ],
  },
  {
    slug: "dates-and-times",
    title: "Dates, times, and timezones",
    moduleId: "core-language",
    level: "intermediate",
    minutes: 18,
    summary:
      "datetime, timedelta, formatting, parsing, and why every timestamp you store should be UTC.",
    whyForAi:
      "Time features drive forecasting and drift detection, log timestamps drive incident analysis, and token-usage reports are grouped by day. Naive local timestamps are a reliable source of off-by-hours bugs across regions.",
    packages: [],
    sections: [
      {
        heading: "The objects",
        body: `The \`datetime\` module gives you \`date\`, \`time\`, \`datetime\`, \`timedelta\`, and \`timezone\`.

\`datetime.now()\` returns local time; \`datetime.now(timezone.utc)\` returns UTC. **Prefer UTC** everywhere in stored data and logs, and convert to local only when displaying to a person.

A datetime is **naive** (no timezone) or **aware** (with one). Subtracting a naive from an aware datetime raises \`TypeError\`, which is Python protecting you from a meaningless result.

\`timedelta\` represents a duration. Subtracting two datetimes gives one; \`.total_seconds()\` converts it to a number you can log or compare.`,
      },
      {
        heading: "Formatting and parsing",
        body: `\`strftime(fmt)\` formats a datetime as text. \`strptime(text, fmt)\` parses text into a datetime.

Common codes: \`%Y\` 4-digit year, \`%m\` month, \`%d\` day, \`%H\` hour (24h), \`%M\` minute, \`%S\` second, \`%f\` microseconds, \`%z\` UTC offset, \`%A\` weekday name, \`%B\` month name.

For machine-readable output use **ISO 8601**: \`dt.isoformat()\` produces \`2026-09-04T14:30:00+00:00\`, and \`datetime.fromisoformat()\` reads it back. ISO strings sort correctly as plain text, which is why they belong in filenames, JSON, and database columns.

Unix timestamps: \`dt.timestamp()\` and \`datetime.fromtimestamp(ts, tz=timezone.utc)\`.`,
      },
      {
        heading: "Practical rules",
        body: `1. Store UTC, display local. A user in Hyderabad and one in London must see the same event at their own wall-clock time.
2. Use aware datetimes at boundaries — anything entering a database or an API.
3. Never do date arithmetic with \`timedelta(days=30)\` and call it "a month". Months vary; use \`dateutil.relativedelta\` if you need calendar months.
4. Measure **durations** with \`time.perf_counter()\`, not \`datetime.now()\` differences. \`perf_counter\` is monotonic and unaffected by clock adjustments.
5. Include a timezone in log timestamps, or a cross-region incident becomes unreconstructable.`,
      },
    ],
    examples: [
      {
        title: "Creating and inspecting datetimes",
        note: "Note the difference between naive local time and aware UTC.",
        code: `from datetime import datetime, date, timedelta, timezone

naive = datetime(2026, 9, 4, 14, 30, 0)
aware = datetime(2026, 9, 4, 14, 30, 0, tzinfo=timezone.utc)

print("naive:", naive, "| tzinfo:", naive.tzinfo)
print("aware:", aware, "| tzinfo:", aware.tzinfo)
print("iso  :", aware.isoformat())
print("parts:", aware.year, aware.month, aware.day, aware.hour)
print("weekday:", aware.strftime("%A"), "| month:", aware.strftime("%B"))
print("date only:", aware.date(), "| time only:", aware.time())

try:
    naive - aware
except TypeError as err:
    print("mixing naive and aware:", err)`,
      },
      {
        title: "timedelta arithmetic",
        note: "Durations add and subtract like numbers.",
        code: `from datetime import datetime, timedelta, timezone

start = datetime(2026, 9, 1, 9, 0, tzinfo=timezone.utc)
end = datetime(2026, 9, 4, 17, 30, tzinfo=timezone.utc)

duration = end - start
print("duration       :", duration)
print("total hours    :", round(duration.total_seconds() / 3600, 2))
print("days component :", duration.days)

print("\\nretention cutoff:", (end - timedelta(days=30)).date())
print("next run        :", (end + timedelta(hours=6)).isoformat())
print("timeout window  :", timedelta(seconds=90) > timedelta(minutes=1))`,
      },
      {
        title: "Parsing and formatting log timestamps",
        note: "strptime reads text; isoformat writes the machine-readable version.",
        code: `from datetime import datetime, timezone

raw_lines = [
    "2026-09-04 10:22:31 INFO started",
    "2026-09-04 10:25:08 ERROR timeout",
]

events = []
for line in raw_lines:
    stamp_text = line[:19]
    stamp = datetime.strptime(stamp_text, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
    events.append((stamp, line[20:]))

for stamp, message in events:
    print(stamp.isoformat(), "|", message)

gap = events[1][0] - events[0][0]
print("\\ntime to failure:", gap.total_seconds(), "seconds")
print("round trip:", datetime.fromisoformat(events[0][0].isoformat()) == events[0][0])
print("display format:", events[0][0].strftime("%d %b %Y, %I:%M %p UTC"))`,
      },
      {
        title: "Group usage by day",
        note: "The pattern behind every daily cost or traffic report.",
        code: `from collections import defaultdict
from datetime import datetime, timezone

calls = [
    {"ts": "2026-09-02T10:00:00+00:00", "tokens": 500},
    {"ts": "2026-09-02T18:30:00+00:00", "tokens": 700},
    {"ts": "2026-09-03T09:15:00+00:00", "tokens": 1200},
    {"ts": "2026-09-04T11:45:00+00:00", "tokens": 300},
]

by_day = defaultdict(int)
for call in calls:
    day = datetime.fromisoformat(call["ts"]).astimezone(timezone.utc).date()
    by_day[day] += call["tokens"]

for day in sorted(by_day):
    bar = "#" * (by_day[day] // 100)
    print(f"{day}  {by_day[day]:>5} tokens  {bar}")

print("\\ntotal:", sum(by_day.values()))`,
      },
      {
        title: "Measure durations with perf_counter",
        note: "Monotonic clock — immune to system clock changes.",
        code: `import time
from datetime import datetime, timezone

start = time.perf_counter()
total = sum(i * i for i in range(200_000))
elapsed_ms = (time.perf_counter() - start) * 1000

print(f"computed {total} in {elapsed_ms:.2f} ms")
print("logged at:", datetime.now(timezone.utc).isoformat(timespec="seconds"))
print("filename-safe stamp:", datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S"))`,
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
      "isoformat/fromisoformat for machine data, strftime/strptime for human formats.",
      "Measure elapsed time with time.perf_counter, not datetime subtraction.",
    ],
  },
  {
    slug: "standard-library-toolkit",
    title: "The standard library toolkit",
    moduleId: "core-language",
    level: "advanced",
    minutes: 22,
    summary:
      "collections, itertools, functools, hashlib, uuid, os and sys — the batteries that ship with Python.",
    whyForAi:
      "Counting label frequencies, grouping records, caching embeddings, fingerprinting datasets, and generating request ids are daily tasks. Each has a one-line standard-library answer that most people reimplement badly.",
    packages: [],
    sections: [
      {
        heading: "collections",
        body: `- **\`Counter\`** — frequency counting with \`.most_common(n)\`. Perfect for label distributions, token frequencies, and spotting class imbalance.
- **\`defaultdict\`** — a dict that creates missing values automatically, so grouping needs no \`if key not in d\` dance.
- **\`namedtuple\`** — a lightweight immutable record with named fields.
- **\`deque\`** — a double-ended queue with O(1) appends and pops at both ends, and a \`maxlen\` that discards old items. Ideal for rolling windows and sliding-window metrics.
- **\`OrderedDict\`** — rarely needed now that regular dicts preserve insertion order.`,
      },
      {
        heading: "functools and itertools",
        body: `**functools**: \`lru_cache\` / \`cache\` for memoizing pure functions, \`partial\` to pre-fill arguments, \`wraps\` for decorators, \`reduce\` for custom folds, and \`cached_property\` for expensive attributes computed once per instance.

**itertools**: \`chain\`, \`islice\`, \`groupby\` (requires sorted input — the number one gotcha), \`product\` for hyperparameter grids, \`combinations\` and \`permutations\`, \`cycle\`, \`count\`, and \`accumulate\` for running totals.

Both modules are implemented in C, so they are faster than hand-written equivalents as well as shorter.`,
      },
      {
        heading: "Identity, hashing, and the environment",
        body: `**\`uuid\`** — \`uuid.uuid4()\` for request ids and run ids. Unique without coordination between machines.

**\`hashlib\`** — \`sha256\` to fingerprint a dataset, cache key, or prompt. A stable fingerprint lets you prove two runs used identical data. Never use \`md5\` for security, and never hash passwords with a plain digest.

**\`os\` / \`sys\`** — \`os.getenv\` for configuration, \`os.cpu_count()\` for worker sizing, \`sys.argv\` for CLI arguments (though \`argparse\` is better), \`sys.version_info\` for version checks, and \`sys.exit(1)\` to signal failure to CI.

**\`pathlib\`, \`json\`, \`csv\`, \`tempfile\`, \`shutil\`** cover the rest of everyday file work.`,
      },
    ],
    examples: [
      {
        title: "Counter for label distribution",
        note: "Class imbalance shows up immediately.",
        code: `from collections import Counter

labels = ["positive"] * 70 + ["negative"] * 25 + ["neutral"] * 5
counts = Counter(labels)

print(counts)
print("most common:", counts.most_common(2))
total = sum(counts.values())
for label, n in counts.most_common():
    bar = "#" * (n // 2)
    print(f"{label:9} {n:3} ({n / total:5.1%}) {bar}")

print("\\nimbalance ratio:", round(max(counts.values()) / min(counts.values()), 1), ": 1")
print("token frequency:", Counter("the cat sat on the mat".split()).most_common(2))`,
      },
      {
        title: "defaultdict and deque",
        note: "Grouping without key checks, and a fixed-size rolling window.",
        code: `from collections import defaultdict, deque

records = [
    ("mlops", "doc-1"), ("rag", "doc-2"),
    ("mlops", "doc-3"), ("agents", "doc-4"), ("rag", "doc-5"),
]

grouped = defaultdict(list)
for topic, doc in records:
    grouped[topic].append(doc)
for topic, docs in grouped.items():
    print(f"{topic:8} -> {docs}")

window = deque(maxlen=5)
print("\\nrolling mean of last 5 latencies:")
for latency in [100, 120, 900, 130, 110, 105, 98]:
    window.append(latency)
    print(f"  add {latency:3} -> window={list(window)} mean={sum(window) / len(window):.1f}")`,
      },
      {
        title: "namedtuple and cached results",
        note: "lru_cache turns a repeated computation into a lookup.",
        code: `import functools
from collections import namedtuple

Prediction = namedtuple("Prediction", ["doc_id", "label", "score"])

preds = [
    Prediction("d1", "positive", 0.91),
    Prediction("d2", "negative", 0.44),
]
for p in preds:
    print(f"{p.doc_id}: {p.label} ({p.score:.2f})")
print("as dict:", preds[0]._asdict())

@functools.lru_cache(maxsize=256)
def expensive_embed(text):
    print("  computing:", text)
    return sum(ord(c) for c in text) % 9973

print("\\nfirst call :", expensive_embed("python"))
print("second call:", expensive_embed("python"), "(cached)")
print("cache stats:", expensive_embed.cache_info())`,
      },
      {
        title: "itertools groupby and accumulate",
        note: "groupby needs sorted input — that is the classic mistake.",
        code: `import itertools

rows = [
    {"model": "mini", "tokens": 500},
    {"model": "large", "tokens": 1200},
    {"model": "mini", "tokens": 300},
    {"model": "large", "tokens": 900},
]

rows.sort(key=lambda r: r["model"])          # required before groupby
for model, group in itertools.groupby(rows, key=lambda r: r["model"]):
    items = list(group)
    print(f"{model:6} calls={len(items)} tokens={sum(i['tokens'] for i in items)}")

daily = [120, 340, 88, 502]
print("\\nrunning total:", list(itertools.accumulate(daily)))
print("grid combos  :", len(list(itertools.product([1e-5, 2e-5], [16, 32], [3, 5]))))`,
      },
      {
        title: "uuid, hashlib, and environment",
        note: "Request ids and dataset fingerprints in three lines.",
        code: `import hashlib
import json
import os
import sys
import uuid

request_id = str(uuid.uuid4())
print("request id:", request_id, "| short:", request_id[:8])

dataset = [{"text": "sample a", "label": 1}, {"text": "sample b", "label": 0}]
fingerprint = hashlib.sha256(json.dumps(dataset, sort_keys=True).encode()).hexdigest()
print("dataset fingerprint:", fingerprint[:16])

prompt = "Summarise the quarterly report"
cache_key = hashlib.sha256(f"gpt-4.1-mini|0.0|{prompt}".encode()).hexdigest()[:20]
print("cache key:", cache_key)

os.environ.setdefault("LOG_LEVEL", "INFO")
print("\\nlog level :", os.getenv("LOG_LEVEL"))
print("python    :", ".".join(map(str, sys.version_info[:3])))
print("cpu count :", os.cpu_count())`,
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
      "Counter for distributions, defaultdict for grouping, deque for rolling windows.",
      "lru_cache memoizes pure functions; itertools.groupby needs sorted input.",
      "uuid4 for request ids, sha256 for dataset and cache fingerprints.",
    ],
  },
];
