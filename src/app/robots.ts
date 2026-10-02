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
      // Explicitly allow AI search crawlers & generative agents for maximum discoverability
      // (ChatGPT, SearchGPT, Gemini, Perplexity, Claude, Apple Intelligence, Meta AI)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "ChatGPT-User",
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
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
