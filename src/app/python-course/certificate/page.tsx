import type { Metadata } from "next";
import CertificateView from "@/components/python-course/CertificateView";
import { SITE } from "@/lib/constants";
import { TOTAL_LESSONS } from "@/lib/python-course";

const CANONICAL = `${SITE.url}/python-course/certificate/`;

export const metadata: Metadata = {
  title: "Free Python Course Certificate | Download With Your Name",
  description: `Earn a free downloadable Python certificate for AI and ML after completing the course lessons. Enter your name and download a PNG signed by Rajinikanth Vadla. ${TOTAL_LESSONS} lessons, no signup.`,
  keywords: [
    "free python course certificate",
    "python certificate download",
    "python for AI certificate",
    "online python course certificate",
    "free ML python certificate",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Free Python Course Certificate | Download With Your Name",
    description:
      "Complete the free Python for AI/ML course, enter your name, and download a signed certificate PNG.",
    url: CANONICAL,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PythonCertificatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: "Python for AI, ML and GenAI Engineers Certificate",
    description:
      "Free certificate of completion for the Python course for AI, ML and GenAI engineers by Rajinikanth Vadla.",
    url: CANONICAL,
    credentialCategory: "Certificate",
    recognizedBy: {
      "@type": "Person",
      name: "Rajinikanth Vadla",
      url: SITE.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#fdfcf8] min-h-screen">
        <CertificateView />
      </div>
    </>
  );
}
