import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const SeoContent = () => {
    return (
        <section
            className="dark:bg-darkmode py-16"
            aria-labelledby="seo-content-heading"
        >
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="grid lg:grid-cols-1 gap-16">

                    {/* Block 1: What is Paper Trading? */}
                    <article className="bg-heroBg dark:bg-midnight_text rounded-3xl p-10 lg:p-14">
                        <h2 className="md:text-35 sm:text-28 text-24 font-bold text-midnight_text dark:text-white mb-6">
                            What is{" "}
                            <span className="text-primary">Paper Trading</span>?
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="text-17 text-muted dark:text-white dark:text-opacity-70 mb-4 leading-relaxed">
                                    Paper trading is the practice of simulated buying and selling of stocks,
                                    without using real money. Think of it as a flight simulator for the stock
                                    market — you get the full experience of placing orders, watching prices
                                    move, and managing a portfolio, but with zero financial risk.
                                </p>
                                <p className="text-17 text-muted dark:text-white dark:text-opacity-70 mb-4 leading-relaxed">
                                    On Arthhwise, paper trading uses{" "}
                                    <strong className="text-midnight_text dark:text-white">live NSE and BSE market data</strong>,
                                    so every price you see is real. You start with ₹10,00,000 in virtual
                                    capital and make trades just like a real investor — but without putting
                                    your savings on the line.
                                </p>
                                <p className="text-17 text-muted dark:text-white dark:text-opacity-70 leading-relaxed">
                                    Whether you are learning the basics of the Indian stock market or testing
                                    a new strategy before deploying real money, paper trading is the smartest
                                    first step every trader should take.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: "solar:shield-check-bold",
                                        title: "Zero Financial Risk",
                                        desc: "Trade freely without worrying about losing real money.",
                                    },
                                    {
                                        icon: "solar:chart-2-bold",
                                        title: "Real Market Data",
                                        desc: "Prices directly from NSE/BSE — as real as it gets.",
                                    },
                                    {
                                        icon: "solar:graph-up-bold",
                                        title: "Track Your Progress",
                                        desc: "Monitor your P&L, accuracy, and improvement over time.",
                                    },
                                    {
                                        icon: "solar:refresh-bold",
                                        title: "Unlimited Practice",
                                        desc: "Reset, retry, and refine your strategy until it works.",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon icon={item.icon} width="20" height="20" className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-16 font-semibold text-midnight_text dark:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-15 text-muted dark:text-white dark:text-opacity-60">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.arthwise"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent text-17"
                            >
                                Start Paper Trading Free
                                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
                            </Link>
                        </div>
                    </article>

                    {/* Block 2: Why Arthhwise is the Best Trading App */}
                    <article className="bg-white dark:bg-midnight_text rounded-3xl p-10 lg:p-14 shadow-sm border border-grey/10 dark:border-white/5">
                        <h2 className="md:text-35 sm:text-28 text-24 font-bold text-midnight_text dark:text-white mb-4">
                            Why Arthhwise is the Best{" "}
                            <span className="text-primary">Trading App</span> for India
                        </h2>
                        <p className="text-17 text-muted dark:text-white dark:text-opacity-70 mb-8 max-w-3xl leading-relaxed">
                            There are many trading apps out there. Here is why Indian traders — from
                            first-year college students to working professionals — choose Arthhwise as
                            their go-to stock market learning app and virtual trading platform.
                        </p>
                        <div className="grid lg:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: "solar:map-point-bold",
                                    title: "Built for Indian Markets",
                                    desc: "Arthhwise is the only trading simulator India-first: NSE/BSE data, INR capital, Indian market hours, and a community of Indian traders.",
                                },
                                {
                                    icon: "solar:gamepad-bold",
                                    title: "Trading Game That Keeps You Engaged",
                                    desc: "Learning through play is proven to work. Our trading game contests make it fun to practice, compete, and improve every single day.",
                                },
                                {
                                    icon: "solar:users-group-rounded-bold",
                                    title: "Vibrant Trading Community",
                                    desc: "Access a social trading platform where India's sharpest young traders share live trade ideas, analysis, and market insights.",
                                },
                                {
                                    icon: "solar:star-bold",
                                    title: "Real Learning, Not Just Data",
                                    desc: "Arthhwise is a true stock market learning app — with structured courses, quizzes, and guided trading experiences for all levels.",
                                },
                                {
                                    icon: "solar:wallet-money-bold",
                                    title: "Completely Free",
                                    desc: "Download and use Arthhwise for free on Android. No hidden charges, no catch — just an insanely good virtual trading app.",
                                },
                                {
                                    icon: "solar:graph-up-bold",
                                    title: "Deep Analytics for Improvement",
                                    desc: "Track your trade accuracy, P&L trends, and behavioral patterns. Arthhwise helps you become a better trader — not just a more active one.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Icon icon={item.icon} width="20" height="20" className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-16 font-semibold text-midnight_text dark:text-white mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-15 text-muted dark:text-white dark:text-opacity-60 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Block 3: Learn Stock Market with Trading Game */}
                    <article className="bg-heroBg dark:bg-midnight_text rounded-3xl p-10 lg:p-14">
                        <h2 className="md:text-35 sm:text-28 text-24 font-bold text-midnight_text dark:text-white mb-4">
                            Learn the Stock Market with Our{" "}
                            <span className="text-primary">Trading Game</span>
                        </h2>
                        <p className="text-17 text-muted dark:text-white dark:text-opacity-70 mb-8 max-w-3xl leading-relaxed">
                            Most people find the stock market intimidating. Textbooks are dry. News is
                            overwhelming. That is why Arthhwise wraps real market learning inside a
                            competitive, social trading game — so you actually enjoy the process.
                        </p>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mb-10">
                            {[
                                {
                                    step: "01",
                                    title: "Enter a Contest",
                                    desc: "Pick a daily or weekly trading game contest. Each contest uses real stock prices from NSE/BSE.",
                                },
                                {
                                    step: "02",
                                    title: "Trade & Compete",
                                    desc: "Buy and sell stocks to maximize your virtual portfolio returns. Watch the leaderboard update in real time.",
                                },
                                {
                                    step: "03",
                                    title: "Learn from Every Trade",
                                    desc: "Win or lose, your trade journal and P&L analytics show you exactly what worked and what to improve.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-darkmode rounded-2xl p-6"
                                >
                                    <span className="text-primary font-bold text-40 leading-none block mb-3">
                                        {item.step}
                                    </span>
                                    <h3 className="text-18 font-semibold text-midnight_text dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-15 text-muted dark:text-white dark:text-opacity-60 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white dark:bg-darkmode rounded-2xl p-8 mb-8">
                            <h3 className="text-20 font-semibold text-midnight_text dark:text-white mb-3">
                                Why gamified learning works better for stock market education
                            </h3>
                            <p className="text-16 text-muted dark:text-white dark:text-opacity-70 leading-relaxed">
                                Research consistently shows that learning by doing — especially in
                                competitive settings — leads to faster skill development and better
                                retention. Our trading game creates a safe environment where mistakes
                                are free, lessons are immediate, and progress is visible. Thousands of
                                Indian students and young professionals have already used Arthhwise to
                                demystify the stock market and build real investing confidence.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.arthwise"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent text-17"
                            >
                                Play Now — It&apos;s Free
                                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
                            </Link>
                            <Link
                                href="/blog"
                                className="inline-flex gap-2 items-center text-primary hover:text-blue-700 py-3 px-8 text-17 font-medium"
                            >
                                Read Our Trading Blog
                                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
                            </Link>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default SeoContent;
