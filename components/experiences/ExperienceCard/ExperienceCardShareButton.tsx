"use client";

import { Button } from "@headlessui/react";
import { ShareIcon } from "./Icons";

interface ExperienceCardShareButtonProps {
  experienceId: string | number;
  title: string;
  /** Arabic: share on inline-start; English: mirror to inline-end. */
  isRtl: boolean;
}

const ExperienceCardShareButton = ({
  experienceId,
  title,
  isRtl,
}: ExperienceCardShareButtonProps) => {
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Check out this experience: ${title}`,
      url: `${window.location.origin}/experiences/${experienceId}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      // User cancelled or error occurred
      console.log("Error sharing:", err);
    }
  };

  return (
    <Button
      onClick={handleShare}
      className={`absolute top-3 w-8 h-8 cursor-pointer rounded-full bg-gray-200/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-300/80 transition-colors data-focus:outline-none data-focus:ring-2 data-focus:ring-gray-500 data-focus:ring-offset-2 ${
        isRtl ? "left-3" : "right-3"
      }`}
      aria-label="Share"
    >
      <ShareIcon />
    </Button>
  );
};

export default ExperienceCardShareButton;
