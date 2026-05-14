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

export function AseerSocialIcon({ platform }: { platform: AseerPlatform }) {
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
}
