import React from "react";
import BlogCard from "@/components/SharedComponents/Blog/blogCard";
import { getBlogs } from "@/lib/api/blogs";
import { getAllPosts } from "@/utils/markdown";
import type { Blog } from "@/types/blog";

const BlogList = async () => {
  const markdownPosts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "description",
    "coverImage",
    "type",
    "keywords",
    "author",
    "slug",
  ]).map((p: any) => ({
    _id: `md:${p.slug}`,
    title: p.title,
    slug: p.slug,
    content: p.content || "",
    excerpt: p.excerpt || p.description || "",
    category: p.type || "Blog",
    tags: Array.isArray(p.keywords) ? p.keywords : [],
    author: p.author || "Arthhwise",
    image: p.coverImage || "",
    publishedAt: p.date,
    isPublished: true,
    createdAt: p.date,
    updatedAt: p.date,
    views: 0,
    likes: 0,
  })) as unknown as Blog[];

  let apiPosts: Blog[] = [];
  try {
    const response = await getBlogs(1, 100);
    if (response.success && response.data && response.data.length > 0) {
      apiPosts = response.data as unknown as Blog[];
    }
  } catch {
    // Ignore API failures; markdown posts remain available.
  }

  const bySlug = new Map<string, Blog>();
  for (const p of markdownPosts) bySlug.set(p.slug, p);
  for (const p of apiPosts) bySlug.set(p.slug, p);

  const posts = Array.from(bySlug.values()).sort((a, b) => {
    const aDate = new Date(a.publishedAt || a.date || a.createdAt || 0).getTime();
    const bDate = new Date(b.publishedAt || b.date || b.createdAt || 0).getTime();

    const aValid = Number.isFinite(aDate);
    const bValid = Number.isFinite(bDate);
    if (aValid && bValid) return bDate - aDate;
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;
    return 0;
  });

  return (
    <section
      className="flex flex-wrap justify-center md:pt-20 pt-8 lg:pb-24 pb-10 dark:bg-darkmode "
      id="blog"
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="lg:grid grid-cols-12 gap-x-12 gap-y-20">
          {posts.map((blog, index) => (
            <div key={blog._id || blog.slug} className="w-full md:col-span-6 col-span-12">
              <BlogCard blog={blog} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
