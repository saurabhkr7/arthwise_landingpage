import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, coverImage, image, category, type, excerpt, date, publishedAt, slug } = blog;
  
  // Fix for blog images - handle relative paths from backend
  const getImageUrl = (url?: string) => {
    if (!url) return '/images/blogs/blog_1.png';
    if (url.startsWith('http')) return url;
    
    // Assuming backend is at NEXT_PUBLIC_API_URL/.. and images are served from root
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const serverBase = apiBase.replace('/api', '');
    return `${serverBase}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const imageUrl = getImageUrl(coverImage || image);
  const dateStr = date || publishedAt || new Date().toISOString();
  const blogType = category || type || 'Trading';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 items-center group">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          {/* <Link
            href={`/blog/${slug}`}
            aria-label="blog cover"
            className="block"
          > */}
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
          {/* </Link> */}
        </div>
      </div>
      <div>
        <p className="text-14 sm:text-16 md:text-18 font-medium text-muted leading-loose mb-0">
          {format(new Date(dateStr), "MMMM dd, yyyy")}
        </p>
        <div className="my-4">
          {/* <Link
            href={`/blog/${slug}`}
            className="text-20 sm:text-22 md:text-24 font-medium text-midnight_text dark:text-white group-hover:text-primary"
          > */}
            <div className="text-20 sm:text-22 md:text-24 font-medium text-midnight_text dark:text-white">
              {title}
            </div>
          {/* </Link> */}
        </div>
        <div>
          {/* <Link
            href={`/blog/${slug}`}
            className="text-20 text-primary hover:text-blue-700"
          > */}
            <div className="text-20 text-primary">
              {blogType}
            </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
