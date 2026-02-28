import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard | Arthhwise",
    description: "Check out the top performers and the leaderboard on Arthhwise.",
};

const LeaderboardPage = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/leaderboard", text: "Leaderboard" },
    ];

    return (
        <>
            <HeroSub
                title="Leaderboard"
                description="Coming Soon. We are working hard to bring you this page."
                breadcrumbLinks={breadcrumbLinks}
            />
            <section className="pb-20 pt-10 px-4">
                <div className="max-w-4xl mx-auto text-center mt-10">
                    <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-gray-600 dark:text-gray-300">Our Leaderboard page is currently under construction. Please check back later.</p>
                </div>
            </section>
        </>
    );
};

export default LeaderboardPage;
