export type ThemeName = "light" | "dark";

export type ThemePalette = {
  background: string;
  foreground: string;
  surface: string;
  muted: string;
  mutedForeground: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
};

/** Brand button purple — identical in light and dark*/
export const brandPrimary = "#6027D2";

export const themePalette: Record<ThemeName, ThemePalette> = {
  light: {
    background: "#FFFFFF",
    foreground: "#1D1F1F",
    surface: "#F8F8F8",
    muted: "#F2F2F2",
    mutedForeground: "#6B7280",
    border: "#E4E4E4",
    primary: brandPrimary,
    primaryForeground: "#FFFFFF",
    secondary: "#280048",
    secondaryForeground: "#FFFFFF",
  },
  dark: {
    // Purple-black base instead of pure black.
    background: "#14091F",
    foreground: "#FFFFFF",
    surface: "#1C0F2A",
    muted: "#251538",
    mutedForeground: "#FFFFFF",
    border: "#34204A",
    primary: brandPrimary,
    primaryForeground: "#FFFFFF",
    secondary: "#FFFFFF",
    secondaryForeground: "#14091F",
  },
};
