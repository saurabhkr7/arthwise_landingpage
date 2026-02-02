"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";

const Spend: FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

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

  const [isModalOpen, setIsVideoOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsVideoOpen(true);
  };

  const closeModal = (): void => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div ref={ref}>
          <motion.div {...TopAnimation} className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white">
              The smartest way to
              <span className="text-primary ml-2">master the Indian market</span>
            </h2>
            <p className="text-17 text-muted dark:text-white dark:text-opacity-70 lg:font-medium mx-1 lg:mx-64 mb-3">
              Arthhwise provides institutional-grade trading simulators and real-time NSE market data to help you learn trading strategies without risking your capital.
            </p>
          </motion.div>
          <motion.div {...bottomAnimation} className="flex justify-center items-center">
            <div className="relative overflow-hidden mt-14">
              <Image
                src="/images/spend/spend.png"
                alt="Interactive paper trading demo showing buy and sell orders"
                width={550}
                height={350}
                className="rounded-lg w-full h-auto"
              />
              <button
                className="text-midnight_text absolute z-1 top-40% md:left-1/2 left-45% rounded-full hover:text-primary py-4 px-3 bg-white"
                onClick={openModal}
              >
                <Icon icon="solar:play-bold" width="24" height="16" />
              </button>
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="bg-white dark:bg-darkmode rounded-lg sm:m-0 m-4">
                    <div className="overlay flex items-center justify-between border-b border-solid border-border dark:border-dark_border p-5  dark:border-darkborder">
                      <h3 className="text-midnight_text dark:text-white">
                        Video
                      </h3>
                      <button
                        onClick={closeModal}
                        className="bg-[url('/images/icon/closed.svg')] bg-no-repeat bg-contain w-5 h-5 inline-block dark:invert"
                      ></button>
                    </div>
                    <iframe
                      height="400"
                      className="p-4 md:w-50 w-full"
                      src="https://www.youtube.com/embed/lfJkuZQfy9I"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Spend;
