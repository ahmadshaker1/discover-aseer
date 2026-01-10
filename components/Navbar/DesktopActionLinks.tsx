"use client";

import Link from "next/link";
import { actionLinks, iconButtons } from "./navbarData";

const DesktopActionLinks = () => {
  return (
    <div className="hidden lg:flex flex-row items-center space-x-6">
      {actionLinks.map((link, index) => {
        if (link.variant === "button") {
          return (
            <Link
              key={index}
              href={link.href}
              className="text-white text-base font-medium px-4 py-2 border border-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          );
        }
        const Icon = link.icon!;
        return (
          <Link
            key={index}
            href={link.href}
            className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap flex flex-row items-center justify-center space-x-1"
          >
            <Icon />
            <h3 className="text-white text-base font-medium">{link.label}</h3>
          </Link>
        );
      })}
      {iconButtons.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopActionLinks;
