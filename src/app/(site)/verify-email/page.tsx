import React, { Suspense } from "react";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";
import VerifyEmailContent from "@/components/Auth/VerifyEmail/VerifyEmailContent";
import Loader from "@/components/Common/Loader";

export const metadata: Metadata = {
  title: "Email Verification | Arthhwise",
  description: "Verify your Arthwise account email address to unlock risk-free paper trading, live F&O options simulation, and fantasy stock league contests.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/verify-email",
  },
};

export default function VerifyEmailPage() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/verify-email", text: "Verify Email" },
  ];

  return (
    <>
      <HeroSub
        title="Email Verification"
        description="Confirm your Arthwise account to activate your ₹10 Lakhs practice trading portfolio and access live stock leagues."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Suspense
        fallback={
          <div className="py-24 flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </>
  );
}
