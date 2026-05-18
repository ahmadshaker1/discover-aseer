"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  FacebookIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/shared/icons";
import { usePathname } from "@/i18n/navigation";
import { buildShareUrl } from "@/lib/share/buildShareUrl";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface IntroPageShareRowProps {
  title: string;
}

export function IntroPageShareRow({ title }: IntroPageShareRowProps) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(new URL(pathname, window.location.origin).href);
  }, [pathname]);

  const iconClass = "text-muted-foreground hover:opacity-80";
  const mailHref = pageUrl
    ? `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pageUrl)}`
    : "mailto:info@discoveraseer.com";
  const linkedInHref = pageUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
    : "#";

  return (
    <div className="flex h-8 w-full max-w-[360px] items-center gap-[15px]">
      <span
        className="shrink-0 text-[18px] font-bold leading-[180%] text-foreground"
        style={{ fontFamily: ara }}
      >
        {t("share")}
      </span>
      <div className="flex items-center gap-2">
        <a
          href={pageUrl ? buildShareUrl("whatsapp", pageUrl, title) : "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("shareOnWhatsApp", { title })}
          className={iconClass}
          aria-disabled={!pageUrl}
          onClick={!pageUrl ? (e) => e.preventDefault() : undefined}
        >
          <WhatsAppIcon />
        </a>
        <a href={mailHref} aria-label="Mail" className={iconClass}>
          <MailIcon />
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={iconClass}
          aria-disabled={!pageUrl}
          onClick={!pageUrl ? (e) => e.preventDefault() : undefined}
        >
          <LinkedInIcon />
        </a>
        <a
          href={pageUrl ? buildShareUrl("facebook", pageUrl, title) : "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("shareOnFacebook", { title })}
          className={iconClass}
          aria-disabled={!pageUrl}
          onClick={!pageUrl ? (e) => e.preventDefault() : undefined}
        >
          <FacebookIcon />
        </a>
        <a
          href={pageUrl ? buildShareUrl("x", pageUrl, title) : "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("shareOnX", { title })}
          className={iconClass}
          aria-disabled={!pageUrl}
          onClick={!pageUrl ? (e) => e.preventDefault() : undefined}
        >
          <XIcon />
        </a>
      </div>
    </div>
  );
}

