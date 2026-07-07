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
  const content = await fetchContent("daily_quiz", id);
  const fallback = getFallbackContent("daily_quiz", id);
  const displayContent = content || fallback;

  const canonicalUrl = `https://arthhwise.com/daily_quiz/${id}`;

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

export default async function DailyQuizPage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchFullContent("daily_quiz", id);
  
  if (!content) {
    content = getFullFallbackContent("daily_quiz", id);
  }

  return (
    <ContentPageLayout
      type="daily_quiz"
      id={id}
      content={content}
    />
  );
}

