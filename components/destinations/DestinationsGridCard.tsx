"use client";

import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import { destinationToLandmark, type Destination } from "@/components/destinations/data";

interface DestinationsGridCardProps {
  destination: Destination;
  categoryLabel?: string;
  className?: string;
}

/** Same visual design as `AttractionsLandmarkCard`; static content only (no card-level link). */
const DestinationsGridCard = ({
  destination,
  categoryLabel = "وجهة سياحية",
  className,
}: DestinationsGridCardProps) => {
  const landmark = destinationToLandmark(destination);

  return (
    <AttractionsLandmarkCard landmark={landmark} categoryLabel={categoryLabel} className={className} />
  );
};

export default DestinationsGridCard;
