export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: "Trading" | "Markets" | "Analysis" | "Instruments" | "Risk";
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Paper Trading",
    slug: "paper-trading",
    definition: "Simulated trading that allows investors to practice buying and selling securities without risking real money.",
    category: "Trading",
  },
  {
    term: "National Stock Exchange (NSE)",
    slug: "nse",
    definition: "The leading stock exchange in India, located in Mumbai, known for its electronic trading platform and Nifty index.",
    category: "Markets",
  },
  {
    term: "Bombay Stock Exchange (BSE)",
    slug: "bse",
    definition: "Asia's oldest stock exchange, established in 1875, based in Mumbai with the flagship Sensex index.",
    category: "Markets",
  },
  {
    term: "Nifty 50",
    slug: "nifty-50",
    definition: "The benchmark stock index of the NSE, representing the weighted average of 50 of the largest Indian companies.",
    category: "Markets",
  },
  {
    term: "Sensex",
    slug: "sensex",
    definition: "The benchmark index of the BSE, tracking the performance of 30 well-established and financially sound companies.",
    category: "Markets",
  },
  {
    term: "Intraday Trading",
    slug: "intraday-trading",
    definition: "A style of trading where securities are bought and sold within the same trading day to capture short-term price movements.",
    category: "Trading",
  },
  {
    term: "Delivery Trading",
    slug: "delivery-trading",
    definition: "An investing style where bought stocks are held for more than a day, transferred into a demat account for long-term hold.",
    category: "Trading",
  },
  {
    term: "Futures and Options (F&O)",
    slug: "futures-and-options",
    definition: "Derivative financial contracts that derive value from an underlying asset, allowing leverage and hedging strategies.",
    category: "Instruments",
  },
  {
    term: "Technical Analysis",
    slug: "technical-analysis",
    definition: "A trading discipline used to evaluate investments and identify trading opportunities by analyzing statistical trends from trading activity.",
    category: "Analysis",
  },
  {
    term: "Fundamental Analysis",
    slug: "fundamental-analysis",
    definition: "A method of evaluating a security to measure its intrinsic value by examining related economic, financial, and qualitative factors.",
    category: "Analysis",
  },
  {
    term: "Support and Resistance",
    slug: "support-and-resistance",
    definition: "Price levels on a chart where a stock price tends to find buying support (floor) or selling pressure (ceiling).",
    category: "Analysis",
  },
  {
    term: "Stop Loss",
    slug: "stop-loss",
    definition: "An order placed with a broker to buy or sell a security once it reaches a specific price, designed to limit investor loss.",
    category: "Risk",
  },
  {
    term: "Target Price",
    slug: "target-price",
    definition: "The projected price level of a stock as stated by an analyst or trader, representing the exit point of a profitable trade.",
    category: "Trading",
  },
  {
    term: "Candlestick Chart",
    slug: "candlestick-chart",
    definition: "A type of financial chart used to describe price movements of a security, showing open, high, low, and close prices.",
    category: "Analysis",
  },
  {
    term: "Risk Management",
    slug: "risk-management",
    definition: "The process of identifying, analyzing, and accepting or mitigating uncertainty in investment decisions.",
    category: "Risk",
  },
];
