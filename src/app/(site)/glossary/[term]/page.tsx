import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { glossaryTerms, GlossaryTerm } from "@/lib/glossaryData";
import BreadcrumbSchema from "@/components/Schema/BreadcrumbSchema";
import FAQSchema from "@/components/Schema/FAQSchema";

// Extended explanations for each glossary term to make them content-rich SEO landing pages
const detailedExplanations: Record<
  string,
  {
    title: string;
    introduction: string;
    howItWorks: string;
    whyItMatters: string;
    example: string;
    faqs: Array<{ question: string; answer: string }>;
  }
> = {
  "paper-trading": {
    title: "What is Paper Trading? Complete Guide for Beginners",
    introduction: "Paper trading, also known as virtual trading or demo trading, is the practice of simulated buying and selling of securities without using real money. It allows beginner traders to practice trading stocks, options, or futures in real-time, matching live market movements, with zero financial risk.",
    howItWorks: "Paper trading applications use live or slightly delayed feeds from stock exchanges (like the NSE and BSE in India). Users are given virtual capital (e.g., ₹10,00,000 in Arthhwise) which they can use to place buy and sell orders. The application tracks the entry and exit prices, calculates profits and losses, and logs them in a virtual portfolio, mimicking real broker software.",
    whyItMatters: "For beginners, paper trading is the ultimate safety net. It allows you to learn how to navigate trading interfaces, use different order types (like limit and market orders), study market dynamics, and test out technical indicators without the fear of losing your hard-earned savings. For experienced traders, it provides a laboratory to backtest and refine new trading systems.",
    example: "Suppose you want to trade shares of Reliance Industries (RELIANCE) which is currently trading at ₹2,500. You analyze the chart, believe it will go up to ₹2,550, and place a virtual buy order for 100 shares. In your paper trading account, ₹2,50,000 of virtual cash is converted into 100 virtual Reliance shares. If the price rises to ₹2,550 and you sell, you make a ₹5,000 virtual profit. If it drops to ₹2,480 and you exit, you record a ₹2,000 virtual loss.",
    faqs: [
      {
        question: "Is paper trading exactly like real trading?",
        answer: "While paper trading perfectly replicates market pricing and chart dynamics, it cannot replicate the emotional psychology (fear and greed) of risking real money. Additionally, virtual orders execute instantly, whereas real trades depend on market liquidity.",
      },
      {
        question: "What is the best paper trading app in India?",
        answer: "Arthhwise is one of the leading paper trading applications in India, offering real-time NSE data, virtual capital, structured courses, and a trading game community to compete with others.",
      },
    ],
  },
  "nse": {
    title: "National Stock Exchange (NSE) Explained: Definition & Role",
    introduction: "The National Stock Exchange of India Limited (NSE) is the country's leading stock exchange, located in Mumbai. Established in 1992, it was the first exchange in India to introduce a fully automated, screen-based electronic trading system, making trading accessible to investors nationwide.",
    howItWorks: "The NSE acts as a marketplace where buyers and sellers trade financial instruments like stocks, bonds, and derivatives. It operates electronically, matching orders via automated algorithms based on price and time priority. The flagship index of the NSE is the Nifty 50, which tracks the performance of the top 50 companies listed on the exchange.",
    whyItMatters: "The NSE is the engine of the Indian capital market. It provides transparency, liquidity, and security to investors. By listing on the NSE, companies can raise capital from public investors. It also hosts the largest derivatives trading volume globally, making it a critical hub for global and domestic institutional money.",
    example: "When you place an order to buy shares of Infosys or Tata Motors through your broker, the order is routed to the NSE's computer servers. Within milliseconds, the exchange matches your buy order with someone else's sell order at the same price, and the trade is cleared and settled.",
    faqs: [
      {
        question: "What are NSE trading hours?",
        answer: "The normal trading session on the NSE is from 9:15 AM to 3:30 PM IST, Monday through Friday. A pre-open session runs from 9:00 AM to 9:15 AM.",
      },
      {
        question: "What is the difference between NSE and BSE?",
        answer: "The BSE (Bombay Stock Exchange) is Asia's oldest stock exchange with over 5,000 listed companies, while the NSE is newer, highly automated, and handles a significantly larger trading volume, particularly in futures and options.",
      },
    ],
  },
  "bse": {
    title: "Bombay Stock Exchange (BSE) Explained: Asia's Oldest Exchange",
    introduction: "The Bombay Stock Exchange (BSE), established in 1875 as 'The Native Share & Stock Brokers' Association', is Asia's oldest stock exchange. Located in Mumbai, it has played a historic role in developing India's financial markets and capital formation.",
    howItWorks: "Similar to the NSE, the BSE is a electronic platform for trading equities, debt instruments, derivatives, and mutual funds. It lists over 5,000 companies, which is one of the highest numbers of listings on any exchange globally. Its flagship index is the BSE Sensex (Sensitivity Index), tracking the 30 largest companies.",
    whyItMatters: "The BSE represents the historical foundation of Indian corporate investing. It provides listing services, risk management, market data, and investor education. While NSE dominates derivatives volume, BSE remains highly popular for retail equity investing and mutual fund distributions through its BSE StAR MF platform.",
    example: "If you want to buy shares of a small or medium enterprise (SME) that is not listed on the NSE, you will search and execute the trade on the BSE exchange. The transaction is securely processed and cleared by the BSE's clearing corporation.",
    faqs: [
      {
        question: "Is BSE Sensex the same as Nifty?",
        answer: "No. Sensex is the benchmark index for the BSE, containing 30 stocks. Nifty is the benchmark index for the NSE, containing 50 stocks. Both track the overall health of the Indian stock market.",
      },
    ],
  },
  "nifty-50": {
    title: "Nifty 50 Index: What is it and How is it Calculated?",
    introduction: "The Nifty 50 is the benchmark index of the National Stock Exchange (NSE). It represents the weighted average of 50 of the largest and most liquid Indian corporate stocks listed on the exchange, spanning multiple sectors of the economy.",
    howItWorks: "The Nifty 50 is calculated using a free-float market capitalization weighted method. This means companies with higher market cap (excluding shares held by promoters/governments) have a higher weight in the index. Sector composition is reviewed semi-annually to ensure it reflects current economic trends.",
    whyItMatters: "The Nifty 50 is widely considered the barometer of the Indian economy. When financial news reports that the 'Indian stock market is up', they are usually referring to the Nifty 50 index rising. It is also used as a benchmark for mutual funds, index funds, ETFs, and is the basis for highly traded index futures and options contracts.",
    example: "If Nifty 50 moves from 22,000 to 22,200, it means that on average, the stock prices of the 50 largest companies in India (like HDFC Bank, Reliance, ICICI Bank, TCS) have increased. If you buy a Nifty Index ETF, your investment will grow in direct proportion to this index movement.",
    faqs: [
      {
        question: "How can I invest in Nifty 50?",
        answer: "You cannot buy the index itself. Instead, you can invest in Nifty 50 Index Mutual Funds, Nifty ETFs (Exchange Traded Funds), or trade Nifty Futures and Options contracts.",
      },
    ],
  },
  "sensex": {
    title: "BSE Sensex Index: Definition, Meaning & Calculation",
    introduction: "The BSE Sensex (Sensitivity Index) is the benchmark index of the Bombay Stock Exchange (BSE). Composed of 30 of the largest, most actively traded stocks representing key industrial sectors, it is India's oldest and most widely tracked market index.",
    howItWorks: "Like Nifty, the Sensex is calculated using the free-float market capitalization-weighted method. The index base year is 1978-79, with a base value of 100. It is adjusted dynamically to ensure it accurately reflects market capitalization changes and sector representation of India's blue-chip companies.",
    whyItMatters: "For decades, Sensex was the sole measure of Indian stock market health. Its milestones (crossing 10k, 50k, 70k) represent historic markers of Indian economic growth and wealth creation. Index fund managers use it to design passive investment portfolios that match the returns of the top Indian corporate giants.",
    example: "If the Sensex drops by 500 points, it indicates a general sell-off in India's leading 30 companies. If you hold a basket of blue-chip stocks, your portfolio is likely to see a temporary decline in value corresponding to this index move.",
    faqs: [
      {
        question: "Who select stocks for BSE Sensex?",
        answer: "An Index Committee consisting of stock market experts, economists, and exchange officials reviews and selects the 30 component stocks based on market cap, liquidity, trading frequency, and sector representation.",
      },
    ],
  },
  "intraday-trading": {
    title: "Intraday Trading Guide: Definition, Rules & Strategies",
    introduction: "Intraday trading, also known as day trading, involves buying and selling stock or derivative positions within the same trading day. All positions must be squared off (closed out) before the market closes for the day at 3:30 PM.",
    howItWorks: "Intraday traders aim to profit from small, rapid price fluctuations in highly liquid stocks. To amplify returns, brokers offer leverage (margin), allowing traders to buy positions worth up to 5x of their cash balance. Any open positions that are not manually closed by the trader by 3:15 PM are automatically squared off by the broker's system.",
    whyItMatters: "Intraday trading offers the potential to make quick profits without carrying overnight risk (like negative global news affecting stock opening prices the next day). However, it requires intense discipline, deep knowledge of technical charts, and strict risk control because leverage can magnify losses just as quickly as profits.",
    example: "You identify a breakout on Tata Consultancy Services (TCS) at 10:30 AM at ₹4,000. You buy 100 shares using intraday margin (needing only ₹80,000 instead of ₹4,00,000). At 2:00 PM, the price hits ₹4,050. You sell all 100 shares, capturing a profit of ₹50 per share, making a total intraday profit of ₹5,000 (minus brokerage and taxes).",
    faqs: [
      {
        question: "Is intraday trading profitable for beginners?",
        answer: "Statistics show that over 90% of retail active day traders lose money. Beginners should practice intraday trading extensively in a virtual simulator like Arthhwise to develop execution speed and discipline before using real cash.",
      },
      {
        question: "What is the best time for intraday trading in India?",
        answer: "The first hour (9:15 AM to 10:30 AM) and the last hour (2:30 PM to 3:30 PM) are considered the best times due to high volatility and trading volumes.",
      },
    ],
  },
  "delivery-trading": {
    title: "Delivery Trading: Meaning, Demat & Long-Term Investing",
    introduction: "Delivery trading is a stock investing style where you purchase shares and hold them for more than one trading day. These shares are physically delivered to your Demat (dematerialized) account, representing actual fractional ownership of the company.",
    howItWorks: "When you buy shares via delivery, you pay 100% of the trade value (no broker leverage is allowed). The exchange settles the trade on a T+1 basis, meaning the shares are officially transferred to your NSDL or CDSL demat account on the next working day. You can hold these shares for days, months, or decades until you decide to sell.",
    whyItMatters: "Delivery trading is the foundation of wealth creation and long-term investing. As a delivery investor, you are entitled to company benefits like stock dividends, bonus shares, stock splits, and voting rights. It has significantly lower pressure than day trading, making it the safest equity strategy for long-term compounding.",
    example: "You buy 50 shares of HDFC Bank at ₹1,500 for delivery. You pay the full ₹75,000. The next day, the shares are stored in your CDSL demat account. Two years later, the stock rises to ₹2,000. You decide to sell the shares, pocketing a ₹25,000 capital gain plus any dividends paid during those two years.",
    faqs: [
      {
        question: "Are there any charges for delivery trading in India?",
        answer: "Many modern discount brokers offer ₹0 brokerage on delivery trades. However, government charges like STT (Securities Transaction Tax), GST, and SEBI turnover fees still apply to all delivery transactions.",
      },
    ],
  },
  "futures-and-options": {
    title: "Futures & Options (F&O) Explained: Derivatives Guide",
    introduction: "Futures and Options (F&O) are derivative financial contracts whose values are derived from an underlying asset, such as individual stocks, indices (Nifty, Bank Nifty), or commodities. They allow traders to speculate on price directions or hedge existing portfolios.",
    howItWorks: "A Future is a binding contract to buy or sell an asset at a predetermined price on a future date. An Option gives the buyer the right (but not the obligation) to buy (Call Option) or sell (Put Option) an asset at a set price within a specific timeframe, in exchange for a fee called 'premium'. F&O contracts are traded in standardized lot sizes.",
    whyItMatters: "F&O is highly popular among active traders because it offers leverage (you can trade large positions with a small margin deposit) and allows you to profit from falling markets by short-selling or buying Put options. However, due to leverage and contract expiration, F&O carries extremely high risk.",
    example: "You believe Nifty (currently at 22,000) will go up this week. Instead of buying individual stocks, you buy a Nifty Call Option with a strike price of 22,100 for a premium of ₹100. Since the lot size is 50, you pay ₹5,000 premium. If Nifty rises to 22,300 before expiration, the premium value increases significantly, allowing you to sell the contract for a profit.",
    faqs: [
      {
        question: "Why does SEBI warn about F&O trading?",
        answer: "SEBI research shows that 9 out of 10 retail traders in the equity F&O segment incur losses, with average losses exceeding ₹50,000 per year. It requires advanced risk management.",
      },
      {
        question: "Can I practice F&O trading on Arthhwise?",
        answer: "Arthhwise focuses primarily on stock and index paper trading, helping you build the market directional skills needed before venturing into complex derivatives.",
      },
    ],
  },
  "technical-analysis": {
    title: "Technical Analysis Guide: Charts, Indicators & Patterns",
    introduction: "Technical analysis is a trading discipline used to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, primarily historical price movements and volume data.",
    howItWorks: "Unlike fundamental analysts who look at financial statements, technical analysts believe that all market fundamentals are already reflected in price charts. They use tools like chart patterns (e.g., Head and Shoulders, Double Bottoms), candlestick analysis, and mathematical indicators (like Moving Averages, RSI, MACD) to predict future price directions.",
    whyItMatters: "Technical analysis tells you 'when' to enter or exit a trade. It helps identify trends, momentum, and reversal points. It provides objective entry points, profit targets, and stop-loss levels, taking emotional guesswork out of active trading decisions.",
    example: "You open the chart of Reliance Industries and notice that the stock is consistently making higher highs and higher lows (an uptrend). The RSI indicator shows 50 (neutral momentum), and the price is bouncing off its 20-day Simple Moving Average. You buy the stock, anticipating the trend continuation, using the moving average level as your stop loss.",
    faqs: [
      {
        question: "Does technical analysis work 100% of the time?",
        answer: "No. Technical analysis is about probabilities, not certainties. Successful traders use technical analysis combined with strict risk management to ensure that their winning trades are larger than their losing trades.",
      },
    ],
  },
  "fundamental-analysis": {
    title: "Fundamental Analysis: Evaluating Stocks for Long-Term Value",
    introduction: "Fundamental analysis is a method of evaluating a security to measure its intrinsic value by examining related economic, financial, and other qualitative and quantitative factors. It answers the question: Is this stock cheap or expensive?",
    howItWorks: "Fundamental analysts study everything that can affect the security's value, from macroeconomic factors (like interest rates and GDP growth) to company-specific metrics. They study balance sheets, profit & loss statements, cash flow statements, competitive advantages (moat), management quality, and financial ratios like P/E (Price-to-Earnings), P/B, and Debt-to-Equity.",
    whyItMatters: "Fundamental analysis is the cornerstone of long-term investing. It helps investors identify high-quality, profitable businesses that are trading below their true value. By understanding a company's financial health, investors can build conviction to hold stocks through market volatility.",
    example: "You study Infosys and find that its revenue has grown by 15% annually, it has zero debt, a high return on equity (ROE of 30%), and the P/E ratio is lower than its historical average and its competitors. Based on this, you conclude that the stock is undervalued and buy it for a long-term investment.",
    faqs: [
      {
        question: "Which is better: technical or fundamental analysis?",
        answer: "Both have their place. Fundamental analysis is best for deciding 'what' stock to buy for long-term investments. Technical analysis is best for deciding 'when' to buy or sell for short-term trades. Many investors combine both styles.",
      },
    ],
  },
  "support-and-resistance": {
    title: "Support & Resistance levels: How to Find and Trade Them",
    introduction: "Support and resistance are key horizontal price levels on a chart where the price of a stock tends to stop, reverse, or pause due to changes in buying and selling pressure.",
    howItWorks: "Support is the 'floor' where buying interest is strong enough to overcome selling pressure, causing a falling price to pause and bounce back up. Resistance is the 'ceiling' where selling interest is strong enough to overcome buying pressure, causing a rising price to stop and turn downward. These levels are formed by previous price highs and lows.",
    whyItMatters: "These levels are the building blocks of chart analysis. They show where market participants have previously shown consensus on value. Knowing support and resistance levels helps traders identify high-probability entry points (buying near support), target exits (selling near resistance), and place logical stop-losses (just below support).",
    example: "If Nifty consistently drops down to 21,500, stops falling, and bounces back up, 21,500 is considered a strong Support level. If Nifty rises to 22,200 but repeatedly faces selling pressure and turns down, 22,200 is a Resistance level. A breakout happens when the price strongly breaches the resistance level, which then often turns into new support.",
    faqs: [
      {
        question: "How do you draw support and resistance lines?",
        answer: "Look at your chart and connect the major swing lows with a horizontal line to draw support. Connect the major swing highs with another horizontal line to draw resistance. Look for levels that have been tested multiple times.",
      },
    ],
  },
  "stop-loss": {
    title: "What is a Stop Loss? How to Protect Your Trading Capital",
    introduction: "A stop loss is an automated order placed with a stockbroker to close a trading position once the stock price reaches a specific limit. It is designed to restrict a trader's downside risk on a position.",
    howItWorks: "When you enter a trade, you define a price level where your trade thesis is proven wrong. You place a stop-loss order at that price. If the stock moves against you and hits that trigger price, the broker automatically executes a market or limit order to close your position, preventing further losses.",
    whyItMatters: "Stop loss is the single most important rule of trading survival. It ensures that a single bad trade does not wipe out your entire trading account. It removes emotional decision-making during fast market drops, forcing you to accept small losses so you can live to trade another day.",
    example: "You buy 100 shares of SBI at ₹700, hoping it will rise to ₹740. However, to protect yourself, you place a stop-loss order at ₹685. This means your maximum risk on the trade is ₹15 per share (₹1,500 total). If bad news strikes and the stock drops to ₹650, your position is automatically closed at ₹685, saving you from a much larger loss.",
    faqs: [
      {
        question: "Where should I place my stop loss?",
        answer: "A stop loss should be placed below key support levels (for buy positions) or above key resistance levels (for sell positions). You can also use technical indicators like Average True Range (ATR) or moving averages to place them.",
      },
    ],
  },
  "target-price": {
    title: "Target Price: Definition, Estimation & Exit Planning",
    introduction: "A target price is the projected future price level of a stock or financial instrument. In active trading, it represents the exit point where a trader plans to sell their position to lock in profits.",
    howItWorks: "Traders and research analysts estimate target prices based on technical chart patterns (like measured moves of breakouts), historical resistance levels, or fundamental valuations (like discounted cash flows or forward earnings multiples). Once the price hits the target, a profit-taking order is triggered.",
    whyItMatters: "Trading without a target price is like sailing without a destination. A defined target price allows you to calculate your Risk-to-Reward ratio (e.g., risking ₹10 to make ₹30) before entering a trade. It prevents greed from keeping you in a trade too long, ensuring you book profits before the market reverses.",
    example: "You buy Reliance at ₹2,500. Based on previous chart peaks, you identify a major resistance level at ₹2,600 and set it as your target price. Simultaneously, you set a stop loss at ₹2,450. Your risk is ₹50 and reward target is ₹100, representing a healthy 1:2 risk-to-reward ratio.",
    faqs: [
      {
        question: "Should I exit a stock immediately when it hits the target price?",
        answer: "You can exit completely, book partial profits (e.g., sell 50% of your shares), or use a trailing stop loss to lock in profits while letting the remaining position run if the trend is exceptionally strong.",
      },
    ],
  },
  "candlestick-chart": {
    title: "Candlestick Charts: How to Read Patterns & Price Action",
    introduction: "A candlestick chart is a type of financial chart used to track price movements of securities. Originating in Japan for rice trading, it displays the high, low, open, and close prices for a specific time period in a highly visual manner.",
    howItWorks: "Each 'candle' consists of a solid body and thin lines called shadows or wicks. A green (bullish) candle means the closing price was higher than the opening price. A red (bearish) candle means the close was lower than the open. The wicks represent the highest and lowest prices reached during that time period.",
    whyItMatters: "Candlestick charts are preferred by almost all active traders because they display market psychology in real-time. Single candles (like Hammer, Shooting Star) and multi-candle patterns (like Bullish Engulfing, Morning Star) signal buyers' and sellers' momentum and can predict trend reversals or continuations.",
    example: "You are monitoring Nifty on a 15-minute chart during a downtrend. Suddenly, the price hits a support line and forms a 'Hammer' candlestick (a small body at the top with a very long lower wick, indicating sellers tried to push the price down but buyers pushed it back up before the close). Recognizing this bullish reversal pattern, you prepare to place a buy order.",
    faqs: [
      {
        question: "What is the difference between line charts and candlestick charts?",
        answer: "Line charts connect only the closing prices, hiding the high, low, and open volatility. Candlestick charts display all four price data points, giving a much deeper insight into intraday price battles.",
      },
    ],
  },
  "risk-management": {
    title: "Risk Management in Trading: The Secret to Long-Term Survival",
    introduction: "Risk management is the systematic process of identifying, analyzing, and mitigating capital risks in trading. It is the single most critical factor that distinguishes professional traders from gamblers.",
    howItWorks: "Risk management involves setting clear rules before you trade: deciding your maximum risk per trade (e.g., 1% of capital), using stop-losses on every trade, determining optimal position sizes, and maintaining a positive risk-to-reward ratio (at least 1:2) so your winners cover your losers.",
    whyItMatters: "No trading strategy wins 100% of the time. Without risk management, a string of consecutive losses (which happens to every trader eventually) can wipe out your entire capital. Proper risk control guarantees that you survive drawdown phases and stay profitable over the long run.",
    example: "You have a trading account of ₹1,00,000. Your risk management rule is to never risk more than 1% (₹1,000) on a single trade. If you want to buy a stock at ₹100 with a stop loss at ₹95 (risking ₹5 per share), your position size limit is 200 shares (200 * ₹5 = ₹1,000 risk), rather than buying as many shares as your margin allows.",
    faqs: [
      {
        question: "What is the 1% rule in trading?",
        answer: "The 1% rule dictates that you should never risk more than 1% of your total trading account balance on any single trade. If you have ₹50,000, your maximum risk per trade should be ₹500.",
      },
    ],
  },
};

