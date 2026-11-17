export type QuizKind = "choice" | "predict" | "blank" | "bug";

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  kind: QuizKind;
  prompt: string;
  code?: string;
  options?: QuizOption[];
  /** Accepted fill-in answers. Compared with extra spaces and case ignored. */
  accept?: string[];
  answer: string;
  why: string;
};

export type LessonQuiz = {
  slug: string;
  title: string;
  questions: QuizQuestion[];
};
