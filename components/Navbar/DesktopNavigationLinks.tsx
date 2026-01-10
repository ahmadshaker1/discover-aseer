"use client";

import Link from "next/link";
import { navigationLinks } from "./navbarData";
import DiscoverAseerDropdown from "./DiscoverAseerDropdown";

const DesktopNavigationLinks = () => {
  return (
    <div className="hidden lg:flex flex-row items-center space-x-8">
      {navigationLinks.map((link) => {
        if (link.isDropdown) {
          return <DiscoverAseerDropdown key={link.href} label={link.label} />;
        }
        return (
          <Link
            key={link.href}
            href={link.href}
            className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNavigationLinks;
