import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Learn", href: "/learn" },
  { label: "Glossary", href: "/glossary" },
  {
    label: "Competitions",
    href: "/championships",
    submenu: [
      { label: "National Championships", href: "/stock-market-championship" },
      { label: "College Stock Competitions", href: "/college-stock-market-competition" },
      { label: "Corporate Stock Games", href: "/corporate-stock-market-game" },
      { label: "B-School & MBA Challenges", href: "/mba-stock-market-competition" },
      { label: "Finance Fest Mock Stocks", href: "/finance-fest-stock-market-game" },
      { label: "Hiring Assessment Platform", href: "/trading-assessment-platform" },
      { label: "Live Lobbies & Hall of Fame", href: "/championships" },
    ],
  },
  {
    label: "Host Event",
    href: "/host-event",
    submenu: [
      { label: "Request Event Setup", href: "/host-event" },
      { label: "College Trading Contests", href: "/organize-college-trading-contest" },
      { label: "Corporate Stock Leagues", href: "/corporate-stock-leagues" },
      { label: "School Simulations", href: "/school-stock-market-simulation" },
      { label: "Free Organizer Toolkit", href: "/organizer-toolkit" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  { label: "Contact", href: "/contact" },
];
