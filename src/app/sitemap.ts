import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/markdown";

const SITE_URL = "https://arthhwise.com";

function toValidDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const t = Date.parse(value);
  if (!Number.isFinite(t)) return null;
  return new Date(t);
}

async function fetchApiBlogSlugs(): Promise<Array<{ slug: string; lastModified?: Date }>> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:8000/api";

  try {
    const res = await fetch(`${apiBase}/blog?page=1&limit=1000`, {
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/about",
    "/blog",
    "/careers",
    "/contact",
    "/contests",
    "/delete-account",
    "/documentation",
    "/feedback",
    "/leaderboard",
    "/pricing",
    "/privacy",
    "/services",
    "/terms",
    "/waiting-list",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const markdownPosts = getAllPosts(["slug", "date"]) as Array<{ slug?: string; date?: string }>;
  const markdownEntries: MetadataRoute.Sitemap = markdownPosts
    .filter((p) => typeof p.slug === "string" && p.slug.length > 0)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: toValidDate(p.date) || new Date(),
    }));

  const apiPosts = await fetchApiBlogSlugs();
  const apiEntries: MetadataRoute.Sitemap = apiPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.lastModified || new Date(),
  }));

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const e of [...staticEntries, ...markdownEntries, ...apiEntries]) byUrl.set(e.url, e);

  return Array.from(byUrl.values());
}
