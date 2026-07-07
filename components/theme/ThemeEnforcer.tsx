"use client";

import { useEffect } from "react";
import { getCurrentTheme, setTheme } from "@/lib/theme/client";
import { applyThemeToRoot } from "@/lib/theme/runtime";

export default function ThemeEnforcer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "data-theme" ||
            mutation.attributeName === "class" ||
            mutation.attributeName === "style")
        ) {
          // If React removes or overrides the theme attributes,
          // the DOM will no longer reflect the expected theme.
          shouldReapply = true;
          break;
        }
      }

      if (shouldReapply) {
        // Disconnect to prevent infinite mutation loop when we apply styles again
        observer.disconnect();

        // localStorage is the source of truth if DOM gets wiped
        let savedTheme = "light";
        try {
          const fromStorage = localStorage.getItem("discover-aseer-theme");
          if (fromStorage === "dark" || fromStorage === "light") {
            savedTheme = fromStorage;
          }
        } catch {}

        applyThemeToRoot(
          document.documentElement,
          savedTheme as "light" | "dark",
        );

        // Re-observe
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme", "class", "style"],
        });
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
