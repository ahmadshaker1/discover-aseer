"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AseerSocialIcon } from "@/components/social/AseerSocialIcon";
import { usePathname } from "@/i18n/navigation";
import { pageSharePlatforms, type PageSharePlatform } from "@/lib/discoverAseerLinks";
import { buildShareUrl } from "@/lib/share/buildShareUrl";

const SHARE_ARIA_KEY: Record<
  PageSharePlatform,
  "shareOnWhatsApp" | "shareOnFacebook" | "shareOnX"
> = {
  whatsapp: "shareOnWhatsApp",
  facebook: "shareOnFacebook",
  x: "shareOnX",
};

interface PageShareLinksProps {
  title: string;
  className?: string;
  linkClassName?: string;
}

export function PageShareLinks({
  title,
  className = "flex items-center gap-2",
  linkClassName = "text-foreground/70 transition-opacity hover:opacity-80 [&_svg]:size-5 [&_path]:fill-currentColor",
}: PageShareLinksProps) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(new URL(pathname, window.location.origin).href);
  }, [pathname]);

  return (
    <div className={className}>
      {pageSharePlatforms.map((platform) => {
        const href = pageUrl
          ? buildShareUrl(platform, pageUrl, title)
          : undefined;

        return (
          <a
            key={platform}
            href={href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(SHARE_ARIA_KEY[platform], { title })}
            className={linkClassName}
            aria-disabled={!pageUrl}
            onClick={!pageUrl ? (e) => e.preventDefault() : undefined}
          >
            <AseerSocialIcon platform={platform} />
          </a>
        );
      })}
    </div>
  );
}
