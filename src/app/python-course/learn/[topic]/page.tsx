import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PRACTICE_TOPIC_SLUGS,
  getPracticeTopic,
  getPythonLesson,
} from "@/lib/python-course";
import { SITE } from "@/lib/constants";
import TopicStarter from "@/components/python-course/TopicStarter";

export function generateStaticParams() {
  return PRACTICE_TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getPracticeTopic(topicSlug);
  if (!topic) return { title: "Topic not found" };
  const canonical = `${SITE.url}/python-course/learn/${topic.slug}/`;
  return {
    title: topic.seoTitle,
    description: topic.description,
    keywords: topic.keywords,
    alternates: { canonical },
    openGraph: {
      title: topic.seoTitle,
      description: topic.description,
      url: canonical,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function PracticeTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getPracticeTopic(topicSlug);
  if (!topic) notFound();
  const lesson = getPythonLesson(topic.lessonSlug);
  if (!lesson) notFound();

  const canonical = `${SITE.url}/python-course/learn/${topic.slug}/`;
  const basic = lesson.sections[0]?.basicCode || lesson.tryIt.starter;
  const tip = lesson.sections[0]?.basicTip || "Tiny starter for this topic.";
  const lessonHref = `/python-course/${lesson.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: topic.title,
    description: topic.description,
    url: canonical,
    isAccessibleForFree: true,
    learningResourceType: "Tutorial",
    teaches: topic.title,
    isPartOf: {
      "@type": "Course",
      name: "Free Python Course for AI, ML and GenAI Engineers",
      url: `${SITE.url}/python-course/`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#fdfcf8] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
              Python course
            </Link>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-500">Learn</span>
          </nav>

          <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 mb-2">
            Free practice topic
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {topic.title}
          </h1>
          <p className="text-[17px] text-slate-600 leading-8 mb-6">{topic.description}</p>

          <div className="rounded-xl border-2 border-slate-900 bg-white p-5 mb-6 shadow-[4px_4px_0_#0f172a]">
            <p className="text-sm font-bold text-slate-900 mb-2">What you will learn</p>
            <ul className="space-y-2">
              {topic.bullets.map((bullet) => (
                <li key={bullet} className="text-[15px] text-slate-700 leading-6 flex gap-2">
                  <span className="text-emerald-600 font-bold">+</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[15px] text-slate-700 leading-7 mb-3">
            <span className="font-semibold text-slate-900">Starter idea: </span>
            {topic.starterIdea}
          </p>

          <TopicStarter code={basic} tip={tip} lessonHref={lessonHref} />

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={lessonHref} className="notion-btn notion-btn--ink">
              Open full lesson &amp; compiler &rarr;
            </Link>
            <Link href="/python-course/challenge/" className="notion-btn notion-btn--accent">
              Today&apos;s challenge
            </Link>
            <Link href="/python-course/" className="notion-btn notion-btn--ghost">
              All lessons
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
