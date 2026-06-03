"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getThemeInitScript } from "@/lib/theme/runtime";

/** Injects theme init script on the server, outside the React client tree (React 19 safe). */
export default function ThemeInitScript() {
  useServerInsertedHTML(() => (
    <script
      id="discover-aseer-theme-init"
      dangerouslySetInnerHTML={{ __html: getThemeInitScript().trim() }}
    />
  ));

  return null;
}
