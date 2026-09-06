"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isLessonCompleted,
  markLessonCompleted,
  markLessonIncomplete,
  readCourseProgress,
  type CourseProgress,
} from "@/lib/python-course/progress";

export function useCourseProgress(_currentSlug?: string) {
  const [progress, setProgress] = useState<CourseProgress>({ completed: [], updatedAt: "" });

  useEffect(() => {
    const sync = () => setProgress(readCourseProgress());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("python-course-progress", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("python-course-progress", sync);
    };
  }, []);

  const completed = useCallback((slug: string) => isLessonCompleted(slug, progress), [progress]);

  const markDone = useCallback((slug: string) => {
    setProgress(markLessonCompleted(slug));
  }, []);

  const markUndone = useCallback((slug: string) => {
    setProgress(markLessonIncomplete(slug));
  }, []);

  return {
    progress,
    completedCount: progress.completed.length,
    completed,
    markDone,
    markUndone,
  };
}
