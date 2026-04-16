import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import CTASection from "./CTASection";
import SuccessStories from "./SuccessStories";

interface Module {
  title: string;
  topics: string[];
}

interface FAQ {
  q: string;
  a: string;
}

interface TrainingPageLayoutProps {
  title: string;
  subtitle: string;
  intro: string;
  whatYouLearn: string[];
  modules: Module[];
  faqs: FAQ[];
  relatedCourses?: { title: string; href: string }[];
}

export default function TrainingPageLayout({
  title,
  subtitle,
  intro,
  whatYouLearn,
  modules,
  faqs,
  relatedCourses,
}: TrainingPageLayoutProps) {
  return (
    <>
      <section className="relative border-b border-stone-200 bg-stone-100 surface-paper py-20 md:py-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div>
              <nav className="text-sm text-stone-500 mb-6">
                <a href="/" className="hover:text-accent-600 transition-colors">Home</a>
                <span className="mx-2 text-stone-300">/</span>
                <a href="/courses" className="hover:text-accent-600 transition-colors">Courses</a>
                <span className="mx-2 text-stone-300">/</span>
                <span className="text-stone-900 font-medium">{title}</span>
              </nav>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="border border-stone-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-600">4.9 / 5</span>
                <span className="border border-stone-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-600">500+ enrolled</span>
                <span className="border border-accent-200 bg-accent-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-800">2026 skills</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">{title}</h1>
              <p className="text-lg text-stone-600 leading-relaxed">{subtitle}</p>
            </div>

            <div className="panel p-5 lg:sticky lg:top-28">
              <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla" width={300} height={200} className="w-full h-44 object-cover object-[center_20%] mb-4 border border-stone-200" />
              <div className="space-y-2">
                <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="block w-full bg-stone-900 text-white py-3 text-sm font-semibold text-center hover:bg-stone-800 transition-colors">
                  Enroll &rarr;
                </a>
                <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="block w-full border border-stone-400 text-stone-900 py-3 text-sm font-semibold text-center hover:bg-stone-50 transition-colors">
                  Book 1:1 session
                </a>
                <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="block w-full bg-emerald-700 text-white py-3 text-sm font-semibold text-center hover:bg-emerald-800 transition-colors">
                  WhatsApp syllabus
                </a>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed mt-4">
                Wondering if this course fits your career move or country?{" "}
                <Link href="/mentorship" className="text-accent-600 font-semibold underline decoration-accent-500/40 underline-offset-2 hover:decoration-accent-600">
                  Mentorship
                </Link>{" "}
                is open globally for those questions before you enroll.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-stone-600 leading-relaxed text-lg mb-10">{intro}</p>

          <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">What you&apos;ll learn</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-14">
            {whatYouLearn.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600 text-sm md:text-base">
                <span className="w-5 h-5 mt-0.5 shrink-0 border border-accent-500/40 bg-accent-50 flex items-center justify-center text-accent-700 text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">Curriculum</h2>
          <div className="space-y-3 mb-14">
            {modules.map((m, i) => (
              <div key={m.title} className="panel p-6 md:p-7 card-hover">
                <h3 className="font-display font-bold text-stone-900 mb-3 flex items-center gap-3 text-lg">
                  <span className="w-8 h-8 border border-stone-900 bg-stone-900 text-[#fffefc] flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {m.title}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {m.topics.map((t) => (
                    <li key={t} className="text-sm text-stone-600 flex items-center gap-2">
                      <span className="text-accent-600">&rarr;</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="FAQ" title="Questions people ask before joining" />
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="panel p-6 card-hover">
                <h3 className="font-display font-bold text-stone-900 mb-2 text-base">{faq.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedCourses && relatedCourses.length > 0 && (
        <section className="py-20 md:py-24 bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader tag="More" title="Related courses" />
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedCourses.map((c) => (
                <a key={c.title} href={c.href} className="panel p-6 text-center card-hover">
                  <h3 className="font-display font-bold text-stone-900 text-base">{c.title}</h3>
                  <span className="text-accent-600 font-semibold text-sm mt-3 inline-block">View &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="If the syllabus fits your goals, we should talk" subtitle="Send a short note on where you are today and what you want to be doing in twelve months." />
      <SuccessStories />
    </>
  );
}
