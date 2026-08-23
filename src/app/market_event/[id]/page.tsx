import { Metadata, ResolvingMetadata } from "next";
import ContentPageLayout from "@/components/ContentPage/ContentPageLayout";
import { fetchContent, getFallbackContent, fetchFullContent, getFullFallbackContent } from "@/lib/apiContent";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const content = await fetchContent("market_event", id);
  const fallback = getFallbackContent("market_event", id);
  const displayContent = content || fallback;

  const canonicalUrl = `https://arthhwise.com/market_event/${id}`;

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

export default async function MarketEventPage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchFullContent("market_event", id);
  
  if (!content) {
    content = getFullFallbackContent("market_event", id);
  }

  return (
    <ContentPageLayout
      type="market_event"
      id={id}
      content={content}
    />
  );
}
