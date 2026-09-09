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

export type PythonLesson = {
  slug: string;
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
};

export type PythonModule = {
  id: PythonModuleId;
  order: number;
  title: string;
  tagline: string;
  level: PythonLevel;
};
