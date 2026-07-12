"use client";

import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import { destinationToLandmark, type Destination } from "@/components/destinations/data";

interface DestinationsGridCardProps {
  destination: Destination;
  categoryLabel?: string;
  className?: string;
  cardHref?: string;
}

/** Same visual design as `AttractionsLandmarkCard`; optional full-card link. */
const DestinationsGridCard = ({
  destination,
  categoryLabel = "وجهة سياحية",
  className,
  cardHref,
}: DestinationsGridCardProps) => {
  const landmark = destinationToLandmark(destination);
  const resolvedCardHref = cardHref ?? `/destinations/${destination.slug}`;

  return (
    <AttractionsLandmarkCard
      landmark={landmark}
      categoryLabel={categoryLabel}
      className={className}
      cardHref={resolvedCardHref}
      hideLocation
    />
  );
};

export default DestinationsGridCard;
