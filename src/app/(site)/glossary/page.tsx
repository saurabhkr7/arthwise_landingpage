import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Trading Dictionary & Financial Glossary | Arthhwise",
  description:
    "Learn the language of stock markets. Access our comprehensive trading dictionary for key financial terms, stock market concepts, and investing definitions.",
  alternates: {
    canonical: "/glossary",
  },
};

import { glossaryTerms, GlossaryTerm } from "@/lib/glossaryData";

export default function GlossaryIndexPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Glossary", href: "/glossary" },
  ];

  // Group terms by first letter
  const alphabetGroups: Record<string, GlossaryTerm[]> = {};
  glossaryTerms.forEach((term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!alphabetGroups[firstLetter]) {
      alphabetGroups[firstLetter] = [];
    }
    alphabetGroups[firstLetter].push(term);
  });

  const sortedLetters = Object.keys(alphabetGroups).sort();

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative pt-44 z-1 pb-16 dark:bg-dark dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4 text-center">
          <h1 className="text-[40px] leading-tight font-bold text-midnight_text dark:text-white mb-4">
            Trading Dictionary
          </h1>
          <p className="text-lg text-muted dark:text-white/70 max-w-2xl mx-auto">
            Demystifying stock market terminology. Search or browse our glossary to master financial terms, trading jargon, and investment concepts.
          </p>
        </div>
      </section>

      <section className="py-16 dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          {/* Alphabet quick navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 rounded-lg bg-heroBg dark:bg-search flex items-center justify-center font-bold text-midnight_text dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary transition"
              >
                {letter}
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Terms List */}
            <div className="lg:col-span-2 space-y-12">
              {sortedLetters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-28">
                  <h2 className="text-3xl font-extrabold text-primary border-b border-primary/20 pb-2 mb-6">
                    {letter}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {alphabetGroups[letter]
                      .sort((a, b) => a.term.localeCompare(b.term))
                      .map((item) => (
                        <div
                          key={item.slug}
                          className="bg-white dark:bg-midnight_text rounded-2xl p-6 border border-grey/10 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                              {item.category}
                            </span>
                            <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                              <Link href={`/glossary/${item.slug}`} className="hover:text-primary transition">
                                {item.term}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted dark:text-white/60 line-clamp-3">
                              {item.definition}
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-grey/10 dark:border-white/10">
                            <Link
                              href={`/glossary/${item.slug}`}
                              className="text-xs text-primary hover:underline font-bold"
                            >
                              View Explanation &rarr;
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-heroBg dark:bg-midnight_text rounded-2xl p-6 border border-grey/10 dark:border-white/5">
                  <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-3">
                    Practice What You Learn
                  </h3>
                  <p className="text-sm text-muted dark:text-white/60 mb-5">
                    Don&apos;t just read definitions. Practice trading these concepts with ₹10,00,000 virtual capital in our live NSE trading simulator.
                  </p>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.arthwise"
                    target="_blank"
                    className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                    Download Arthhwise Free
                  </Link>
                </div>

                <div className="bg-white dark:bg-darkmode rounded-2xl p-6 border border-grey/10 dark:border-white/5 shadow-sm">
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Trading", "Markets", "Analysis", "Instruments", "Risk"].map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-lg bg-heroBg dark:bg-search text-xs text-muted dark:text-white/70 font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
