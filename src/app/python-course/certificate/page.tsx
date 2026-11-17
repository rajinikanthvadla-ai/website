import type { Metadata } from "next";
import CertificateView from "@/components/python-course/CertificateView";
import { SITE } from "@/lib/constants";
import { FOUNDATIONS_LESSON_SLUGS, PYTHON_OUTLINE, TOTAL_LESSONS } from "@/lib/python-course";

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
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Python course", item: `${SITE.url}/python-course/` },
      { "@type": "ListItem", position: 2, name: "Certificate", item: CANONICAL },
    ],
  };

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Free Python Course for AI, ML and GenAI Engineers",
    description:
      "Free Python course from scratch for AI and ML. The certificate page is the finish line. Lessons run in the browser with nothing to install.",
    url: `${SITE.url}/python-course/`,
    provider: { "@type": "Person", name: "Rajinikanth Vadla", url: SITE.url },
    isAccessibleForFree: true,
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <div className="bg-[#fdfcf8] min-h-screen">
        <CertificateView outline={PYTHON_OUTLINE} foundationSlugs={FOUNDATIONS_LESSON_SLUGS} />
      </div>
    </>
  );
}
