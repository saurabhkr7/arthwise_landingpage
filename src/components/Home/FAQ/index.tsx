"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="dark:bg-darkmode py-16 lg:py-24 border-t border-grey/10 dark:border-white/5">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="md:text-40 sm:text-32 text-28 font-bold text-midnight_text dark:text-white mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-17 text-muted dark:text-white dark:text-opacity-70">
              Everything you need to know about the Arthhwise paper trading app, market data, and platform security.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className="bg-heroBg dark:bg-midnight_text rounded-2xl border border-grey/10 dark:border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 text-left outline-none focus:ring-2 focus:ring-primary/20"
                    aria-expanded={isOpen}
                  >
                    <span className="text-18 font-semibold text-midnight_text dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <Icon
                        icon="solar:alt-arrow-down-linear"
                        className="text-primary"
                        width="18"
                        height="18"
                      />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] border-t border-grey/10 dark:border-white/5" : "max-h-0"
                    } overflow-hidden`}
                  >
                    <p className="p-6 text-16 text-muted dark:text-white dark:text-opacity-70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
