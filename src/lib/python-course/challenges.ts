import { py } from "./py";

export type DailyChallenge = {
  id: string;
  title: string;
  minutes: number;
  prompt: string;
  hint: string;
  starter: string;
  packages: string[];
  lessonSlug: string;
  lessonLabel: string;
  /** Python answer check, same rules as lesson exercises. */
  check?: string;
  solution?: string;
};

/** Rotating practice set. Picked by UTC day so everyone sees the same challenge. */
const BASE_CHALLENGES: DailyChallenge[] = [
  {
    id: "print-role",
    title: "Say your AI role out loud",
    minutes: 3,
    prompt: "Print a sentence that includes your target role, then print 2 + 2.",
    hint: "Use one print for the sentence and one for the math.",
    starter: `role = "GenAI engineer"
# Print: I am learning Python to become a <role>
# Then print 2 + 2
`,
    packages: [],
    lessonSlug: "why-python-for-ai",
    lessonLabel: "Why Python for AI",
  },
  {
    id: "if-else-score",
    title: "Keep or drop a prediction",
    minutes: 5,
    prompt: "If score is at least 0.7, print keep. Otherwise print drop.",
    hint: "Use if / else with score >= 0.7.",
    starter: `score = 0.82
# Write if / else here
`,
    packages: [],
    lessonSlug: "control-flow",
    lessonLabel: "Control flow",
  },
  {
    id: "filter-scores",
    title: "Filter confident scores",
    minutes: 5,
    prompt: "Keep only scores >= 0.7 and print the kept list.",
    hint: "A list comprehension or a for-loop both work.",
    starter: `scores = [0.91, 0.44, 0.78, 0.62, 0.55]
# kept = ...
# print(kept)
`,
    packages: [],
    lessonSlug: "lists-tuples-sets",
    lessonLabel: "Lists, tuples, sets",
  },
  {
    id: "dict-config",
    title: "Read a model config",
    minutes: 5,
    prompt: "Print the model name and use .get to print temperature with default 0.0.",
    hint: 'Use config["model"] and config.get("temperature", 0.0).',
    starter: `config = {"model": "gpt-4.1-mini", "max_tokens": 300}
# print model
# print temperature with default
`,
    packages: [],
    lessonSlug: "dictionaries",
    lessonLabel: "Dictionaries",
  },
  {
    id: "string-clean",
    title: "Clean a prompt",
    minutes: 4,
    prompt: "Strip whitespace, lowercase the text, then print it.",
    hint: "Chain .strip().lower() or do it in two steps.",
    starter: `prompt = "  What is RAG?  "
# clean = ...
# print(clean)
`,
    packages: [],
    lessonSlug: "strings-and-text",
    lessonLabel: "Strings and text",
  },
  {
    id: "function-greet",
    title: "Build a tiny function",
    minutes: 5,
    prompt: "Write greet(name) that returns Hello, <name>. Call it and print the result.",
    hint: "def greet(name): return ...",
    starter: `# def greet(name):
#     ...
# print(greet("engineer"))
`,
    packages: [],
    lessonSlug: "functions",
    lessonLabel: "Functions",
  },
  {
    id: "comprehension-filter",
    title: "One-line filter",
    minutes: 5,
    prompt: "Use a list comprehension to keep labels whose score >= 0.7.",
    hint: '[label for label, score in pairs if score >= 0.7]',
    starter: `pairs = [("pos", 0.9), ("neg", 0.4), ("pos", 0.75)]
# kept = ...
# print(kept)
`,
    packages: [],
    lessonSlug: "comprehensions-and-generators",
    lessonLabel: "Comprehensions",
  },
  {
    id: "try-except-int",
    title: "Safe number parsing",
    minutes: 5,
    prompt: "Try to convert raw to int. On failure, print invalid and use 0.",
    hint: "try / except ValueError.",
    starter: `raw = "not-a-number"
# value = ...
# print(value)
`,
    packages: [],
    lessonSlug: "errors-and-exceptions",
    lessonLabel: "Errors and exceptions",
  },
  {
    id: "fstring-metrics",
    title: "Format a metric line",
    minutes: 4,
    prompt: "Print accuracy=0.91 latency_ms=128 using an f-string.",
    hint: 'print(f"accuracy={accuracy} latency_ms={latency_ms}")',
    starter: `accuracy = 0.91
latency_ms = 128
# print one formatted line
`,
    packages: [],
    lessonSlug: "string-methods-and-formatting",
    lessonLabel: "String methods",
  },
  {
    id: "boolean-gate",
    title: "Gate on truthiness",
    minutes: 4,
    prompt: "If chunks is non-empty, print ready. Else print missing context.",
    hint: "if chunks: ... else: ...",
    starter: `chunks = ["intro", "method"]
# write the if / else
`,
    packages: [],
    lessonSlug: "booleans-and-comparisons",
    lessonLabel: "Booleans",
  },
  {
    id: "enumerate-docs",
    title: "Number the documents",
    minutes: 5,
    prompt: "Print 1-based indexes with each document name.",
    hint: "for i, name in enumerate(docs, start=1):",
    starter: `docs = ["intro", "method", "results"]
# loop with enumerate
`,
    packages: [],
    lessonSlug: "control-flow",
    lessonLabel: "Control flow",
  },
  {
    id: "set-dedupe",
    title: "Deduplicate labels",
    minutes: 4,
    prompt: "Turn labels into a sorted unique list and print it.",
    hint: "sorted(set(labels))",
    starter: `labels = ["pos", "neg", "pos", "neu", "neg"]
# unique = ...
# print(unique)
`,
    packages: [],
    lessonSlug: "lists-tuples-sets",
    lessonLabel: "Lists, tuples, sets",
  },
  {
    id: "lambda-sort",
    title: "Sort by score",
    minutes: 5,
    prompt: "Sort preds by score descending and print the top item.",
    hint: "sorted(..., key=lambda p: p['score'], reverse=True)",
    starter: `preds = [
    {"label": "pos", "score": 0.61},
    {"label": "neg", "score": 0.88},
    {"label": "pos", "score": 0.74},
]
# ranked = ...
# print(ranked[0])
`,
    packages: [],
    lessonSlug: "lambda-map-filter",
    lessonLabel: "Lambda, map, filter",
  },
  {
    id: "class-counter",
    title: "Tiny counter class",
    minutes: 5,
    prompt: "Make a Counter with add(n=1) and value. Add twice, then print value.",
    hint: "Store self.value in __init__.",
    starter: `# class Counter:
#     ...
# c = Counter()
# c.add()
# c.add(2)
# print(c.value)
`,
    packages: [],
    lessonSlug: "classes-and-objects",
    lessonLabel: "Classes and objects",
  },
];

