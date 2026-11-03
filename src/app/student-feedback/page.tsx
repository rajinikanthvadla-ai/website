import type { Metadata } from "next";
import { Suspense } from "react";
import StudentFeedbackForm from "@/components/StudentFeedbackForm";

export const metadata: Metadata = {
  title: "Student feedback (private)",
  description: "Private feedback form for Rajinikanth Vadla students. Not open for public reviews.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: "https://rajinikanthvadla.com/student-feedback/" },
};

export default function StudentFeedbackPage() {
  return (
    <section className="notion-section notion-section--paper py-16 md:py-24">
      <div className="max-w-xl mx-auto px-6">
        <Suspense
          fallback={
            <div className="panel p-6 md:p-8 text-sm text-slate-600">Loading private form…</div>
          }
        >
          <StudentFeedbackForm />
        </Suspense>
      </div>
    </section>
  );
}
