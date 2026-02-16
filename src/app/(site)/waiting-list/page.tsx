import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import WaitingListForm from "@/components/WaitingList";

export const metadata: Metadata = {
  title: "Early Access | Arthhwise",
  description: "Join the waiting list for Arthhwise and be the first to experience our advanced stock market simulation platform.",
  alternates: {
    canonical: "/waiting-list",
  },
};

const WaitingListPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/waiting-list", text: "Early Access" },
  ];

  return (
    <>
      <HeroSub
        title="Get Early Access"
        description="Join our community of early adopters and get notified as soon as we launch on Play Store and App Store."
        breadcrumbLinks={breadcrumbLinks}
      />
      <WaitingListForm />
    </>
  );
};

export default WaitingListPage;
