import { getBlogBySlug, getBlogs } from "@/lib/api/blogs";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Blog/Comments";
import ShareButtons from "@/components/Blog/ShareButtons";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/utils/markdown";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);
  
  let postTitle: string | undefined;
  let postDescription: string | undefined;
  let postImageUrl: string | undefined;
  let publishedTime: string | undefined;

  if (response.success && response.data) {
    postTitle = response.data.title;
    postDescription = response.data.excerpt || response.data.title;
    postImageUrl = response.data.image || "/images/hero/hero-image.png";
    publishedTime = response.data.publishedAt || response.data.createdAt;
  } else {
    try {
      const local = getPostBySlug(slug, [
        "title",
        "excerpt",
        "description",
        "coverImage",
        "date",
      ]);
      postTitle = local.title;
      postDescription = local.excerpt || local.description || local.title;
      postImageUrl = local.coverImage || "/images/hero/hero-image.png";
      publishedTime = local.date;
    } catch {
      return {
        title: "Blog Not Found | Arthhwise",
        robots: {
          index: false,
          follow: false,
        },
      };
    }
  }

  const title = `${postTitle} | Arthhwise Blog`;
  const description = postDescription || postTitle || "Blog post";
  const imageUrl = postImageUrl || "/images/hero/hero-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://arthhwise.com/blog/${slug}`,
      type: "article",
      publishedTime,
      images: [
        {
          url: imageUrl,
          alt: postTitle || "Blog post",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1] === "##" ? 2 : 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }
  return headings;
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);

  let post: any;

  if (response.success && response.data) {
    post = { ...response.data, _source: "api" as const };
  } else {
    try {
      const local = getPostBySlug(slug, [
        "title",
        "slug",
        "rawContent",
        "excerpt",
        "description",
        "coverImage",
        "keywords",
        "author",
        "date",
        "readTime",
      ]);

      post = {
        title: local.title,
        slug: local.slug,
        content: local.rawContent,
        excerpt: local.excerpt || local.description || "",
        author: local.author || "Arthhwise Team",
        coverImage: local.coverImage,
        keywords: Array.isArray(local.keywords) ? (local.keywords as string[]) : [],
        tags: Array.isArray(local.keywords) ? (local.keywords as string[]) : [],
        publishedAt: local.date,
        createdAt: local.date,
        updatedAt: local.date,
        readTime: local.readTime,
        _source: "markdown" as const,
      };
    } catch {
      notFound();
    }
  }

  const getImageUrl = () => {
    const rawUrl = post.image || post.coverImage || "";
    if (rawUrl && rawUrl.startsWith("/images/")) {
      return rawUrl;
    }
    const match = rawUrl.match(/blog_(\d+)\.png/);
    if (match) {
      return `/images/blogs/blog_${match[1]}.png`;
    }
    if (post.slug) {
      let hash = 0;
      for (let i = 0; i < post.slug.length; i++) {
        hash = post.slug.charCodeAt(i) + ((hash << 5) - hash);
      }
      const imgIndex = (Math.abs(hash) % 8) + 1;
      return `/images/blogs/blog_${imgIndex}.png`;
    }
    return '/images/blogs/blog_1.png';
  };

  const imageUrl = getImageUrl();
  const author = post.author || 'Arthhwise Team';
  const authorImage = '/images/blogs/silicaman.png';
  const dateStr = post.publishedAt || post.createdAt || post.date || new Date().toISOString();
  
  // Extract Headings for TOC
  const headings = extractHeadings(post.content || "");

  // Fetch Related Posts
  let relatedPosts: any[] = [];
  try {
    const localPosts = (getAllPosts(["title", "slug", "date", "excerpt", "coverImage", "author"]) as any[])
      .filter((p) => p.slug !== slug)
      .map(p => ({ ...p, _source: "markdown" }));
    
    let apiBlogs: any[] = [];
    const apiResponse = await getBlogs(1, 10);
    if (apiResponse.success && apiResponse.data) {
      apiBlogs = apiResponse.data
        .filter((b) => b.slug !== slug)
        .map(b => ({
          title: b.title,
          slug: b.slug,
          date: b.publishedAt || b.createdAt,
          excerpt: b.excerpt,
          coverImage: b.image,
          author: b.author,
          _source: "api"
        }));
    }
    
    relatedPosts = [...localPosts, ...apiBlogs].slice(0, 3);
  } catch (err) {
    console.error("Error building related posts:", err);
  }

  // Define breadcrumbs
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ];

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: [imageUrl],
    datePublished: dateStr,
    dateModified: post.updatedAt || dateStr,
    author: [
      {
        "@type": "Organization",
        name: author,
        url: "https://arthhwise.com",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Arthhwise",
      logo: {
        "@type": "ImageObject",
        url: "https://arthhwise.com/images/logo/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://arthhwise.com/blog/${slug}`,
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative pt-44 z-1 pb-20 dark:bg-dark dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className={`text-base text-midnight_text font-medium dark:text-white w-fit ${post.readTime ? "sm:pr-7 sm:border-r border-solid border-grey/30 dark:border-white/20" : ""}`}>
                  {format(new Date(dateStr), "dd MMM yyyy")}
                </span>
                {post.readTime && (
                  <span className="text-base text-midnight_text font-medium dark:text-white sm:pl-7 pl-0 w-fit">
                    {post.readTime}
                  </span>
                )}
              </div>
              <h2 className="text-midnight_text dark:text-white text-[40px] leading-tight font-bold pt-7">
                {post.title}
              </h2>
            </div>
            <div className="flex items-center md:justify-center justify-start gap-6 col-span-4 pt-4 md:pt-0">
              <Image
                src={authorImage}
                alt={author}
                className="bg-no-repeat bg-contain inline-block rounded-full w-20! h-20!"
                width={40}
                height={40}
                quality={100}
              />
              <div className="">
                <span className="text-[22px] leading-tight font-bold text-midnight_text dark:text-white">
                  {author}
                </span>
                <p className="text-xl text-gray dark:text-white">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="z-20 mb-12 w-full overflow-hidden rounded-2xl md:rounded-3xl border border-grey/10 dark:border-white/5 bg-gray-50/40 dark:bg-dark flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={1200}
                  height={750}
                  quality={100}
                  className="w-full h-auto max-h-[680px] object-contain rounded-xl md:rounded-2xl"
                  priority
                />
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <div className="bg-heroBg dark:bg-search rounded-2xl p-6 mb-8 border border-grey/10 dark:border-white/5">
                      <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-3">
                        Table of Contents
                      </h3>
                      <ul className="space-y-2">
                        {headings.map((heading) => (
                          <li
                            key={heading.id}
                            className={heading.level === 3 ? "pl-4 text-sm" : "text-base font-medium"}
                          >
                            <a
                              href={`#${heading.id}`}
                              className="text-muted dark:text-white/70 hover:text-primary dark:hover:text-primary transition"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="blog-details markdown xl:pr-10 prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-midnight_text dark:text-white" {...props} />,
                        h2: ({ ...props }) => {
                          const text = typeof props.children === 'string' ? props.children : '';
                          const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                          return <h2 id={id} className="text-2xl font-bold mt-6 mb-3 scroll-mt-24 text-midnight_text dark:text-white" {...props} />;
                        },
                        h3: ({ ...props }) => {
                          const text = typeof props.children === 'string' ? props.children : '';
                          const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                          return <h3 id={id} className="text-xl font-bold mt-5 mb-2 scroll-mt-24 text-midnight_text dark:text-white" {...props} />;
                        },
                        h4: ({ ...props }) => {
                          const text = typeof props.children === 'string' ? props.children : '';
                          const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                          return <h4 id={id} className="text-lg font-bold mt-4 mb-2 scroll-mt-24 text-midnight_text dark:text-white" {...props} />;
                        },
                        p: ({ ...props }) => <p className="mb-4 leading-relaxed text-midnight_text dark:text-white/85" {...props} />,
                        strong: ({ ...props }) => <strong className="font-bold text-midnight_text dark:text-white" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-midnight_text dark:text-white/85" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-midnight_text dark:text-white/85" {...props} />,
                        blockquote: ({ ...props }) => <blockquote className="border-l-4 border-primary pl-4 py-1 italic my-4 text-midnight_text dark:text-white bg-primary/5 dark:bg-primary/10 rounded-r-lg" {...props} />,
                        code: ({ inline, ...props }: any) => 
                          inline ? (
                            <code className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary px-2 py-0.5 rounded text-sm font-semibold" {...props} />
                          ) : (
                            <code className="bg-gray-100 dark:bg-gray-800 text-midnight_text dark:text-white p-4 rounded-xl block my-4 overflow-auto border border-grey/10 dark:border-white/10 text-sm" {...props} />
                          ),
                        a: ({ ...props }) => <a className="text-primary hover:underline font-medium" {...props} />,
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1.5 bg-primary text-white font-medium rounded-full text-sm shadow-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  {post._source === "api" && <Comments blogId={post._id} />}
                </div>
                
                <div className="w-full px-4 lg:w-4/12">
                  <div>
                    <div className="-mx-4 mb-8 flex flex-col">
                      <div className="w-full py-12 px-11 bg-white dark:bg-dark_b shadow-lg border-b-2 border-border dark:border-dark_border rounded-t-lg">
                        <h2
                          className="wow fadeInUp relative mb-5 text-2xl dark:text-white text-black sm:text-3xl"
                          data-wow-delay=".1s"
                        >
                          Share
                        </h2>
                        <ShareButtons title={post.title} />
                      </div>
                      <div className="w-full py-12 px-11 bg-white dark:bg-dark_b shadow-lg rounded-b-lg">
                        <p className="text-24 mb-4">Join our Newsletter</p>
                        <input
                          placeholder="Email address"
                          className="p-3 dark:bg-search border border-border dark:border-dark_border rounded-lg mb-2 w-full focus:outline-0 focus:border-primary dark:focus:border-primary"
                        />
                        <button className="bg-primary w-full px-7 border text-base text-white border-primary py-4 rounded-sm hover:bg-transparent hover:text-primary">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-heroBg/30 dark:bg-midnight_text/10 border-t border-grey/10 dark:border-white/5">
          <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const getRelatedImageUrl = () => {
                  const rawUrl = relatedPost.image || relatedPost.coverImage || "";
                  const match = rawUrl.match(/blog_(\d+)\.png/);
                  if (match) return `/images/blogs/blog_${match[1]}.png`;
                  return `/images/blogs/blog_1.png`;
                };

                return (
                  <div
                    key={relatedPost.slug}
                    className="bg-white dark:bg-midnight_text rounded-2xl overflow-hidden shadow-md border border-grey/10 dark:border-white/5 flex flex-col h-full hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={getRelatedImageUrl()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs text-muted dark:text-white/60 mb-2">
                        {relatedPost.date ? format(new Date(relatedPost.date), "dd MMM yyyy") : ""}
                      </span>
                      <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-3 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted dark:text-white/60 line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-sm text-primary hover:underline font-semibold"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
