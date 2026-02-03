"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Method = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };
  const leftAnimation1 = {
    initial: { x: "-100%", opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.8 },
  };

  const leftAnimation2 = {
    initial: { x: "-100%", opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 1 },
  };
  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl py-16 sm:px-20 px-5"
        >
          <motion.div {...TopAnimation} className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white lg:max-w-full sm:max-w-75% mx-auto">
              Multiple ways to analyze and trade
              <span className="text-primary max-w-max ml-2">
                stocks & securities
              </span>
            </h2>
            <p className="font-medium xl:max-w-45% lg:max-w-50% md:max-w-75% text-17 mx-auto text-muted dark:text-white dark:text-opacity-70">
              Access advanced charting tools, real-time data, and comprehensive portfolio analytics to make informed trading decisions.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-11">
            <motion.div {...TopAnimation} className="col-span-2">
              <div className="bg-white dark:bg-darkmode rounded-2xl">
                <div className="grid xl:grid-cols-2 xl:gap-10">
                  <div className="xl:py-14 py-8 xl:pl-9 px-9">
                    <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                      Risk-Free Paper Trading
                    </h3>
                    <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                      Experience the thrill of the stock market without losing a penny. 
                      Trade in real-time with virtual capital and live NSE market data.
                    </p>
                    <Link
                      href="/signup"
                      className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                    >
                      Get Started
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        width="13"
                        height="13"
                      />
                    </Link>
                  </div>
                  <div>
                    <Image
                      src="/images/method/learning_edu_1.png"
                      alt="NSE Real-time trading card interface showing stock prices"
                      width={459}
                      height={289}
                      className="xl:w-full w-75% mx-auto h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="h-full flex flex-col gap-4 lg:col-span-1 col-span-2">
              <motion.div
                {...leftAnimation1}
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="flex-1 pl-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Structured Stock Learning
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Master the Indian markets with our interactive trading courses. From technical analysis
                    to professional risk management.
                  </p>
                  <Link
                    href="/waiting-list"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Join Learning Center
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full">
                  <Image
                    src="/images/method/method1.png"
                    alt="Trader analyzing candlestick charts on multiple screens"
                    width={232}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              <motion.div
                {...leftAnimation2}
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="flex-1 pl-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Professional Insights
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Stay ahead with real-time NSE market news, expert stock analysis, and a 
                    supportive trading community.
                  </p>
                  <Link
                    href="/blog"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Read Financial Blog
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full">
                  <Image
                    src="/images/method/method3.png"
                    alt="Financial experts discussing market trends"
                    width={232}
                    height={375}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
            <div className="h-full flex flex-col gap-4 lg:col-span-1 col-span-2">
              <motion.div
                {...rightAnimation}
                className="bg-white dark:bg-darkmode rounded-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="flex-1">
                  
                </div>
                <div className="flex-1 px-9 flex justify-center flex-col py-9">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Advanced P&L Analytics
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Analyze your trades with deep metrics. Track your accuracy, 
                    PnL, and improve your psychological trading discipline.
                  </p>
                  <Link
                    href="/waiting-list"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Start Paper Trading
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Method;
