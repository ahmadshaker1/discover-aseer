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
  /** Unique image URLs for the card carousel (at least one). */
  images: string[];
  /** True when the event is suitable for children (`suitable_for_kids` / family audience). */
  isKidFriendly: boolean;
  /** True when the event end date is before today. */
  isOver: boolean;
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
  price?: string | number | null;
  startDate?: string | null;
  endDate?: string | null;
  /** Expanded header subtitle / venue (e.g. under title). */
  venueLabel?: string;
}
