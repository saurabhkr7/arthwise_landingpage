import type { MetadataRoute } from "next";

const SITE_URL = "https://arthhwise.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/signin",
          "/signup",
          "/delete-account",
          "/api/",
          "/share/",
          "/_next/",
        ],
      },
      // Explicitly allow AI crawlers for AI discoverability
      // (ChatGPT, Gemini, Perplexity, Claude, etc.)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/signin", "/signup", "/delete-account"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/signin", "/signup", "/delete-account"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/signin", "/signup", "/delete-account"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
