import React from "react";

interface ProfilePageSchemaProps {
  name: string;
  description: string;
  followersCount?: number;
  url: string;
}

const ProfilePageSchema: React.FC<ProfilePageSchemaProps> = ({
  name,
  description,
  followersCount = 0,
  url,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": name,
      "description": description,
      "url": url,
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/FollowAction",
        "userInteractionCount": followersCount
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ProfilePageSchema;
