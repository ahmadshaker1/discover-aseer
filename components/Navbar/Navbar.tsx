import AseerLogo from "../Logo/AseerLogo";
import { GlobeIcon, CrescentMoonIcon, LocationPinIcon } from "./Icons";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between absolute top-0 left-0 w-full h-24 z-50 bg-gradient-to-r from-[#191919]/40 via-[#2a1a3d]/40 to-[#1a2a1a]/40 backdrop-blur-md px-48">
      {/* Right side - Logo */}
      <div className="flex flex-row items-center space-x-8">
        <AseerLogo />
        <Link
          href="#"
          className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          الرئيسية
        </Link>
        <Link
          href="#"
          className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          اكتشف عسير
        </Link>
        <Link
          href="#"
          className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          المواسم والفعاليات
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end w-full mx-auto">
        {/* Left side - Three circular icons */}
        <div className="flex flex-row items-center space-x-6">
          <Link
            href="#"
            className="text-white text-base font-medium px-4 py-2 border border-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            دليل الانشطة الخارجية
          </Link>
          <Link
            href="/interactive-map"
            className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap flex flex-row items-center justify-center space-x-1"
          >
            <LocationPinIcon />
            <h3 className="text-white text-base font-medium">
              الخريطة التفاعلية
            </h3>
          </Link>
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <GlobeIcon />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <CrescentMoonIcon />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center">
            <LocationPinIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
