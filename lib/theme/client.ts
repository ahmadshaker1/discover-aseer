"use client";

import type { ThemeName } from "@/lib/theme/palette";
import { applyThemeToRoot, THEME_STORAGE_KEY } from "@/lib/theme/runtime";

export const getCurrentTheme = (): ThemeName => {
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === "dark" || fromDom === "light") {
    return fromDom;
  }

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // localStorage may be unavailable
  }

  return "light";
};

export const setTheme = (theme: ThemeName) => {
  applyThemeToRoot(document.documentElement, theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage may be unavailable
  }
};

export const toggleTheme = (): ThemeName => {
  const next: ThemeName = getCurrentTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
};
