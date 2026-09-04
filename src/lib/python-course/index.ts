import type { PythonLesson, PythonModule, PythonModuleId } from "./types";
import { MODULE_1_LESSONS } from "./module-1";
import { MODULE_1B_LESSONS } from "./module-1b";
import { MODULE_2_LESSONS } from "./module-2";
import { MODULE_2B_LESSONS } from "./module-2b";
import { MODULE_3_LESSONS } from "./module-3";
import { MODULE_3B_LESSONS } from "./module-3b";
import { MODULE_4_LESSONS } from "./module-4";
import { MODULE_5_LESSONS } from "./module-5";

export type { PythonLesson, PythonModule, PythonModuleId, PythonLevel, PythonExample } from "./types";

export const PYTHON_MODULES: PythonModule[] = [
  {
    id: "foundations",
    order: 1,
    title: "Module 1 · Python foundations",
    tagline: "Zero to comfortable: syntax, values, text, collections, and control flow.",
    level: "beginner",
  },
  {
    id: "core-language",
    order: 2,
    title: "Module 2 · Core language",
    tagline: "Functions, iterators, errors, files, classes, regex, dates, and project structure.",
    level: "intermediate",
  },
  {
    id: "data-ml",
    order: 3,
    title: "Module 3 · Python for data and ML",
    tagline: "NumPy, pandas, statistics, plotting, scikit-learn, databases, and testing.",
    level: "intermediate",
  },
  {
    id: "genai-production",
    order: 4,
    title: "Module 4 · GenAI and production",
    tagline: "Async, LLM APIs, tensors, RAG, FastAPI serving, and shipping habits.",
    level: "advanced",
  },
  {
    id: "reference",
    order: 5,
    title: "Module 5 · Quick reference",
    tagline: "Built-ins, string and collection methods, keywords, operators, and exceptions.",
    level: "beginner",
  },
];

const ALL_LESSONS: PythonLesson[] = [
  ...MODULE_1_LESSONS,
  ...MODULE_1B_LESSONS,
  ...MODULE_2_LESSONS,
  ...MODULE_2B_LESSONS,
  ...MODULE_3_LESSONS,
  ...MODULE_3B_LESSONS,
  ...MODULE_4_LESSONS,
  ...MODULE_5_LESSONS,
];

/**
 * Teaching order. Lessons written in the "b" files are interleaved with the
 * originals so a learner can read straight down the sidebar.
 */
const LESSON_ORDER: string[] = [
  // Module 1 · foundations
  "why-python-for-ai",
  "syntax-and-comments",
  "variables-types-operators",
  "casting-and-conversion",
  "numbers-and-math",
  "booleans-and-comparisons",
  "strings-and-text",
  "string-methods-and-formatting",
  "lists-tuples-sets",
  "dictionaries",
  "control-flow",

  // Module 2 · core language
  "functions",
  "lambda-map-filter",
  "comprehensions-and-generators",
  "iterators-and-iterables",
  "scope-and-closures",
  "errors-and-exceptions",
  "files-and-json",
  "classes-and-objects",
  "inheritance-and-polymorphism",
  "decorators-and-context-managers",
  "regular-expressions",
  "dates-and-times",
  "standard-library-toolkit",
  "modules-and-environments",

  // Module 3 · data and ML
  "type-hints-and-dataclasses",
  "numpy-arrays",
  "pandas-dataframes",
  "statistics-for-ml",
  "data-distributions-and-plots",
  "sklearn-regression",
  "sklearn-classification",
  "sklearn-pipelines-and-clustering",
  "databases-with-python",
  "testing-with-pytest",
  "logging-and-configuration",

  // Module 4 · GenAI and production
  "async-python",
  "calling-llm-apis",
  "numpy-to-pytorch",
  "rag-from-scratch",
  "fastapi-model-service",
  "production-python-checklist",

  // Module 5 · reference
  "builtin-functions-reference",
  "string-methods-reference",
  "collection-methods-reference",
  "keywords-operators-exceptions-reference",
];

const BY_SLUG = new Map(ALL_LESSONS.map((lesson) => [lesson.slug, lesson]));

const ORDERED = LESSON_ORDER.map((slug) => BY_SLUG.get(slug)).filter(
  (lesson): lesson is PythonLesson => lesson !== undefined,
);

// Anything missing from LESSON_ORDER still ships, appended in module order.
const ORDERED_SLUGS = new Set(ORDERED.map((lesson) => lesson.slug));
const UNLISTED = ALL_LESSONS.filter((lesson) => !ORDERED_SLUGS.has(lesson.slug));

export const PYTHON_LESSONS: PythonLesson[] = [...ORDERED, ...UNLISTED];

export const PYTHON_LESSON_SLUGS = PYTHON_LESSONS.map((lesson) => lesson.slug);

export const TOTAL_LESSONS = PYTHON_LESSONS.length;

export const TOTAL_COURSE_MINUTES = PYTHON_LESSONS.reduce((sum, lesson) => sum + lesson.minutes, 0);

export const TOTAL_CODE_EXAMPLES = PYTHON_LESSONS.reduce(
  (sum, lesson) => sum + lesson.examples.length + 1,
  0,
);

export function getPythonLesson(slug: string): PythonLesson | undefined {
  return BY_SLUG.get(slug);
}

export function lessonsInModule(lessons: PythonLesson[], moduleId: PythonModuleId): PythonLesson[] {
  return lessons.filter((lesson) => lesson.moduleId === moduleId);
}

export function getAdjacentLessons(slug: string): {
  prev: PythonLesson | null;
  next: PythonLesson | null;
} {
  const index = PYTHON_LESSONS.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? PYTHON_LESSONS[index - 1] : null,
    next: index < PYTHON_LESSONS.length - 1 ? PYTHON_LESSONS[index + 1] : null,
  };
}
