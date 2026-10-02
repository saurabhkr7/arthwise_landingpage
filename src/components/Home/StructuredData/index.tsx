import React from "react";

const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Arthhwise",
    alternateName: ["Arthwise", "Arthhwise App"],
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Stock Market Simulator & Tournament Platform",
    operatingSystem: "Web, Android, iOS",
    url: "https://arthhwise.com",
    downloadUrl: [
        "https://apps.apple.com/in/app/arthhwise-paper-trading-f-o/id6803604616",
        "https://play.google.com/store/apps/details?id=com.arthwise",
    ],
    description:
        "An advanced Indian stock market simulator and virtual paper trading platform. Enables colleges, corporates, and communities to host custom mock trading contests with live NSE, BSE, and F&O option chain data.",
    featureList: [
        "Paper Trading with ₹10,00,000 virtual capital",
        "Virtual trading contests for colleges, corporates, and finance fests",
        "Real-time NSE and BSE stock market simulation",
        "Live Futures and Options (F&O) paper trading with options Greeks and IV",
        "Automated live leaderboards and trade audit logs",
        "7 distinct contest scoring formats with private join codes",
        "Automated PDF merit certificates and Excel master exports",
        "Stock market learning courses and structured glossary",
        "Trading simulator with advanced charting and P&L analytics",
    ],
    screenshot: "https://arthhwise.com/images/hero/hero-image.png",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        description: "Free to download and use for students and organizers",
    },
    targetAudience: {
        "@type": "Audience",
        audienceType: "College students, finance cells, corporate teams, stock traders, E-Summit organizers",
    },
    author: {
        "@type": "Organization",
        name: "Arthhwise",
        url: "https://arthhwise.com",
    },
    inLanguage: "en-IN",
    countryOfOrigin: "IN",
};

const StructuredData = () => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default StructuredData;

