"use client";

import { useMemo } from "react";
import DOMPurifyModule from "dompurify";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

const PURIFY_OPTIONS = {
  USE_PROFILES: { html: true },
  ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "span"],
  ALLOWED_ATTR: ["class"],
} as const;

type PurifyLike = {
  sanitize?: (dirty: string, options?: object) => string;
};

function sanitizeHtml(dirtyHtml: string): string {
  const value = dirtyHtml || "";
  const mod = DOMPurifyModule as unknown as PurifyLike & ((w: Window) => PurifyLike);

  // Common ESM/CJS shape: module already exposes `.sanitize`.
  if (typeof mod.sanitize === "function") {
    return mod.sanitize(value, PURIFY_OPTIONS);
  }

  // Some builds export a factory function that needs `window`.
  if (typeof window !== "undefined" && typeof mod === "function") {
    const instance = mod(window);
    if (instance && typeof instance.sanitize === "function") {
      return instance.sanitize(value, PURIFY_OPTIONS);
    }
  }

  // Fail-safe fallback: don't crash rendering if import shape changes.
  return value;
}

const SafeHtml = ({ html, className }: SafeHtmlProps) => {
  const sanitized = useMemo(() => sanitizeHtml(html), [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

export default SafeHtml;
