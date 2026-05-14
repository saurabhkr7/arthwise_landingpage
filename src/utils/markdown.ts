import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    // [key: string]: string;
    [key: string]: string | object;
  };

  const items: any = {};

  function processImages(content: string) {
    // You can modify this function to handle image processing
    // For example, replace image paths with actual HTML image tags
    return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // You can modify the content here to include images
      items[field] = processImages(content);
    }
    if (field === "rawContent") {
      items[field] = content;
    }

    if (field === "metadata") {
      // Include metadata, including the image information
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      const d1 = typeof post1?.date === "string" ? new Date(post1.date).getTime() : Number.NaN;
      const d2 = typeof post2?.date === "string" ? new Date(post2.date).getTime() : Number.NaN;

      const hasD1 = Number.isFinite(d1);
      const hasD2 = Number.isFinite(d2);

      if (hasD1 && hasD2) return d2 - d1;
      if (hasD1 && !hasD2) return -1;
      if (!hasD1 && hasD2) return 1;

      const s1 = typeof post1?.date === "string" ? post1.date : "";
      const s2 = typeof post2?.date === "string" ? post2.date : "";
      return s2.localeCompare(s1);
    });

  return posts;
}
