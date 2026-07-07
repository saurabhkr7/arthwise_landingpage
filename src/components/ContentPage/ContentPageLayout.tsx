import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FullContent } from "@/lib/apiContent";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import DeepLinkCTA from "./DeepLinkCTA";
import { DeepLinkType } from "@/lib/deeplink";

interface ContentPageLayoutProps {
  type: DeepLinkType;
  id: string;
  content: FullContent;
}

/**
 * Server-rendered content page layout for SEO.
 * Renders real content that Google can crawl + a "Continue in App" CTA.
 * This replaces the old approach where the entire page was just a "Open in App" button.
 */
const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  type,
  id,
  content,
}) => {
  const typeLabels: Record<string, string> = {
    post: "Post",
    contest: "Trading Contest",
    profile: "Trader Profile",
    course: "Trading Course",
    daily_quiz: "Daily Quiz",
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: typeLabels[type] || type, href: `/${type}` },
    { name: content.title, href: `/${type}/${id}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Sticky App CTA Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-midnight_text border-t border-grey/10 dark:border-white/10 shadow-lg px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/logo.png"
              alt="Arthhwise"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <p className="text-sm font-semibold text-midnight_text dark:text-white">
                Arthhwise
              </p>
              <p className="text-xs text-muted dark:text-white/60">
                Open in app for full experience
              </p>
            </div>
          </div>
          <DeepLinkCTA type={type} id={id} />
        </div>
      </div>

      {/* Main Content — fully server-rendered for SEO */}
      <section className="relative pt-36 pb-10 dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[80px] -left-1/4 top-0 dark:bg-midnight_text" />
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-1">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted dark:text-white/60">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-primary transition"
                    >
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-midnight_text dark:text-white font-medium truncate max-w-48">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Category Badge */}
          {content.category && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {content.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4 leading-tight">
            {content.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted dark:text-white/60 mb-8">
            {content.author && (
              <span className="flex items-center gap-1">
                By <strong className="text-midnight_text dark:text-white">{content.author}</strong>
              </span>
            )}
            {content.createdAt && (
              <span>
                {new Date(content.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {content.views !== undefined && content.views > 0 && (
              <span>{content.views} views</span>
            )}
            {content.difficulty && (
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                {content.difficulty}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-muted dark:text-white/70 mb-8 max-w-3xl leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section className="dark:bg-darkmode pb-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image */}
              {content.image && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={content.image}
                    alt={content.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              )}

              {/* Body Text */}
              {content.body && (
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-base text-muted dark:text-white/70 leading-relaxed whitespace-pre-line">
                    {content.body}
                  </p>
                </div>
              )}

              {/* Contest-specific: Dates & Participants */}
              {type === "contest" && (
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {content.startDate && (
                    <div className="bg-heroBg dark:bg-midnight_text rounded-xl p-4">
                      <p className="text-xs text-muted dark:text-white/60 mb-1">Start Date</p>
                      <p className="text-sm font-semibold text-midnight_text dark:text-white">
                        {new Date(content.startDate).toLocaleDateString("en-IN", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                  {content.endDate && (
                    <div className="bg-heroBg dark:bg-midnight_text rounded-xl p-4">
                      <p className="text-xs text-muted dark:text-white/60 mb-1">End Date</p>
                      <p className="text-sm font-semibold text-midnight_text dark:text-white">
                        {new Date(content.endDate).toLocaleDateString("en-IN", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                  {content.participants !== undefined && (
                    <div className="bg-heroBg dark:bg-midnight_text rounded-xl p-4">
                      <p className="text-xs text-muted dark:text-white/60 mb-1">Participants</p>
                      <p className="text-sm font-semibold text-midnight_text dark:text-white">
                        {content.participants} traders
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Course-specific: Curriculum */}
              {type === "course" && content.curriculum && content.curriculum.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-midnight_text dark:text-white mb-4">
                    Course Curriculum
                  </h2>
                  <ol className="space-y-3">
                    {content.curriculum.map((lesson, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 bg-heroBg dark:bg-midnight_text rounded-xl p-4"
                      >
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-midnight_text dark:text-white">
                          {lesson}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Profile-specific: Stats */}
              {type === "profile" && content.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Total Trades", value: content.stats.totalTrades },
                    { label: "Win Rate", value: content.stats.winRate ? `${content.stats.winRate}%` : "N/A" },
                    { label: "Rank", value: content.stats.rank ? `#${content.stats.rank}` : "N/A" },
                    { label: "Followers", value: content.stats.followers },
                    { label: "Following", value: content.stats.following },
                  ]
                    .filter((s) => s.value !== undefined && s.value !== 0 && s.value !== "N/A")
                    .map((stat) => (
                      <div key={stat.label} className="bg-heroBg dark:bg-midnight_text rounded-xl p-4 text-center">
                        <p className="text-xs text-muted dark:text-white/60 mb-1">{stat.label}</p>
                        <p className="text-lg font-bold text-midnight_text dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                </div>
              )}

              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar — Desktop App CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                {/* Download CTA Card */}
                <div className="bg-white dark:bg-midnight_text rounded-2xl shadow-lg border border-grey/10 dark:border-white/5 p-6 mb-6">
                  <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-3">
                    Continue in Arthhwise App
                  </h3>
                  <p className="text-sm text-muted dark:text-white/60 mb-5">
                    Get the full experience with real-time data, interactive features, and more.
                  </p>
                  <DeepLinkCTA type={type} id={id} fullWidth />
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.arthwise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted dark:text-white/50 hover:text-primary transition"
                    >
                      Download on Google Play →
                    </Link>
                  </div>
                </div>

                {/* About Arthhwise Card */}
                <div className="bg-heroBg dark:bg-darkmode rounded-2xl p-6">
                  <h3 className="text-base font-bold text-midnight_text dark:text-white mb-2">
                    About Arthhwise
                  </h3>
                  <p className="text-sm text-muted dark:text-white/60 mb-4">
                    India&apos;s leading paper trading app. Practice with ₹10,00,000 virtual capital
                    and real NSE data — completely free.
                  </p>
                  <Link
                    href="/about"
                    className="text-sm text-primary hover:text-blue-700 font-medium"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default ContentPageLayout;
