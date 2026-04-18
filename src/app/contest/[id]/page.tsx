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
  const content = await fetchContent("contest", id);
  const fallback = getFallbackContent("contest", id);
  const displayContent = content || fallback;

  const deepLink = generateDeepLink("contest", id);
  const canonicalUrl = `https://arthhwise.com/contest/${id}`;

  return {
    title: `${displayContent.title} - Arthhwise`,
    description: displayContent.description,
    openGraph: {
      title: displayContent.title,
      description: displayContent.description,
      type: "website",
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

export default async function ContestPage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchContent("contest", id);
  
  if (!content) {
    content = getFallbackContent("contest", id);
  }

  return (
    <DeepLinkHandler
      type="contest"
      id={id}
      content={content}
      isLoading={false}
    />
  );
}
