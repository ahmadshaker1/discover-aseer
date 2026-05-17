/**
 * Inline script that runs on hard navigation (SSR HTML parse) without React 19
 * dev warnings. See: https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
