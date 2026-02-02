import React from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import WaitingListForm from "@/components/WaitingList";

export const metadata: Metadata = {
  title: "Waiting List | Arthwise",
  description: "Join the Arthwise waiting list to get early access and stay updated on our launch.",
};

const WaitingListPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/waiting-list", text: "Waiting List" },
  ];

  return (
    <>
      <HeroSub
        title="Waiting List"
        description="Join our community of early adopters and get notified as soon as we launch on Play Store and App Store."
        breadcrumbLinks={breadcrumbLinks}
      />
      <WaitingListForm />
    </>
  );
};

export default WaitingListPage;
