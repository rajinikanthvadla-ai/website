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
};

/** Rotating practice set. Picked by UTC day so everyone sees the same challenge. */
export const DAILY_CHALLENGES: DailyChallenge[] = [
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

export function getChallengeForDate(date = new Date()): DailyChallenge {
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayIndex = Math.floor(utc / 86_400_000);
  const index = ((dayIndex % DAILY_CHALLENGES.length) + DAILY_CHALLENGES.length) % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}

export function challengeDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
