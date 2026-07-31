/**
 * Renders a JSON-LD structured-data <script> for rich results in Google.
 * Kept as a tiny server component so any page can drop in schema.org data
 * (Article, FAQPage, SoftwareApplication, BreadcrumbList, …).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static, author-controlled JSON — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
