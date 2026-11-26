import type { LessonOutline } from "./types";

/**
 * The 6-week path shown on the course home and in lesson headers.
 * Each week starts at a lesson and runs until the next week's first lesson,
 * so the path always covers every lesson in teaching order. Safe for client components.
 */
const WEEK_STARTS = [
  { start: "why-python-for-ai", title: "Talk to Python", project: "Sentiment app" },
  { start: "functions", title: "Real programs", project: "First AI call" },
  { start: "inheritance-and-polymorphism", title: "Code like a pro", project: "Experiment tracker" },
  { start: "type-hints-and-dataclasses", title: "Data and machine learning", project: "Spam filter" },
  { start: "async-python", title: "GenAI apps", project: "Notes bot" },
  { start: "builtin-functions-reference", title: "Job ready", project: "Portfolio + interview" },
];

export type CourseWeek = {
  number: number;
  title: string;
  project: string;
  minutes: number;
  lessons: LessonOutline[];
};

export function buildWeeks(outline: LessonOutline[]): CourseWeek[] {
  const starts = WEEK_STARTS.map((week) => outline.findIndex((lesson) => lesson.slug === week.start));
  // Fail the build, not the learner, if a lesson is renamed or reordered.
  starts.forEach((index, i) => {
    if (index === -1) throw new Error(`Week ${i + 1} starts at unknown lesson "${WEEK_STARTS[i].start}"`);
    if (i > 0 && index <= starts[i - 1]) throw new Error(`Week ${i + 1} starts before week ${i}`);
  });
  if (starts[0] !== 0) throw new Error("Week 1 must start at the first lesson");
  return WEEK_STARTS.map((week, i) => {
    const lessons = outline.slice(starts[i], starts[i + 1] ?? outline.length);
    return {
      number: i + 1,
      title: week.title,
      project: week.project,
      minutes: lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
      lessons,
    };
  });
}

/** Week number and position of a lesson, for "Week 2 · Lesson 3 of 9". */
export function placeInWeeks(weeks: CourseWeek[], slug: string) {
  for (const week of weeks) {
    const index = week.lessons.findIndex((lesson) => lesson.slug === slug);
    if (index !== -1) return { week, lessonNumber: index + 1 };
  }
  return null;
}
