import type { PythonLesson } from "./types";

/** Additional Module 1 lessons: syntax, casting, numbers, booleans, string methods. */
export const MODULE_1B_LESSONS: PythonLesson[] = [
  {
    slug: "syntax-and-comments",
    title: "Python Syntax",
    moduleId: "foundations",
    level: "beginner",
    minutes: 14,
    summary:
      "Learn indentation, comments, and how Python reads your code.",
    whyForAi:
      "Indentation errors show up fast when you paste model code. Know the rules.",
    packages: [],
    sections: [
      {
        heading: "Indentation",
        basicTip: "Indent under if. That block only runs when true.",
        basicCode: `score = 0.9
if score > 0.7:
    print("keep")
print("done")`,
        body: `Python uses indentation for blocks. Most languages use braces.

- A colon \`:\` opens a block
- Indent with four spaces
- Do not mix tabs and spaces

Common mistake: missing indent after a colon.`,
      },
      {
        heading: "Comments",
        basicTip: "A comment explains why.",
        basicCode: `# offset because API is 1-indexed
print(0 + 1)`,
        body: `\`#\` starts a comment to the end of the line.

Python has no block-comment syntax.

Comment the why, not the obvious what.`,
      },
      {
        heading: "Long Lines",
        basicTip: "Break a dict across lines inside braces.",
        basicCode: `config = {
    "model": "mini",
    "temperature": 0.2,
}
print(config)`,
        body: `Write one statement per line.

Long lines break cleanly inside \`()\`, \`[]\`, or \`{}\`.

Prefer brackets over a backslash.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: indented filter",
        note: "Indented lines belong to the if.",
        aiMl: "Score filters and training loops nest if and for the same way.",
        code: `score = 0.85
if score > 0.7:
    print("high confidence")
print("always runs")`,
      },
      {
        title: "AI / ML: config on many lines",
        note: "Break long configs inside braces.",
        aiMl: "Model settings often use one key per line.",
        code: `config = {
    "model": "gpt-4.1-mini",
    "temperature": 0.2,
}
print(config["model"])`,
      },
    ],
    tryIt: {
      title: "Fix the indentation",
      hint: "Keep else lined up with if, then press Run.",
      starter: `score = 0.62
if score >= 0.8:
    print("high")
elif score >= 0.5:
    print("medium")
else:
    print("low")`,
    },
    takeaways: [
      "Indentation is syntax. Use four spaces.",
      "Comments start with #.",
      "Break long lines inside brackets.",
    ],
  },
  {
    slug: "casting-and-conversion",
    title: "Python Casting",
    moduleId: "foundations",
    level: "beginner",
    minutes: 16,
    summary:
      "Convert between strings, numbers, and booleans with int(), float(), and str().",
    whyForAi:
      "Config and model outputs often arrive as strings. Convert them explicitly.",
    packages: [],
    sections: [
      {
        heading: "Casting Functions",
        basicTip: "Convert a string to a float.",
        basicCode: `raw = "0.2"
temperature = float(raw)
print(temperature)
print(type(temperature))`,
        body: `Python will not mix strings and numbers for you.

- \`int(x)\` - whole number
- \`float(x)\` - decimal
- \`str(x)\` - text
- \`bool(x)\` - True or False

\`int("12.5")\` fails. Use \`int(float("12.5"))\` instead.
Common mistake: forgetting to convert env strings before math.`,
      },
      {
        heading: "Safe Parsing",
        basicTip: "Parse a bool from text against a known set.",
        basicCode: `raw = "false"
print(raw.lower() in {"1", "true", "yes"})`,
        body: `\`bool("False")\` is \`True\` because the string is not empty.

Compare against a set like \`{"1", "true", "yes"}\` instead.

Never use \`eval()\` on outside input.`,
      },
      {
        heading: "Float Precision",
        basicTip: "0.1 + 0.2 is not exactly 0.3.",
        basicCode: `print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)`,
        body: `Floats are approximate. That is binary floating point.

Do not compare floats with \`==\`. Use \`math.isclose(a, b)\`.

Common mistake: treating float equality as exact.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: cast config strings",
        note: "Turn text settings into numbers.",
        aiMl: "Temperature and max tokens often start as env strings.",
        code: `raw = "0.7"
temperature = float(raw)
max_tokens = int("512")
print(temperature)
print(max_tokens)`,
      },
      {
        title: "AI / ML: bool from text",
        note: "Do not use bool() on the string False.",
        aiMl: "Flags like STREAM often arrive as text, not real booleans.",
        code: `raw = "False"
print(bool(raw))
print(raw.lower() in {"1", "true", "yes"})`,
      },
    ],
    tryIt: {
      title: "Cast a tiny config",
      hint: "Try a bad value like hot and watch float() fail, then fix it.",
      starter: `raw_temp = "0.7"
raw_tokens = "256"
print(float(raw_temp))
print(int(raw_tokens))
print(type(float(raw_temp)).__name__)`,
    },
    takeaways: [
      "Convert strings and numbers explicitly.",
      "int() truncates. Use float() first for decimals.",
      "bool(\"False\") is True. Parse booleans carefully.",
    ],
  },
  {
    slug: "numbers-and-math",
    title: "Python Numbers",
    moduleId: "foundations",
    level: "beginner",
    minutes: 16,
    summary:
      "Learn Python number types: int, float, and complex. Then see how they show up in AI / ML.",
    whyForAi:
      "Scores, learning rates, batch sizes, and seeds are all numbers.",
    packages: [],
    sections: [
      {
        heading: "Python Numbers",
        basicTip: "Create one int, one float, and one complex number.",
        basicCode: `x = 1        # int
y = 2.8      # float
z = 1j       # complex
print(type(x))
print(type(y))
print(type(z))`,
        body: `There are three numeric types in Python:

- \`int\`
- \`float\`
- \`complex\`

Variables of numeric types are created when you assign a value.

To check the type of any object, use the \`type()\` function.`,
      },
      {
        heading: "Int",
        basicTip: "Integers are whole numbers. No decimal point.",
        basicCode: `x = 1
y = 35656222554887711
z = -3255522
print(type(x))
print(type(y))
print(type(z))`,
        body: `Int, or integer, is a whole number, positive or negative, without decimals.

In Python, integers can be very large. You do not need to worry about a fixed size limit.`,
      },
      {
        heading: "Float",
        basicTip: "Floats have a decimal point.",
        basicCode: `x = 1.10
y = 1.0
z = -35.59
print(type(x))
print(type(y))
print(type(z))`,
        body: `Float, or floating point number, is a number with one or more decimals.

Float can also use scientific notation with \`e\` for power of 10:

\`\`\`python
x = 35e3
y = 12E4
z = -87.7e100
print(type(x))
\`\`\`

Common mistake: writing a learning rate as the string \`"2e-5"\` instead of the float \`2e-5\`.`,
      },
      {
        heading: "Useful Number Operators",
        basicTip: "Try divide, floor divide, and remainder.",
        basicCode: `print(7 / 2)
print(7 // 2)
print(7 % 2)
print(2 ** 10)`,
        body: `Useful operators:

- \`/\` normal divide (always gives float)
- \`//\` floor divide (whole number result)
- \`%\` remainder
- \`**\` power

Also useful: \`abs()\`, \`round()\`, \`min()\`, \`max()\`, \`sum()\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: learning rate and batch size",
        note: "Same number types, now used like a tiny training config.",
        aiMl: "Learning rates are floats. Batch sizes and epochs are ints.",
        code: `learning_rate = 2e-5   # float
batch_size = 32        # int
epochs = 3             # int
print(type(learning_rate))
print(1000 // batch_size)`,
      },
      {
        title: "AI / ML: keep or drop a score",
        note: "A float score plus a simple comparison.",
        aiMl: "Classifiers often keep predictions only when score >= threshold.",
        code: `score = 0.82
threshold = 0.7
if score >= threshold:
    print("keep")
else:
    print("drop")`,
      },
    ],
    tryIt: {
      title: "Practice numbers",
      hint: "Change the values, then press Run. Check the types.",
      starter: `x = 1
y = 2.8
z = 1j
print(type(x))
print(type(y))
print(type(z))
learning_rate = 3e-5
batch_size = 16
print(type(learning_rate).__name__)
print(1000 // batch_size)`,
    },
    takeaways: [
      "Python has three number types: int, float, and complex.",
      "Use type() to check what kind of number you have.",
      "In AI / ML, scores and rates are floats; counts are ints.",
    ],
  },
  {
    slug: "booleans-and-comparisons",
    title: "Python Booleans",
    moduleId: "foundations",
    level: "beginner",
    minutes: 14,
    summary:
      "Learn True and False, comparisons, and how empty values behave.",
    whyForAi:
      "Filtering scores and empty batches depends on truthiness.",
    packages: [],
    sections: [
      {
        heading: "True and False",
        basicTip: "Comparisons return bools.",
        basicCode: `print(10 > 9)
print(10 == 9)
print(bool("Hello"))
print(bool(""))`,
        body: `Booleans have two values: \`True\` and \`False\`.

Comparisons return bools. \`bool(x)\` converts a value.

Falsy values: \`False\`, \`None\`, \`0\`, \`0.0\`, \`""\`, \`[]\`, \`{}\`

Everything else is truthy.
Common mistake: using \`if score:\` and dropping a valid \`0.0\`.`,
      },
      {
        heading: "is vs ==",
        basicTip: "Use is for None. Use == for values.",
        basicCode: `api_key = None
print(api_key is None)
print(0.7 == 0.7)`,
        body: `\`==\` compares values.

\`is\` compares identity (the same object in memory).

Use \`is\` only for \`None\`, \`True\`, and \`False\`.
Use \`==\` for numbers, strings, and lists.`,
      },
      {
        heading: "and, or, any, all",
        basicTip: "Check a batch of scores.",
        basicCode: `scores = [0.9, 0.8, 0.7]
print(all(s >= 0.7 for s in scores))
print(any(s < 0.8 for s in scores))`,
        body: `\`and\` / \`or\` stop early when the result is known.

\`any(...)\` is True if at least one item is truthy.
\`all(...)\` is True if every item is truthy.

Chained checks read clearly: \`0.0 <= score <= 1.0\`.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: the 0.0 score bug",
        note: "A real score of 0.0 is falsy but still valid.",
        aiMl: "Probability outputs can be zero. Guard with is not None.",
        code: `score = 0.0
print(bool(score))
print(score is not None)`,
      },
      {
        title: "AI / ML: batch checks",
        note: "any and all judge a list of scores.",
        aiMl: "Eval code uses any/all over scores to judge a batch.",
        code: `scores = [0.91, 0.72, 0.85]
print(all(s > 0.7 for s in scores))
print(any(s >= 0.9 for s in scores))`,
      },
    ],
    tryIt: {
      title: "Check scores",
      hint: "Set one score to 0.0 and see what prints.",
      starter: `scores = [0.91, 0.0, 0.77]
print(all(s is not None for s in scores))
print(all(0.0 <= s <= 1.0 for s in scores))
print(any(s >= 0.9 for s in scores))`,
    },
    takeaways: [
      "Falsy: False, None, 0, 0.0, \"\", [], {}.",
      "Use is for None. Use == for values.",
      "any() and all() check batches.",
    ],
  },
  {
    slug: "string-methods-and-formatting",
    title: "Python String Methods",
    moduleId: "foundations",
    level: "beginner",
    minutes: 20,
    summary:
      "Clean text, split and join strings, and format numbers with f-strings.",
    whyForAi:
      "Prompt cleanup and readable metric logs are string work.",
    packages: [],
    sections: [
      {
        heading: "Useful Methods",
        basicTip: "Strip, lower, and split a string.",
        basicCode: `raw = "  Hello GenAI  "
clean = raw.strip().lower()
print(clean)
print(clean.split())`,
        body: `Strings are immutable. Every method returns a new string.

Useful methods:

- \`lower()\`, \`upper()\`
- \`strip()\`
- \`find()\`, \`startswith()\`
- \`split()\`, \`join()\`, \`replace()\`

Prefer \`" ".join(parts)\` over \`+=\` in a loop.`,
      },
      {
        heading: "Format Specifiers",
        basicTip: "Format a score and a latency.",
        basicCode: `score = 0.913
latency = 1280
print(f"{score:.1%}")
print(f"{latency:,} ms")`,
        body: `Inside an f-string, text after \`:\` is a format spec:

- \`:.2f\` - two decimals
- \`:.1%\` - percent
- \`:,\` - thousands separator

Common mistake: forgetting to assign the result of a string method.`,
      },
      {
        heading: "Multi-line Text",
        basicTip: "A short prompt with a newline.",
        basicCode: `prompt = "System: be brief\\nUser: what is RAG?"
print(prompt)`,
        body: `Triple quotes keep newlines and work well for prompts.

Common escapes: \`\\n\`, \`\\t\`, \`\\\\\`.

Raw strings (\`r"..."\`) turn escapes off.`,
      },
    ],
    examples: [
      {
        title: "AI / ML: clean a document",
        note: "Strip, lower, and collapse spaces.",
        aiMl: "Pipelines often normalise text before embedding.",
        code: `raw = "   The QUICK   brown Fox  "
clean = " ".join(raw.strip().lower().split())
print(clean)`,
      },
      {
        title: "AI / ML: format a metric",
        note: "Make scores easy to read.",
        aiMl: "Eval reports print accuracy and latency with format specs.",
        code: `acc = 0.913
latency = 128
print(f"acc={acc:.1%} latency={latency}ms")`,
      },
    ],
    tryIt: {
      title: "Normalise text",
      hint: "Add a messy string, then print the clean version.",
      starter: `raw = "  Python for MACHINE learning   "
clean = " ".join(raw.strip().lower().split())
print(clean)
print(len(clean.split()), "words")`,
    },
    takeaways: [
      "String methods return new strings.",
      "Prefer join() over += in a loop.",
      "f-string specs like :.2f and :.1% make reports readable.",
    ],
  },
];
