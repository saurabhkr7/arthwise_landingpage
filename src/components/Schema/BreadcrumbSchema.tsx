import React from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Renders BreadcrumbList structured data (schema.org).
 * Helps Google understand page hierarchy and can show breadcrumbs in search results.
 * Also helps AI models understand the site structure.
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: "Home", href: "/" },
 *     { name: "Blog", href: "/blog" },
 *     { name: "Paper Trading Guide", href: "/blog/paper-trading-guide" },
 *   ]} />
 */
const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://arthhwise.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BreadcrumbSchema;
