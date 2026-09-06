import type { Metadata } from "next";
import Link from "next/link";
import DailyChallenge from "@/components/python-course/DailyChallenge";
import { getChallengeForDate } from "@/lib/python-course";
import { SITE } from "@/lib/constants";

const CANONICAL = `${SITE.url}/python-course/challenge/`;
const challenge = getChallengeForDate();

export const metadata: Metadata = {
  title: "Daily Python Challenge for AI & ML (5 Minutes Free Practice)",
  description: `Today's free Python practice: ${challenge.title}. ${challenge.prompt} Run it in the browser compiler. No signup.`,
  keywords: [
    "daily python challenge",
    "python practice online",
    "python for AI practice",
    "free python exercises",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Daily Python Challenge for AI & ML",
    description: challenge.prompt,
    url: CANONICAL,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PythonChallengePage() {
  return (
    <div className="bg-[#fdfcf8] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/python-course/" className="text-blue-700 font-semibold hover:underline">
            Python course
          </Link>
          <span className="text-slate-300 mx-2">/</span>
          <span className="text-slate-500">Daily challenge</span>
        </nav>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Daily 5-minute Python challenge
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
          One small practice every day. Same challenge for everyone today. Mark it done, then open the full
          lesson when you want the deeper explanation.
        </p>
        <DailyChallenge challenge={challenge} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/python-course/" className="notion-btn notion-btn--ink">
            Course home
          </Link>
          <Link href="/python-course/playground/" className="notion-btn notion-btn--accent">
            Open playground
          </Link>
        </div>
      </div>
    </div>
  );
}
