import Image from "next/image";
import { LINKS } from "@/lib/constants";
import { HOME_SKETCH, sketch } from "@/lib/sketch-assets";

interface CTASectionProps {
  title: string;
  subtitle: string;
  showYoutube?: boolean;
  ctaPreset?: "default" | "mentorship" | "contact";
}

export default function CTASection({
  title,
  subtitle,
  showYoutube = true,
  ctaPreset = "default",
}: CTASectionProps) {
  const actions =
    ctaPreset === "mentorship" || ctaPreset === "contact" ? (
      <>
        <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink">
          Book 1:1 Session
        </a>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
          WhatsApp
        </a>
        {showYoutube ? (
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost">
            YouTube
          </a>
        ) : null}
      </>
    ) : (
      <>
        <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ink">
          Enroll Now
        </a>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--accent">
          WhatsApp
        </a>
        {showYoutube ? (
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="notion-btn notion-btn--ghost">
            YouTube
          </a>
        ) : null}
      </>
    );

  return (
    <section className="notion-cta-band py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="notion-sketch-frame notion-sketch-frame--blue max-w-[200px] mx-auto mb-8 !min-h-[100px]">
          <Image
            src={sketch(HOME_SKETCH.cta)}
            alt=""
            width={160}
            height={100}
            aria-hidden
          />
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight">{title}</h2>
        <p className="text-slate-600 mb-9 leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">{actions}</div>
        <p className="mt-8 text-xs text-slate-500">
          I read every message. Typical reply within a day. No pressure to buy.
        </p>
      </div>
    </section>
  );
}