/** Answer checks per challenge id. Run `npm run check:python` after editing. */
const CHALLENGE_CHECKS: Record<string, { check: string; solution: string }> = {
  "print-role": {
    check: py`
      _lines = [line.strip() for line in printed.strip().splitlines()]
      assert any(role in line for line in _lines), "Print a sentence that includes your role variable."
      assert "4" in _lines, "Then print 2 + 2 on its own line. It should show 4."
    `,
    solution: py`
      role = "GenAI engineer"
      print("I am learning Python to become a", role)
      print(2 + 2)
    `,
  },
  "if-else-score": {
    check: py`
      assert "if " in source and "else" in source, "Use if / else."
      assert printed.strip() == "keep", "With score = 0.82 it should print only: keep"
    `,
    solution: py`
      score = 0.82
      if score >= 0.7:
          print("keep")
      else:
          print("drop")
    `,
  },
  "filter-scores": {
    check: py`
      assert kept == [0.91, 0.78], f"kept should be [0.91, 0.78], you have {kept}"
      assert "[0.91, 0.78]" in printed, "Print the kept list."
    `,
    solution: py`
      scores = [0.91, 0.44, 0.78, 0.62, 0.55]
      kept = [s for s in scores if s >= 0.7]
      print(kept)
    `,
  },
  "dict-config": {
    check: py`
      assert "gpt-4.1-mini" in printed, "Print the model name with config['model']."
      assert "0.0" in printed and ".get(" in source, "Print the temperature with config.get('temperature', 0.0)."
    `,
    solution: py`
      config = {"model": "gpt-4.1-mini", "max_tokens": 300}
      print(config["model"])
      print(config.get("temperature", 0.0))
    `,
  },
  "string-clean": {
    check: py`
      assert clean == "what is rag?", f"clean should be 'what is rag?', you have {clean!r}"
      assert "what is rag?" in printed, "Print the clean text."
    `,
    solution: py`
      prompt = "  What is RAG?  "
      clean = prompt.strip().lower()
      print(clean)
    `,
  },
  "function-greet": {
    check: py`
      assert callable(greet), "Write a function called greet(name)."
      assert str(greet("Ada")).rstrip(".!") == "Hello, Ada", "greet('Ada') should return 'Hello, Ada'."
      assert "Hello, engineer" in printed, "Call greet('engineer') and print the result."
    `,
    solution: py`
      def greet(name):
          return f"Hello, {name}"

      print(greet("engineer"))
    `,
  },
  "comprehension-filter": {
    check: py`
      assert " for " in source and "[" in source, "Use a list comprehension: [... for ... in ... if ...]"
      assert kept == ["pos", "pos"], f"kept should be ['pos', 'pos'], you have {kept}"
    `,
    solution: py`
      pairs = [("pos", 0.9), ("neg", 0.4), ("pos", 0.75)]
      kept = [label for label, score in pairs if score >= 0.7]
      print(kept)
    `,
  },
  "try-except-int": {
    check: py`
      assert "except" in source, "Use try / except ValueError."
      assert value == 0, f"value should fall back to 0, you have {value!r}"
      assert "invalid" in printed, "Print invalid when the conversion fails."
    `,
    solution: py`
      raw = "not-a-number"
      try:
          value = int(raw)
      except ValueError:
          print("invalid")
          value = 0
      print(value)
    `,
  },
  "fstring-metrics": {
    check: py`
      assert "accuracy=0.91 latency_ms=128" in printed, "Print exactly: accuracy=0.91 latency_ms=128"
      assert 'f"' in source or "f'" in source, "Use an f-string."
    `,
    solution: py`
      accuracy = 0.91
      latency_ms = 128
      print(f"accuracy={accuracy} latency_ms={latency_ms}")
    `,
  },
  "boolean-gate": {
    check: py`
      assert "if " in source and "else" in source, "Use if / else."
      assert printed.strip() == "ready", "chunks is not empty, so it should print only: ready"
    `,
    solution: py`
      chunks = ["intro", "method"]
      if chunks:
          print("ready")
      else:
          print("missing context")
    `,
  },
  "enumerate-docs": {
    check: py`
      assert "enumerate(" in source, "Use enumerate(docs, start=1)."
      _lines = [line.strip() for line in printed.strip().splitlines()]
      assert len(_lines) == 3, "Print one line per document."
      assert all(line.startswith(str(i)) and name in line for i, (line, name) in enumerate(zip(_lines, docs), start=1)), "Each line should start with its number (1, 2, 3) and show the document name."
    `,
    solution: py`
      docs = ["intro", "method", "results"]
      for i, name in enumerate(docs, start=1):
          print(i, name)
    `,
  },
  "set-dedupe": {
    check: py`
      assert unique == ["neg", "neu", "pos"], f"unique should be ['neg', 'neu', 'pos'], you have {unique}"
    `,
    solution: py`
      labels = ["pos", "neg", "pos", "neu", "neg"]
      unique = sorted(set(labels))
      print(unique)
    `,
  },
  "lambda-sort": {
    check: py`
      assert "lambda" in source, "Use a lambda for the sort key."
      assert ranked[0] == {"label": "neg", "score": 0.88}, "The top item should be the one with score 0.88."
      assert [p["score"] for p in ranked] == [0.88, 0.74, 0.61], "ranked should be sorted from highest to lowest score."
    `,
    solution: py`
      preds = [
          {"label": "pos", "score": 0.61},
          {"label": "neg", "score": 0.88},
          {"label": "pos", "score": 0.74},
      ]
      ranked = sorted(preds, key=lambda p: p["score"], reverse=True)
      print(ranked[0])
    `,
  },
  "class-counter": {
    check: py`
      _c = Counter()
      assert _c.value == 0, "A new Counter should start with value 0."
      _c.add()
      _c.add(2)
      assert _c.value == 3, "After add() and add(2), value should be 3."
      assert "3" in printed, "Print c.value at the end."
    `,
    solution: py`
      class Counter:
          def __init__(self):
              self.value = 0

          def add(self, n=1):
              self.value += n

      c = Counter()
      c.add()
      c.add(2)
      print(c.value)
    `,
  },
};

export const DAILY_CHALLENGES: DailyChallenge[] = BASE_CHALLENGES.map((challenge) => ({
  ...challenge,
  ...CHALLENGE_CHECKS[challenge.id],
}));

export function getChallengeForDate(date = new Date()): DailyChallenge {
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayIndex = Math.floor(utc / 86_400_000);
  const index = ((dayIndex % DAILY_CHALLENGES.length) + DAILY_CHALLENGES.length) % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}

export function challengeDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
