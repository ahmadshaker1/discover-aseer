"use client";

import { useState } from "react";
import AseerLogo from "../Logo/AseerLogo";
import DesktopNavigationLinks from "./DesktopNavigationLinks";
import DesktopActionLinks from "./DesktopActionLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
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
            <AseerLogo />
          </div>

          {/* Right: Action links */}
          <div className="flex flex-1 flex-row items-center justify-end gap-3">
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
