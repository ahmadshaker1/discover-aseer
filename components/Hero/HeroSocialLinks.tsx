"use client";

import { AseerSocialIcon } from "@/components/social/AseerSocialIcon";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";

export const heroSocialLinkClassDesktop =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 md:h-10 md:w-10 [&_svg]:origin-center [&_svg]:shrink-0 [&_svg]:scale-[1.05] md:[&_svg]:scale-[1.1] [&_svg_path]:fill-white";

export const heroSocialLinkClassMobile =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors active:bg-white/10 [&_svg]:origin-center [&_svg]:shrink-0 [&_svg]:scale-[1.12] [&_svg_path]:fill-white";

type HeroSocialLinksProps = {
  linkClassName: string;
};

export default function HeroSocialLinks({ linkClassName }: HeroSocialLinksProps) {
  return (
    <>
      {discoverAseerLinks.map(({ href, label, ariaLabel, platform }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={ariaLabel}
        >
          <AseerSocialIcon platform={platform} />
        </a>
      ))}
    </>
  );
}
