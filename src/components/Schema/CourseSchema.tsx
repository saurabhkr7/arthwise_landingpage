import React from "react";

interface CourseSchemaProps {
  name: string;
  description: string;
  lessons: string[];
}

const CourseSchema: React.FC<CourseSchemaProps> = ({ name, description, lessons }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Arthhwise",
      "url": "https://arthhwise.com"
    },
    // If course has lessons, we can map them to CourseInstance or Syllabus outlines
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT2H" // Generic 2 Hours estimate
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default CourseSchema;
