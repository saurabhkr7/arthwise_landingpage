import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import FeedbackForm from "@/components/Feedback";

export const metadata: Metadata = {
  title: "Feedback | Arthhwise",
  description: "Share your thoughts and help us improve Arthhwise. We value your feedback on our Android and iOS apps.",
};

const FeedbackPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/feedback", text: "Feedback" },
  ];

  return (
    <>
      <HeroSub
        title="Feedback"
        description="We're constantly working to improve Arthhwise. Let us know what you think about our apps or this landing page."
        breadcrumbLinks={breadcrumbLinks}
      />
      <FeedbackForm />
    </>
  );
};

export default FeedbackPage;
