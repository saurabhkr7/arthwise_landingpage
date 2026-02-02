import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog, index }: { blog: Blog; index?: number }) => {
  const { title, coverImage, image, category, type, date, publishedAt, slug } = blog;
  
  // Fresh logic to fix blog images once and for all:
  // 1. If backend explicitly has "blog_n.png", use it locally.
  // 2. Otherwise, use index to cycle through local images blog_1 to blog_8.
  const getImageUrl = () => {
    const rawUrl = coverImage || image || "";
    
    // Check if the backend string already contains our local pattern
    const match = rawUrl.match(/blog_(\d+)\.png/);
    if (match) {
      return `/images/blogs/blog_${match[1]}.png`;
    }

    // Default to cycling through 1-8 based on index or blog ID hash
    const imgIndex = typeof index === 'number' ? (index % 8) + 1 : 1;
    return `/images/blogs/blog_${imgIndex}.png`;
  };

  const imageUrl = getImageUrl();
  const dateStr = date || publishedAt || new Date().toISOString();
  const blogType = category || type || 'Trading';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 items-center group">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <Link
            href={`/blog/${slug}`}
            aria-label="blog cover"
            className="block"
          >
            <div className="overflow-hidden rounded-lg shrink-0">
              <Image
                src={imageUrl}
                alt={title || "Blog post image"}
                className="transition group-hover:scale-110"
                width={190}
                height={163}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-14 sm:text-16 md:text-18 font-medium text-muted leading-loose mb-0">
          {format(new Date(dateStr), "MMMM dd, yyyy")}
        </p>
        <div className="my-4">
          <Link
            href={`/blog/${slug}`}
            className="text-20 sm:text-22 md:text-24 font-medium text-midnight_text dark:text-white group-hover:text-primary"
          >
            {title}
          </Link>
        </div>
        <div>
          <Link
            href={`/blog/${slug}`}
            className="text-20 text-primary hover:text-blue-700"
          >
            {blogType}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
