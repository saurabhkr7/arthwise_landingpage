import React, { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbLink } from "@/types/breadcrumb";

interface HeroSubProps {
  title: string;
  description: string;
  breadcrumbLinks: BreadcrumbLink[];
}

const HeroSub: FC<HeroSubProps> = ({ title, description, breadcrumbLinks }) => {
  return (
      <section className="text-center bg-cover pt-36 pb-20 relative dark:bg-darkmode overflow-x-hidden">
        <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-midnight_text text-32 md:text-50 relative font-bold dark:text-white ">
              {title}
            </h2>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
          <p className="text-18 text-body dark:text-white/70 text-left max-w-2xl">
            {description}
          </p>
        </div>
      </section>
  );
};

export default HeroSub;
