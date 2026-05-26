import React from "react";
import BlogList from "@/components/Blog/BlogList";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Blog | Arthhwise",
  description: "Explore the latest insights, strategies, and updates on Indian stock market trading from the Arthhwise team.",
  alternates: {
    canonical: "/blog",
  },
};

const Page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/blog", text: "Blog" },
  ];
  return (
    <>
      <HeroSub
        title="Blog"
         description=""
        breadcrumbLinks={breadcrumbLinks}  
         />
      <section className="dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 pt-6 flex justify-end">
          <Link
            href="/blog/create"
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Write a Blog
          </Link>
        </div>
      </section>
      <BlogList />
    </>
  );
};

export default Page;
