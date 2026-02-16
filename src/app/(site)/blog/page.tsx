import React from "react";
import BlogList from "@/components/Blog/BlogList";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";
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
      <BlogList />
    </>
  );
};

export default Page;
