export type PythonLevel = "beginner" | "intermediate" | "advanced";

export type PythonModuleId =
  | "foundations"
  | "core-language"
  | "data-ml"
  | "genai-production"
  | "reference";

export type PythonExample = {
  title: string;
  note: string;
  code: string;
};

export type PythonSection = {
  heading: string;
  body: string;
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
