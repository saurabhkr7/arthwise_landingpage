import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Features | Arthhwise",
  description: "Detailed documentation and guides on how to use Arthhwise's paper trading features and tools.",
  alternates: {
    canonical: "/documentation",
  },
};

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  );
}
