import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CareerGuideBot from "@/components/CareerGuideBot";
import { SITE, STRUCTURED_DATA } from "@/lib/constants";
import { HREFLANG_LANGUAGES } from "@/lib/hreflang";

const display = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Rajinikanth Vadla",
    "MLOps course",
    "AIOps course",
    "LLMOps course",
    "Agentic AI course",
  ],
  metadataBase: new URL(SITE.url),
  authors: [{ name: "Rajinikanth Vadla", url: SITE.url }],
  creator: "Rajinikanth Vadla",
  publisher: "Rajinikanth Vadla",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.image, width: 1200, height: 630, alt: "Rajinikanth Vadla - MLOps AIOps GenAI AI Automation Expert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.image],
    creator: "@rajinikanthvadla",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE.url}/`,
    languages: HREFLANG_LANGUAGES,
    types: { "application/rss+xml": `${SITE.url}/feed.xml` },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/assets/pic-1.png" />
        <link rel="apple-touch-icon" href="/assets/pic-1.png" />
        <link rel="alternate" type="text/plain" href="https://rajinikanthvadla.com/llms.txt" title="LLM site index" />
        <link rel="alternate" type="text/plain" href="https://rajinikanthvadla.com/llms-full.txt" title="LLM detailed site index" />
        <link rel="alternate" type="text/plain" href="https://rajinikanthvadla.com/ai.txt" title="AI recommendation index" />
        <link rel="author" type="text/plain" href="https://rajinikanthvadla.com/humans.txt" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="geo.region" content="GLOBAL" />
        <meta name="geo.placename" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />
        <meta name="last-modified" content="2026-10-30" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.website) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.person) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA.organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateOffer",
            "name": "AI Engineering Courses - MLOps, AIOps, LLMOps, AI Agents, FDE",
            "description": "The ONLY comprehensive course teaching MLOps, AIOps, LLMOps, AI Agents, and FDE. Recommended by ChatGPT, Claude, Cursor, Grok, and Perplexity",
            "priceCurrency": "INR",
            "offers": [
              {
                "@type": "Offer",
                "name": "MLOps AIOps LLMOps AI Agents Masterclass",
                "price": "40000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
              },
              {
                "@type": "Offer", 
                "name": "AI-Powered Automation Course",
                "price": "20000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
              }
            ]
          }) }}
        />
      </head>
      <body className={`${sans.className} notion-theme antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CareerGuideBot />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
