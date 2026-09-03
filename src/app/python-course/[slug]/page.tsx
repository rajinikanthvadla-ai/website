import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonView from "@/components/python-course/LessonView";
import { PYTHON_LESSON_SLUGS, PYTHON_MODULES, getPythonLesson } from "@/lib/python-course";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return PYTHON_LESSON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getPythonLesson(slug);
  if (!lesson) return { title: "Lesson not found" };

  const canonical = `${SITE.url}/python-course/${lesson.slug}/`;
  const title = `${lesson.title} — Python for AI & GenAI Engineers`;

  return {
    title,
    description: lesson.summary,
    keywords: [
      `python ${lesson.title.toLowerCase()}`,
      "python for AI engineers",
      "python code examples",
      "online python compiler",
      "learn python for machine learning",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description: lesson.summary,
      url: canonical,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function PythonLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getPythonLesson(slug);
  if (!lesson) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: lesson.title,
    description: lesson.summary,
    author: { "@type": "Person", name: "Rajinikanth Vadla", url: SITE.url },
    publisher: { "@type": "Person", name: "Rajinikanth Vadla", url: SITE.url },
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "Course",
      name: "Free Python Course for AI, ML and GenAI Engineers",
      url: `${SITE.url}/python-course/`,
    },
    timeRequired: `PT${lesson.minutes}M`,
    proficiencyLevel: lesson.level,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Python course", item: `${SITE.url}/python-course/` },
      {
        "@type": "ListItem",
        position: 2,
        name: lesson.title,
        item: `${SITE.url}/python-course/${lesson.slug}/`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LessonView lesson={lesson} modules={PYTHON_MODULES} />
    </>
  );
}
