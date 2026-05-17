import type { AseerPlatform } from "@/lib/discoverAseerLinks";
import {
  FacebookIcon,
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";

type AseerSocialIconProps = {
  platform: AseerPlatform;
  className?: string;
};

export function AseerSocialIcon({ platform, className }: AseerSocialIconProps) {
  const icon = (() => {
    switch (platform) {
      case "facebook":
        return <FacebookIcon />;
      case "instagram":
        return <InstagramIcon />;
      case "youtube":
        return <YouTubeIcon />;
      case "x":
        return <XIcon />;
      case "snapchat":
        return <SnapchatIcon />;
      case "tiktok":
        return <TiktokIcon />;
      case "whatsapp":
        return <WhatsAppIcon />;
    }
  })();

  return (
    <span className={className ? `inline-flex shrink-0 ${className}` : "inline-flex shrink-0"} aria-hidden>
      {icon}
    </span>
  );
}
