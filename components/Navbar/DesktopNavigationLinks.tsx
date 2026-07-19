"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigationLinks } from "./navbarData";
import { MegaMenuTrigger } from "./MegaMenu";
import { LocationPinIcon } from "./Icons";

interface DesktopNavigationLinksProps {
  openMenuKey: string | null;
  onOpenChange: (key: string | null) => void;
  panelIds: Record<string, string>;
}

const DesktopNavigationLinks = ({
  openMenuKey,
  onOpenChange,
  panelIds,
}: DesktopNavigationLinksProps) => {
  const t = useTranslations();

  return (
    <div className="hidden lg:flex flex-row items-center gap-6 xl:gap-8">
      {navigationLinks.map((link) => {
        if (link.isDropdown) {
          return (
            <MegaMenuTrigger
              key={link.labelKey}
              menuKey={link.labelKey}
              label={t(link.labelKey)}
              openMenuKey={openMenuKey}
              onOpenChange={onOpenChange}
              panelId={panelIds[link.labelKey] ?? link.labelKey}
            />
          );
        }

        if ("isMap" in link && link.isMap) {
          return (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => onOpenChange(null)}
              className="inline-flex items-center gap-2 text-base font-medium whitespace-nowrap text-white transition-opacity hover:opacity-80"
            >
              <LocationPinIcon />
              <span>{t(link.labelKey)}</span>
            </Link>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => onOpenChange(null)}
            className="text-base font-medium whitespace-nowrap text-white transition-opacity hover:opacity-80"
          >
            {t(link.labelKey)}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNavigationLinks;
