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

export const themePalette: Record<ThemeName, ThemePalette> = {
  light: {
    background: "#FFFFFF",
    foreground: "#1D1F1F",
    surface: "#F8F8F8",
    muted: "#F2F2F2",
    mutedForeground: "#6B7280",
    border: "#E4E4E4",
    primary: "#7300CD",
    primaryForeground: "#FFFFFF",
    secondary: "#280048",
    secondaryForeground: "#FFFFFF",
  },
  dark: {
    // Purple-black base instead of pure black.
    background: "#14091F",
    foreground: "#F3EDF9",
    surface: "#1C0F2A",
    muted: "#251538",
    mutedForeground: "#B8A8C9",
    border: "#34204A",
    primary: "#B983FF",
    primaryForeground: "#14091F",
    secondary: "#8A47DC",
    secondaryForeground: "#F3EDF9",
  },
};
