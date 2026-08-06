/**
 * Discover Aseer — social URLs (main site is linked from the glass navbar).
 *
 * Display order (top → bottom / start → end):
 * Instagram → TikTok → YouTube → X → Snapchat → Jaco → WhatsApp → Facebook
 */
export type AseerPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "snapchat"
  | "jaco"
  | "whatsapp"
  | "facebook";

export type AseerLink = {
  href: string;
  label: string;
  ariaLabel: string;
  platform: AseerPlatform;
};

/** Platforms that support sharing the current page URL (used with `AseerSocialIcon`). */
export const pageSharePlatforms = [
  "whatsapp",
  "facebook",
  "x",
] as const satisfies readonly AseerPlatform[];

export type PageSharePlatform = (typeof pageSharePlatforms)[number];

export const discoverAseerLinks: AseerLink[] = [
  {
    href: "https://www.instagram.com/discoveraseer/",
    label: "Instagram",
    ariaLabel: "Discover Aseer on Instagram",
    platform: "instagram",
  },
  {
    href: "https://www.tiktok.com/@discoveraseer",
    label: "TikTok",
    ariaLabel: "Discover Aseer on TikTok",
    platform: "tiktok",
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
    href: "https://jaco.live/@discoveraseer",
    label: "Jaco",
    ariaLabel: "Discover Aseer on Jaco",
    platform: "jaco",
  },
  {
    href: "https://www.whatsapp.com/channel/0029VaPljpd3gvWWxlEVQL3u",
    label: "WhatsApp",
    ariaLabel: "Discover Aseer on WhatsApp",
    platform: "whatsapp",
  },
  {
    href: "https://www.facebook.com/DiscoverAseer/",
    label: "Facebook",
    ariaLabel: "Discover Aseer on Facebook",
    platform: "facebook",
  },
];
