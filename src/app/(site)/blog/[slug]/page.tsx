'use client';

import { getBlogBySlug } from "@/lib/api/blogs";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Blog/Comments";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function Post({ params }: Props) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogBySlug(slug);
        
        if (response.success && response.data) {
          setPost(response.data);
        } else {
          setError(response.error || 'Failed to load blog');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <section className="relative pt-44 z-1 pb-20 dark:bg-dark dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="relative pt-44 z-1 pb-20 dark:bg-dark dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading blog: {error || 'Not found'}</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const getImageUrl = () => {
    const rawUrl = post.image || post.coverImage || "";
    const match = rawUrl.match(/blog_(\d+)\.png/);
    if (match) {
      return `/images/blogs/blog_${match[1]}.png`;
    }
    // For single post, we can't easily get index, so we use a hash of the slug
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
  const author = post.authorName || (post.author && typeof post.author === 'object' ? post.author.name : 'Arthhwise Team');
  const authorImage = (post.author && typeof post.author === 'object' && post.author.avatar) || '/images/blogs/silicaman.png';
  const dateStr = post.publishedAt || post.date || new Date().toISOString();

  return (
    <>
      <section className="relative pt-44 z-1 pb-20 dark:bg-dark dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row">
                <span className="text-base text-midnight_text font-medium dark:text-white pr-7 border-r border-solid border-grey dark:border-white w-fit">
                  {format(new Date(dateStr), "dd MMM yyyy")}
                </span>
                <span className="text-base text-midnight_text font-medium dark:text-white sm:pl-7 pl-0 w-fit">
                  {post.views || 0} Views
                </span>
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
              <div className="z-20 mb-16 h-150 overflow-hidden rounded-sm md:h-45">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={1170}
                  height={766}
                  quality={100}
                  className="h-full w-full object-cover object-center rounded-3xl"
                />
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details markdown xl:pr-10 prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
                        code: ({ node, inline, ...props }: any) => 
                          inline ? (
                            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
                          ) : (
                            <code className="bg-gray-200 dark:bg-gray-800 p-4 rounded block my-4 overflow-auto" {...props} />
                          ),
                        a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
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
                            className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  <Comments blogId={post._id} />
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
                        <div className="flex gap-4 flex-col">
                          <Link
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#526fa3] py-4 px-6 text-20 rounded-lg flex items-center text-white hover:opacity-80"
                          >
                            <svg
                              className="svg-inline--fa fa-facebook-f me-3"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fab"
                              data-icon="facebook-f"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                              width="12.5px"
                              height="20px"
                            >
                              <path
                                fill="white"
                                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                              />
                            </svg>
                            Facebook
                          </Link>
                          <Link
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${post.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#46C4FF] py-4 px-6 text-20 rounded-lg flex items-center text-white hover:opacity-80"
                          >
                            <svg
                              className="svg-inline--fa fa-twitter me-3"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fab"
                              data-icon="twitter"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              height="21.5px"
                              width="25px"
                            >
                              <path
                                fill="currentColor"
                                d="M459.4 151.7c.325 4.548.325 9.097.325 13.745 0 140.966-107.416 303.213-303.213 303.213-60.452 0-116.426-17.781-163.725-48.265 8.447.974 16.568 1.299 25.34 1.299 50.236 0 96.56-17.206 133.26-46.258-46.832-.975-86.185-31.188-99.675-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.828-9.797-85.417-52.628-85.417-103.766v-1.299c14.33 7.92 30.748 12.67 48.364 13.32-28.264-18.843-46.832-51.014-46.832-87.391 0-19.492 5.197-37.36 14.33-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.794-2.599-15.91-2.599-24.029 0-57.502 46.833-104.335 104.334-104.335 30.137 0 57.502 12.67 76.67 33.137 23.715-4.548 46.182-13.32 66.599-25.34-7.793 24.366-24.366 44.833-46.182 57.502 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                              />
                            </svg>
                            Twitter
                          </Link>
                          <Link
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3C86AD] py-4 px-6 flex items-center text-20 rounded-lg text-white hover:opacity-80"
                          >
                            <svg
                              className="svg-inline--fa fa-linkedin-in me-3"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fab"
                              data-icon="linkedin-in"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              width="21.5px"
                              height="25px"
                            >
                              <path
                                fill="currentColor"
                                d="M100.28 448H7.4V148.9h92.78zM53.79 108.1C24.09 108.1 0 83.79 0 54.14 0 24.37 24.09 0 53.79 0 83.3 0 107.6 24.37 107.6 54.14c.1 29.64-24.2 53.96-53.81 53.96zM447.4 448h-92.68V302.4c0-34.7-.7-79.29-48.32-79.29-48.32 0-55.7 37.72-55.7 76.79V448H157.3V148.9h88.94v40.8h1.28c12.4-23.41 42.62-48.32 87.76-48.32 93.9 0 111.18 61.81 111.18 142.3V448z"
                              />
                            </svg>
                            LinkedIn
                          </Link>
                        </div>
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
    </>
  );
}
