import type { PythonLesson } from "./types";

/** Additional Module 1 lessons: syntax, casting, numbers, booleans, string methods. */
export const MODULE_1B_LESSONS: PythonLesson[] = [
  {
    slug: "syntax-and-comments",
    title: "Syntax, indentation, and comments",
    moduleId: "foundations",
    level: "beginner",
    minutes: 14,
    summary:
      "The rules Python enforces: indentation blocks, statements, line continuation, comments, and docstrings.",
    whyForAi:
      "Indentation errors are the first wall every beginner hits, and they still bite experienced engineers who paste code out of a notebook or a chatbot. Knowing the rules means you can fix the error instead of guessing.",
    packages: [],
    sections: [
      {
        heading: "Indentation is the block structure",
        body: `Most languages mark blocks with braces. Python uses **indentation**, so whitespace is part of the grammar.

Rules that matter:

- A colon \`:\` ends the line that opens a block (\`if\`, \`for\`, \`while\`, \`def\`, \`class\`, \`try\`, \`with\`).
- Everything in the block is indented by the same amount.
- **Four spaces** per level is the universal convention. Never mix tabs and spaces — Python 3 rejects it with \`TabError\`.
- The block ends when indentation returns to the outer level.

Two errors you will see:

- \`IndentationError: expected an indented block\` — you opened with a colon but did not indent.
- \`IndentationError: unindent does not match any outer indentation level\` — the levels are inconsistent, usually mixed tabs and spaces from copy-paste.

Configure your editor to insert spaces when Tab is pressed. That one setting removes an entire class of errors.`,
      },
      {
        heading: "Statements and line length",
        body: `One statement per line, no semicolons needed. Python accepts \`a = 1; b = 2\` but nobody writes that.

Long lines break naturally inside brackets \`()\`, \`[]\`, \`{}\` — no continuation character required. This is why function calls with many arguments are written one argument per line.

The backslash \`\\\` also continues a line, but it is fragile (a trailing space after it breaks the file). Prefer brackets.

PEP 8 suggests 79 characters; most teams settle on 88 or 100 and let a formatter such as ruff or black enforce it.`,
      },
      {
        heading: "Comments and docstrings",
        body: `\`#\` starts a comment to end of line. Python has no block comment syntax.

A **docstring** is a string literal as the first statement of a module, function, or class. Unlike a comment it is stored on the object and readable at runtime through \`help()\` or \`__doc__\`. Editors show it on hover, and API documentation is generated from it.

Comment the **why**, not the what. \`# add 1 to i\` is noise. \`# offset by 1 because the API is 1-indexed\` is worth keeping.

Naming conventions carry meaning in Python:

| Style | Used for |
| --- | --- |
| \`snake_case\` | variables, functions, modules |
| \`PascalCase\` | classes |
| \`UPPER_CASE\` | constants |
| \`_leading\` | internal, do not touch from outside |
| \`__dunder__\` | Python's own special methods |`,
      },
    ],
    examples: [
      {
        title: "Indentation defines the block",
        note: "The indented lines belong to the if; the last line always runs.",
        code: `score = 0.85

if score > 0.7:
    print("high confidence")
    print("still inside the if block")
print("outside the block — always runs")

for i in range(3):
    if i % 2 == 0:
        print(i, "even")
    else:
        print(i, "odd")`,
      },
      {
        title: "Breaking long lines inside brackets",
        note: "No backslash needed. This is how real config and API calls are written.",
        code: `config = {
    "model": "gpt-4.1-mini",
    "temperature": 0.2,
    "max_tokens": 512,
}

def train(
    model_name,
    epochs=3,
    learning_rate=2e-5,
    batch_size=16,
):
    return f"{model_name}: {epochs} epochs at lr={learning_rate}"

print(config)
print(train("bert-base", epochs=5))`,
      },
      {
        title: "Docstrings vs comments",
        note: "The docstring is retrievable at runtime; the comment is not.",
        code: `def cosine_similarity(a, b):
    """Return the cosine similarity between two equal-length vectors.

    Args:
        a: First vector as a list of floats.
        b: Second vector as a list of floats.

    Returns:
        A float between -1.0 and 1.0.
    """
    # guard against a zero vector, which would divide by zero
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(y * y for y in b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)

print(round(cosine_similarity([1, 2, 3], [2, 4, 6]), 4))
print(cosine_similarity.__doc__.splitlines()[0])`,
      },
      {
        title: "Naming conventions in one file",
        note: "Style signals intent to the next reader — follow it exactly.",
        code: `MAX_TOKENS = 4096          # constant

class PromptBuilder:       # class: PascalCase
    def __init__(self, system_prompt):
        self.system_prompt = system_prompt   # public attribute
        self._call_count = 0                 # internal, leave alone

    def build(self, question):               # method: snake_case
        self._call_count += 1
        return f"{self.system_prompt}\\n\\nQ: {question}"

builder = PromptBuilder("Be concise.")
print(builder.build("What is Python?"))
print("MAX_TOKENS:", MAX_TOKENS)`,
      },
    ],
    tryIt: {
      title: "Fix the indentation",
      hint: "The else block is under-indented. Line it up with the if, then press Run.",
      starter: `def classify(score):
    if score >= 0.8:
        return "high"
    elif score >= 0.5:
        return "medium"
    else:
        return "low"

for s in [0.95, 0.62, 0.10]:
    print(s, "->", classify(s))`,
    },
    takeaways: [
      "Indentation is syntax: four spaces per level, never mix tabs and spaces.",
      "Break long lines inside brackets rather than with a backslash.",
      "Docstrings are readable at runtime; comments explain why, not what.",
    ],
  },
  {
    slug: "casting-and-conversion",
    title: "Type casting and conversion",
    moduleId: "foundations",
    level: "beginner",
    minutes: 16,
    summary:
      "Convert between strings, integers, floats, booleans, and collections — and do it safely when the input comes from outside.",
    whyForAi:
      "Config files, environment variables, CSV columns, and JSON from an LLM all arrive as strings. The classic production bug is a temperature of \"0.2\" (string) silently behaving differently from 0.2 (float). Explicit, guarded conversion prevents it.",
    packages: [],
    sections: [
      {
        heading: "The conversion functions",
        body: `Python does not convert types implicitly between strings and numbers — \`"3" + 4\` is a \`TypeError\`, not \`7\`. You convert explicitly:

- \`int(x)\` — to integer. From a float it **truncates toward zero**, it does not round: \`int(3.9)\` is \`3\`.
- \`float(x)\` — to float.
- \`str(x)\` — to text. Works on anything.
- \`bool(x)\` — to True/False using truthiness rules.
- \`list(x)\`, \`tuple(x)\`, \`set(x)\`, \`dict(pairs)\` — between collections.

\`int("12.5")\` raises \`ValueError\` — int cannot parse a decimal string. Go through float first: \`int(float("12.5"))\`.

For real rounding use \`round(x)\`, and note Python uses banker's rounding: \`round(0.5)\` is \`0\`, \`round(1.5)\` is \`2\`. When money or reporting is involved, use \`decimal.Decimal\`.`,
      },
      {
        heading: "Safe parsing",
        body: `Any conversion of outside data can fail. Wrap it:

\`\`\`python
try:
    value = float(raw)
except (TypeError, ValueError):
    value = default
\`\`\`

\`TypeError\` covers \`None\`; \`ValueError\` covers \`"abc"\`. Catch both.

The most dangerous case is \`bool()\` on strings. **Every non-empty string is True**, so \`bool("False")\` is \`True\` and \`bool("0")\` is \`True\`. Environment variables are strings, so \`DEBUG=False\` read naively enables debug mode. Compare against a set of known values instead.

Never use \`eval()\` to parse input. It executes arbitrary code. Use \`json.loads\` or \`ast.literal_eval\`.`,
      },
      {
        heading: "Floats are approximate",
        body: `\`0.1 + 0.2\` is \`0.30000000000000004\`. This is IEEE 754 binary floating point, not a Python quirk — every language does it.

Consequences:

- Never test floats with \`==\`. Use \`math.isclose(a, b)\`.
- Never store money as a float. Use \`Decimal\` or integer paise/cents.
- Accumulated error matters in long-running numeric loops; NumPy's \`float32\` has even less precision than Python's \`float\` (which is \`float64\`).`,
      },
    ],
    examples: [
      {
        title: "Basic conversions",
        note: "Note that int() truncates instead of rounding.",
        code: `print(int("42"), type(int("42")).__name__)
print(float("3.14"))
print(str(99) + " problems")
print(int(3.99), "<- truncated, not rounded")
print(round(3.99), "<- rounded")
print(int(float("12.5")), "<- two-step parse")

print(list("abc"))
print(tuple([1, 2, 3]))
print(set([1, 1, 2, 2, 3]))
print(dict([("a", 1), ("b", 2)]))`,
      },
      {
        title: "The bool() trap with environment variables",
        note: "Run this — bool(\"False\") being True is a real production bug.",
        code: `print('bool("False") =', bool("False"))
print('bool("0")     =', bool("0"))
print('bool("")      =', bool(""))
print("bool(0)       =", bool(0))
print("bool([])      =", bool([]))

TRUTHY = {"1", "true", "yes", "on"}

def parse_bool(raw, default=False):
    if raw is None:
        return default
    return str(raw).strip().lower() in TRUTHY

for raw in ["true", "False", "1", "0", "yes", None]:
    print(f"parse_bool({raw!r}) -> {parse_bool(raw)}")`,
      },
      {
        title: "Safe numeric parsing with defaults",
        note: "This is the shape of every config loader you will write.",
        code: `def to_float(raw, default=0.0, low=None, high=None):
    try:
        value = float(raw)
    except (TypeError, ValueError):
        return default
    if low is not None and value < low:
        return low
    if high is not None and value > high:
        return high
    return value

for raw in ["0.7", "abc", None, "5.0", "-1"]:
    print(f"{raw!r:8} -> {to_float(raw, default=0.2, low=0.0, high=2.0)}")`,
      },
      {
        title: "Float precision",
        note: "Use math.isclose for comparisons, never ==.",
        code: `import math

print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))

from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))

print(f"formatted: {0.1 + 0.2:.2f}")`,
      },
    ],
    tryIt: {
      title: "Build a config parser",
      hint: "Add a bad value like \"hot\" for temperature and confirm the default is used.",
      starter: `raw_config = {
    "model": "gpt-4.1-mini",
    "temperature": "0.7",
    "max_tokens": "512",
    "stream": "true",
    "top_p": None,
}

TRUTHY = {"1", "true", "yes", "on"}

def as_float(raw, default):
    try:
        return float(raw)
    except (TypeError, ValueError):
        return default

def as_int(raw, default):
    try:
        return int(float(raw))
    except (TypeError, ValueError):
        return default

config = {
    "model": str(raw_config.get("model", "unknown")),
    "temperature": as_float(raw_config.get("temperature"), 0.2),
    "max_tokens": as_int(raw_config.get("max_tokens"), 256),
    "stream": str(raw_config.get("stream", "")).lower() in TRUTHY,
    "top_p": as_float(raw_config.get("top_p"), 1.0),
}

for key, value in config.items():
    print(f"{key:12} = {value!r:22} ({type(value).__name__})")`,
    },
    takeaways: [
      "Python never converts between strings and numbers implicitly — do it explicitly.",
      "int() truncates; round() rounds; int(\"1.5\") raises, so parse through float().",
      "bool(\"False\") is True — parse booleans against a known set of strings.",
    ],
  },
  {
    slug: "numbers-and-math",
    title: "Numbers, math, and randomness",
    moduleId: "foundations",
    level: "beginner",
    minutes: 18,
    summary:
      "Integers, floats, the math module, rounding, and reproducible random numbers.",
    whyForAi:
      "Learning-rate schedules, softmax, log-loss, and cosine similarity are arithmetic. Random number generation drives weight initialisation, shuffling, dropout, and train/test splits — and it must be seeded, or your results are not reproducible.",
    packages: [],
    sections: [
      {
        heading: "Numeric types and operators",
        body: `Three built-in numeric types: \`int\` (unbounded — no overflow), \`float\` (64-bit IEEE 754), and \`complex\` (rare outside signal processing).

Operators: \`+ - * / // % **\`. Remember \`/\` always gives a float and \`//\` floors toward negative infinity, so \`-7 // 2\` is \`-4\`, not \`-3\`.

Useful built-ins: \`abs\`, \`round\`, \`min\`, \`max\`, \`sum\`, \`pow\`, \`divmod\`.

Readability helper: underscores in numeric literals. \`1_000_000\` is easier to scan than \`1000000\`, and scientific notation \`2e-5\` is standard for learning rates.`,
      },
      {
        heading: "The math module",
        body: `\`import math\` for the functions that show up in ML formulas:

- \`math.sqrt\`, \`math.exp\`, \`math.log\` (natural), \`math.log10\`, \`math.log2\`
- \`math.floor\`, \`math.ceil\`, \`math.trunc\`
- \`math.inf\`, \`-math.inf\`, \`math.nan\`, \`math.isnan\`, \`math.isclose\`
- \`math.pi\`, \`math.e\`

\`math.inf\` is the correct initial value when tracking a minimum loss: any real loss is smaller than infinity.

\`math.nan\` never equals itself — \`nan == nan\` is \`False\`. Test with \`math.isnan(x)\`. NaN appearing in your loss is the signature of a diverged training run, usually from too high a learning rate or a log of zero.`,
      },
      {
        heading: "Random numbers and seeding",
        body: `\`random\` covers shuffling and sampling: \`random.random()\`, \`randint\`, \`uniform\`, \`choice\`, \`sample\`, \`shuffle\`, \`gauss\`.

**Always seed for reproducibility.** \`random.seed(42)\` makes the sequence deterministic. In an ML project you seed Python's \`random\`, NumPy, and your framework, because each has its own generator.

The \`random\` module is not cryptographically secure. For tokens, API keys, or passwords use \`secrets\`.`,
      },
    ],
    examples: [
      {
        title: "Operators and integer behaviour",
        note: "Python ints have no size limit — no overflow.",
        code: `print("divide      :", 7 / 2)
print("floor divide:", 7 // 2, "|", -7 // 2, "<- floors toward -inf")
print("remainder   :", 7 % 2)
print("power       :", 2 ** 10)
print("divmod      :", divmod(17, 5))
print("big int     :", 2 ** 200)
print("readable    :", 1_000_000 + 2e-5)
print("abs/min/max :", abs(-4), min(3, 1, 2), max(3, 1, 2))`,
      },
      {
        title: "math functions used in ML",
        note: "Sigmoid and log-loss written out longhand.",
        code: `import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def log_loss(y_true, y_pred, eps=1e-15):
    y_pred = min(max(y_pred, eps), 1 - eps)   # clip to avoid log(0)
    return -(y_true * math.log(y_pred) + (1 - y_true) * math.log(1 - y_pred))

for z in [-2.0, 0.0, 2.0]:
    print(f"sigmoid({z:5.1f}) = {sigmoid(z):.4f}")

print("loss when confident and right:", round(log_loss(1, 0.99), 4))
print("loss when confident and wrong:", round(log_loss(1, 0.01), 4))
print("sqrt / log / exp:", math.sqrt(16), round(math.log(math.e), 4), round(math.exp(1), 4))`,
      },
      {
        title: "Infinity and NaN",
        note: "math.inf is the right starting value for tracking a best loss.",
        code: `import math

best_loss = math.inf
for loss in [0.9, 0.7, 0.75, 0.6]:
    if loss < best_loss:
        best_loss = loss
        print("new best:", loss)
print("final best:", best_loss)

nan = float("nan")
print("nan == nan :", nan == nan, "<- always False")
print("isnan      :", math.isnan(nan))
print("isinf      :", math.isinf(math.inf))`,
      },
      {
        title: "Seeded randomness",
        note: "Same seed, same sequence — this is what makes an experiment repeatable.",
        code: `import random

random.seed(42)
first = [round(random.random(), 4) for _ in range(3)]

random.seed(42)
second = [round(random.random(), 4) for _ in range(3)]

print("run 1:", first)
print("run 2:", second)
print("reproducible:", first == second)

random.seed(7)
data = list(range(10))
random.shuffle(data)
print("shuffled  :", data)
print("sample 3  :", random.sample(range(100), 3))
print("choice    :", random.choice(["adam", "sgd", "adamw"]))
print("gaussian  :", round(random.gauss(0, 1), 4))`,
      },
    ],
    tryIt: {
      title: "Build a learning-rate schedule",
      hint: "Change decay_rate to 0.5 and watch the learning rate fall faster.",
      starter: `import math

initial_lr = 1e-3
decay_rate = 0.9
warmup_steps = 3

def lr_at(step):
    if step < warmup_steps:
        return initial_lr * (step + 1) / warmup_steps
    return initial_lr * (decay_rate ** (step - warmup_steps))

for step in range(10):
    lr = lr_at(step)
    bar = "#" * int(lr / initial_lr * 30)
    print(f"step {step:2d}  lr={lr:.6f}  {bar}")

print("cosine schedule at step 5:",
      round(0.5 * initial_lr * (1 + math.cos(math.pi * 5 / 10)), 8))`,
    },
    takeaways: [
      "int is unbounded; / gives float and // floors toward negative infinity.",
      "math.inf initialises best-loss trackers; NaN never equals itself, use math.isnan.",
      "Seed random for reproducibility, and use secrets for anything security-related.",
    ],
  },
  {
    slug: "booleans-and-comparisons",
    title: "Booleans, comparisons, and truthiness",
    moduleId: "foundations",
    level: "beginner",
    minutes: 14,
    summary:
      "True and False, the truthiness of every type, is vs ==, short-circuit logic, and any/all.",
    whyForAi:
      "Filtering predictions, guarding empty batches, and checking optional config all depend on truthiness. The subtle bug is that a valid score of 0.0 is falsy, so `if score:` silently drops it.",
    packages: [],
    sections: [
      {
        heading: "Truthiness",
        body: `Every object is either truthy or falsy in a boolean context. The **falsy** values are:

\`False\`, \`None\`, \`0\`, \`0.0\`, \`""\`, \`[]\`, \`()\`, \`{}\`, \`set()\`, and \`range(0)\`.

Everything else is truthy — including \`"False"\`, \`"0"\`, \`[0]\`, and \`{"a": None}\`.

So \`if chunks:\` is a clean way to say "if the list is not empty". But \`if score:\` is a bug when \`0.0\` is a legitimate score; write \`if score is not None:\`.

\`bool\` is a subclass of \`int\`: \`True == 1\` and \`False == 0\`. That is why \`sum([True, False, True])\` returns \`2\`, which is a neat way to count matches.`,
      },
      {
        heading: "is vs ==",
        body: `\`==\` compares **values**. \`is\` compares **identity** — whether both names point to the same object.

Use \`is\` only for singletons: \`is None\`, \`is True\`, \`is False\`, and sentinel objects.

Use \`==\` for everything else. \`x is 1000\` may be False even when \`x == 1000\`, because small integers are cached and larger ones are not. Comparing strings or numbers with \`is\` produces bugs that appear only with certain inputs.

The correct null check is \`if value is None:\`.`,
      },
      {
        heading: "Logic operators and any/all",
        body: `\`and\`, \`or\`, \`not\` **short-circuit**: \`and\` stops at the first falsy value, \`or\` stops at the first truthy one. That is what makes \`if data and data[0] > 5:\` safe on an empty list — the second condition never runs.

They return an operand, not a bool: \`"" or "default"\` returns \`"default"\`. Handy for fallbacks, though \`if x is None\` is clearer when \`0\` or \`""\` are valid values.

\`any(iterable)\` is True if at least one element is truthy; \`all(iterable)\` is True if every element is (and True for an empty iterable). Both are ideal for validation over a batch.

Chained comparisons read like mathematics: \`0.0 <= score <= 1.0\` evaluates \`score\` once and is clearer than joining with \`and\`.`,
      },
    ],
    examples: [
      {
        title: "What is truthy",
        note: "The falsy list is short — memorise it.",
        code: `values = [False, None, 0, 0.0, "", [], {}, set(), "False", "0", [0], 0.1, " "]
for v in values:
    print(f"{repr(v):10} -> {bool(v)}")

print("\\nbool is an int:", True == 1, False == 0)
print("count of correct answers:", sum([True, False, True, True]))`,
      },
      {
        title: "The 0.0 score bug",
        note: "The first check silently drops a valid zero score.",
        code: `def report_buggy(score):
    if score:
        return f"score={score}"
    return "no score provided"

def report_correct(score):
    if score is not None:
        return f"score={score}"
    return "no score provided"

for score in [0.85, 0.0, None]:
    print(f"{str(score):5} buggy: {report_buggy(score):22} correct: {report_correct(score)}")`,
      },
      {
        title: "is vs ==",
        note: "Use is only with None, True, False, and sentinels.",
        code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a

print("a == b:", a == b, "(same value)")
print("a is b:", a is b, "(different objects)")
print("a is c:", a is c, "(same object)")

x = None
print("correct null check:", x is None)

big1 = 1000
big2 = 1000
print("large int identity is unreliable:", big1 is big2, "| value equality:", big1 == big2)`,
      },
      {
        title: "Short-circuit, any, and all",
        note: "any and all express batch validation in one line.",
        code: `chunks = []
print("safe on empty list:", bool(chunks and chunks[0]))

model_name = "" or "default-model"
print("fallback:", model_name)

scores = [0.91, 0.72, 0.85]
print("all above 0.7 :", all(s > 0.7 for s in scores))
print("any below 0.8 :", any(s < 0.8 for s in scores))
print("all on empty  :", all([]), "<- vacuously true")

score = 0.95
print("chained range check:", 0.0 <= score <= 1.0)`,
      },
    ],
    tryIt: {
      title: "Validate a batch of predictions",
      hint: "Set one score to None or 1.4 and see which validation rule catches it.",
      starter: `predictions = [
    {"id": "a", "label": "positive", "score": 0.91},
    {"id": "b", "label": "negative", "score": 0.0},
    {"id": "c", "label": "positive", "score": 0.77},
]

has_scores = all(p.get("score") is not None for p in predictions)
in_range = all(0.0 <= p["score"] <= 1.0 for p in predictions if p.get("score") is not None)
any_confident = any(p["score"] >= 0.9 for p in predictions if p.get("score") is not None)
n_zero = sum(p["score"] == 0.0 for p in predictions if p.get("score") is not None)

print("every row has a score :", has_scores)
print("all scores in [0, 1]  :", in_range)
print("any highly confident  :", any_confident)
print("rows scoring exactly 0:", n_zero)
print("batch valid           :", has_scores and in_range)`,
    },
    takeaways: [
      "Falsy: False, None, 0, 0.0, \"\", [], (), {}, set(). Everything else is truthy.",
      "Use `is` only for None/True/False; use == for values.",
      "any() and all() express batch validation cleanly; all([]) is True.",
    ],
  },
  {
    slug: "string-methods-and-formatting",
    title: "String methods and formatting",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "The full string toolkit: case, search, split and join, replace, padding, and f-string format specifiers.",
    whyForAi:
      "Cleaning documents before embedding, normalising labels, parsing model output, and printing readable metrics are all string work. f-string format specifiers are how you produce log lines and reports that people can actually scan.",
    packages: [],
    sections: [
      {
        heading: "The method groups",
        body: `Strings are immutable — every method returns a **new** string. Assign the result.

**Case:** \`lower\`, \`upper\`, \`title\`, \`capitalize\`, \`swapcase\`, \`casefold\` (aggressive lowercase for comparisons across languages).

**Whitespace:** \`strip\`, \`lstrip\`, \`rstrip\` — pass characters to strip something specific, e.g. \`strip(".,")\`.

**Search:** \`find\` (-1 if absent), \`index\` (raises), \`count\`, \`startswith\`, \`endswith\`, and the \`in\` operator.

**Split and join:** \`split\`, \`rsplit\`, \`splitlines\`, \`partition\`, and \`"sep".join(list)\`.

**Transform:** \`replace\`, \`removeprefix\`, \`removesuffix\`, \`zfill\`, \`ljust\`, \`rjust\`, \`center\`.

**Tests:** \`isdigit\`, \`isalpha\`, \`isalnum\`, \`isspace\`, \`islower\`, \`isupper\`.

Note \`"".join(parts)\` is dramatically faster than repeated \`+=\` in a loop, because each \`+=\` allocates a whole new string.`,
      },
      {
        heading: "Format specifiers",
        body: `Inside an f-string, everything after \`:\` is a format specification.

| Spec | Meaning | Example output |
| --- | --- | --- |
| \`:.2f\` | 2 decimal places | \`0.91\` |
| \`:.1%\` | percentage | \`91.3%\` |
| \`:,\` | thousands separator | \`1,234,567\` |
| \`:>10\` | right align, width 10 | \`&nbsp;&nbsp;&nbsp;&nbsp;hello\` |
| \`:<10\` | left align | \`hello&nbsp;&nbsp;&nbsp;&nbsp;\` |
| \`:^10\` | centre | \`&nbsp;&nbsp;hello&nbsp;&nbsp;\` |
| \`:08.3f\` | zero-pad, 3 decimals | \`0004.500\` |
| \`:e\` | scientific | \`2.000000e-05\` |
| \`:+\` | always show sign | \`+5\` |

\`{value!r}\` inserts \`repr(value)\` instead of \`str(value)\` — it shows quotes and escapes, which is what you want in logs and error messages.

\`{name=}\` prints both the expression and its value: \`f"{lr=}"\` gives \`lr=2e-05\`. Excellent for quick debugging.`,
      },
      {
        heading: "Multi-line text and escapes",
        body: `Triple quotes preserve newlines and are the natural home for prompt templates.

\`textwrap.dedent\` strips the common leading indentation, so an indented triple-quoted string inside a function does not carry the code's indentation into the prompt.

Escapes: \`\\n\` newline, \`\\t\` tab, \`\\\\\` backslash, \`\\"\` quote.

**Raw strings** (\`r"..."\`) disable escapes and are required for regular expression patterns and Windows paths.`,
      },
    ],
    examples: [
      {
        title: "Cleaning a document",
        note: "The normalisation pipeline you run before embedding text.",
        code: `raw = "   The QUICK   brown Fox...\\n\\n  jumped!  "

step1 = raw.strip()
step2 = step1.lower()
step3 = " ".join(step2.split())        # collapse all whitespace
step4 = step3.replace("...", ".").strip(".!")

print(repr(raw))
print(repr(step1))
print(repr(step3))
print(repr(step4))
print("words:", len(step4.split()))
print("title case:", step4.title())`,
      },
      {
        title: "Search, split, and join",
        note: "partition is useful for splitting on the first separator only.",
        code: `line = "2026-09-04 ERROR model=gpt-4.1-mini latency_ms=2450"

print("starts with date:", line.startswith("2026"))
print("contains ERROR  :", "ERROR" in line)
print("position of 'model':", line.find("model"))
print("count of '='    :", line.count("="))

parts = line.split()
print("fields:", parts)

fields = {}
for token in parts:
    if "=" in token:
        key, _, value = token.partition("=")
        fields[key] = value
print("parsed:", fields)
print("rejoined:", " | ".join(parts[:3]))`,
      },
      {
        title: "Format specifiers in a metrics table",
        note: "Alignment and precision turn output into a readable report.",
        code: `rows = [
    ("gpt-4.1-mini", 0.913, 128, 0.000372),
    ("llama-3-8b", 0.8471, 1520, 0.0),
    ("claude-haiku", 0.9002, 460, 0.00124),
]

print(f"{'model':<15}{'accuracy':>10}{'latency':>10}{'cost':>12}")
print("-" * 47)
for name, acc, latency, cost in rows:
    print(f"{name:<15}{acc:>9.1%}{latency:>9,d}ms\${cost:>11.6f}")

lr = 2e-5
print(f"\\ndebug style: {lr=}")
print(f"repr style : {'text with \\"quotes\\"'!r}")
print(f"sign       : {5:+d} {-5:+d}")
print(f"zero pad   : {7:03d}")`,
      },
      {
        title: "Multi-line prompts with dedent",
        note: "dedent keeps the prompt clean even when the code is indented.",
        code: `import textwrap

def build_prompt(question, context):
    template = """
        You are a precise assistant.
        Use only the context below.

        Context:
        {context}

        Question: {question}
    """
    return textwrap.dedent(template).strip().format(context=context, question=question)

print(build_prompt("What is RAG?", "RAG retrieves documents, then generates."))
print("---")
print("raw string for regex:", r"\\d+\\.\\d+")`,
      },
      {
        title: "Why join beats += in a loop",
        note: "Each += builds a whole new string; join allocates once.",
        code: `import time

words = [f"token{i}" for i in range(20_000)]

start = time.perf_counter()
acc = ""
for w in words:
    acc += w + " "
concat_ms = (time.perf_counter() - start) * 1000

start = time.perf_counter()
joined = " ".join(words) + " "
join_ms = (time.perf_counter() - start) * 1000

print(f"+= in loop : {concat_ms:7.2f} ms")
print(f"str.join   : {join_ms:7.2f} ms")
print("same result:", acc == joined)`,
      },
    ],
    tryIt: {
      title: "Normalise and report on documents",
      hint: "Add a document with mixed case and extra spaces, then check the summary table.",
      starter: `docs = [
    "  Python for MACHINE learning   ",
    "RAG: retrieval augmented generation!!!",
    "   mlops   in    production  ",
]

def normalise(text):
    return " ".join(text.strip().lower().split()).strip(".!:")

print(f"{'original':<45}{'words':>7}{'chars':>7}")
print("-" * 59)
for doc in docs:
    clean = normalise(doc)
    print(f"{clean:<45}{len(clean.split()):>7}{len(clean):>7}")

all_words = [w for doc in docs for w in normalise(doc).split()]
print("\\ntotal words:", len(all_words))
print("unique words:", len(set(all_words)))
print("joined:", " | ".join(sorted(set(all_words))[:6]))`,
    },
    takeaways: [
      "String methods return new strings — always assign the result.",
      "Use \"\".join(list) instead of += inside a loop.",
      "Format specifiers (:.2f, :.1%, :>10, !r, =) turn raw values into readable reports.",
    ],
  },
];
