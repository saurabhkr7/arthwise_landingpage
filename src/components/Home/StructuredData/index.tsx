import React from "react";

const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Arthhwise",
    alternateName: ["Arthwise", "Arthhwise App"],
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Trading Simulator",
    operatingSystem: "Android",
    url: "https://arthhwise.com",
    downloadUrl:
        "https://play.google.com/store/apps/details?id=com.arthwise",
    description:
        "Arthhwise is India's leading paper trading app and stock market learning platform. Practice virtual trading with real NSE data, compete in trading game contests, join a trading community, and master the stock market — risk-free.",
    featureList: [
        "Paper Trading with ₹10,00,000 virtual capital",
        "Real-time NSE & BSE market data",
        "Trading game with competitive leaderboard",
        "Social trading community",
        "Stock market learning courses",
        "Trading simulator with advanced charting",
        "P&L analytics and portfolio tracking",
    ],
    screenshot: "https://arthhwise.com/images/hero/hero-image.png",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        description: "Free to download and use",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "500",
        bestRating: "5",
        worstRating: "1",
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
