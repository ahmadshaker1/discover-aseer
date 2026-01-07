"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AseerLogo from "../Logo/AseerLogo";
import {
  GlobeIcon,
  CrescentMoonIcon,
  LocationPinIcon,
  HamburgerIcon,
} from "./Icons";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "#", label: "اكتشف عسير" },
    { href: "/events", label: "المواسم والفعاليات" },
  ];

  const actionLinks = [
    {
      href: "#",
      label: "دليل الانشطة الخارجية",
      variant: "button" as const,
    },
    {
      href: "/interactive-map",
      label: "الخريطة التفاعلية",
      variant: "link" as const,
      icon: LocationPinIcon,
    },
  ];

  const iconButtons = [
    { icon: GlobeIcon, href: "#" },
    { icon: CrescentMoonIcon, href: "#" },
    { icon: LocationPinIcon, href: "#" },
  ];

  return (
    <>
      <nav className="flex flex-row items-center justify-between fixed inset-x-0 top-0 w-full h-20 md:h-24 z-50 bg-gradient-to-r from-[#191919]/40 via-[#2a1a3d]/40 to-[#1a2a1a]/40 backdrop-blur-md px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48">
        {/* Left side - Logo and Navigation Links (Desktop) */}
        <div className="flex flex-row items-center space-x-4 md:space-x-8">
          <AseerLogo />
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-row items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side - Action Links and Icons (Desktop) */}
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
                <h3 className="text-white text-base font-medium">
                  {link.label}
                </h3>
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <HamburgerIcon isOpen={false} />
        </button>
      </nav>

      {/* Mobile Menu - HeadlessUI Dialog */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="lg:hidden relative z-50"
          onClose={setMobileMenuOpen}
        >
          {/* Menu Panel - Full Screen */}
          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="w-full h-full min-h-screen bg-gradient-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95 backdrop-blur-xl">
                <div className="flex flex-col h-full min-h-screen">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                    <AseerLogo />
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <HamburgerIcon isOpen={true} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 flex flex-col py-6 sm:py-8 px-4 sm:px-6 space-y-4 sm:space-y-6 overflow-y-auto">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity py-3 border-b border-white/10"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Action Links */}
                    <div className="pt-4 space-y-4">
                      {actionLinks.map((link, index) => {
                        if (link.variant === "button") {
                          return (
                            <Link
                              key={index}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-center text-white text-base sm:text-lg font-medium px-6 py-3 border border-white rounded-full hover:bg-white/10 transition-colors"
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
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-end gap-2 text-white text-base sm:text-lg font-medium hover:opacity-80 transition-opacity py-3"
                          >
                            <Icon />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Icon Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
                      {iconButtons.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Icon />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
