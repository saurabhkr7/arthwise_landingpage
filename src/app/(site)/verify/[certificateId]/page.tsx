import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CertificateView from "./CertificateView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ certificateId: string }> };

const configuredApiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";
const API_BASE = configuredApiBase.replace(/\/+$/, "").endsWith("/api")
  ? configuredApiBase.replace(/\/+$/, "")
  : `${configuredApiBase.replace(/\/+$/, "")}/api`;

async function fetchCertificate(certificateId: string) {
  const response = await fetch(`${API_BASE}/market-event/certificate/verify/${encodeURIComponent(certificateId)}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json?.success ? json.certificate : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certificateId } = await params;
  const certificate = await fetchCertificate(certificateId);
  if (!certificate) {
    return {
      title: "Certificate not found | Arthhwise",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${certificate.userName} — Verified Certificate | Arthhwise`,
    description: `Verified certificate for ${certificate.userName} from ${certificate.eventTitle}.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/verify/${certificate.certificateId}` },
    openGraph: {
      title: `${certificate.userName} — Verified Certificate`,
      description: `Certificate of ${String(certificate.certificateType).toLowerCase()} for ${certificate.eventTitle}.`,
      url: `https://arthhwise.com/verify/${certificate.certificateId}`,
      type: "website",
    },
  };
}

export default async function CertificateVerificationPage({ params }: Props) {
  const { certificateId } = await params;
  const certificate = await fetchCertificate(certificateId);
  if (!certificate) notFound();
  return <CertificateView certificate={certificate} />;
}
