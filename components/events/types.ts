export type EventInterestId = "adventure" | "heritage" | "culinary" | "nature";

/**
 * Event card on `/events` listing.
 * Backend mapping, suggested endpoints, and field notes: see `BACKEND.md` in this folder.
 */
export interface EventListingItem {
  id: string;
  /** Legacy / future API — not shown in current filter UI. */
  cityId: string;
  /** Tag ids for interest checkboxes (OR match when filtering). */
  interestIds: EventInterestId[];
  /** Derived from ticket price for التكلفة filter. */
  isFree: boolean;
  title: string;
  /** Exactly three hero images (carousel / hover shuffle). */
  images: [string, string, string];
  rating: number;
  reviewsCount: number;
  /** Shown in teal pill when collapsed; plain text when expanded. */
  priceLabel: string;
  /** Short location line on image overlay. */
  locationLine: string;
  /** Maps URL (Google). */
  mapsUrl: string;
  /** Link label on overlay + expanded (e.g. street). */
  mapsLinkLabel: string;
  dateRange: string;
  timeRange: string;
  /** Expanded header subtitle / venue (e.g. under title). */
  venueLabel?: string;
}
