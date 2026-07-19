"use client";

/**
 * End-side circular actions (language → booklets → theme).
 * Language menu leaves room for Chinese when locale support ships.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { iconButtons } from "./navbarData";
import { useLocale, useTranslations } from "next-intl";
import { toggleTheme } from "@/lib/theme/client";

const LOCALE_OPTIONS = [
  { code: "ar", labelKey: "nav.localeArabic" as const },
  { code: "en", labelKey: "nav.localeEnglish" as const },
  { code: "zh", labelKey: "nav.localeChinese" as const, comingSoon: true },
] as const;

const DesktopActionLinks = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const handleBookletOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/booklet", "_blank", "noopener,noreferrer");
  };

  const handleLocaleSwitch = (nextLocale: string) => {
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

  return (
    <div className="hidden lg:flex flex-row items-center gap-3 xl:gap-4">
      {iconButtons.map((item, index) => {
        const Icon = item.icon;

        if (item.action === "locale") {
          return (
            <div key={index} ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
                aria-label={t("nav.languageSwitchLabel")}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <Icon />
              </button>
              {langOpen ? (
                <ul
                  role="listbox"
                  aria-label={t("nav.languageSwitchLabel")}
                  className="absolute end-0 top-full z-50 mt-2 min-w-[10.5rem] overflow-hidden rounded-2xl border border-white/20 bg-[#191919]/95 py-1 shadow-xl backdrop-blur-xl"
                >
                  {LOCALE_OPTIONS.map((option) => {
                    const selected = option.code === locale;
                    const disabled = "comingSoon" in option && option.comingSoon;
                    return (
                      <li key={option.code} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => handleLocaleSwitch(option.code)}
                          className={[
                            "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm font-medium transition-colors",
                            disabled
                              ? "cursor-not-allowed text-white/35"
                              : selected
                                ? "bg-white/15 text-white"
                                : "text-white/85 hover:bg-white/10 hover:text-white",
                          ].join(" ")}
                        >
                          <span>{t(option.labelKey)}</span>
                          {disabled ? (
                            <span className="text-[10px] tracking-wide uppercase">
                              {t("nav.localeComingSoon")}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        }

        if (item.action === "booklet") {
          return (
            <button
              key={index}
              type="button"
              onClick={handleBookletOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
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
            onClick={(e) => {
              e.preventDefault();
              toggleTheme();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
            aria-label={t("nav.themeSwitchLabel")}
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopActionLinks;
