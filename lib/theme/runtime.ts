import { themePalette, type ThemeName } from "@/lib/theme/palette";

export const THEME_STORAGE_KEY = "discover-aseer-theme";
const DEFAULT_THEME: ThemeName = "light";

const toCssVarEntries = (theme: ThemeName) => {
  const palette = themePalette[theme];
  return [
    ["--background", palette.background],
    ["--foreground", palette.foreground],
    ["--surface", palette.surface],
    ["--muted", palette.muted],
    ["--muted-foreground", palette.mutedForeground],
    ["--border", palette.border],
    ["--primary", palette.primary],
    ["--primary-foreground", palette.primaryForeground],
    ["--secondary", palette.secondary],
    ["--secondary-foreground", palette.secondaryForeground],
  ] as const;
};

export const applyThemeToRoot = (root: HTMLElement, theme: ThemeName) => {
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  for (const [key, value] of toCssVarEntries(theme)) {
    root.style.setProperty(key, value);
  }
};

export const getThemeInitScript = () => {
  const serializedPalette = JSON.stringify(themePalette);
  return `
    (function () {
      try {
        var storageKey = "${THEME_STORAGE_KEY}";
        var palette = ${serializedPalette};
        var savedTheme = localStorage.getItem(storageKey);
        var theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "${DEFAULT_THEME}";
        var root = document.documentElement;
        root.dataset.theme = theme;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        var selectedPalette = palette[theme];
        root.style.setProperty("--background", selectedPalette.background);
        root.style.setProperty("--foreground", selectedPalette.foreground);
        root.style.setProperty("--surface", selectedPalette.surface);
        root.style.setProperty("--muted", selectedPalette.muted);
        root.style.setProperty("--muted-foreground", selectedPalette.mutedForeground);
        root.style.setProperty("--border", selectedPalette.border);
        root.style.setProperty("--primary", selectedPalette.primary);
        root.style.setProperty("--primary-foreground", selectedPalette.primaryForeground);
        root.style.setProperty("--secondary", selectedPalette.secondary);
        root.style.setProperty("--secondary-foreground", selectedPalette.secondaryForeground);
      } catch (e) {}
    })();
  `;
};
