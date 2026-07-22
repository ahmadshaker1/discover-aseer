"use client";

import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { HamburgerIcon } from "./Icons";
import { getNavbarDropdownLinks, navigationLinks } from "./navbarData";
import { toggleTheme } from "@/lib/theme/client";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCALE_OPTIONS = [
  { code: "ar", labelKey: "nav.localeArabic" as const },
  { code: "en", labelKey: "nav.localeEnglish" as const },
  { code: "zh", labelKey: "nav.localeChinese" as const, comingSoon: true },
] as const;

const GlobeSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </svg>
);

const BookletSvg = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden
  >
    <path d="M12 6.5C10.5 5 8 4.3 5 4.5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1c3-.2 5.5.5 7 2 1.5-1.5 4-2.2 7-2a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1c-3-.2-5.5.5-7 2z" />
    <path d="M12 6.5v13.5" />
  </svg>
);

const MoonSvg = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden
  >
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z" />
  </svg>
);

const CheckSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2C1A48"
    strokeWidth="2.4"
    aria-hidden
  >
    <path d="M5 12l5 5 9-11" />
  </svg>
);

const linkRowStyle = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  alignSelf: "flex-start" as const,
  gap: 7,
  padding: "10px 0",
  fontSize: 16,
  fontWeight: 600,
  color: "#F4EFE4",
  background: "none",
  border: "none",
  cursor: "pointer",
  width: "auto",
  textAlign: "start" as const,
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLangLabel =
    locale === "ar"
      ? t("nav.localeArabic")
      : locale === "en"
        ? t("nav.localeEnglish")
        : t("nav.localeChinese");

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === "zh" || nextLocale === locale) {
      setLangOpen(false);
      return;
    }
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);
    window.location.href = newPath + window.location.search;
  };

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [langOpen]);

  useEffect(() => {
    if (!isOpen) setLangOpen(false);
  }, [isOpen]);

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
            <Dialog.Panel
              className="h-full min-h-screen w-full"
              style={{
                background: "rgba(45,0,80,0.92)",
                backdropFilter: "blur(20px) saturate(1.2)",
                WebkitBackdropFilter: "blur(20px) saturate(1.2)",
                color: "#fff",
                fontFamily:
                  "var(--font-ibm-plex-sans-arabic), var(--font-ara-hamah-1964), system-ui, sans-serif",
              }}
            >
              <div className="flex h-full min-h-screen flex-col">
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: "20px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <Image
                    src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                    alt=""
                    width={120}
                    height={48}
                    style={{ height: 48, width: "auto", display: "block" }}
                  />
                  <button
                    type="button"
                    className="rounded-lg p-2 transition-colors hover:bg-white/10"
                    onClick={onClose}
                    aria-label={t("nav.closeMenu")}
                  >
                    <HamburgerIcon isOpen={true} />
                  </button>
                </div>

                <div
                  className="flex flex-1 flex-col overflow-y-auto"
                  style={{ padding: "28px 24px 40px", gap: 8 }}
                >
                  <nav
                    className="flex flex-col"
                    style={{ gap: 4, color: "#F4EFE4" }}
                  >
                    {navigationLinks.map((link) => {
                      if (link.isDropdown) {
                        return (
                          <Disclosure key={link.labelKey} as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className="navlink"
                                  aria-expanded={open}
                                  style={linkRowStyle}
                                >
                                  <span>{t(link.labelKey)}</span>
                                  <span
                                    aria-hidden
                                    style={{
                                      display: "inline-block",
                                      fontSize: 11,
                                      color: "#fff",
                                      transition: "transform .2s",
                                      transform: open
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                                    }}
                                  >
                                    ▾
                                  </span>
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  className="flex flex-col"
                                  style={{
                                    paddingInlineStart: 12,
                                    paddingBottom: 8,
                                  }}
                                >
                                  {getNavbarDropdownLinks(link.labelKey).map(
                                    (item) => {
                                      const inner = (
                                        <span
                                          className="megalink-u"
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 8,
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#F4EFE4",
                                          }}
                                        >
                                          <span>{t(item.labelKey)}</span>
                                          {item.badge === "pdf" ? (
                                            <span
                                              style={{
                                                fontSize: 9,
                                                fontWeight: 700,
                                                color: "#fff",
                                                border:
                                                  "1px solid rgba(255,255,255,.6)",
                                                borderRadius: 5,
                                                padding: "1px 6px",
                                              }}
                                            >
                                              {t("nav.badgePdf")}
                                            </span>
                                          ) : null}
                                          {item.badge === "new" ? (
                                            <span
                                              style={{
                                                fontSize: 9,
                                                fontWeight: 700,
                                                color: "#fff",
                                                background: "#7300CD",
                                                borderRadius: 5,
                                                padding: "2px 7px",
                                              }}
                                            >
                                              {t("nav.badgeNew")}
                                            </span>
                                          ) : null}
                                        </span>
                                      );

                                      const itemStyle = {
                                        display: "block" as const,
                                        padding: "12px 2px",
                                        borderBottom:
                                          "1px solid rgba(255,255,255,.09)",
                                      };

                                      if (item.external) {
                                        return (
                                          <a
                                            key={`${item.href}-${item.labelKey}`}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={onClose}
                                            className="megalink"
                                            style={itemStyle}
                                          >
                                            {inner}
                                          </a>
                                        );
                                      }

                                      return (
                                        <Link
                                          key={`${item.href}-${item.labelKey}`}
                                          href={item.href}
                                          onClick={onClose}
                                          className="megalink"
                                          style={itemStyle}
                                        >
                                          {inner}
                                        </Link>
                                      );
                                    },
                                  )}
                                </Disclosure.Panel>
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
                          className="navlink"
                          style={linkRowStyle}
                        >
                          {t(link.labelKey)}
                        </Link>
                      );
                    })}
                  </nav>

                  <div
                    className="mt-auto flex flex-wrap items-center"
                    style={{
                      gap: 8,
                      paddingTop: 28,
                      borderTop: "1px solid rgba(255,255,255,0.14)",
                      color: "#EDE7F2",
                    }}
                  >
                    <div ref={langRef} style={{ position: "relative" }}>
                      <button
                        type="button"
                        className="nav-lang-btn"
                        onClick={() => setLangOpen((open) => !open)}
                        aria-label={t("nav.languageSwitchLabel")}
                        aria-expanded={langOpen}
                        aria-haspopup="listbox"
                      >
                        <GlobeSvg />
                        <span>{currentLangLabel}</span>
                        <span
                          aria-hidden
                          style={{
                            display: "inline-block",
                            fontSize: 10,
                            transition: "transform .2s",
                            transform: langOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          ▾
                        </span>
                      </button>
                      {langOpen ? (
                        <div
                          role="listbox"
                          aria-label={t("nav.languageSwitchLabel")}
                          style={{
                            position: "absolute",
                            top: "calc(100% + 10px)",
                            insetInlineStart: 0,
                            background: "#fff",
                            border: "1px solid #EAE7DE",
                            borderRadius: 14,
                            boxShadow:
                              "0 18px 40px -18px rgba(44,26,72,.35)",
                            padding: 6,
                            minWidth: 172,
                            zIndex: 60,
                          }}
                        >
                          {LOCALE_OPTIONS.map((option) => {
                            const selected = option.code === locale;
                            const disabled =
                              "comingSoon" in option && option.comingSoon;
                            return (
                              <button
                                key={option.code}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                disabled={disabled}
                                onClick={() => switchLocale(option.code)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  padding: "10px 12px",
                                  borderRadius: 9,
                                  fontSize: 15,
                                  color: disabled
                                    ? "rgba(44,26,72,.35)"
                                    : "#2C1A48",
                                  cursor: disabled
                                    ? "not-allowed"
                                    : "pointer",
                                  background: selected
                                    ? "#F3F1EA"
                                    : "transparent",
                                  border: "none",
                                }}
                              >
                                <span>{t(option.labelKey)}</span>
                                {disabled ? (
                                  <span style={{ fontSize: 10 }}>
                                    {t("nav.localeComingSoon")}
                                  </span>
                                ) : selected ? (
                                  <CheckSvg />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      className="nav-action-btn"
                      title={t("nav.downloadGuide")}
                      aria-label={t("nav.downloadGuide")}
                      onClick={() => {
                        window.open("/booklet", "_blank", "noopener,noreferrer");
                        onClose();
                      }}
                    >
                      <BookletSvg />
                    </button>

                    <button
                      type="button"
                      className="nav-action-btn"
                      title={t("nav.themeSwitchLabel")}
                      aria-label={t("nav.themeSwitchLabel")}
                      onClick={() => {
                        toggleTheme();
                        onClose();
                      }}
                    >
                      <MoonSvg />
                    </button>
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
