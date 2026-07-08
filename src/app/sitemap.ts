import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/markdown";
import { glossaryTerms } from "@/lib/glossaryData";

const SITE_URL = "https://arthhwise.com";

function toValidDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const t = Date.parse(value);
  if (!Number.isFinite(t)) return null;
  return new Date(t);
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_BASE_URL ||
  "https://api.arthhwise.com/api";

async function fetchApiBlogSlugs(): Promise<Array<{ slug: string; lastModified?: Date }>> {
  try {
    const res = await fetch(`${API_BASE}/blog?page=1&limit=1000`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as any;
    const rows: any[] = Array.isArray(json?.data) ? json.data : [];

    return rows
      .map((b) => ({
        slug: typeof b?.slug === "string" ? b.slug : "",
        lastModified: toValidDate(b?.updatedAt) || toValidDate(b?.publishedAt) || toValidDate(b?.createdAt) || undefined,
      }))
      .filter((b) => b.slug.length > 0);
  } catch {
    return [];
  }
}

/** Fetch dynamic content IDs from the API for sitemap inclusion */
async function fetchDynamicIds(
  endpoint: string
): Promise<Array<{ id: string; lastModified?: Date }>> {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}?page=1&limit=500`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as any;
    const rows: any[] = Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json)
        ? json
        : [];

    return rows
      .map((item) => ({
        id: item?._id || item?.id || "",
        lastModified:
          toValidDate(item?.updatedAt) ||
          toValidDate(item?.createdAt) ||
          undefined,
      }))
      .filter((item) => item.id.length > 0);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages worth indexing (removed delete-account, signin, signup, etc.)
  const staticPages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "daily", priority: 0.9 },
    { path: "/learn", changeFrequency: "weekly", priority: 0.9 },
    { path: "/glossary", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contests", changeFrequency: "daily", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.7 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.4 },
    { path: "/documentation", changeFrequency: "monthly", priority: 0.6 },
    { path: "/feedback", changeFrequency: "monthly", priority: 0.3 },
    { path: "/leaderboard", changeFrequency: "daily", priority: 0.7 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    { path: "/waiting-list", changeFrequency: "monthly", priority: 0.5 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Markdown blog posts
  const markdownPosts = getAllPosts(["slug", "date"]) as Array<{ slug?: string; date?: string }>;
  const markdownEntries: MetadataRoute.Sitemap = markdownPosts
    .filter((p) => typeof p.slug === "string" && p.slug.length > 0)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: toValidDate(p.date) || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // API blog posts
  const apiPosts = await fetchApiBlogSlugs();
  const apiEntries: MetadataRoute.Sitemap = apiPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.lastModified || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Glossary terms pages
  const glossaryEntries: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${SITE_URL}/glossary/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic content pages — contests, courses, posts, profiles
  const [contests, courses, posts] = await Promise.all([
    fetchDynamicIds("contest"),
    fetchDynamicIds("course"),
    fetchDynamicIds("post"),
  ]);

  const contestEntries: MetadataRoute.Sitemap = contests.map((c) => ({
    url: `${SITE_URL}/contest/${c.id}`,
    lastModified: c.lastModified || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${SITE_URL}/course/${c.id}`,
    lastModified: c.lastModified || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/post/${p.id}`,
    lastModified: p.lastModified || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Deduplicate by URL
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const e of [
    ...staticEntries,
    ...markdownEntries,
    ...apiEntries,
    ...glossaryEntries,
    ...contestEntries,
    ...courseEntries,
    ...postEntries,
  ]) {
    byUrl.set(e.url, e);
  }

  return Array.from(byUrl.values());
}
