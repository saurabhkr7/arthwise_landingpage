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
  const content = await fetchContent("user", id);
  const fallback = getFallbackContent("user", id);
  const displayContent = content || fallback;

  const deepLink = generateDeepLink("user", id);
  const canonicalUrl = `https://arthhwise.com/user/${id}`;

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

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  
  let content = await fetchContent("user", id);
  
  if (!content) {
    content = getFallbackContent("user", id);
  }

  return (
    <DeepLinkHandler
      type="user"
      id={id}
      content={content}
      isLoading={false}
    />
  );
}
