import { getBanners, type SiteBanner } from "@/lib/cms";

/** Image banners uploaded in /admin, baked into the page at build time. Renders nothing when there are none. */
export default async function SiteBanners({
  placement,
  className = "",
}: {
  placement: SiteBanner["placement"];
  className?: string;
}) {
  const banners = await getBanners(placement);
  if (!banners.length) return null;

  return (
    <section className={`site-banners ${className}`} aria-label="Announcements" data-no-reveal>
      <div className="max-w-5xl mx-auto px-6 grid gap-4">
        {banners.map((b) => {
          const img = (
            // Plain img: the static export does not optimise images, and uploads are already compressed WebP.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={b.image_url}
              alt={b.alt || b.title}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl border border-slate-200"
            />
          );
          if (!b.link_url) return <div key={b.id}>{img}</div>;
          const external = /^https?:\/\//.test(b.link_url);
          return (
            <a
              key={b.id}
              href={b.link_url}
              className="block lift rounded-xl"
              data-track={`Banner: ${b.title}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {img}
            </a>
          );
        })}
      </div>
    </section>
  );
}
