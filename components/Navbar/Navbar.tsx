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
  const isChromeSolid = openMenuKey !== null || mobileMenuOpen;

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
        className="absolute inset-x-0 top-0 z-50"
        onMouseLeave={() => setOpenMenuKey(null)}
      >
        <header
          className="relative w-full"
          style={{
            background: isChromeSolid
              ? "rgba(45,0,80,0.92)"
              : "rgba(28,28,30,0.2)",
            transition: "background .45s ease",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-[26px]"
            style={{ gap: 28 }}
          >
            <div className="flex min-w-0 items-center" style={{ gap: 36 }}>
              <Link
                href="/"
                aria-label={t("common.home")}
                onMouseEnter={() => setOpenMenuKey(null)}
                className="inline-flex shrink-0"
              >
                <Image
                  src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                  alt=""
                  width={120}
                  height={56}
                  className="h-11 w-auto lg:h-14"
                  style={{ display: "block" }}
                  priority
                />
              </Link>

              <DesktopNavigationLinks
                openMenuKey={openMenuKey}
                onOpenChange={setOpenMenuKey}
                panelIds={panelIds}
              />
            </div>

            <div
              onMouseEnter={() => setOpenMenuKey(null)}
              className="flex items-center"
              style={{ gap: 8, color: "#EDE7F2" }}
            >
              <DesktopActionLinks />
              <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
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
                  menu={menu}
                  panelId={panelIds[link.labelKey] ?? link.labelKey}
                  isOpen={openMenuKey === link.labelKey}
                  onNavigate={() => setOpenMenuKey(null)}
                />
              );
            })}
          </div>
        </header>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
