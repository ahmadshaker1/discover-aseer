export interface Activity {
  id: string;
  name: string;
  type: {
    label: string; // "فطور", "فعالية", "تجربة", "غداء", "عشاء"
    icon?: string;
  };
  imageUrl: string;
  rating: {
    score: number;
    totalReviews: number;
  };
  location: {
    city: string;
    distanceKm: number;
  };
  pricing: {
    audience: string;
    minPriceSAR?: number;
    maxPriceSAR?: number;
  };
  travelInfoToNext?: {
    durationMinutes: number;
    distanceKm: number;
  };
  directionsUrl?: string;
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
