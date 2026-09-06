export type PracticeTopic = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  lessonSlug: string;
  bullets: string[];
  starterIdea: string;
};

/** SEO / beginner landing pages that deep-link into real lessons. */
export const PRACTICE_TOPICS: PracticeTopic[] = [
  {
    slug: "python-if-else-for-ai",
    title: "Python if / else for AI and ML",
    seoTitle: "Python If Else for AI & ML (Free Practice + Online Compiler)",
    description:
      "Learn Python if / else with tiny examples used in AI work: keep or drop predictions, gate on scores, and branch on config. Practice in the free browser compiler.",
    keywords: [
      "python if else",
      "python if else for beginners",
      "python conditions for machine learning",
      "python control flow AI",
    ],
    lessonSlug: "control-flow",
    bullets: [
      "What if / elif / else mean in plain English",
      "A tiny keep-or-drop score example",
      "Real-time AI examples in the full lesson",
    ],
    starterIdea: "If a model score is high enough, keep it. Otherwise drop it.",
  },
  {
    slug: "python-lists-for-ml",
    title: "Python lists for machine learning",
    seoTitle: "Python Lists for ML (Batches, Labels, Scores) Free Practice",
    description:
      "Learn Python lists the way ML engineers use them: batches, labels, scores, and filtering. Run examples in the free online Python compiler.",
    keywords: ["python lists", "python list examples ML", "python batches lists", "learn python lists"],
    lessonSlug: "lists-tuples-sets",
    bullets: [
      "Create and slice lists",
      "Filter confident scores",
      "See how lists show up in training and eval code",
    ],
    starterIdea: "Store prediction scores in a list and keep only the confident ones.",
  },
  {
    slug: "python-dictionaries-for-genai",
    title: "Python dictionaries for GenAI APIs",
    seoTitle: "Python Dictionaries for GenAI APIs (JSON-style Practice)",
    description:
      "Learn Python dicts as JSON bodies for LLM APIs: model names, messages, safe .get() defaults. Practice free in the browser.",
    keywords: ["python dictionaries", "python dict JSON", "python for GenAI", "python API payload"],
    lessonSlug: "dictionaries",
    bullets: [
      "Keys, values, and safe lookup",
      "Nested messages for chat APIs",
      "Real-time LLM request body examples",
    ],
    starterIdea: "Build a small request dict with model and messages.",
  },
  {
    slug: "python-functions-for-ai",
    title: "Python functions for AI engineers",
    seoTitle: "Python Functions for AI Engineers (Free Examples + Compiler)",
    description:
      "Learn Python functions with AI-flavored examples: prompt builders, score helpers, and reusable utilities. No install needed.",
    keywords: ["python functions", "python functions for beginners", "python for AI engineers"],
    lessonSlug: "functions",
    bullets: [
      "Define and call functions",
      "Defaults and keyword arguments",
      "Reusable prompt and metric helpers",
    ],
    starterIdea: "Write a small function that builds a greeting or prompt string.",
  },
  {
    slug: "python-strings-for-prompts",
    title: "Python strings for prompts and text",
    seoTitle: "Python Strings for Prompts (Strip, Split, Format) Free Practice",
    description:
      "Learn Python string basics for GenAI prompts: strip, split, f-strings, and clean user text before sending it to a model.",
    keywords: ["python strings", "python f-string", "python prompt engineering basics"],
    lessonSlug: "strings-and-text",
    bullets: [
      "Create and combine strings",
      "Clean prompts with strip and lower",
      "Format metrics and messages",
    ],
    starterIdea: "Clean a messy prompt string, then print a formatted metric line.",
  },
  {
    slug: "python-loops-for-training",
    title: "Python loops for training and eval",
    seoTitle: "Python For Loops for Training & Eval (Free AI Practice)",
    description:
      "Learn Python for-loops and early stopping style control flow used in training and evaluation scripts. Practice online for free.",
    keywords: ["python for loop", "python loops machine learning", "python early stopping example"],
    lessonSlug: "control-flow",
    bullets: [
      "for loops over lists",
      "enumerate for numbered steps",
      "Mini early-stop style branching",
    ],
    starterIdea: "Loop over validation losses and stop when they stop improving.",
  },
  {
    slug: "python-errors-exceptions",
    title: "Python errors and exceptions",
    seoTitle: "Python Try Except for Beginners (AI Config Parsing Practice)",
    description:
      "Learn Python try / except with practical AI config parsing. Catch bad values without crashing your script.",
    keywords: ["python try except", "python exceptions beginners", "python error handling"],
    lessonSlug: "errors-and-exceptions",
    bullets: [
      "Read a traceback calmly",
      "Catch ValueError and KeyError",
      "Parse config values safely",
    ],
    starterIdea: "Convert a string to int safely and fall back to 0 on failure.",
  },
  {
    slug: "python-classes-objects",
    title: "Python classes and objects",
    seoTitle: "Python Classes for Beginners (Tiny AI Tools Practice)",
    description:
      "Learn Python classes with small AI-flavored objects: counters, retrievers, and simple tools. Run code in the free compiler.",
    keywords: ["python classes", "python objects beginners", "python OOP for ML"],
    lessonSlug: "classes-and-objects",
    bullets: [
      "__init__ and self",
      "Methods that change state",
      "Tiny tool-style objects",
    ],
    starterIdea: "Build a tiny Counter class with add() and a value.",
  },
];

export const PRACTICE_TOPIC_SLUGS = PRACTICE_TOPICS.map((topic) => topic.slug);

export function getPracticeTopic(slug: string): PracticeTopic | undefined {
  return PRACTICE_TOPICS.find((topic) => topic.slug === slug);
}
