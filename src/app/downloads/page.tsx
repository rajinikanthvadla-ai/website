import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { loadDownloadsManifest } from "@/lib/downloads-manifest";

export const metadata: Metadata = {
  title: "Downloads · Social Media Ads",
  description: "Download WhatsApp Status, Instagram Story and square feed images.",
};

export default function DownloadsPage() {
  const items = loadDownloadsManifest();

  return (
    <div className="notion-section notion-section--cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <span className="notion-eyebrow">
          <span className="notion-eyebrow-dot" />
          Downloads
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0f172a] mt-4 mb-4">
          Social media ads
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mb-8 leading-relaxed">
          Story (9:16) for WhatsApp Status and Instagram Story. Square (1:1) for Instagram feed and WhatsApp chat.
          PNG or JPG — no pricing, ready to post.
        </p>

        <div className="panel p-5 mb-10 text-sm text-slate-600 space-y-1">
          <p><strong className="text-[#0f172a]">1080 × 1920</strong> — WhatsApp Status · Instagram Story</p>
          <p><strong className="text-[#0f172a]">1080 × 1080</strong> — Instagram feed · WhatsApp image (1:1)</p>
        </div>

        {items.length === 0 ? (
          <div className="panel p-8 text-center">
            <code className="block bg-[#0f172a] text-white p-4 rounded-sm font-mono text-sm">npm run generate-ads</code>
          </div>
        ) : (
          <div className="space-y-14">
            {items.map((item) => (
              <section key={item.id}>
                <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-6">{item.title}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {item.variants.map((v) => (
                    <article key={v.fmt} className="notion-program-card">
                      <div
                        className="relative bg-[#fafafa] border-b-2 border-[#0f172a] overflow-hidden flex items-center justify-center"
                        style={{ aspectRatio: v.fmt === "square" ? "1/1" : "9/16", maxHeight: 440 }}
                      >
                        <Image
                          src={v.png}
                          alt={`${item.title} ${v.fmt}`}
                          width={v.w}
                          height={v.h}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="notion-program-body">
                        <span className="notion-dash-tag mb-2">{v.platform}</span>
                        <p className="text-sm text-slate-500 mb-4">{v.w} × {v.h} px</p>
                        <div className="flex flex-col gap-2">
                          <a href={v.png} download className="notion-btn notion-btn--ink w-full text-center text-sm">
                            Download PNG
                          </a>
                          <a href={v.jpg} download className="notion-btn notion-btn--ghost w-full text-center text-sm">
                            Download JPG
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="panel p-6 mt-10">
          <Link href="/" className="notion-dash-link">Back to homepage &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
