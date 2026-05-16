export interface SeasonListingItem {
  id: string;
  /** Primary year (from start_date) — used for display/filter. */
  year: number;
  /** All calendar years the season spans (for the year filter). */
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
