import type { AseerPlatform } from "@/lib/discoverAseerLinks";
import {
  FacebookIcon,
  InstagramIcon,
  JacoIcon,
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
      case "instagram":
        return <InstagramIcon />;
      case "tiktok":
        return <TiktokIcon />;
      case "youtube":
        return <YouTubeIcon />;
      case "x":
        return <XIcon />;
      case "snapchat":
        return <SnapchatIcon />;
      case "jaco":
        return <JacoIcon />;
      case "whatsapp":
        return <WhatsAppIcon />;
      case "facebook":
        return <FacebookIcon />;
    }
  })();

  return (
    <span className={className ? `inline-flex shrink-0 ${className}` : "inline-flex shrink-0"} aria-hidden>
      {icon}
    </span>
  );
}