type Props = {
  params: Promise<{ term: string }>;
};

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({
    term: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const glossaryTerm = glossaryTerms.find((t) => t.slug === term);

  if (!glossaryTerm) {
    return {
      title: "Term Not Found | Trading Glossary",
      robots: { index: false, follow: false },
    };
  }

  const detail = detailedExplanations[term];
  const title = detail?.title || `${glossaryTerm.term} Definition - Trading Dictionary`;
  const description = glossaryTerm.definition;

  return {
    title: `${title} | Arthhwise`,
    description,
    alternates: {
      canonical: `/glossary/${term}`,
    },
    openGraph: {
      title: `${title} | Arthhwise`,
      description,
      url: `https://arthhwise.com/glossary/${term}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${title} | Arthhwise`,
      description,
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const glossaryTerm = glossaryTerms.find((t) => t.slug === term);

  if (!glossaryTerm) {
    notFound();
  }

  const detail = detailedExplanations[term];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Glossary", href: "/glossary" },
    { name: glossaryTerm.term, href: `/glossary/${term}` },
  ];

  // DefinedTerm JSON-LD Schema
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: glossaryTerm.term,
    description: glossaryTerm.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Arthhwise Trading Dictionary",
      url: "https://arthhwise.com/glossary",
    },
  };

  // Find related terms from same category
  const relatedTerms = glossaryTerms
    .filter((t) => t.slug !== term && t.category === glossaryTerm.category)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
      />
      {detail && <FAQSchema faqs={detail.faqs} />}

      <section className="relative pt-44 z-1 pb-12 dark:bg-dark dark:bg-darkmode">
        <div className="w-full h-full absolute -z-1 bg-heroBg rounded-b-[100px] -left-1/4 top-0 dark:bg-search"></div>
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6 font-semibold"
          >
            &larr; Back to Trading Dictionary
          </Link>
          <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold mb-4">
            {glossaryTerm.category} Glossary
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-midnight_text dark:text-white mb-6">
            {glossaryTerm.term}
          </h1>
          <div className="bg-white dark:bg-midnight_text rounded-3xl p-8 border border-grey/10 dark:border-white/5 shadow-md max-w-4xl">
            <h2 className="text-lg font-bold text-primary mb-2">Definition</h2>
            <p className="text-lg text-midnight_text dark:text-white font-medium leading-relaxed">
              {glossaryTerm.definition}
            </p>
          </div>
        </div>
      </section>

      {detail && (
        <section className="py-12 dark:bg-darkmode">
          <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Detailed Explanations */}
              <div className="lg:col-span-2 space-y-10">
                <div className="bg-white dark:bg-midnight_text rounded-3xl p-8 border border-grey/10 dark:border-white/5 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                      Understanding {glossaryTerm.term}
                    </h2>
                    <p className="text-muted dark:text-white/70 leading-relaxed">
                      {detail.introduction}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                      How It Works
                    </h3>
                    <p className="text-muted dark:text-white/70 leading-relaxed">
                      {detail.howItWorks}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-2">
                      Why It Matters for Traders
                    </h3>
                    <p className="text-muted dark:text-white/70 leading-relaxed">
                      {detail.whyItMatters}
                    </p>
                  </div>

                  {detail.example && (
                    <div className="bg-heroBg dark:bg-search rounded-2xl p-6 border-l-4 border-primary">
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                        Real-World Example
                      </h4>
                      <p className="text-sm text-midnight_text dark:text-white/80 leading-relaxed">
                        {detail.example}
                      </p>
                    </div>
                  )}
                </div>

                {/* FAQ section */}
                <div>
                  <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
                    Frequently Asked Questions about {glossaryTerm.term}
                  </h3>
                  <div className="space-y-4">
                    {detail.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-midnight_text rounded-2xl p-6 border border-grey/10 dark:border-white/5 shadow-sm"
                      >
                        <h4 className="font-bold text-midnight_text dark:text-white mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-muted dark:text-white/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar CTA & Related terms */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-primary text-white rounded-3xl p-8 shadow-lg text-center space-y-6">
                  <h3 className="text-xl font-bold">
                    Want to try paper trading risk-free?
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Practice trading stocks with live NSE/BSE market prices and ₹10,00,000 in virtual capital on Arthhwise.
                  </p>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.arthwise"
                    target="_blank"
                    className="block w-full bg-white text-primary py-3.5 rounded-xl font-bold hover:bg-opacity-95 transition active:scale-[0.98]"
                  >
                    Download Free Android App
                  </Link>
                </div>

                {relatedTerms.length > 0 && (
                  <div className="bg-white dark:bg-midnight_text rounded-3xl p-6 border border-grey/10 dark:border-white/5 shadow-sm">
                    <h3 className="text-base font-bold text-midnight_text dark:text-white mb-4">
                      Related Terms
                    </h3>
                    <ul className="space-y-3">
                      {relatedTerms.map((t) => (
                        <li key={t.slug}>
                          <Link
                            href={`/glossary/${t.slug}`}
                            className="text-sm text-primary hover:underline font-semibold block"
                          >
                            {t.term} &rarr;
                          </Link>
                          <p className="text-xs text-muted dark:text-white/50 line-clamp-1 mt-0.5">
                            {t.definition}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
