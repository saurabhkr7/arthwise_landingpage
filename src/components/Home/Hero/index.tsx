"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 1 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 1 },
  };

  return (
    <section className="relative pt-44 mb-14 bg-cover bg-center dark:bg-darkmode">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-midnight_text"></div>
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-12 items-center">
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider mb-6">
              <Icon icon="solar:cup-star-bold" width="16" height="16" />
              <span>India&apos;s Stock Market Championship &amp; Paper Trading Platform</span>
            </div>
            <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text lg:text-start dark:text-white mb-6 lg:w-full w-3/4 leading-tight">
              Run Professional{" "}
              <span className="bg-border dark:bg-darkHeroBg md:text-50 text-36 rounded-lg lg:text-start text-primary max-w-max">
                Trading Championships
              </span>{" "}
              &amp; Paper Trade Risk-Free
            </h1>
            <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% mb-4">
              Host turnkey stock market competitions for your college fest, corporate team, or investment society with live NSE/BSE data, 7 scoring formats, and instant certificates. Or practice individually with ₹10 Lakh virtual capital.
            </p>
            <div className="flex flex-wrap items-center mt-8 gap-4 sm:gap-6">
              <div>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.arthwise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-16 flex gap-2 items-center bg-primary text-white py-3 px-6 rounded-lg border border-primary hover:text-primary hover:bg-transparent font-bold transition-all shadow-md shadow-primary/20"
                >
                  <Icon icon="logos:google-play-icon" width="18" height="18" />
                  <span>Download on Android</span>
                </Link>
              </div>
              <div>
                <Link
                  href="https://testflight.apple.com/join/5wJveEYm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-16 flex gap-2 items-center bg-white dark:bg-darkHeroBg text-midnight_text dark:text-white py-3 px-6 rounded-lg border border-grey/20 dark:border-white/10 hover:border-primary hover:text-primary font-bold shadow-sm transition-all"
                >
                  <Icon icon="solar:apple-bold" width="20" height="20" />
                  <span>iOS Beta (TestFlight)</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/host-event"
                  className="text-16 flex gap-2 items-center text-primary font-bold hover:underline py-2"
                >
                  <span>Host a Championship</span>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="14"
                    height="14"
                  />
                </Link>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-darkHeroBg p-2 rounded-xl shadow-sm border border-grey/10">
                <Image
                  src="/images/Arthhwise QR code.svg"
                  alt="Scan QR code to download Arthhwise paper trading app on Android or iOS"
                  width={256}
                  height={256}
                  className="rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="lg:col-span-6 col-span-12 pl-20 lg:block hidden"
          >
            <Image
              src="/images/hero/hero-image.png"
              alt="Arthhwise Trading Platform Mockup showing advanced charts and portfolio tracking"
              width={498}
              height={651}
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
