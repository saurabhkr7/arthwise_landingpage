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
  const content = await fetchContent("profile", id);
  const fallback = getFallbackContent("profile", id);
  const displayContent = content || fallback;

  const canonicalUrl = `https://arthhwise.com/profile/${id}`;

  return {
    title: `${displayContent.title} - Arthhwise`,
    description: displayContent.description,
    openGraph: {
      title: displayContent.title,
      description: displayContent.description,
      type: "profile",
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
      card: "summary",
      title: displayContent.title,
      description: displayContent.description,
      images: displayContent.image ? [displayContent.image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchFullContent("profile", id);
  
  if (!content) {
    content = getFullFallbackContent("profile", id);
  }

  return (
    <ContentPageLayout
      type="profile"
      id={id}
      content={content}
    />
  );
}

