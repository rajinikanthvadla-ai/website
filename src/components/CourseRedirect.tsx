import Link from "next/link";

type Props = {
  title: string;
  message: string;
  href: string;
  cta: string;
};

export default function CourseRedirect({ title, message, href, cta }: Props) {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-slate-600 leading-relaxed mb-8">{message}</p>
        <Link
          href={href}
          className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          {cta} &rarr;
        </Link>
      </div>
    </section>
  );
}
