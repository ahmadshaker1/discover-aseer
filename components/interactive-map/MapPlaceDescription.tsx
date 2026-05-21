"use client";

import { useState, type MouseEvent } from "react";
import {
  htmlToPlainText,
  MAP_DESCRIPTION_PREVIEW_LENGTH,
  truncatePlainText,
} from "./mapPlaceDescription";

type MapPlaceDescriptionProps = {
  html: string;
  viewMore: string;
  viewLess: string;
  className?: string;
  onToggleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function MapPlaceDescription({
  html,
  viewMore,
  viewLess,
  className = "",
  onToggleClick,
}: MapPlaceDescriptionProps) {
  const plain = htmlToPlainText(html);
  const [expanded, setExpanded] = useState(false);

  if (!plain) return null;

  const { preview, isTruncated } = truncatePlainText(
    plain,
    MAP_DESCRIPTION_PREVIEW_LENGTH,
  );
  const displayText = expanded || !isTruncated ? plain : preview;

  return (
    <div className={className}>
      <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
        {displayText}
      </p>
      {isTruncated ? (
        <button
          type="button"
          onClick={(event) => {
            onToggleClick?.(event);
            event.stopPropagation();
            setExpanded((value) => !value);
          }}
          className="mt-1.5 cursor-pointer text-[14px] font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {expanded ? viewLess : viewMore}
        </button>
      ) : null}
    </div>
  );
}
