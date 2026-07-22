"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigationLinks } from "./navbarData";
import { MegaMenuTrigger } from "./MegaMenu";

interface DesktopNavigationLinksProps {
  openMenuKey: string | null;
  onOpenChange: (key: string | null) => void;
  panelIds: Record<string, string>;
}

/** Immersive Preview nav: 16px / 600 / gap 26, next to logo. */
const DesktopNavigationLinks = ({
  openMenuKey,
  onOpenChange,
  panelIds,
}: DesktopNavigationLinksProps) => {
  const t = useTranslations();

  return (
    <nav
      className="hidden items-center lg:flex"
      style={{
        gap: 26,
        fontSize: 16,
        fontWeight: 600,
        color: "#F4EFE4",
      }}
    >
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

        return (
          <Link
            key={link.href}
            href={link.href}
            className="navlink"
            onMouseEnter={() => onOpenChange(null)}
            style={{
              padding: "6px 0",
              fontSize: 16,
              fontWeight: 600,
              color: "#F4EFE4",
              whiteSpace: "nowrap",
            }}
          >
            {t(link.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNavigationLinks;
