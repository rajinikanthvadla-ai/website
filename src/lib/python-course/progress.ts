const STORAGE_KEY = "python-course-progress-v1";

export type CourseProgress = {
  completed: string[];
  updatedAt: string;
};

function emptyProgress(): CourseProgress {
  return { completed: [], updatedAt: new Date().toISOString() };
}

export function readCourseProgress(): CourseProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter((slug): slug is string => typeof slug === "string")
      : [];
    return {
      completed: [...new Set(completed)],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return emptyProgress();
  }
}

export function writeCourseProgress(progress: CourseProgress): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      completed: [...new Set(progress.completed)],
      updatedAt: progress.updatedAt,
    }),
  );
  window.dispatchEvent(new CustomEvent("python-course-progress"));
}

export function isLessonCompleted(slug: string, progress = readCourseProgress()): boolean {
  return progress.completed.includes(slug);
}

export function markLessonCompleted(slug: string): CourseProgress {
  const current = readCourseProgress();
  if (current.completed.includes(slug)) return current;
  const next: CourseProgress = {
    completed: [...current.completed, slug],
    updatedAt: new Date().toISOString(),
  };
  writeCourseProgress(next);
  return next;
}

export function markLessonIncomplete(slug: string): CourseProgress {
  const current = readCourseProgress();
  const next: CourseProgress = {
    completed: current.completed.filter((item) => item !== slug),
    updatedAt: new Date().toISOString(),
  };
  writeCourseProgress(next);
  return next;
}

export function toggleLessonCompleted(slug: string): CourseProgress {
  return isLessonCompleted(slug) ? markLessonIncomplete(slug) : markLessonCompleted(slug);
}

export function getCompletedLessonCount(progress = readCourseProgress()): number {
  return progress.completed.length;
}

export function hasCompletedLessons(
  slugs: string[],
  progress = readCourseProgress(),
): boolean {
  return slugs.every((slug) => progress.completed.includes(slug));
}
