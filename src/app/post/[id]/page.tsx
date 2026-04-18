import { Metadata, ResolvingMetadata } from "next";
import DeepLinkHandler from "@/components/DeepLink/DeepLinkHandler";
import { fetchContent, getFallbackContent } from "@/lib/apiContent";
import { generateDeepLink } from "@/lib/deeplink";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const content = await fetchContent("post", id);
  const fallback = getFallbackContent("post", id);
  const displayContent = content || fallback;

  const deepLink = generateDeepLink("post", id);
  const canonicalUrl = `https://arthhwise.com/post/${id}`;

  return {
    title: `${displayContent.title} - Arthhwise`,
    description: displayContent.description,
    openGraph: {
      title: displayContent.title,
      description: displayContent.description,
      type: "article",
      url: canonicalUrl,
      images: displayContent.image
        ? [
            {
              url: displayContent.image,
              width: 1200,
              height: 630,
              alt: displayContent.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: displayContent.title,
      description: displayContent.description,
      images: displayContent.image ? [displayContent.image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchContent("post", id);
  
  // Use fallback if API fails
  if (!content) {
    content = getFallbackContent("post", id);
  }

  return (
    <DeepLinkHandler
      type="post"
      id={id}
      content={content}
      isLoading={false}
    />
  );
}
