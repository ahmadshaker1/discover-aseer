"use client";

import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import AseerLogo from "../Logo/AseerLogo";
import { HamburgerIcon } from "./Icons";
import { navigationLinks, discoverAseerLinks, iconButtons } from "./navbarData";
import { toggleTheme } from "@/lib/theme/client";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const normalizedPathname =
      pathname.replace(/^\/(ar|en)(?=\/|$)/, "") || "/";
    router.replace(normalizedPathname, { locale: nextLocale });
    router.refresh();
    onClose();
  };

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
            <Dialog.Panel className="w-full h-full min-h-screen bg-linear-to-b from-[#191919]/95 via-[#2a1a3d]/95 to-[#1a2a1a]/95 backdrop-blur-xl">
              <div className="flex flex-col h-full min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                  <AseerLogo />
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={onClose}
                    aria-label={t("nav.closeMenu")}
                  >
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col py-6 sm:py-8 px-4 sm:px-6 space-y-4 sm:space-y-6 overflow-y-auto">
                  {navigationLinks.map((link) => {
                    if (link.isDropdown) {
                      return (
                        <Disclosure key={link.labelKey} as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="w-full flex items-center justify-between text-white text-lg sm:text-xl font-medium py-3 border-b border-white/10 hover:opacity-80 transition-opacity">
                                <span>{t(link.labelKey)}</span>
                                <svg
                                  className={`w-5 h-5 transition-transform duration-200 ${
                                    open ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 max-h-0"
                                enterTo="opacity-100 max-h-96"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 max-h-96"
                                leaveTo="opacity-0 max-h-0"
                              >
                                <Disclosure.Panel className="pl-4 space-y-2 overflow-hidden">
                                  {discoverAseerLinks.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={onClose}
                                      className="block text-white/80 text-base sm:text-lg font-medium hover:opacity-80 transition-opacity py-2"
                                    >
                                      {t(item.labelKey)}
                                    </Link>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="text-white text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity py-3 border-b border-white/10"
                      >
                        {t(link.labelKey)}
                      </Link>
                    );
                  })}

                  {/* Icon Buttons */}
                  <div className="flex items-center justify-start gap-4 pt-6 border-t border-white/10">
                    {iconButtons.map((item, index) => {
                      const Icon = item.icon;
                      if ("isBooklet" in item && item.isBooklet) {
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              const downloadLink = document.createElement("a");
                              downloadLink.href = "/assets/booklet/booklet.pdf";
                              downloadLink.download = "booklet.pdf";
                              document.body.appendChild(downloadLink);
                              downloadLink.click();
                              document.body.removeChild(downloadLink);
                              onClose();
                            }}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                            aria-label={t("nav.downloadGuide")}
                          >
                            <Icon />
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={
                            index === 0
                              ? (e) => {
                                  e.preventDefault();
                                  switchLocale();
                                }
                              : index === 1
                                ? (e) => {
                                    e.preventDefault();
                                    toggleTheme();
                                    onClose();
                                  }
                                : onClose
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                          aria-label={
                            index === 0
                              ? t("nav.languageSwitchLabel")
                              : index === 1
                                ? t("nav.themeSwitchLabel")
                                : undefined
                          }
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
