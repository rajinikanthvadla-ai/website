import type { Metadata } from "next";
import { ZONE_SCRIPT } from "@/lib/zone-script";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE, STRUCTURED_DATA } from "@/lib/constants";
import { getActivity, getActivityStats, getAnnouncement } from "@/lib/cms";

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
    "AI Platform Engineering",
    "AI Platform Engineering course",
    "MLOps course",
    "AIOps course",
    "LLMOps course",
    "Agentic AI course",
    "FDE course",
    "online MLOps training",
    "live AI engineering course",
    "MLOps mentorship",
    "LLMOps training online",
    "AI Agents course online",
    "GenAI production training",
    "DevOps to AI platform",
  ],
  metadataBase: new URL(SITE.url),
  authors: [{ name: "Rajinikanth Vadla", url: SITE.url }],
  creator: "Rajinikanth Vadla",
  publisher: "Rajinikanth Vadla",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.image, width: 1200, height: 630, alt: "Rajinikanth Vadla — AI Platform Engineering, MLOps, AIOps, LLMOps, Agents & FDE" }],
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
    types: { "application/rss+xml": `${SITE.url}/feed.xml` },
  },
  // Bing Webmaster Tools ownership check. Keep it: removing it un-verifies the site in Bing.
  verification: { other: { "msvalidate.01": "1292D163D7DAB4E908D1445F7E87EEE5" } },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png?v=hero", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png?v=hero", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-192.png?v=hero", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png?v=hero", sizes: "180x180", type: "image/png" }],
    shortcut: ["/assets/favicon.ico?v=hero"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcement, activity, activityStats] = await Promise.all([getAnnouncement(), getActivity(), getActivityStats()]);
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ZONE_SCRIPT }} />
        <link rel="icon" href="/assets/favicon.ico?v=hero" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=hero" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png?v=hero" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png?v=hero" />
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
        <meta name="last-modified" content="2026-11-03" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <link rel="alternate" type="application/json" href="https://rajinikanthvadla.com/geo-markets.json" title="Regional training markets" />
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
        <AppShell announcement={announcement} activity={activity} activityStats={activityStats}>
          <main>{children}</main>
        </AppShell>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
