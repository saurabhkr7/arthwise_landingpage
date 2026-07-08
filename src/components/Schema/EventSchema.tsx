import React from "react";

interface EventSchemaProps {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url: string;
}

const EventSchema: React.FC<EventSchemaProps> = ({
  name,
  description,
  startDate,
  endDate,
  url,
}) => {
  // Use today's date if not provided to make schema valid
  const start = startDate ? new Date(startDate).toISOString() : new Date().toISOString();
  const end = endDate ? new Date(endDate).toISOString() : new Date(Date.now() + 86400000 * 7).toISOString();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": start,
    "endDate": end,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": url
    },
    "image": [
      "https://arthhwise.com/images/hero/hero-image.png"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Arthhwise",
      "url": "https://arthhwise.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default EventSchema;
