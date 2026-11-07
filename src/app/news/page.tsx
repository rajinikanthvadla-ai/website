import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "News and Announcements",
  description: "Batch dates, workshops, new courses and updates from Rajinikanth Vadla.",
  alternates: { canonical: "https://rajinikanthvadla.com/news/" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}

/** Plain text with blank-line paragraphs; bare URLs become links. */
function Body({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="space-y-3 text-slate-700 leading-relaxed">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p.split(/(https?:\/\/[^\s)]+)/g).map((part, j) =>
            /^https?:\/\//.test(part) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 break-all">
                {part}
              </a>
            ) : (
              part
            ),
          )}
        </p>
      ))}
    </div>
  );
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "News", path: "/news/" }]} />
      <section className="notion-hero">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700 mb-3">News</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            Announcements and updates
          </h1>
          <p className="text-base md:text-lg text-slate-600">Batch dates, free workshops, new courses and what I am building.</p>
        </div>
      </section>

      <section className="notion-section notion-section--white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {posts.length === 0 ? (
            <div className="panel p-8 text-center">
              <p className="text-slate-600 mb-4">No announcements right now. The current batch is open with rolling intake.</p>
              <Link href="/enroll/" className="notion-btn notion-btn--accent">
                See the current batch
              </Link>
            </div>
          ) : (
            posts.map((p) => (
              <article key={p.id} id={p.id} className="panel overflow-hidden scroll-mt-24">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.title} width={1600} height={900} loading="lazy" decoding="async" className="w-full h-auto border-b border-slate-200" />
                ) : null}
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold text-slate-500 mb-2">
                    {p.pinned ? <span className="text-orange-700">Pinned · </span> : null}
                    {formatDate(p.created_at)}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-[#0f172a] mb-3">{p.title}</h2>
                  {p.summary ? <p className="text-lg text-slate-600 mb-4">{p.summary}</p> : null}
                  {p.body ? <Body text={p.body} /> : null}
                  {p.link_url ? (
                    <a
                      href={p.link_url}
                      className="notion-btn notion-btn--accent mt-5"
                      {...(/^https?:\/\//.test(p.link_url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {p.link_label || "Learn more"}
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
