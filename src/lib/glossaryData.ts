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
  {
    term: "Option Chain",
    slug: "option-chain",
    definition: "A structured table showing all available options contracts (calls and puts) for a specific underlying stock or index, including strike prices, premiums, open interest, and implied volatility.",
    category: "Instruments",
  },
  {
    term: "Open Interest (OI)",
    slug: "open-interest",
    definition: "The total number of active, outstanding derivative contracts (such as options or futures) that have not yet been closed, exercised, or expired.",
    category: "Analysis",
  },
  {
    term: "Implied Volatility (IV)",
    slug: "implied-volatility",
    definition: "A metric that represents the market's expectation of the future volatility of an underlying stock's price, serving as a primary driver of option premium pricing.",
    category: "Analysis",
  },
  {
    term: "Call Option",
    slug: "call-option",
    definition: "A derivative contract giving the buyer the right, but not the obligation, to buy an underlying asset at a specified strike price before its expiration date.",
    category: "Instruments",
  },
  {
    term: "Put Option",
    slug: "put-option",
    definition: "A derivative contract giving the buyer the right, but not the obligation, to sell an underlying asset at a specified strike price before its expiration date.",
    category: "Instruments",
  },
  {
    term: "Strike Price",
    slug: "strike-price",
    definition: "The pre-determined price at which the buyer of an option can choose to buy (for a call option) or sell (for a put option) the underlying security.",
    category: "Instruments",
  },
  {
    term: "Option Premium",
    slug: "option-premium",
    definition: "The market price paid by the option buyer to the option seller (writer) to acquire the rights of the option contract.",
    category: "Instruments",
  },
  {
    term: "In the Money (ITM)",
    slug: "in-the-money",
    definition: "An option contract that has intrinsic value. For a call, the stock price is above the strike price. For a put, the stock price is below the strike price.",
    category: "Trading",
  },
  {
    term: "Out of the Money (OTM)",
    slug: "out-of-the-money",
    definition: "An option contract that has zero intrinsic value and consists only of time value. For a call, the stock price is below the strike price. For a put, it is above the strike price.",
    category: "Trading",
  },
  {
    term: "At the Money (ATM)",
    slug: "at-the-money",
    definition: "An option contract where the strike price is equal or extremely close to the current market price of the underlying asset.",
    category: "Trading",
  },
];

