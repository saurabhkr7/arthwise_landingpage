import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Learn", href: "/learn" },
  { label: "Glossary", href: "/glossary" },
  {
    label: "Host Event",
    href: "/host-event",
    submenu: [
      { label: "Request Event Setup", href: "/host-event" },
      { label: "College Trading Contests", href: "/organize-college-trading-contest" },
      { label: "Corporate Stock Leagues", href: "/corporate-stock-leagues" },
      { label: "Free Organizer Toolkit", href: "/organizer-toolkit" },
    ],
  },
  { label: "Championships", href: "/trading-events" },
  {
    label: "Blog",
    href: "/blog",
  },
  { label: "Contact", href: "/contact" },
];
