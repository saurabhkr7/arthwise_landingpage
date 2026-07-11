"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const features = [
    {
        icon: "solar:gamepad-bold",
        title: "Live Trading Game",
        description:
            "Enter daily and weekly virtual trading contests. Compete against other Indian traders, climb the leaderboard, and win without risking real capital.",
        link: "https://play.google.com/store/apps/details?id=com.arthwise",
        linkText: "Play the Trading Game",
        external: true,
    },
    {
        icon: "solar:double-alt-arrow-up-bold",
        title: "Futures & Options (F&O)",
        description:
            "Practice derivatives trading with real-time options chain data (IV, Delta, Open Interest) and a professional DOM Price Ladder interface for scalping.",
        link: "https://play.google.com/store/apps/details?id=com.arthwise",
        linkText: "Practice F&O Trading",
        external: true,
    },
    {
        icon: "solar:chat-line-bold",
        title: "Context-Aware AI Advisor",
        description:
            "Get personalized trading feedback. Our built-in AI analyzes your current paper portfolio, active contests, and performance to give smart tips.",
        link: "https://play.google.com/store/apps/details?id=com.arthwise",
        linkText: "Try AI Chat Screen",
        external: true,
    },
    {
        icon: "solar:earth-bold",
        title: "Multi-Asset Simulation",
        description:
            "Built for modern portfolios. Practice paper trading Indian Equities (NSE/BSE), Cryptocurrencies (BTC, ETH), and Commodities (Gold, Silver, Oil).",
        link: "https://play.google.com/store/apps/details?id=com.arthwise",
        linkText: "Explore Assets",
        external: true,
    },
    {
        icon: "solar:book-2-bold",
        title: "Stock Market Learning",
        description:
            "Go from beginner to advanced trader. Access structured courses, lessons, and interactive quizzes covering technical analysis and risk management.",
        link: "/blog",
        linkText: "Start Learning",
        external: false,
    },
    {
        icon: "solar:graph-up-bold",
        title: "Detailed Trade Analytics",
        description:
            "Review your trading journals with detailed P&L charts, asset allocation graphs, win-rate metrics, and custom watchlists.",
        link: "https://play.google.com/store/apps/details?id=com.arthwise",
        linkText: "Open Trade Journal",
        external: true,
    },
];

const Features = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section
            id="features"
            className="dark:bg-darkmode py-16 overflow-x-hidden"
            aria-labelledby="features-heading"
        >
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <motion.div
                    ref={ref}
                    initial={{ y: 40, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-semibold text-lg block mb-2">
                        App Features
                    </span>
                    <h2
                        id="features-heading"
                        className="md:text-35 sm:text-28 text-24 font-bold text-midnight_text dark:text-white"
                    >
                        Everything You Need to Win the{" "}
                        <span className="text-primary">Trading Game</span>
                    </h2>
                    <p className="mt-4 text-17 text-muted dark:text-white dark:text-opacity-70 max-w-2xl mx-auto">
                        Whether you are a beginner who wants to learn the stock market, or a
                        seasoned trader testing new strategies — Arthhwise has the tools,
                        community, and challenges to help you grow.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 40, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="bg-heroBg dark:bg-midnight_text rounded-2xl p-8 flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <Icon
                                    icon={feature.icon}
                                    width="24"
                                    height="24"
                                    className="text-primary"
                                />
                            </div>
                            <h3 className="text-20 font-semibold text-midnight_text dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-16 text-muted dark:text-white dark:text-opacity-70 flex-1 mb-6">
                                {feature.description}
                            </p>
                            <Link
                                href={feature.link}
                                target={feature.external ? "_blank" : undefined}
                                rel={feature.external ? "noopener noreferrer" : undefined}
                                className="text-16 flex gap-2 items-center text-primary hover:text-blue-700 font-medium"
                            >
                                {feature.linkText}
                                <Icon
                                    icon="solar:alt-arrow-right-linear"
                                    width="13"
                                    height="13"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
