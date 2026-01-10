"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import AseerLogo from "../Logo/AseerLogo";
import { HamburgerIcon } from "./Icons";
import {
  navigationLinks,
  discoverAseerLinks,
  actionLinks,
  iconButtons,
} from "./navbarData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="lg:hidden relative z-50" onClose={onClose}>
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
                    onClick={onClose}
                    aria-label="Close menu"
                  >
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col py-6 sm:py-8 px-4 sm:px-6 space-y-4 sm:space-y-6 overflow-y-auto">
                  {navigationLinks.map((link) => {
                    if (link.isDropdown) {
                      return (
                        <div key={link.href} className="space-y-2">
                          <div className="text-white text-lg sm:text-xl font-medium py-3 border-b border-white/10">
                            {link.label}
                          </div>
                          <div className="pr-4 space-y-2">
                            {discoverAseerLinks.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className="block text-white/80 text-base sm:text-lg font-medium hover:opacity-80 transition-opacity py-2"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="text-white text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity py-3 border-b border-white/10"
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  {/* Action Links */}
                  <div className="pt-4 space-y-4">
                    {actionLinks.map((link, index) => {
                      if (link.variant === "button") {
                        return (
                          <Link
                            key={index}
                            href={link.href}
                            onClick={onClose}
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
                          onClick={onClose}
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
                          onClick={onClose}
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
  );
};

export default MobileMenu;
