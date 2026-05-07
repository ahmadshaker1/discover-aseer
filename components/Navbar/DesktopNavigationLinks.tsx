"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigationLinks } from "./navbarData";
import DiscoverAseerDropdown from "./DiscoverAseerDropdown";

const DesktopNavigationLinks = () => {
  const t = useTranslations();

  return (
    <div className="hidden lg:flex flex-row items-center space-x-8">
      {navigationLinks.map((link) => {
        if (link.isDropdown) {
          return <DiscoverAseerDropdown key={link.labelKey} label={t(link.labelKey)} />;
        }
        return (
          <Link
            key={link.href}
            href={link.href}
            className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {t(link.labelKey)}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNavigationLinks;
