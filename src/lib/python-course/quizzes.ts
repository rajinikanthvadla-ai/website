import bank from "./quiz-bank.json";
import type { LessonQuiz } from "./quiz-shared";

const quizzes = bank as LessonQuiz[];

const bySlug = new Map(quizzes.map((quiz) => [quiz.slug, quiz]));

export function getQuiz(slug: string): LessonQuiz | undefined {
  return bySlug.get(slug);
}

export type { LessonQuiz, QuizQuestion } from "./quiz-shared";
