"use client";

import { useMemo } from "react";
import DOMPurifyModule from "dompurify";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

const PURIFY_OPTIONS = {
  ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "span"],
  ALLOWED_ATTR: ["class"],
};

type PurifyLike = {
  sanitize?: (dirty: string, options?: object) => string;
};

/**
 * CMS content often stores “paragraphs” as text separated by `<br/>` (or raw
 * newlines) inside a single `<p>`. Convert those into real `<p>` siblings so
 * `space-y-*` on the container can add spacing between them.
 */
function breaksToParagraphs(html: string): string {
  let value = html.trim();
  if (!/<br \/>/i.test(value)) return value;

  // `<p>a<br />b</p>` → `<p>a</p><p>b</p>`
  value = value.replace(
    /<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi,
    (_match, attrs: string = "", inner: string) =>
      inner
        .split(/<br \/>/i)
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => `<p${attrs}>${part}</p>`)
        .join(""),
  );

  // Plain text with br and no block tags → wrap each segment in `<p>`.
  if (/<br \/>/i.test(value) && !/<(?:p|ul|ol|li|div)\b/i.test(value)) {
    value = value
      .split(/<br \/>/i)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => `<p>${part}</p>`)
      .join("");
  }

  return value.replace(/<p>\s*<\/p>/gi, "");
}

/**
 * CMS content mixes `<br/>`, `<br />`, and raw newlines. HTML collapses `\n`,
 * so turn remaining newlines into `<br />` without doubling existing breaks
 * or inserting breaks between block tags.
 */
function normalizeCmsHtml(html: string): string {
  let value = (html || "").replace(/\r\n|\r/g, "\n");

  // Normalize every br variant to a consistent form.
  value = value.replace(/<br\s*\/?>/gi, "<br />");

  // Drop newlines that already sit next to a br (avoid `<br /><br />` from `<br />\n`).
  value = value.replace(/(<br \/>)\s*\n+/gi, "$1");
  value = value.replace(/\n+\s*(<br \/>)/gi, "$1");

  // Drop newlines around block tags (spacing comes from the blocks themselves).
  value = value.replace(
    /(<\/?(?:p|div|li|ul|ol|h[1-6]|blockquote|section|article)(?:\s[^>]*)?>)\s*\n+/gi,
    "$1",
  );
  value = value.replace(
    /\n+\s*(<\/?(?:p|div|li|ul|ol|h[1-6]|blockquote|section|article)(?:\s[^>]*)?>)/gi,
    "$1",
  );

  // Any remaining newlines are intentional line breaks in text.
  value = value.replace(/\n+/g, "<br />");

  return breaksToParagraphs(value);
}

function sanitizeHtml(dirtyHtml: string): string {
  const value = normalizeCmsHtml(dirtyHtml);
  const mod = DOMPurifyModule as unknown as PurifyLike &
    ((w: Window) => PurifyLike);

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

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
  );
};

export default SafeHtml;
