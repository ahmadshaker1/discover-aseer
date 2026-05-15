"use client";

import { Button } from "@headlessui/react";
import { ShareIcon } from "./Icons";

interface ExperienceCardShareButtonProps {
  experienceId: string | number;
  title: string;
}

const ExperienceCardShareButton = ({
  experienceId,
  title,
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
      className="absolute end-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface/90 backdrop-blur-sm transition-colors hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-border data-focus:ring-offset-2"
      aria-label="Share"
    >
      <ShareIcon />
    </Button>
  );
};

export default ExperienceCardShareButton;
