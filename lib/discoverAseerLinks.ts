/**
 * Discover Aseer — social URLs (main site is linked from the glass navbar).
 */
export type AseerPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "x"
  | "snapchat"
  | "tiktok"
  | "whatsapp";

export type AseerLink = {
  href: string;
  label: string;
  ariaLabel: string;
  platform: AseerPlatform;
};

export const discoverAseerLinks: AseerLink[] = [
  {
    href: "https://www.facebook.com/DiscoverAseer/",
    label: "Facebook",
    ariaLabel: "Discover Aseer on Facebook",
    platform: "facebook",
  },
  {
    href: "https://www.instagram.com/discoveraseer/",
    label: "Instagram",
    ariaLabel: "Discover Aseer on Instagram",
    platform: "instagram",
  },
  {
    href: "https://www.youtube.com/@Discoveraseer",
    label: "YouTube",
    ariaLabel: "Discover Aseer on YouTube",
    platform: "youtube",
  },
  {
    href: "https://x.com/discoveraseer",
    label: "X",
    ariaLabel: "Discover Aseer on X",
    platform: "x",
  },
  {
    href: "https://www.snapchat.com/@discoveraseer",
    label: "Snapchat",
    ariaLabel: "Discover Aseer on Snapchat",
    platform: "snapchat",
  },
  {
    href: "https://www.tiktok.com/@discoveraseer",
    label: "TikTok",
    ariaLabel: "Discover Aseer on TikTok",
    platform: "tiktok",
  },
  {
    href: "https://www.whatsapp.com/channel/0029VaPljpd3gvWWxlEVQL3u",
    label: "WhatsApp",
    ariaLabel: "Discover Aseer on WhatsApp",
    platform: "whatsapp",
  },
];
