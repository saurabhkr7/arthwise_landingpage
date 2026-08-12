"use client";

import { useState } from "react";

type Certificate = {
  certificateId: string;
  eventTitle: string;
  userName: string;
  collegeName: string;
  sponsorName: string;
  sponsorLogoUrl?: string;
  certificateType: "PARTICIPATION" | "WINNER";
  rank: number;
  totalParticipants: number;
  returnPercent: number;
  winRate: number;
  tradingScore: number;
  issuedAt: string;
  verificationStatus: "VERIFIED";
};

export default function CertificateView({ certificate }: { certificate: Certificate }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const shareCaption = `🏆 I secured #${certificate.rank} position among ${certificate.totalParticipants} participants in ${certificate.collegeName}'s ${certificate.eventTitle}! Verify: ${shareUrl}`;

  const printCertificate = () => window.print();

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Public verification</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Digital certificate</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyCaption} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900">
              {copied ? "Caption copied" : "Copy share caption"}
            </button>
            <button type="button" onClick={shareOnLinkedIn} className="rounded-full bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#084f96]">
              Share on LinkedIn
            </button>
            <button type="button" onClick={printCertificate} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 dark:bg-white dark:text-slate-900">
              Print / Save PDF
            </button>
          </div>
        </div>

        <article className="certificate-sheet relative overflow-hidden rounded-2xl border-[12px] border-slate-900 bg-white p-4 shadow-2xl dark:border-slate-700 sm:p-8">
          <div className="absolute inset-3 border border-amber-500/70 sm:inset-5" aria-hidden="true" />
          <div className="relative flex min-h-[620px] flex-col items-center justify-between px-5 py-10 text-center sm:px-12 sm:py-14">
            <div className="flex w-full items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                {certificate.sponsorLogoUrl ? (
                  <img src={certificate.sponsorLogoUrl} alt="Event sponsor logo" className="h-14 w-14 object-contain" />
                ) : null}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Issued by</p>
                  <p className="font-semibold text-slate-800">{certificate.sponsorName || "Arthhwise"}</p>
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p className="font-semibold uppercase tracking-[0.16em]">Certificate ID</p>
                <p className="mt-1 break-all font-mono">{certificate.certificateId}</p>
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 text-3xl text-emerald-600" aria-label="Verified certificate">✓</div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-amber-600">Certificate of {certificate.certificateType === "WINNER" ? "achievement" : "participation"}</p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">{certificate.userName}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                has successfully participated in <span className="font-bold text-slate-900">{certificate.eventTitle}</span> organized for <span className="font-bold text-slate-900">{certificate.collegeName}</span>.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-y border-slate-200 py-5 text-center">
                <div><p className="text-2xl font-black text-slate-900">#{certificate.rank}</p><p className="text-xs uppercase tracking-wider text-slate-500">Final rank</p></div>
                <div><p className="text-2xl font-black text-slate-900">{certificate.returnPercent.toFixed(2)}%</p><p className="text-xs uppercase tracking-wider text-slate-500">Return</p></div>
                <div><p className="text-2xl font-black text-slate-900">{certificate.tradingScore.toFixed(2)}</p><p className="text-xs uppercase tracking-wider text-slate-500">Trading score</p></div>
              </div>
            </div>

            <div className="flex w-full items-end justify-between gap-6 text-left text-sm text-slate-500">
              <div><div className="mb-2 h-px w-36 bg-slate-300" /><p>Arthhwise Event Team</p></div>
              <div className="text-right"><div className="mb-2 ml-auto h-px w-36 bg-slate-300" /><p>Issued {new Date(certificate.issuedAt).toLocaleDateString("en-IN")}</p><p className="mt-1 font-semibold text-emerald-600">✓ Verified online</p></div>
            </div>
          </div>
        </article>
        <p className="mt-4 text-center text-xs text-slate-500 print:hidden">This certificate can be verified using its certificate ID. It was issued from the finalized event results.</p>
      </div>

      <style jsx global>{`
        @page { size: A4 landscape; margin: 0; }
        @media print {
          html, body { background: #fff !important; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          header, footer, .print\\:hidden { display: none !important; }
          main { min-height: auto !important; padding: 0 !important; background: #fff !important; }
          .certificate-sheet { min-height: 190mm !important; border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </main>
  );
}
