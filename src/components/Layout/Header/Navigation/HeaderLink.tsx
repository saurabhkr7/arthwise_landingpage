"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem; light?: boolean }> = ({ item, light = false }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const isActive = path === item.href || (item.submenu && item.submenu.some(sub => path === sub.href));

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-15 xl:text-16 2xl:text-17 flex font-normal items-center whitespace-nowrap hover:text-primary dark:hover:text-primary transition-colors ${
          isActive
            ? "text-primary font-medium"
            : light
              ? "text-white"
              : "text-midnight_text dark:text-white"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.15em"
            height="1.15em"
            className="ml-1"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <div
          className={`absolute py-2 left-0 mt-1 w-64 bg-white dark:bg-darkmode shadow-xl rounded-lg z-50 border border-gray-100 dark:border-gray-800`}
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-4 py-2.5 text-14 transition-colors ${
                path === subItem.href
                  ? "text-white bg-primary font-medium"
                  : "text-midnight_text dark:text-white dark:hover:bg-semidark hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
