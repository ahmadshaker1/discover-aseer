export interface SeasonListingItem {
  id: string;
  year: number;
  years: number[];
  title: string;
  imageUrl: string;
  dateRange: string;
  isHappeningNow: boolean;
}

export interface PreviousSeasonItem {
  id: string;
  title: string;
  dateRange: string;
  imageUrl: string;
}

export interface EventSeasonsPageData {
  currentSeasons: SeasonListingItem[];
  previousSeasons: PreviousSeasonItem[];
}

export type SeasonEventCategoryId =
  | "all"
  | "nature"
  | "sports"
  | "cultural"
  | "tech"
  | "entertainment"
  | "creative";

export interface SeasonDetail {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  startDate: string;
  endDate: string;
  dateRangeLabel: string;
}

import type { EventListingItem } from "@/components/events/types";

export interface SeasonDetailEvent {
  listing: EventListingItem;
  categoryIds: SeasonEventCategoryId[];
  startDate: string | null;
  endDate: string | null;
}

export interface SeasonDetailPageData {
  season: SeasonDetail;
  events: SeasonDetailEvent[];
}

export interface SeasonEventDetail {
  season: SeasonDetail;
  event: SeasonDetailEvent;
  description: string;
  categoryLabels: string[];
}
