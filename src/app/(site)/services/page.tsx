import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import ServicesList from "@/components/Services/ServicesList";
import Payment from "@/components/Home/Payment";
import Benefit from "@/components/Home/Benefit";

export const metadata: Metadata = {
  title: "Services & Features | Arthhwise Paper Trading App",
  description:
    "Explore Arthhwise services: F&O paper trading options chain, virtual crypto trading, campus event hosting, stock market courses, daily contests & quizzes.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Features | Arthhwise Paper Trading App",
    description:
      "Risk-free paper trading, F&O derivatives simulator, campus championships, stock market education courses, and daily contests.",
    url: "https://arthhwise.com/services",
    siteName: "Arthhwise",
  },
};

const ServicesPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
  ];

  return (
    <>
      <HeroSub
        title="Our Services & Features"
        description="Explore the comprehensive suite of trading tools, campus event hosting engines, stock market courses, and daily games built for Indian retail investors."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ServicesList />
      <Payment />
      <Benefit />
    </>
  );
};

export default ServicesPage;
