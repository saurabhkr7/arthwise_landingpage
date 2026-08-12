import type { MetadataRoute } from "next";

const SITE_URL = "https://arthhwise.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/share/", "/verify/", "/_next/"],
      },
      // Explicitly allow AI crawlers for AI discoverability
      // (ChatGPT, Gemini, Perplexity, Claude, etc.)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
