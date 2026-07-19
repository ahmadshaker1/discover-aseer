"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DesktopNavigationLinks from "./DesktopNavigationLinks";
import DesktopActionLinks from "./DesktopActionLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import { MegaMenuPanel } from "./MegaMenu";
import { getNavbarMegaMenu, navigationLinks } from "./navbarData";

const Navbar = () => {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const baseId = useId();

  const dropdownLinks = useMemo(
    () => navigationLinks.filter((link) => link.isDropdown),
    [],
  );

  const panelIds = useMemo(() => {
    return Object.fromEntries(
      dropdownLinks.map((link, index) => [
        link.labelKey,
        `${baseId}-mega-${index}`,
      ]),
    ) as Record<string, string>;
  }, [baseId, dropdownLinks]);

  useEffect(() => {
    if (!openMenuKey) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenuKey(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenuKey]);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setOpenMenuKey(null)}
      >
        <nav className="relative w-full bg-linear-to-r from-[#191919]/40 via-[#2a1a3d]/40 to-[#1a2a1a]/40 backdrop-blur-md">
          <div className="mx-auto flex h-20 w-full max-w-screen-2xl flex-row items-center justify-between gap-4 px-4 sm:px-6 md:h-24 md:px-12 lg:px-24 xl:px-48">
            {/* Start (AR: right / EN: left): logo + text links */}
            <div className="flex min-w-0 flex-row items-center gap-4 md:gap-6 xl:gap-8">
              <Link
                href="/"
                aria-label={t("common.home")}
                onMouseEnter={() => setOpenMenuKey(null)}
                className="inline-flex shrink-0 rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Image
                  src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                  alt=""
                  width={120}
                  height={55}
                />
              </Link>
              <DesktopNavigationLinks
                openMenuKey={openMenuKey}
                onOpenChange={setOpenMenuKey}
                panelIds={panelIds}
              />
              <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
            </div>

            {/* End (AR: left / EN: right): language, booklets, theme */}
            <div
              className="flex flex-row items-center justify-end gap-3"
              onMouseEnter={() => setOpenMenuKey(null)}
            >
              <DesktopActionLinks />
            </div>
          </div>

          <div className="hidden lg:block">
            {dropdownLinks.map((link) => {
              const menu = getNavbarMegaMenu(link.labelKey);
              if (!menu) return null;
              return (
                <MegaMenuPanel
                  key={link.labelKey}
                  label={t(link.labelKey)}
                  links={menu.links}
                  defaultImage={menu.defaultImage}
                  panelId={panelIds[link.labelKey] ?? link.labelKey}
                  isOpen={openMenuKey === link.labelKey}
                  onNavigate={() => setOpenMenuKey(null)}
                />
              );
            })}
          </div>
        </nav>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
