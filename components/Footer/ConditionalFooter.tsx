"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const FOOTER_HIDDEN_PATHS = ["/map", "/interactive-map"];

export default function ConditionalFooter() {
  const pathname = usePathname() ?? "";
  const hideFooter = FOOTER_HIDDEN_PATHS.some((segment) =>
    pathname.includes(segment),
  );

  if (hideFooter) return null;

  return <Footer />;
}
