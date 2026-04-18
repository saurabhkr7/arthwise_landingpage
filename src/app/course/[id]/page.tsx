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
  const content = await fetchContent("course", id);
  const fallback = getFallbackContent("course", id);
  const displayContent = content || fallback;

  const deepLink = generateDeepLink("course", id);
  const canonicalUrl = `https://arthhwise.com/course/${id}`;

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

export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchContent("course", id);
  
  if (!content) {
    content = getFallbackContent("course", id);
  }

  return (
    <DeepLinkHandler
      type="course"
      id={id}
      content={content}
      isLoading={false}
    />
  );
}
