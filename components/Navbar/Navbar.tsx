"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DesktopNavigationLinks from "./DesktopNavigationLinks";
import DesktopActionLinks from "./DesktopActionLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import { LocationPinIcon } from "./Icons";

const Navbar = () => {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 w-full bg-linear-to-r from-[#191919]/40 via-[#2a1a3d]/40 to-[#1a2a1a]/40 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-screen-2xl flex-row items-center px-4 sm:px-6 md:h-24 md:px-12 lg:px-24 xl:px-48">
          {/* Left: main nav links + mobile menu button */}
          <div className="flex flex-row items-center gap-4 md:gap-8">
            <DesktopNavigationLinks />
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              aria-label={t("common.home")}
              className="inline-flex rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Image
                src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                alt=""
                width={120}
                height={55}
              />
            </Link>
          </div>

          {/* Right: Action links */}
          <div className="flex flex-1 flex-row items-center justify-end gap-3">
            <Link
              href="/interactive-map"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
              aria-label={t("interactiveMap.title")}
            >
              <LocationPinIcon />
            </Link>
            <DesktopActionLinks />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
