import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import DeleteAccountContent from "@/components/AccountDeletion/DeleteAccountContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Deletion | Arthhwise",
  description: "Request deletion of your Arthhwise account and associated personal data in compliance with Google Play policies.",
  alternates: {
    canonical: "/delete-account",
  },
};

const DeleteAccountPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/delete-account", text: "Account Deletion" },
  ];

  return (
    <>
      <HeroSub
        title="Account Deletion"
        description="We value your privacy and data security"
        breadcrumbLinks={breadcrumbLinks}
      />
      <DeleteAccountContent />
    </>
  );
};

export default DeleteAccountPage;
