export interface Activity {
  type: string;
  time: string;
  title: string;
  rating: number | string;
  reviewsCount: number;
  locationText: string;
  category: string;
  priceRange: string;
  googleMapsUrl?: string;
  travelToNext?: {
    duration: string;
    distance: string;
  } | null;
}

export interface DayPlan {
  dayLabel: string; // "اليوم الأول", "اليوم الثاني", etc.
  date: string; // "18 ديسمبر"
  activities: Activity[];
}

export interface PlanResponse {
  planDetails: {
    title: string;
    totalDays: number;
  };
  days: DayPlan[];
}
