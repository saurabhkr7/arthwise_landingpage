'use client';

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/SharedComponents/Blog/blogCard";
import { getBlogs, type Blog } from "@/lib/api/blogs";

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs(1, 100);
        
        if (response.success && response.data) {
          setPosts(response.data);
        } else {
          setError(response.error || 'Failed to load blogs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section
        className="flex flex-wrap justify-center md:pt-20 pt-8 lg:pb-24 pb-10 dark:bg-darkmode"
        id="blog"
      >
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="flex flex-wrap justify-center md:pt-20 pt-8 lg:pb-24 pb-10 dark:bg-darkmode"
        id="blog"
      >
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="text-center text-red-500">
            <p>Error loading blogs: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-wrap justify-center md:pt-20 pt-8 lg:pb-24 pb-10 dark:bg-darkmode "
      id="blog"
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="lg:grid grid-cols-12 gap-x-12 gap-y-20">
          {posts.map((blog, index) => (
            <div key={blog._id} className="w-full md:col-span-6 col-span-12">
              <BlogCard blog={blog} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
