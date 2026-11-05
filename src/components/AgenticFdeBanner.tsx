import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import { AGENTIC_FDE } from "@/lib/agentic-fde-training";

/** Homepage promo for the November 2026 customized Agentic AI & FDE batch. */
export default function AgenticFdeBanner() {
  return (
    <section
      aria-label="Limited-time Agentic AI Architecture and FDE training"
      className="border-y-2 border-[#0f172a] bg-[#0f172a] text-white"
    >
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 grid md:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-400 mb-3">
            <span className="rounded bg-orange-700 px-2 py-0.5 text-white">Limited</span>
            {AGENTIC_FDE.batchLabel}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3">
            {AGENTIC_FDE.shortTitle}
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
            Customized live training for senior engineers and architects. Small batch of{" "}
            {AGENTIC_FDE.seats.toLowerCase()}, {AGENTIC_FDE.duration}, weekly 1:1. Fee{" "}
            <span className="text-white font-semibold">{AGENTIC_FDE.feeInr}</span>.
          </p>
          <p className="text-orange-300 text-sm font-semibold mb-6">{AGENTIC_FDE.urgency}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={AGENTIC_FDE.path} className="notion-btn notion-btn--accent !border-0">
              View details & syllabus
            </Link>
            <a
              href={LINKS.whatsappAgenticFde}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 text-sm font-semibold transition-colors"
            >
              Reserve a seat on WhatsApp
            </a>
          </div>
        </div>

        <Link
          href={AGENTIC_FDE.path}
          className="relative block overflow-hidden rounded-lg border-2 border-slate-600 shadow-[4px_4px_0_#ea580c]"
        >
          <Image
            src={AGENTIC_FDE.bannerImage}
            alt={`${AGENTIC_FDE.shortTitle} — ${AGENTIC_FDE.batchLabel}, limited seats`}
            width={960}
            height={540}
            className="w-full h-auto object-cover"
            sizes="(min-width: 768px) 420px, 100vw"
          />
        </Link>
      </div>
    </section>
  );
}
