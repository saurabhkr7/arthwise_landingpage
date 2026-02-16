import { getBlogBySlug } from "@/lib/api/blogs";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Blog/Comments";
import ShareButtons from "@/components/Blog/ShareButtons";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);
  
  if (!response.success || !response.data) {
    return {
      title: "Blog Not Found | Arthhwise",
    };
  }

  const post = response.data;
  const title = `${post.title} | Arthhwise Blog`;
  const description = post.excerpt || post.title;
  const imageUrl = post.image || "/images/hero/hero-image.png";

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
      publishedTime: post.publishedAt || post.createdAt,
      images: [
        {
          url: imageUrl,
          alt: post.title,
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

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);

  if (!response.success || !response.data) {
    return (
      <section className="relative pt-44 z-1 pb-20 dark:bg-dark dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading blog: {response.error || 'Not found'}</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const post = response.data;

  const getImageUrl = () => {
    const rawUrl = post.image || "";
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
  const author = post.author || 'Arthhwise Team';
  const authorImage = '/images/blogs/silicaman.png';
  const dateStr = post.publishedAt || post.createdAt || new Date().toISOString();

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
                        h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                        p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                        blockquote: ({ ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
                        code: ({ inline, ...props }: any) => 
                          inline ? (
                            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
                          ) : (
                            <code className="bg-gray-200 dark:bg-gray-800 p-4 rounded block my-4 overflow-auto" {...props} />
                          ),
                        a: ({ ...props }) => <a className="text-primary hover:underline" {...props} />,
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
    </>
  );
}
