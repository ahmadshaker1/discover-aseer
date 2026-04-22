"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

const SafeHtml = ({ html, className }: SafeHtmlProps) => {
  const sanitized = useMemo(
    () =>
      DOMPurify.sanitize(html || "", {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "span"],
        ALLOWED_ATTR: ["class"],
      }),
    [html],
  );

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

export default SafeHtml;
