import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Arthhwise",
  description: "Learn more about Arthhwise and our mission to revolutionize paper trading.",
};

const AboutPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About Us" },
  ];
  
  return (
    <>
      <HeroSub
        title="About Us"
        description="Coming Soon. We are working hard to bring you this page."
        breadcrumbLinks={breadcrumbLinks}
      />
      <section className="pb-20 pt-10 px-4">
          <div className="max-w-4xl mx-auto text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-300">Our About Us page is currently under construction. Please check back later.</p>
          </div>
      </section>
    </>
  );
};

export default AboutPage;
