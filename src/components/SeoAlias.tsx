import CourseRedirect from "@/components/CourseRedirect";
import { canonicalUrl } from "@/lib/seo-alias";

type Props = {
  title: string;
  message: string;
  href: string;
  cta: string;
};

/** Static-host stand-in for a 301: instant meta refresh, with a visible link if refresh does not run. */
export default function SeoAlias({ title, message, href, cta }: Props) {
  const target = canonicalUrl(href);
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <CourseRedirect title={title} message={message} href={href} cta={cta} />
    </>
  );
}
