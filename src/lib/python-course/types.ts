export type PythonLevel = "beginner" | "intermediate" | "advanced";

export type PythonModuleId =
  | "foundations"
  | "core-language"
  | "data-ml"
  | "genai-production"
  | "reference";

export type PythonExample = {
  title: string;
  /** Easy, human meaning of the idea (plain English). */
  note: string;
  code: string;
  /** Why we show this real-time example. */
  why?: string;
  /** How the same idea shows up in real AI / ML coding. */
  aiMl?: string;
  /** A simple real-world analogy. */
  analogy?: string;
};

export type PythonSection = {
  heading: string;
  body: string;
  /** Tiny starter shown under the explanation. */
  basicCode?: string;
  /** One-line tip above the tiny starter. */
  basicTip?: string;
};

/**
 * A small task with an automatic answer check.
 * The check is Python that runs after the learner's code, in the same namespace.
 * It also gets `printed` (everything the code printed) and `source` (the code text).
 * Fail it with `assert condition, "friendly message"`.
 */
export type PythonExercise = {
  task: string;
  /** Must FAIL the check as written (scripts/check-python-exercises.mjs enforces this). */
  starter: string;
  check: string;
  /** Must PASS the check. Shown after a failed attempt. */
  solution: string;
  hint?: string;
};

export type LaptopStep = {
  text: string;
  command?: string;
};

export type LaptopFile = {
  name: string;
  content: string;
};

/** Complete files and steps to run the real thing on the learner's own computer. */
export type LaptopRun = {
  intro: string;
  steps: LaptopStep[];
  files: LaptopFile[];
  run: string;
  expected?: string;
  /** Projects only: repo name for the "Put it on GitHub" steps. */
  repo?: string;
};

export type PythonLesson = {
  slug: string;
  /** Projects show a badge and skip the generic AI / ML examples block. */
  kind?: "lesson" | "project";
  title: string;
  moduleId: PythonModuleId;
  level: PythonLevel;
  minutes: number;
  summary: string;
  whyForAi: string;
  packages: string[];
  sections: PythonSection[];
  examples: PythonExample[];
  tryIt: {
    title: string;
    hint: string;
    starter: string;
  };
  takeaways: string[];
  exercise?: PythonExercise;
  laptop?: LaptopRun;
};

/** The small slice of a lesson that navigation needs. Safe to send to the browser. */
export type LessonOutline = Pick<PythonLesson, "slug" | "title" | "moduleId" | "kind" | "minutes">;

export type PythonModule = {
  id: PythonModuleId;
  order: number;
  title: string;
  tagline: string;
  level: PythonLevel;
};
