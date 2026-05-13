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
      <nav className="flex flex-row items-center justify-between fixed inset-x-0 top-0 w-full h-20 md:h-24 z-50 bg-linear-to-r from-[#191919]/40 via-[#2a1a3d]/40 to-[#1a2a1a]/40 backdrop-blur-md px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48">
        {/* Logo + main nav links — adjust `gap-*` to shift DesktopNavigationLinks closer/further from logo */}
        <div className="flex flex-row items-center gap-4 md:gap-8">
          <AseerLogo />
          <DesktopNavigationLinks />
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />



        </div>
        <div className="flex flex-row items-center gap-3">
          <DesktopActionLinks />
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
