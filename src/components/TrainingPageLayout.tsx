import Image from "next/image";
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
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-24 overflow-hidden">
        <div className="orb orb-1" style={{ opacity: 0.12 }} />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-500 mb-6">
                <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
                <span className="mx-2 text-gray-300">/</span>
                <a href="/courses" className="hover:text-primary-600 transition-colors">Courses</a>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-gray-900 font-semibold">{title}</span>
              </nav>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-gradient-to-r from-accent-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">4.9/5 Rating</span>
                <span className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">500+ Enrolled</span>
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">Hottest Skills 2026</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            </div>

            <div className="glass rounded-3xl p-6 shadow-xl border border-white/50">
              <Image src="/assets/pic-1.png" alt="Rajinikanth Vadla" width={300} height={200} className="rounded-2xl w-full h-48 object-cover object-[center_20%] mb-5" />
              <div className="space-y-3">
                <a href={LINKS.enroll} target="_blank" rel="noopener noreferrer" className="btn-shine block w-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold text-center shadow-lg shadow-primary-600/20 hover:-translate-y-0.5 transition-all">
                  Enroll Now &rarr;
                </a>
                <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3.5 rounded-xl font-bold text-center shadow-lg shadow-purple-600/20 hover:-translate-y-0.5 transition-all">
                  Book 1:1 Session
                </a>
                <a href={LINKS.whatsappSyllabus} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-center shadow-lg shadow-green-500/20 hover:-translate-y-0.5 transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-600 leading-relaxed text-lg mb-10">{intro}</p>

          <h2 className="text-2xl font-extrabold gradient-text mb-6">What You&apos;ll Learn</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-14">
            {whatYouLearn.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-accent-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-extrabold gradient-text mb-6">Course Curriculum</h2>
          <div className="space-y-4 mb-14">
            {modules.map((m, i) => (
              <div key={m.title} className="bg-gray-50/80 border border-gray-100 rounded-2xl p-7 card-hover">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                  <span className="w-9 h-9 bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shrink-0 shadow-lg shadow-primary-600/20">
                    {i + 1}
                  </span>
                  {m.title}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {m.topics.map((t) => (
                    <li key={t} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-accent-500">&rarr;</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader tag="FAQ" title="Frequently Asked Questions" />
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedCourses && relatedCourses.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader tag="Explore More" title="Related Courses" />
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedCourses.map((c) => (
                <a key={c.title} href={c.href} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 text-center card-hover">
                  <h3 className="font-bold text-gray-900 text-lg">{c.title}</h3>
                  <span className="text-primary-600 font-semibold text-sm mt-3 inline-block">Learn More &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="Transform Your Career Today" subtitle="Join 500+ engineers who have accelerated their careers with real-world training." />
      <SuccessStories />
    </>
  );
}
