import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import TermsContent from "@/components/Terms/TermsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service & EULA | Arthhwise",
    description: "Read the Terms of Service and End User License Agreement (EULA) for Arthhwise's paper trading and financial education platform.",
};

const TermsPage = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/terms", text: "Terms of Service (EULA)" },
    ];

    return (
        <>
            <HeroSub
                title="Terms of Service (EULA)"
                description="Our End User License Agreement, community safety guidelines, zero-tolerance policy, and platform terms."
                breadcrumbLinks={breadcrumbLinks}
            />
            <TermsContent />
        </>
    );
};

export default TermsPage;
