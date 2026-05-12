"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ThemeName } from "@/lib/theme/palette";
import { applyThemeToRoot, THEME_STORAGE_KEY } from "@/lib/theme/runtime";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const DEFAULT_THEME: ThemeName = "light";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    const nextTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : DEFAULT_THEME;

    setThemeState(nextTheme);
    applyThemeToRoot(document.documentElement, nextTheme);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    setThemeState(nextTheme);
    applyThemeToRoot(document.documentElement, nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
