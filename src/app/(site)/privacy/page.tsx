import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import PrivacyContent from "@/components/Privacy/PrivacyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Arthwise",
  description: "Learn how Arthwise protects your privacy and handles your personal data. Our commitment to transparency and data security.",
};

const PrivacyPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/privacy", text: "Privacy Policy" },
  ];

  return (
    <>
      <HeroSub
        title="Privacy Policy"
        description="Your privacy matters to us"
        breadcrumbLinks={breadcrumbLinks}
      />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPage;
