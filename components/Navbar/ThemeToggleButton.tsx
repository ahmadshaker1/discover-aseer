"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getCurrentTheme, toggleTheme } from "@/lib/theme/client";
import type { ThemeName } from "@/lib/theme/palette";

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

const SunSvg = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
  </svg>
);

type ThemeToggleButtonProps = {
  onAfterToggle?: () => void;
};

export default function ThemeToggleButton({
  onAfterToggle,
}: ThemeToggleButtonProps) {
  const t = useTranslations();
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    setTheme(getCurrentTheme());

    const root = document.documentElement;
    const sync = () => {
      const next = root.dataset.theme;
      if (next === "dark" || next === "light") setTheme(next);
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      className="nav-action-btn"
      title={t("nav.themeSwitchLabel")}
      aria-label={t("nav.themeSwitchLabel")}
      onClick={() => {
        const next = toggleTheme();
        setTheme(next);
        onAfterToggle?.();
      }}
    >
      {theme === "dark" ? <SunSvg /> : <MoonSvg />}
    </button>
  );
}
