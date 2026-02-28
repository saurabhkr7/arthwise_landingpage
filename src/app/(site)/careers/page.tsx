import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | Arthhwise",
    description: "Join the Arthhwise team and help us build the future of trading platforms.",
};

const CareersPage = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/careers", text: "Careers" },
    ];

    return (
        <>
            <HeroSub
                title="Careers"
                description="Coming Soon. We are working hard to bring you this page."
                breadcrumbLinks={breadcrumbLinks}
            />
            <section className="pb-20 pt-10 px-4">
                <div className="max-w-4xl mx-auto text-center mt-10">
                    <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-gray-600 dark:text-gray-300">Our Careers page is currently under construction. Please check back later.</p>
                </div>
            </section>
        </>
    );
};

export default CareersPage;
