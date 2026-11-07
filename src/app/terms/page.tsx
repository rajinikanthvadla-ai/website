import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

/** Update this date whenever the terms change. */
const UPDATED = "7 November 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for the live courses, recordings, mentorship and consulting offered by Rajinikanth Vadla: access, payment, refunds, certificates, use of materials and outcomes.",
  alternates: { canonical: `${SITE.url}/terms/` },
};

const SECTIONS: LegalSection[] = [
  {
    title: "Who you are dealing with",
    points: [
      "Courses, recordings, mentorship and consulting on this site are provided by Rajinikanth Vadla, an independent trainer and engineer based in Hyderabad, India.",
      "By paying for a course or service you agree to these terms, the refund policy and the privacy policy.",
    ],
  },
  {
    title: "Courses and recordings",
    points: [
      "Live cohorts run online on the schedule shown on the course page. If a class has to move, it is announced in advance and recorded.",
      "Recordings and course materials are for your personal learning only. Sharing your access, re-uploading, reselling or redistributing them is not allowed and ends your access without refund.",
      "A completion certificate is issued after you submit all required capstone projects.",
    ],
  },
  {
    title: "Prices and payment",
    points: [
      "Visitors in India pay in Indian rupees; visitors elsewhere pay in US dollars. Prices are shown on the enroll page.",
      "Payments are processed by Razorpay. Your bank may add currency conversion or card fees.",
    ],
  },
  {
    title: "Refunds",
    points: [
      "Course refunds and batch transfers follow the refund policy: no cash refunds, but you can move to a later batch or switch to recordings.",
      "Mentorship: full refund if you ask before your first session.",
      "Duplicate or failed payments are returned to the original payment method.",
    ],
  },
  {
    title: "Outcomes",
    points: [
      "Job assistance, resume reviews and interview prep are support, not a job or salary guarantee. Results depend on your effort, background and the job market.",
      "Student outcomes shown on this site are reported by the students themselves.",
    ],
  },
  {
    title: "Consulting and team training",
    points: [
      "Project builds and corporate training are agreed in a separate written quote or contract, which takes priority over these terms for that work.",
    ],
  },
  {
    title: "Conduct",
    points: [
      "Be respectful in classes, community groups and messages. Harassment, spam or piracy can lead to removal without refund.",
    ],
  },
  {
    title: "Liability and law",
    points: [
      "The content is provided for education. To the extent the law allows, my total liability for any claim is limited to the amount you paid for the course or service concerned.",
      "These terms are governed by the laws of India, with courts in Hyderabad, Telangana. If you are a consumer, this does not remove any rights the law of your own country gives you.",
      "If these terms change, the date at the top changes too. The version in force when you paid applies to that purchase.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms/"
      crumb="Terms"
      updated={UPDATED}
      title="Terms of service"
      summary="Plain-language terms for courses, recordings, mentorship and consulting: what you get, how payment and refunds work, and what is not promised."
      sections={SECTIONS}
    />
  );
}
