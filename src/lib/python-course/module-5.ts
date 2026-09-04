import type { PythonLesson } from "./types";

/** Module 5: quick-reference lessons you come back to rather than read once. */
export const MODULE_5_LESSONS: PythonLesson[] = [
  {
    slug: "builtin-functions-reference",
    title: "Built-in functions reference",
    moduleId: "reference",
    level: "beginner",
    minutes: 18,
    summary:
      "The built-in functions worth knowing by heart, grouped by what they do, with runnable examples of each.",
    whyForAi:
      "Python ships around 70 built-ins that need no import. Knowing them stops you writing loops for things that are already one call, and shorter code has fewer places for bugs to hide.",
    packages: [],
    sections: [
      {
        heading: "Types and conversion",
        body: `\`int()\`, \`float()\`, \`str()\`, \`bool()\`, \`list()\`, \`tuple()\`, \`set()\`, \`dict()\`, \`frozenset()\`, \`bytes()\`, \`complex()\`.

\`type(x)\` returns the class; \`isinstance(x, cls)\` checks membership and respects inheritance, which is why it is the one to use in real checks. \`isinstance\` accepts a tuple: \`isinstance(x, (int, float))\`.

\`repr()\` gives the unambiguous developer representation, \`str()\` the readable one. When debugging, print \`repr()\` — it shows quotes and escapes, so you can see that a value is \`"5 "\` with a trailing space rather than \`5\`.`,
      },
      {
        heading: "Sequences, aggregation, and iteration",
        body: `\`len\`, \`sum\`, \`min\`, \`max\`, \`sorted\`, \`reversed\`, \`enumerate\`, \`zip\`, \`range\`, \`any\`, \`all\`, \`map\`, \`filter\`.

\`min\` and \`max\` accept a \`key\` function and a \`default\` for empty input. \`sorted\` accepts \`key\` and \`reverse\`. \`sum\` accepts a start value, which is how you sum from a non-zero base.

\`any\` and \`all\` short-circuit, so \`any(is_valid(x) for x in huge)\` stops at the first match rather than checking everything.

\`round(x, n)\` uses banker's rounding — \`round(2.5)\` is 2, not 3. That surprises people; use \`decimal\` when exact rounding matters.`,
      },
      {
        heading: "Objects, introspection, and I/O",
        body: `\`print\`, \`input\`, \`open\`, \`format\`, \`id\`, \`hash\`, \`dir\`, \`vars\`, \`getattr\`, \`setattr\`, \`hasattr\`, \`callable\`, \`help\`.

\`getattr(obj, "name", default)\` reads an attribute by string name with a fallback and is how plugin registries and config loaders work without a giant if-chain.

\`dir(obj)\` lists available attributes — the fastest way to explore an unfamiliar library object in a REPL.

\`abs\`, \`pow\`, \`divmod\`, \`bin\`, \`hex\`, \`oct\`, \`ord\`, \`chr\` cover numbers and characters. \`ord\`/\`chr\` convert between a character and its Unicode code point, which comes up in tokenizer work.

Avoid \`eval\` and \`exec\` on anything you did not write. Text from a user or an LLM run through \`eval\` is arbitrary code execution.`,
      },
    ],
    examples: [
      {
        title: "Conversion and type checking",
        note: "isinstance over type() — it respects inheritance.",
        code: `values = ["42", 3.99, True, None, [1, 2]]

for v in values:
    print(f"{repr(v):<10} type={type(v).__name__:<6} bool={bool(v)}")

print("\\nint('42')      ->", int("42"))
print("int(3.99)      ->", int(3.99), "(truncates, does not round)")
print("float('1e3')   ->", float("1e3"))
print("list('abc')    ->", list("abc"))
print("set([1,1,2])   ->", set([1, 1, 2]))
print("dict(a=1, b=2) ->", dict(a=1, b=2))

print("\\nisinstance(True, int) ->", isinstance(True, int), "(bool subclasses int)")
print("type(True) is int     ->", type(True) is int)
print("isinstance(3.0, (int, float)) ->", isinstance(3.0, (int, float)))`,
      },
      {
        title: "Aggregation with key functions",
        note: "key= turns min, max, and sorted into general-purpose tools.",
        code: `runs = [
    {"model": "mini", "acc": 0.91, "cost": 0.4},
    {"model": "large", "acc": 0.95, "cost": 3.2},
    {"model": "haiku", "acc": 0.89, "cost": 0.2},
]

print("best accuracy :", max(runs, key=lambda r: r["acc"])["model"])
print("cheapest      :", min(runs, key=lambda r: r["cost"])["model"])
print("total cost    :", round(sum(r["cost"] for r in runs), 2))
print("by acc desc   :", [r["model"] for r in sorted(runs, key=lambda r: -r["acc"])])

print("\\nmin of empty with default:", min([], default="none"))
print("sum starting at 100      :", sum([1, 2, 3], 100))
print("round(2.5) ->", round(2.5), "| round(3.5) ->", round(3.5), "(banker's rounding)")`,
      },
      {
        title: "any, all, enumerate, zip",
        note: "any and all short-circuit, so they are cheap on large inputs.",
        code: `scores = [0.91, 0.88, 0.94, 0.72]
names = ["mini", "large", "haiku", "local"]

print("all above 0.7 :", all(s > 0.7 for s in scores))
print("any above 0.93:", any(s > 0.93 for s in scores))
print("all of empty  :", all([]), "(vacuously true — a classic bug source)")
print("any of empty  :", any([]))

print("\\nenumerate with a start value:")
for rank, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"  {rank}. {name:<7} {score:.2f}")

print("\\nzip stops at the shortest input:", list(zip([1, 2, 3], "ab")))
print("unzip with zip(*pairs):", list(zip(*[(1, "a"), (2, "b")])))`,
      },
      {
        title: "Introspection: getattr, dir, hasattr",
        note: "String-keyed attribute access replaces long if-chains.",
        code: `class Config:
    model = "gpt-4.1-mini"
    temperature = 0.2
    max_tokens = 512

cfg = Config()

for field in ["model", "temperature", "top_p"]:
    print(f"{field:<12} present={hasattr(cfg, field)!s:<6} value={getattr(cfg, field, 'DEFAULT')}")

setattr(cfg, "top_p", 0.9)
print("\\nafter setattr, top_p =", cfg.top_p)

public = [name for name in dir(cfg) if not name.startswith("_")]
print("public attributes:", public)
print("\\ncallable(print) ->", callable(print), "| callable(cfg) ->", callable(cfg))`,
      },
      {
        title: "Numbers and characters",
        note: "ord and chr show up in tokenizer and encoding work.",
        code: `print("abs(-7)      ->", abs(-7))
print("pow(2, 10)   ->", pow(2, 10))
print("pow(2,10,1000) ->", pow(2, 10, 1000), "(modular exponentiation)")
print("divmod(17, 5) ->", divmod(17, 5), "(quotient, remainder)")

print("\\nbin(10) ->", bin(10), "| hex(255) ->", hex(255), "| oct(8) ->", oct(8))
print("int('ff', 16) ->", int("ff", 16))

print("\\nord('A') ->", ord("A"), "| chr(97) ->", chr(97))
print("token ids for 'hi':", [ord(c) for c in "hi"])
print("back to text     :", "".join(chr(c) for c in [104, 105]))`,
      },
    ],
    tryIt: {
      title: "Build a summary using only built-ins",
      hint: "Swap the key function to sort by name length instead of score.",
      starter: `records = [
    ("mini", 0.91, 620),
    ("large", 0.95, 1520),
    ("haiku", 0.89, 460),
    ("local", 0.72, 2100),
]

names = [r[0] for r in records]
scores = [r[1] for r in records]
tokens = [r[2] for r in records]

print(f"{'count':<16}{len(records)}")
print(f"{'best model':<16}{max(records, key=lambda r: r[1])[0]}")
print(f"{'worst model':<16}{min(records, key=lambda r: r[1])[0]}")
print(f"{'mean score':<16}{sum(scores) / len(scores):.4f}")
print(f"{'total tokens':<16}{sum(tokens):,}")
print(f"{'all passing':<16}{all(s > 0.8 for s in scores)}")
print(f"{'any failing':<16}{any(s < 0.8 for s in scores)}")

print("\\nranked:")
for i, (name, score, tok) in enumerate(sorted(records, key=lambda r: -r[1]), start=1):
    bar = "#" * round(score * 20)
    print(f"  {i}. {name:<7}{score:.2f} {bar}")

print("\\nlookup table:", dict(zip(names, scores)))`,
    },
    takeaways: [
      "Use isinstance, not type(), and pass a tuple to check several types at once.",
      "key= makes min, max, and sorted work on any object; any/all short-circuit.",
      "getattr with a default replaces if-chains; never eval untrusted or LLM-generated text.",
    ],
  },
  {
    slug: "string-methods-reference",
    title: "String methods reference",
    moduleId: "reference",
    level: "beginner",
    minutes: 16,
    summary:
      "Every string method that matters, grouped by task — cleaning, searching, splitting, and formatting.",
    whyForAi:
      "Text preprocessing is most of the work in any NLP or LLM pipeline. Prompt templates, log parsing, and cleaning scraped data are all string methods, and doing them correctly is faster and more readable than reaching for regex.",
    packages: [],
    sections: [
      {
        heading: "Cleaning and case",
        body: `Strings are **immutable** — every method returns a new string and the original is unchanged. Forgetting to assign the result is the most common string bug: \`text.strip()\` on its own does nothing.

- \`strip()\`, \`lstrip()\`, \`rstrip()\` — remove whitespace, or any characters you pass
- \`lower()\`, \`upper()\`, \`title()\`, \`capitalize()\`, \`swapcase()\`
- \`casefold()\` — aggressive lowercasing for cross-language comparison; prefer it over \`lower()\` when comparing user input
- \`removeprefix()\`, \`removesuffix()\` — safer than slicing, since they do nothing when the affix is absent

Note that \`strip("abc")\` removes any of those *characters* from the ends, not the substring "abc". That trips people up.`,
      },
      {
        heading: "Searching and testing",
        body: `- \`in\` — the simplest containment check, and usually the right one
- \`find()\` returns -1 when missing; \`index()\` raises \`ValueError\`
- \`startswith()\`, \`endswith()\` — both accept a tuple of options
- \`count()\` — non-overlapping occurrences
- \`replace(old, new, count)\` — the optional count limits replacements

Validation predicates: \`isdigit()\`, \`isalpha()\`, \`isalnum()\`, \`isspace()\`, \`islower()\`, \`isupper()\`, \`istitle()\`.

Watch out: \`"3.14".isdigit()\` is \`False\` because of the dot, and \`"-5".isdigit()\` is \`False\` because of the sign. For numeric validation, try converting inside a \`try/except\` instead.`,
      },
      {
        heading: "Splitting, joining, and formatting",
        body: `\`split()\` with no argument splits on any run of whitespace and drops empties — usually what you want for text. \`split(",")\` splits on an exact delimiter and keeps empty fields. \`splitlines()\` handles all newline conventions.

\`"".join(parts)\` is the correct way to build a string from pieces. Repeated \`+=\` in a loop creates a new string every iteration and is quadratic on large inputs.

\`partition(sep)\` returns exactly three parts (before, separator, after), which makes it cleaner than \`split\` for "key=value" parsing.

**f-strings** are the modern format: \`f"{value:.2f}"\`, \`f"{n:,}"\`, \`f"{text:>10}"\`, \`f"{ratio:.1%}"\`. Add \`=\` for debugging: \`f"{score=}"\` prints both the name and the value.

For alignment use \`ljust\`, \`rjust\`, \`center\`, or \`zfill\` for zero-padded numbers.`,
      },
    ],
    examples: [
      {
        title: "Cleaning user and scraped text",
        note: "Strings are immutable — you must assign the result.",
        code: `raw = "   Hello, GenAI World!\\t\\n"

print(repr(raw))
print(repr(raw.strip()))
print(repr(raw.strip().lower()))

raw.strip()                      # result discarded — a very common bug
print("original unchanged:", repr(raw))

path = "logs/model-run.json"
print("\\nremovesuffix:", path.removesuffix(".json"))
print("removeprefix:", path.removeprefix("logs/"))
print("missing affix is a no-op:", path.removesuffix(".csv"))

print("\\nstrip('/-') strips characters, not the substring:")
print(repr("--/api/users/--".strip("/-")))

print("\\ncasefold beats lower for comparison:", "STRASSE".casefold() == "strasse".casefold())`,
      },
      {
        title: "Searching and validating",
        note: "find returns -1, index raises. isdigit is stricter than people expect.",
        code: `text = "model=gpt-4.1-mini temperature=0.2 stream=true"

print("'temperature' in text ->", "temperature" in text)
print("find('stream')        ->", text.find("stream"))
print("find('missing')       ->", text.find("missing"), "(-1, no exception)")
print("count('=')            ->", text.count("="))
print("startswith tuple      ->", text.startswith(("model", "engine")))

print("\\nvalidation predicates:")
for candidate in ["42", "3.14", "-5", "abc", "a1", "  "]:
    print(f"  {candidate!r:<8} isdigit={candidate.isdigit()!s:<6} "
          f"isalpha={candidate.isalpha()!s:<6} isalnum={candidate.isalnum()}")

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

print("\\nreliable numeric check:", {s: is_number(s) for s in ["42", "3.14", "-5", "abc"]})`,
      },
      {
        title: "Splitting and joining",
        note: "partition is cleaner than split for key=value pairs.",
        code: `line = "model=gpt-4.1-mini,temp=0.2,stream=true"

settings = {}
for chunk in line.split(","):
    key, sep, value = chunk.partition("=")
    if sep:
        settings[key] = value
print(settings)

print("\\nsplit() vs split(','):")
print("  ", "a  b   c".split())
print("  ", "a,,b".split(","), "(keeps the empty field)")
print("  ", "a,b,c".split(",", maxsplit=1), "(maxsplit)")

log = "line one\\nline two\\r\\nline three"
print("\\nsplitlines handles all newline styles:", log.splitlines())

parts = ["retrieve", "rerank", "generate"]
print("\\njoined:", " -> ".join(parts))
print("csv row:", ",".join(str(x) for x in [1, 2.5, "text"]))`,
      },
      {
        title: "f-string formatting specifiers",
        note: "The specifiers you will reuse constantly in reports and logs.",
        code: `score = 0.9137
tokens = 1234567
name = "mini"

print(f"2 decimals   : {score:.2f}")
print(f"percent      : {score:.1%}")
print(f"thousands    : {tokens:,}")
print(f"scientific   : {tokens:.2e}")
print(f"plus sign    : {score:+.3f}")
print(f"pad left     : |{name:>10}|")
print(f"pad right    : |{name:<10}|")
print(f"centred      : |{name:^10}|")
print(f"fill char    : |{name:*^10}|")
print(f"zero padded  : {7:03d}")

print(f"\\ndebug form   : {score=}")
print(f"repr in field: {name!r}")

width = 8
print(f"dynamic width: |{name:>{width}}|")

print("\\nold ways still work:")
print("percent style: %.2f" % score)
print("str.format   : {:.2f}".format(score))`,
      },
      {
        title: "Building an aligned report",
        note: "ljust, rjust, and zfill for table output without a library.",
        code: `rows = [("gpt-4.1-mini", 0.913, 620), ("llama-3-8b", 0.847, 1520), ("claude-haiku", 0.900, 460)]

header = f"{'model'.ljust(16)}{'accuracy'.rjust(10)}{'tokens'.rjust(9)}"
print(header)
print("-" * len(header))
for model, acc, tokens in rows:
    print(f"{model.ljust(16)}{f'{acc:.3f}'.rjust(10)}{f'{tokens:,}'.rjust(9)}")

print("\\nzfill for ids:", [str(i).zfill(4) for i in [1, 42, 999]])
print("centred title:", "SUMMARY".center(35, "="))
print("wrapped label:", "retrieval".upper().ljust(20, "."), "OK")`,
      },
    ],
    tryIt: {
      title: "Clean and parse a messy log line",
      hint: "Add another key=value pair to the raw line and it parses automatically.",
      starter: `raw = "  [2026-09-04 10:32:01] LEVEL=warn  model=gpt-4.1-mini  latency_ms=8421  ok=false \\n"

line = raw.strip()
print("cleaned:", repr(line))

timestamp = line[line.find("[") + 1 : line.find("]")]
rest = line[line.find("]") + 1 :].strip()

fields = {}
for chunk in rest.split():
    key, sep, value = chunk.partition("=")
    if sep:
        fields[key.lower()] = value

print(f"\\n{'timestamp':<12}{timestamp}")
for key, value in fields.items():
    print(f"{key:<12}{value}")

latency = int(fields.get("latency_ms", 0))
print(f"\\nlatency      {latency:,} ms")
print(f"slow?        {latency > 5000}")
print(f"succeeded?   {fields.get('ok', '').lower() == 'true'}")
print(f"level        {fields.get('level', 'unknown').upper()}")`,
    },
    takeaways: [
      "Strings are immutable — always assign the result of a method call.",
      "Use join to build strings, partition for key=value, and split() bare for whitespace.",
      "f-string specifiers (.2f, :,, :.1%, alignment) cover almost all formatting needs.",
    ],
  },
  {
    slug: "collection-methods-reference",
    title: "List, dict, set, and tuple reference",
    moduleId: "reference",
    level: "beginner",
    minutes: 18,
    summary:
      "Every method on Python's four core collections, when to use each type, and their performance characteristics.",
    whyForAi:
      "Choosing the wrong collection is the most common cause of slow Python. Checking membership in a list is a full scan; in a set it is instant. On a million-row dataset that is the difference between seconds and hours.",
    packages: [],
    sections: [
      {
        heading: "Choosing the right collection",
        body: `- **list** — ordered, mutable, allows duplicates. The default when you need a sequence.
- **tuple** — ordered, **immutable**. Use for fixed records and as dictionary keys, which lists cannot be.
- **dict** — key to value mapping, insertion-ordered since Python 3.7, keys must be hashable.
- **set** — unordered, unique elements, extremely fast membership tests.

Performance is the deciding factor:

| Operation | list | dict / set |
| --- | --- | --- |
| \`x in collection\` | O(n) scan | O(1) hash lookup |
| append / add | O(1) | O(1) |
| insert or delete at front | O(n) | — |

If you find yourself writing \`if item in big_list\` inside a loop, convert to a set first. Use \`collections.deque\` when you need fast appends and pops at both ends.`,
      },
      {
        heading: "List and tuple methods",
        body: `**List**: \`append\`, \`extend\`, \`insert\`, \`remove\`, \`pop\`, \`clear\`, \`index\`, \`count\`, \`sort\`, \`reverse\`, \`copy\`.

\`sort()\` sorts in place and returns \`None\`; \`sorted()\` returns a new list. Writing \`items = items.sort()\` sets \`items\` to \`None\`, and it is a classic beginner bug.

\`append(x)\` adds one element; \`extend(seq)\` adds each element of a sequence. \`append\` on a list gives you a nested list.

**Tuple** has only \`count\` and \`index\` — everything else would mutate. Tuples unpack cleanly (\`a, b = pair\`) and support starred unpacking (\`first, *rest = items\`).

**Copying**: \`copy()\` and \`list(x)\` are shallow, so nested objects are still shared. Use \`copy.deepcopy\` for nested structures.`,
      },
      {
        heading: "Dict and set methods",
        body: `**Dict**: \`get\`, \`keys\`, \`values\`, \`items\`, \`pop\`, \`popitem\`, \`update\`, \`setdefault\`, \`clear\`, \`copy\`, \`fromkeys\`.

\`get(key, default)\` never raises, which is the safe way to read config. \`setdefault(key, [])\` initialises a missing key in one step, though \`collections.defaultdict\` is cleaner when you do it repeatedly.

Merge with \`{**a, **b}\` or \`a | b\` (Python 3.9+); the right side wins on conflicts.

**Set**: \`add\`, \`remove\` (raises if missing), \`discard\` (silent), \`pop\`, \`union\` (\`|\`), \`intersection\` (\`&\`), \`difference\` (\`-\`), \`symmetric_difference\` (\`^\`), \`issubset\`, \`issuperset\`, \`isdisjoint\`.

Set operations are the fastest way to compare two collections: which users are in both cohorts, which features are missing from the new dataset, which tokens are out of vocabulary.

Note that \`{}\` creates an empty **dict**; use \`set()\` for an empty set.`,
      },
    ],
    examples: [
      {
        title: "List methods and the sort-in-place trap",
        note: "sort() returns None. sorted() returns a new list.",
        code: `items = [3, 1, 4, 1, 5]

items.append(9)
items.extend([2, 6])
items.insert(0, 0)
print("after append/extend/insert:", items)

items.remove(1)          # removes the FIRST 1 only
popped = items.pop()     # last element
print(f"after remove(1) and pop() -> {popped}:", items)

print("index of 4:", items.index(4), "| count of 1:", items.count(1))

new_list = sorted(items, reverse=True)
print("\\nsorted() returns a list:", new_list)
items.sort()
print("sort() mutates in place  :", items)
print("sort() returns           :", [1, 2].sort(), "<- never assign this")

print("\\nappend vs extend:")
a, b = [1, 2], [1, 2]
a.append([3, 4])
b.extend([3, 4])
print("  append:", a)
print("  extend:", b)`,
      },
      {
        title: "Tuples, unpacking, and why immutability matters",
        note: "Tuples can be dict keys; lists cannot.",
        code: `point = (12.5, 48.2)
x, y = point
print(f"unpacked: x={x} y={y}")

record = ("mini", 0.91, 620, "2026-09-04")
name, score, *rest = record
print("starred unpacking:", name, score, rest)

cache = {}
cache[("mini", "en")] = 0.91
cache[("large", "fr")] = 0.88
print("\\ntuple as dict key:", cache[("mini", "en")])

try:
    cache[["mini", "en"]] = 0.5
except TypeError as err:
    print("list as key ->", err)

print("\\ntuple has only two methods:", [m for m in dir(tuple) if not m.startswith("_")])
print("swap without a temp variable:")
a, b = 1, 2
a, b = b, a
print("  a =", a, "b =", b)`,
      },
      {
        title: "Dict methods in practice",
        note: "get for safe reads, setdefault for grouping, | to merge.",
        code: `config = {"model": "gpt-4.1-mini", "temperature": 0.2}

print("get present :", config.get("model"))
print("get missing :", config.get("top_p"), "(None, no error)")
print("get default :", config.get("top_p", 1.0))

defaults = {"temperature": 0.7, "top_p": 1.0, "max_tokens": 512}
merged = defaults | config          # right side wins
print("\\nmerged:", merged)

grouped = {}
for model, topic in [("mini", "rag"), ("large", "agents"), ("mini", "eval")]:
    grouped.setdefault(model, []).append(topic)
print("\\ngrouped with setdefault:", grouped)

config.update({"stream": True, "temperature": 0.5})
print("\\nafter update:", config)
print("popped:", config.pop("stream"), "| remaining keys:", list(config.keys()))

print("\\niterate items:")
for key, value in merged.items():
    print(f"  {key:<12} {value}")

print("\\ncomprehension filter:", {k: v for k, v in merged.items() if isinstance(v, float)})`,
      },
      {
        title: "Set operations for comparing datasets",
        note: "The fastest way to diff two collections.",
        code: `train_features = {"tokens", "latency", "model", "region", "user_id"}
serving_features = {"tokens", "latency", "model", "device"}

print("in both       :", sorted(train_features & serving_features))
print("training only :", sorted(train_features - serving_features), "<- missing at serving time")
print("serving only  :", sorted(serving_features - train_features), "<- unseen by the model")
print("either        :", sorted(train_features | serving_features))
print("mismatched    :", sorted(train_features ^ serving_features))

print("\\nsubset?  ", serving_features <= train_features)
print("disjoint?", train_features.isdisjoint({"foo", "bar"}))

s = {1, 2, 3}
s.add(4)
s.discard(99)            # silent when missing
print("\\nafter add/discard:", s)
try:
    s.remove(99)
except KeyError:
    print("remove(99) raised KeyError — use discard to be safe")

print("\\ndeduplicate while keeping order:", list(dict.fromkeys([3, 1, 3, 2, 1])))
print("{} is a dict:", type({}).__name__, "| set() is a set:", type(set()).__name__)`,
      },
      {
        title: "Why the collection type matters for speed",
        note: "Same logic, very different cost as the data grows.",
        code: `import time

n = 40_000
haystack_list = list(range(n))
haystack_set = set(haystack_list)
needles = range(0, n, 1000)

start = time.perf_counter()
found_list = sum(1 for x in needles if x in haystack_list)
list_time = time.perf_counter() - start

start = time.perf_counter()
found_set = sum(1 for x in needles if x in haystack_set)
set_time = time.perf_counter() - start

print(f"list scan: {list_time * 1000:8.3f} ms  ({found_list} found)")
print(f"set  hash: {set_time * 1000:8.3f} ms  ({found_set} found)")
print(f"set is roughly {list_time / max(set_time, 1e-9):,.0f}x faster here")
print("\\nthe gap grows linearly with the size of the collection")`,
      },
    ],
    tryIt: {
      title: "Pick the right collection for each job",
      hint: "Change the cohort lists and every set result updates automatically.",
      starter: `cohort_a = ["u1", "u2", "u3", "u4", "u5", "u2"]
cohort_b = ["u4", "u5", "u6", "u7"]

set_a, set_b = set(cohort_a), set(cohort_b)

print(f"{'cohort A raw':<18}{len(cohort_a)} entries")
print(f"{'cohort A unique':<18}{len(set_a)} users")
print(f"{'duplicates':<18}{len(cohort_a) - len(set_a)}")

print(f"\\n{'in both':<18}{sorted(set_a & set_b)}")
print(f"{'only in A':<18}{sorted(set_a - set_b)}")
print(f"{'only in B':<18}{sorted(set_b - set_a)}")
print(f"{'overlap':<18}{len(set_a & set_b) / len(set_a | set_b):.1%}")

events = [("u1", "click"), ("u2", "view"), ("u1", "buy"), ("u3", "view")]
by_user = {}
for user, action in events:
    by_user.setdefault(user, []).append(action)

print("\\nevents grouped by user:")
for user, actions in sorted(by_user.items()):
    print(f"  {user:<5}{len(actions)} events: {', '.join(actions)}")

busiest = max(by_user.items(), key=lambda pair: len(pair[1]))
print(f"\\nbusiest user: {busiest[0]} with {len(busiest[1])} events")`,
    },
    takeaways: [
      "Use a set for membership tests — list scans are O(n) and dominate large loops.",
      "sort() mutates and returns None; sorted() returns a new list.",
      "dict.get and setdefault avoid KeyError; set operators diff two collections instantly.",
    ],
  },
  {
    slug: "keywords-operators-exceptions-reference",
    title: "Keywords, operators, and exceptions reference",
    moduleId: "reference",
    level: "intermediate",
    minutes: 18,
    summary:
      "Python's 35 reserved keywords, the full operator set with precedence, and the built-in exception hierarchy.",
    whyForAi:
      "This is the lookup page. Which exception should I catch? What does the walrus operator do? Why is `is` wrong here? Keeping these straight is what separates code that fails loudly and correctly from code that swallows errors and corrupts a training run.",
    packages: [],
    sections: [
      {
        heading: "The 35 keywords",
        body: `Reserved words that cannot be used as names:

\`False\` \`None\` \`True\` \`and\` \`as\` \`assert\` \`async\` \`await\` \`break\` \`class\` \`continue\` \`def\` \`del\` \`elif\` \`else\` \`except\` \`finally\` \`for\` \`from\` \`global\` \`if\` \`import\` \`in\` \`is\` \`lambda\` \`nonlocal\` \`not\` \`or\` \`pass\` \`raise\` \`return\` \`try\` \`while\` \`with\` \`yield\`

Ones that are frequently misunderstood:

- \`pass\` — a do-nothing placeholder that keeps a block syntactically valid
- \`del\` — removes a *name* binding, not necessarily the object
- \`assert\` — a debug check that is **stripped when Python runs with -O**, so never use it to validate user input or enforce security
- \`global\` / \`nonlocal\` — rebind an outer name; usually a sign the design could be cleaner
- \`yield\` — turns a function into a generator
- \`with\` — guarantees cleanup through the context manager protocol

\`match\` and \`case\` (3.10+) are *soft* keywords: they work as pattern matching but are still usable as variable names.`,
      },
      {
        heading: "Operators and precedence",
        body: `**Arithmetic**: \`+\` \`-\` \`*\` \`/\` \`//\` (floor) \`%\` (modulo) \`**\` (power). \`/\` always returns a float, even for \`4 / 2\`.

**Comparison**: \`==\` \`!=\` \`<\` \`>\` \`<=\` \`>=\`. These chain: \`0 <= x <= 1\` is valid and reads naturally.

**Logical**: \`and\` \`or\` \`not\`. They short-circuit and return an *operand*, not a boolean — \`"" or "default"\` gives \`"default"\`.

**Identity vs equality**: \`is\` compares object identity, \`==\` compares value. Use \`is\` only with \`None\`, \`True\`, and \`False\`. \`x is 1000\` may be \`False\` even when \`x == 1000\`, because small integers are cached and large ones are not.

**Membership**: \`in\`, \`not in\`.

**Bitwise**: \`&\` \`|\` \`^\` \`~\` \`<<\` \`>>\`. In pandas and NumPy these are the element-wise boolean operators, and you must parenthesise: \`df[(df.a > 1) & (df.b < 2)]\`.

**Walrus** \`:=\` assigns inside an expression: \`while (line := f.readline()):\`.

Precedence, highest first: \`**\`, unary \`-\`, \`* / // %\`, \`+ -\`, comparisons, \`not\`, \`and\`, \`or\`. When in doubt, add parentheses — clarity beats cleverness.`,
      },
      {
        heading: "The exception hierarchy",
        body: `Everything inherits from \`BaseException\`. Catch \`Exception\`, never \`BaseException\`, because the latter swallows \`KeyboardInterrupt\` and \`SystemExit\` and makes your program unkillable.

Common ones:

- \`ValueError\` — right type, wrong value (\`int("abc")\`)
- \`TypeError\` — wrong type (\`"a" + 1\`)
- \`KeyError\` — missing dict key
- \`IndexError\` — index out of range
- \`AttributeError\` — attribute does not exist
- \`FileNotFoundError\`, \`PermissionError\` — subclasses of \`OSError\`
- \`ZeroDivisionError\`, \`StopIteration\`, \`ImportError\`, \`TimeoutError\`

\`KeyError\` and \`IndexError\` both inherit \`LookupError\`; catching the parent handles both.

Catch **specific** exceptions. A bare \`except:\` hides typos, keyboard interrupts, and real bugs, and it is the single worst habit in Python error handling.

Use \`raise ... from err\` to preserve the original cause when re-raising, and define your own \`class RetryableError(Exception)\` so callers can distinguish what is worth retrying — which matters a great deal when wrapping flaky LLM APIs.`,
      },
    ],
    examples: [
      {
        title: "Keywords that surprise people",
        note: "assert disappears under -O. Never use it for validation.",
        code: `import keyword

print("total keywords:", len(keyword.kwlist))
print(keyword.kwlist)
print("\\nsoft keywords:", keyword.softkwlist)

def placeholder():
    pass                       # valid empty body

data = {"a": 1, "b": 2}
del data["a"]
print("\\nafter del:", data)

x = 5
assert x > 0, "x must be positive"      # stripped by python -O
print("assert passed (but do not rely on it in production)")

counter = 0
def increment():
    global counter
    counter += 1

increment(); increment()
print("global counter:", counter)

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print("generator:", list(countdown(3)))`,
      },
      {
        title: "Operators, precedence, and the is trap",
        note: "Run this — the identity results depend on integer caching.",
        code: `print("7 / 2   =", 7 / 2, "(always float)")
print("7 // 2  =", 7 // 2, "| -7 // 2 =", -7 // 2, "(floors toward -inf)")
print("7 % 3   =", 7 % 3, "| -7 % 3 =", -7 % 3)
print("2 ** 10 =", 2 ** 10)
print("2 ** 3 ** 2 =", 2 ** 3 ** 2, "(** is right-associative)")

print("\\nchained comparison: 0 <= 5 <= 10 ->", 0 <= 5 <= 10)

print("\\nlogical operators return an operand, not a bool:")
print("  '' or 'default' ->", repr("" or "default"))
print("  'a' and 'b'     ->", repr("a" and "b"))
print("  0 or []         ->", repr(0 or []))

a, b = 256, 256
c, d = 1000, 1000
print("\\n256 is 256   ->", a is b, "(small ints are cached)")
print("1000 is 1000 ->", c is d, "(may be False — never rely on this)")
print("1000 == 1000 ->", c == d, "<- always use == for values")
print("\\nuse 'is' only with None/True/False:", None is None)

print("\\nbitwise: 12 & 10 =", 12 & 10, "| 12 | 10 =", 12 | 10, "| 1 << 4 =", 1 << 4)`,
      },
      {
        title: "The walrus operator and match",
        note: "Both reduce repetition in read-then-check patterns.",
        code: `values = [3, 14, 7, 22, 5]

if (count := len(values)) > 3:
    print(f"{count} values — assigned and tested in one expression")

filtered = [y for x in values if (y := x * 2) > 10]
print("walrus in a comprehension:", filtered)

def classify(event):
    match event:
        case {"type": "error", "code": code} if code >= 500:
            return f"server error {code}"
        case {"type": "error", "code": code}:
            return f"client error {code}"
        case {"type": "ok", "latency": latency} if latency > 1000:
            return "slow success"
        case {"type": "ok"}:
            return "success"
        case _:
            return "unknown"

for event in [
    {"type": "error", "code": 503},
    {"type": "error", "code": 404},
    {"type": "ok", "latency": 4200},
    {"type": "ok", "latency": 120},
    {"type": "weird"},
]:
    print(f"  {str(event):<40} -> {classify(event)}")`,
      },
      {
        title: "Catching the right exception",
        note: "Specific handlers, LookupError for both Key and Index, and the else clause.",
        code: `def safe_parse(raw, data, index):
    try:
        number = int(raw)
        value = data[index]
        result = number / value
    except ValueError as err:
        return f"ValueError: {err}"
    except LookupError as err:                  # covers KeyError and IndexError
        return f"LookupError: {err!r}"
    except ZeroDivisionError:
        return "ZeroDivisionError: divisor was zero"
    except Exception as err:                    # last resort, never bare except
        return f"unexpected {type(err).__name__}: {err}"
    else:
        return f"ok: {result:.3f}"               # runs only when nothing raised
    finally:
        pass                                     # cleanup always runs

cases = [("10", [2, 5], 0), ("abc", [2], 0), ("10", [2], 9), ("10", [0], 0)]
for raw, data, index in cases:
    print(f"{str((raw, data, index)):<22} -> {safe_parse(raw, data, index)}")

print("\\nhierarchy check:")
for exc in [KeyError, IndexError, FileNotFoundError, ZeroDivisionError]:
    parents = [c.__name__ for c in exc.__mro__[1:4]]
    print(f"  {exc.__name__:<20} -> {' -> '.join(parents)}")`,
      },
      {
        title: "Custom exceptions and raise from",
        note: "Signalling what is retryable is essential when wrapping flaky APIs.",
        code: `class LLMError(Exception):
    """Base class so callers can catch everything from this client."""

class RetryableError(LLMError):
    """Transient: rate limits, timeouts, 5xx."""

class FatalError(LLMError):
    """Do not retry: bad key, malformed request."""

def call_model(status):
    try:
        if status == 429:
            raise TimeoutError("rate limited")
        if status == 401:
            raise PermissionError("invalid api key")
        return {"ok": True}
    except TimeoutError as err:
        raise RetryableError(f"retry after backoff (status {status})") from err
    except PermissionError as err:
        raise FatalError(f"fix your credentials (status {status})") from err

for status in [200, 429, 401]:
    try:
        print(f"status {status}: {call_model(status)}")
    except RetryableError as err:
        print(f"status {status}: RETRY  -> {err}  | caused by {type(err.__cause__).__name__}")
    except FatalError as err:
        print(f"status {status}: ABORT  -> {err}  | caused by {type(err.__cause__).__name__}")

print("\\nboth subclass LLMError:", issubclass(RetryableError, LLMError))`,
      },
    ],
    tryIt: {
      title: "Write a retry loop that respects exception types",
      hint: "Change the failure list so the first attempt succeeds, or so all three fail.",
      starter: `import time

class RetryableError(Exception):
    pass

class FatalError(Exception):
    pass

attempts_log = []
outcomes = ["timeout", "timeout", "ok"]     # try ["auth", ...] or all "timeout"

def flaky_call(attempt):
    outcome = outcomes[min(attempt, len(outcomes) - 1)]
    attempts_log.append(outcome)
    if outcome == "timeout":
        raise RetryableError("upstream timed out")
    if outcome == "auth":
        raise FatalError("invalid credentials")
    return {"tokens": 512, "text": "hello"}

def call_with_retry(max_attempts=4, base_delay=0.01):
    for attempt in range(max_attempts):
        try:
            return flaky_call(attempt)
        except RetryableError as err:
            delay = base_delay * (2 ** attempt)
            print(f"  attempt {attempt + 1}: {err} — backing off {delay * 1000:.0f}ms")
            if attempt == max_attempts - 1:
                raise
            time.sleep(delay)
        except FatalError as err:
            print(f"  attempt {attempt + 1}: {err} — not retrying")
            raise

print("calling the model:")
try:
    result = call_with_retry()
    print(f"\\nsucceeded: {result}")
except Exception as err:
    print(f"\\ngave up: {type(err).__name__}: {err}")

print("attempt log:", attempts_log)`,
    },
    takeaways: [
      "Use `is` only with None/True/False; `==` compares values and is what you almost always want.",
      "Never use assert for validation — it vanishes under python -O.",
      "Catch specific exceptions, use `raise ... from err`, and define custom types to mark what is retryable.",
    ],
  },
];
