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
      "Built-in functions worth knowing, grouped by job, with tiny runnable demos.",
    whyForAi:
      "Many everyday tasks need no import. Short built-in calls leave fewer places for bugs.",
    packages: [],
    sections: [
      {
        heading: "Types and conversion",
        basicTip: "Convert a string score and check its type.",
        basicCode: `raw = "0.91"
score = float(raw)
print(score, type(score).__name__)
print(isinstance(score, (int, float)))`,
        body: `Common converters: \`int()\`, \`float()\`, \`str()\`, \`bool()\`, \`list()\`, \`tuple()\`, \`set()\`, \`dict()\`.

\`isinstance(x, cls)\` respects inheritance. Prefer it over \`type(x) is ...\`.

\`repr(x)\` shows quotes and escapes - useful when debugging messy text.`,
      },
      {
        heading: "Aggregate and iterate",
        basicTip: "any, all, and enumerate on a short list.",
        basicCode: `scores = [0.9, 0.4, 0.8]
print(any(s >= 0.7 for s in scores))
print(all(s >= 0.7 for s in scores))
for i, s in enumerate(scores):
    print(i, s)`,
        body: `Handy: \`len\`, \`sum\`, \`min\`, \`max\`, \`sorted\`, \`enumerate\`, \`zip\`, \`range\`, \`any\`, \`all\`.

\`min\` / \`max\` / \`sorted\` take \`key=\`. \`any\` / \`all\` stop early.

Common mistake: \`round(2.5)\` uses banker's rounding and can surprise you.`,
      },
      {
        heading: "getattr and friends",
        basicTip: "Read an attribute by name with a default.",
        basicCode: `class Cfg:
    model = "mini"
cfg = Cfg()
print(getattr(cfg, "model"))
print(getattr(cfg, "temperature", 0.2))`,
        body: `\`getattr(obj, name, default)\`, \`setattr\`, \`hasattr\`, and \`dir\` help explore objects.

Also useful: \`abs\`, \`pow\`, \`divmod\`, \`ord\`, \`chr\`.

Never \`eval\` / \`exec\` text from a user or an LLM.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: pick best run with max(key=)",
        note: "key= turns max into a leaderboard tool.",
        why: "One line picks the best model row.",
        aiMl: "Eval tables often select best accuracy or lowest cost this way.",
        analogy: "Like finding the tallest student by height, not by name.",
        code: `runs = [
    {"model": "mini", "acc": 0.91, "cost": 0.4},
    {"model": "large", "acc": 0.95, "cost": 3.2},
    {"model": "haiku", "acc": 0.89, "cost": 0.2},
]
print("best:", max(runs, key=lambda r: r["acc"])["model"])
print("cheap:", min(runs, key=lambda r: r["cost"])["model"])
print("total cost:", round(sum(r["cost"] for r in runs), 2))`,
      },
      {
        title: "AI / ML: config getattr defaults",
        note: "Missing fields fall back without crashing.",
        why: "Plugin-style configs often store optional knobs.",
        aiMl: "LLM clients read model, temperature, and max_tokens this way.",
        code: `class Config:
    model = "gpt-4.1-mini"
    temperature = 0.2

cfg = Config()
for field in ["model", "temperature", "top_p"]:
    print(field, getattr(cfg, field, "DEFAULT"))`,
      },
    ],
    tryIt: {
      title: "Summary with only built-ins",
      hint: "Sort by name length instead of score.",
      starter: `records = [
    ("mini", 0.91, 620),
    ("large", 0.95, 1520),
    ("haiku", 0.89, 460),
]
scores = [r[1] for r in records]
print("count", len(records))
print("best", max(records, key=lambda r: r[1])[0])
print("mean", round(sum(scores) / len(scores), 4))
print("all pass", all(s > 0.8 for s in scores))
for i, (name, score, _) in enumerate(sorted(records, key=lambda r: -r[1]), 1):
    print(i, name, score)`,
    },
    takeaways: [
      "Prefer isinstance over type() checks.",
      "key= makes min, max, and sorted work on records.",
      "getattr with a default replaces long if-chains.",
    ],
  },
  {
    slug: "string-methods-reference",
    title: "String methods reference",
    moduleId: "reference",
    level: "beginner",
    minutes: 16,
    summary:
      "String methods for cleaning, searching, splitting, and formatting.",
    whyForAi:
      "Prompts, logs, and scraped text are strings. Cleanup and f-strings are daily GenAI work.",
    packages: [],
    sections: [
      {
        heading: "Clean and case",
        basicTip: "Strip and lower messy text.",
        basicCode: `text = "  Hello GenAI  "
clean = text.strip().lower()
print(repr(clean))`,
        body: `Strings are immutable. Methods return a new string. Forgetting to assign is a common bug.

Useful: \`strip\`, \`lower\`, \`upper\`, \`casefold\`, \`removeprefix\`, \`removesuffix\`.

Note: \`strip("abc")\` removes those characters from the ends, not the substring \`"abc"\`.`,
      },
      {
        heading: "Search and test",
        basicTip: "startswith and find on a log line.",
        basicCode: `line = "ERROR: timeout after 30s"
print(line.startswith("ERROR"))
print(line.find("timeout"))`,
        body: `\`in\`, \`find\` (-1 if missing), \`index\` (raises), \`startswith\`, \`endswith\`, \`count\`, \`replace\`.

Predicates: \`isdigit\`, \`isalpha\`, \`isalnum\`, \`isspace\`.

\`"3.14".isdigit()\` is False. Prefer \`try: float(s)\` for numeric checks.`,
      },
      {
        heading: "Split, join, format",
        basicTip: "Split tokens and join them back.",
        basicCode: `parts = "rag,agents,eval".split(",")
print(parts)
print(" | ".join(parts))
print(f"score={0.913:.2f}")`,
        body: `\`split()\` on whitespace drops empties. \`split(",")\` keeps empties. \`partition(sep)\` returns three parts - good for \`key=value\`.

Prefer \`"".join(parts)\` over \`+=\` in a loop.

f-strings: \`{x:.2f}\`, \`{n:,}\`, \`{ratio:.1%}\`, \`{name:>10}\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: parse key=value settings",
        note: "partition is clean for key=value chunks.",
        why: "Config lines and log fields often look like this.",
        aiMl: "Serving logs and prompt flags are often parsed this way.",
        code: `line = "model=gpt-4.1-mini,temp=0.2,stream=true"
settings = {}
for chunk in line.split(","):
    key, sep, value = chunk.partition("=")
    if sep:
        settings[key] = value
print(settings)`,
      },
      {
        title: "AI / ML: format eval scores",
        note: "f-string specs for reports and logs.",
        why: "Readable numbers matter in leaderboards.",
        aiMl: "Accuracy, cost, and latency usually print with fixed decimals.",
        code: `score = 0.9137
tokens = 1234567
name = "mini"
print(f"{name} acc={score:.1%} tokens={tokens:,}")
print(f"{score=}")`,
      },
    ],
    tryIt: {
      title: "Clean and parse a log line",
      hint: "Add another key=value pair and it parses automatically.",
      starter: `raw = "  [2026-09-04] LEVEL=warn model=mini latency_ms=8421 ok=false \\n"
line = raw.strip()
stamp = line[line.find("[") + 1 : line.find("]")]
rest = line[line.find("]") + 1 :].strip()
fields = {}
for chunk in rest.split():
    k, sep, v = chunk.partition("=")
    if sep:
        fields[k.lower()] = v
print("time", stamp)
print(fields)
print("slow?", int(fields.get("latency_ms", 0)) > 5000)`,
    },
    takeaways: [
      "Strings are immutable - assign method results.",
      "Use join to build strings; partition for key=value.",
      "f-string specs cover most formatting needs.",
    ],
  },
  {
    slug: "collection-methods-reference",
    title: "List, dict, set, and tuple reference",
    moduleId: "reference",
    level: "beginner",
    minutes: 18,
    summary:
      "Core collection methods, when to use each type, and a speed note on membership.",
    whyForAi:
      "Wrong collection choice is a common slowdown. Set membership is fast; list scans are not.",
    packages: [],
    sections: [
      {
        heading: "Pick the right type",
        basicTip: "List vs set for labels.",
        basicCode: `labels = ["spam", "ham", "spam"]
unique = set(labels)
print(len(labels), "rows,", len(unique), "classes")`,
        body: `- **list** - ordered, mutable, allows duplicates
- **tuple** - ordered, immutable (can be a dict key)
- **dict** - key to value map
- **set** - unique items, fast \`in\` checks

If you write \`if item in big_list\` inside a loop, convert to a set first.`,
      },
      {
        heading: "List and tuple",
        basicTip: "Append, sort a copy, unpack a tuple.",
        basicCode: `scores = [0.4, 0.9]
scores.append(0.7)
print(sorted(scores))
model, lr = ("mini", 2e-5)
print(model, lr)`,
        body: `List: \`append\`, \`extend\`, \`insert\`, \`remove\`, \`pop\`, \`sort\`, \`reverse\`, \`copy\`.

\`sort()\` returns \`None\`. \`sorted()\` returns a new list. Do not write \`items = items.sort()\`.

Tuple has mostly \`count\` and \`index\`. Unpack with \`a, b = pair\` or \`first, *rest = items\`.`,
      },
      {
        heading: "Dict and set",
        basicTip: "get, setdefault, and set intersection.",
        basicCode: `counts = {"spam": 3}
print(counts.get("ham", 0))
counts.setdefault("ham", 0)
a, b = {"rag", "eval"}, {"eval", "agents"}
print(a & b)`,
        body: `Dict: \`get\`, \`items\`, \`update\`, \`setdefault\`, \`pop\`. Merge with \`a | b\` (3.9+).

Set: \`add\`, \`discard\`, \`|\` \`&\` \`-\` \`^\`.

\`{}\` is an empty dict. Use \`set()\` for an empty set.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: feature set diff",
        note: "Set ops compare train vs serving columns fast.",
        why: "Missing features at serve time break models.",
        aiMl: "Training/serving skew checks often use set difference.",
        analogy: "Like comparing two packing lists before a trip.",
        code: `train = {"tokens", "latency", "model", "region", "user_id"}
serve = {"tokens", "latency", "model", "device"}
print("both:", sorted(train & serve))
print("train only:", sorted(train - serve))
print("serve only:", sorted(serve - train))`,
      },
      {
        title: "AI / ML: group events with setdefault",
        note: "Build a dict of lists without KeyError.",
        why: "Grouping clicks or tool calls by user is common.",
        aiMl: "Telemetry and agent traces often group by session id.",
        code: `events = [("u1", "click"), ("u2", "view"), ("u1", "buy")]
by_user = {}
for user, action in events:
    by_user.setdefault(user, []).append(action)
print(by_user)
print("busiest:", max(by_user.items(), key=lambda p: len(p[1]))[0])`,
      },
    ],
    tryIt: {
      title: "Cohort overlap with sets",
      hint: "Change the cohort lists and watch overlaps update.",
      starter: `a = ["u1", "u2", "u3", "u4", "u2"]
b = ["u4", "u5", "u6"]
sa, sb = set(a), set(b)
print("unique A", len(sa))
print("both", sorted(sa & sb))
print("only A", sorted(sa - sb))
print("overlap", round(len(sa & sb) / len(sa | sb), 2))`,
    },
    takeaways: [
      "Use a set for membership tests on large data.",
      "sort() mutates and returns None; sorted() returns a list.",
      "dict.get and setdefault avoid KeyError.",
    ],
  },
  {
    slug: "keywords-operators-exceptions-reference",
    title: "Keywords, operators, and exceptions reference",
    moduleId: "reference",
    level: "intermediate",
    minutes: 18,
    summary:
      "Reserved keywords, operators worth knowing, and which exceptions to catch.",
    whyForAi:
      "Clear exception types and correct operators keep training and API wrappers from failing silently.",
    packages: [],
    sections: [
      {
        heading: "Keywords to remember",
        basicTip: "pass and an is not None check.",
        basicCode: `value = 0
if value is not None:
    pass
print("zero is falsy:", not value)`,
        body: `Reserved names cannot be variables: \`if\`, \`for\`, \`def\`, \`class\`, \`try\`, \`with\`, \`yield\`, \`async\`, \`await\`, and more.

- \`pass\` - empty block placeholder
- \`assert\` - debug only; stripped with \`python -O\` (do not use for security checks)
- \`with\` - guaranteed cleanup
- \`yield\` - makes a generator

\`match\` / \`case\` are soft keywords (3.10+).`,
      },
      {
        heading: "Operators",
        basicTip: "== compares values; is compares identity.",
        basicCode: `a = [1, 2]
b = [1, 2]
print(a == b, a is b)
print(2 + 3 * 4)`,
        body: `Arithmetic: \`+\` \`-\` \`*\` \`/\` \`//\` \`%\` \`**\`. Comparisons chain: \`0 <= x <= 1\`.

Use \`is\` only with \`None\`, \`True\`, \`False\`. Use \`==\` for values.

Walrus \`:=\` assigns inside an expression: \`if (n := len(xs)) > 3:\`.

When unsure about precedence, add parentheses.`,
      },
      {
        heading: "Exceptions",
        basicTip: "Catch ValueError from a bad float parse.",
        basicCode: `raw = "hot"
try:
    print(float(raw))
except ValueError as err:
    print("caught", type(err).__name__)`,
        body: `Catch \`Exception\`, not \`BaseException\` (that would swallow Ctrl+C).

Common: \`ValueError\`, \`TypeError\`, \`KeyError\`, \`IndexError\`, \`AttributeError\`, \`FileNotFoundError\`, \`TimeoutError\`.

Catch specific types. Use \`raise ... from err\` when wrapping. Define \`RetryableError\` vs fatal errors for flaky LLM APIs.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: retryable vs fatal errors",
        note: "Mark what is safe to retry.",
        why: "Rate limits need backoff; bad API keys do not.",
        aiMl: "LLM clients separate 429/5xx from 401/400.",
        analogy: "Like retrying a busy phone line, but not a wrong number.",
        code: `class RetryableError(Exception):
    pass

class FatalError(Exception):
    pass

def call_model(status):
    if status == 429:
        raise RetryableError("rate limited")
    if status == 401:
        raise FatalError("bad key")
    return {"ok": True}

for status in [200, 429, 401]:
    try:
        print(status, call_model(status))
    except RetryableError as err:
        print(status, "RETRY", err)
    except FatalError as err:
        print(status, "ABORT", err)`,
      },
      {
        title: "AI / ML: walrus in a length check",
        note: "Assign and test in one expression.",
        why: "Avoids repeating len(values).",
        aiMl: "Batch-size guards and context-window checks use this pattern.",
        code: `values = [3, 14, 7, 22, 5]
if (count := len(values)) > 3:
    print(f"{count} values")
filtered = [y for x in values if (y := x * 2) > 10]
print(filtered)`,
      },
    ],
    tryIt: {
      title: "Retry loop with exception types",
      hint: "Change outcomes so the first attempt succeeds.",
      starter: `class RetryableError(Exception):
    pass

class FatalError(Exception):
    pass

outcomes = ["timeout", "timeout", "ok"]

def flaky(attempt):
    outcome = outcomes[min(attempt, len(outcomes) - 1)]
    if outcome == "timeout":
        raise RetryableError("timed out")
    if outcome == "auth":
        raise FatalError("bad key")
    return {"text": "hello"}

for attempt in range(4):
    try:
        print("ok", flaky(attempt))
        break
    except RetryableError as err:
        print("retry", attempt + 1, err)
    except FatalError as err:
        print("abort", err)
        break`,
    },
    takeaways: [
      "Use is only with None/True/False; use == for values.",
      "Never use assert for real validation.",
      "Catch specific exceptions and mark what is retryable.",
    ],
  },
];
