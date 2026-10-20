import { SITE } from "@/lib/constants";

type Crumb = { name: string; path: string };

/** BreadcrumbList structured data so Google shows "Home › Section › Page" instead of a raw URL. Home is added automatically. */
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
