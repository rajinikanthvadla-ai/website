"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * Microsoft Clarity: heatmaps, session replay, scroll depth, country/region.
 * Loads only when NEXT_PUBLIC_CLARITY_PROJECT_ID is set. Skip admin + local/dev.
 */
const PROJECT_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "").trim();

export default function ClarityAnalytics() {
  const pathname = usePathname() || "";
  if (!PROJECT_ID) return null;
  if (pathname.startsWith("/admin")) return null;
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", ${JSON.stringify(PROJECT_ID)});
    `}</Script>
  );
}
