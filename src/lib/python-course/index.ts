import type { PythonLesson, PythonModule, PythonModuleId } from "./types";
import { MODULE_1_LESSONS } from "./module-1";
import { MODULE_2_LESSONS } from "./module-2";
import { MODULE_3_LESSONS } from "./module-3";
import { MODULE_4_LESSONS } from "./module-4";

export type { PythonLesson, PythonModule, PythonModuleId, PythonLevel, PythonExample } from "./types";

export const PYTHON_MODULES: PythonModule[] = [
  {
    id: "foundations",
    order: 1,
    title: "Module 1 · Python foundations",
    tagline: "Zero to comfortable: values, text, collections, and control flow.",
    level: "beginner",
  },
  {
    id: "core-language",
    order: 2,
    title: "Module 2 · Core language",
    tagline: "Functions, generators, errors, files, classes, and project structure.",
    level: "intermediate",
  },
  {
    id: "data-ml",
    order: 3,
    title: "Module 3 · Python for data and ML",
    tagline: "Type hints, NumPy, pandas, testing, logging, and configuration.",
    level: "intermediate",
  },
  {
    id: "genai-production",
    order: 4,
    title: "Module 4 · GenAI and production",
    tagline: "Async, LLM APIs, tensors, RAG, FastAPI serving, and shipping habits.",
    level: "advanced",
  },
];

export const PYTHON_LESSONS: PythonLesson[] = [
  ...MODULE_1_LESSONS,
  ...MODULE_2_LESSONS,
  ...MODULE_3_LESSONS,
  ...MODULE_4_LESSONS,
];

export const PYTHON_LESSON_SLUGS = PYTHON_LESSONS.map((lesson) => lesson.slug);

export const TOTAL_COURSE_MINUTES = PYTHON_LESSONS.reduce((sum, lesson) => sum + lesson.minutes, 0);

export const TOTAL_CODE_EXAMPLES = PYTHON_LESSONS.reduce(
  (sum, lesson) => sum + lesson.examples.length + 1,
  0,
);

export function getPythonLesson(slug: string): PythonLesson | undefined {
  return PYTHON_LESSONS.find((lesson) => lesson.slug === slug);
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
