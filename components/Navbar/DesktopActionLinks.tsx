"use client";

/**
 * Immersive Preview end actions:
 * language pill (globe + label + ▾) → booklet circle → dark-mode circle.
 */
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toggleTheme } from "@/lib/theme/client";

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

const DesktopActionLinks = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLangLabel =
    locale === "ar"
      ? t("nav.localeArabic")
      : locale === "en"
        ? t("nav.localeEnglish")
        : t("nav.localeChinese");

  const handleBookletOpen = () => {
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
    <div className="hidden flex-row items-center sm:flex" style={{ gap: 8 }}>
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
              transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
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
              insetInlineEnd: 0,
              background: "#fff",
              border: "1px solid #EAE7DE",
              borderRadius: 14,
              boxShadow: "0 18px 40px -18px rgba(44,26,72,.35)",
              padding: 6,
              minWidth: 172,
              zIndex: 60,
            }}
          >
            {LOCALE_OPTIONS.map((option) => {
              const selected = option.code === locale;
              const disabled = "comingSoon" in option && option.comingSoon;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={disabled}
                  onClick={() => handleLocaleSwitch(option.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 9,
                    fontSize: 15,
                    color: disabled ? "rgba(44,26,72,.35)" : "#2C1A48",
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: selected ? "#F3F1EA" : "transparent",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled) e.currentTarget.style.background = "#F3F1EA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = selected
                      ? "#F3F1EA"
                      : "transparent";
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
        onClick={handleBookletOpen}
      >
        <BookletSvg />
      </button>

      <button
        type="button"
        className="nav-action-btn"
        title={t("nav.themeSwitchLabel")}
        aria-label={t("nav.themeSwitchLabel")}
        onClick={() => toggleTheme()}
      >
        <MoonSvg />
      </button>
    </div>
  );
};

export default DesktopActionLinks;
