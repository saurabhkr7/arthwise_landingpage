"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { review } from "@/app/api/data";

const Search = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const [activeReview, setActiveReview] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % review.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveReview((prev) => (prev + 1) % review.length);
  };

  const handlePrev = () => {
    setActiveReview((prev) => (prev - 1 + review.length) % review.length);
  };

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          icon="ph:star-fill"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    if (halfStars) {
      stars.push(
        <Icon
          key="half"
          icon="ph:star-half-fill"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          icon="ph:star-bold"
          className="w-5 h-5 text-yellow-500"
        />
      );
    }

    return stars;
  };

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl p-2"
        >
          <motion.div
            {...TopAnimation}
            className="text-center lg:px-20 px-4 pt-20"
          >
            <div className="flex justify-center">
              <Image
                src="/images/search/free.png"
                alt="Free NSE Paper Trading Platform badge"
                width={67}
                height={38}
              />
            </div>
            <h2 className="text-midnight_text font-bold dark:text-white md:text-35 sm:text-28 text-24">
              Practice Trading with
              <span className="lg:text-35 text-primary text-24 pl-2">
                ₹10,00,000 Virtual Capital
              </span>
            </h2>
            <div className="md:max-w-75% mx-auto mt-6">
              <div className="flex lg:items-center md:items-start bg-white dark:bg-darkHeroBg shadow-md rounded-2xl overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter email for early access"
                  className="grow px-4 py-5 pl-6 dark:text-heroBg text-17 focus:outline-hidden bg-white dark:bg-darkHeroBg hidden md:block"
                />
                <div className="flex lg:items-center lg:justify-start justify-center mr-4">
                  <Link
                    href="/waiting-list"
                    prefetch={false}
                    className="text-17 flex items-center bg-primary text-white py-3 px-8 rounded-lg w-full md:w-48 my-2 border border-primary hover:text-primary hover:bg-transparent"
                  >
                    Get Early Access
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center my-7">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    width="14"
                    height="14"
                    className="text-white"
                  />
                </div>
                <p className="ml-4 text-17 text-muted dark:text-white dark:text-opacity-50">
                  Risk-free NSE simulated environment, zero deposit required.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...bottomAnimation} className="mt-12 lg:px-20 px-4 pb-16">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl dark:bg-darkmode border border-gray-100 dark:border-gray-800">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Play Store Overall Summary */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 pb-8 lg:pb-0 lg:pr-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="logos:google-play-icon" className="w-8 h-8" />
                    <span className="font-bold text-lg dark:text-white">Google Play Store</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-midnight_text dark:text-white">4.4</span>
                    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">/5</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {renderStars(4.4)}
                  </div>
                  <p className="text-sm text-muted dark:text-gray-400 mb-6">
                    Based on real user reviews on Google Play.
                  </p>
                  
                  {/* Rating distribution visualizer */}
                  <div className="w-full max-w-xs space-y-2">
                    {[
                      { stars: 5, pct: "82%" },
                      { stars: 4, pct: "10%" },
                      { stars: 3, pct: "5%" },
                      { stars: 2, pct: "2%" },
                      { stars: 1, pct: "1%" }
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-3 text-right">{row.stars}</span>
                        <Icon icon="ph:star-fill" className="w-3.5 h-3.5 text-yellow-500" />
                        <div className="grow bg-gray-100 dark:bg-gray-850 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: row.pct }} />
                        </div>
                        <span className="w-8 text-right">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Slider */}
                <div className="lg:col-span-7 flex flex-col justify-between min-h-[250px] px-2 relative">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-1">
                        {renderStars(review[activeReview].rating || 5)}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {review[activeReview].date}
                      </span>
                    </div>

                    <p className="text-lg lg:text-xl font-medium text-midnight_text dark:text-white mb-6 italic leading-relaxed min-h-[80px]">
                      "{review[activeReview].text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {review[activeReview].name[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-midnight_text dark:text-white">
                          {review[activeReview].name}
                        </h4>
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <Icon icon="material-symbols:verified-user" className="w-3.5 h-3.5 text-green-500" />
                          Verified App Store Review
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-midnight_text dark:text-white cursor-pointer"
                        aria-label="Previous Review"
                      >
                        <Icon icon="lucide:chevron-left" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-midnight_text dark:text-white cursor-pointer"
                        aria-label="Next Review"
                      >
                        <Icon icon="lucide:chevron-right" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Search;
