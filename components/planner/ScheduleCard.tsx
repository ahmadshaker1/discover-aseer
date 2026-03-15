"use client";

import { Activity } from "./types";
import { LocationIcon } from "../landmarks/Icons";

interface ScheduleCardProps {
  activity: Activity;
  onDirectionsClick?: (url?: string) => void;
}

const ScheduleCard = ({ activity, onDirectionsClick }: ScheduleCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "فطور":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M8.1 13.34L11 16.24V21H13V16.24L15.9 13.34L19.34 16.78L21.22 14.9L17.78 11.46L20.9 8.34C21.5 7.74 21.5 6.81 20.9 6.21L17.79 3.1C17.19 2.5 16.26 2.5 15.66 3.1L12.54 6.22L9.1 2.78L7.22 4.66L10.66 8.1L8.1 10.66L4.66 7.22L2.78 9.1L6.22 12.54L3.1 15.66C2.5 16.26 2.5 17.19 3.1 17.79L6.21 20.9C6.81 21.5 7.74 21.5 8.34 20.9L11.46 17.78L8.1 13.34Z"
              fill="white"
            />
          </svg>
        );
      case "غداء":
      case "عشاء":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M8.1 13.34L11 16.24V21H13V16.24L15.9 13.34L19.34 16.78L21.22 14.9L17.78 11.46L20.9 8.34C21.5 7.74 21.5 6.81 20.9 6.21L17.79 3.1C17.19 2.5 16.26 2.5 15.66 3.1L12.54 6.22L9.1 2.78L7.22 4.66L10.66 8.1L8.1 10.66L4.66 7.22L2.78 9.1L6.22 12.54L3.1 15.66C2.5 16.26 2.5 17.19 3.1 17.79L6.21 20.9C6.81 21.5 7.74 21.5 8.34 20.9L11.46 17.78L8.1 13.34Z"
              fill="white"
            />
          </svg>
        );
      case "فعالية":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM16 13C14.27 13 11.81 14.34 11.81 16V19H20.19V16C20.19 14.34 17.73 13 16 13ZM8 13C6.27 13 3.81 14.34 3.81 16V19H12.19V16C12.19 14.34 9.73 13 8 13Z"
              fill="white"
            />
          </svg>
        );
      case "تجربة":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="white"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatPrice = () => {
    if (activity.pricing.minPriceSAR && activity.pricing.maxPriceSAR) {
      return `${activity.pricing.minPriceSAR}-${activity.pricing.maxPriceSAR} ر.س`;
    } else if (activity.pricing.minPriceSAR) {
      return `${activity.pricing.minPriceSAR}+ ر.س`;
    }
    return "غير محدد";
  };

  const handleDirections = () => {
    if (activity.directionsUrl) {
      window.open(activity.directionsUrl, "_blank", "noopener,noreferrer");
    } else if (onDirectionsClick) {
      onDirectionsClick(activity.directionsUrl);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="flex flex-row-reverse">
        {/* Image Section */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
          <img
            src={activity.imageUrl || "/assets/experiences/experiences.png"}
            alt={activity.name}
            className="w-full h-full object-cover"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-[#1a1a1a] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            {getTypeIcon(activity.type.label)}
            <span className="text-white text-xs font-medium">
              {activity.type.label}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-right mb-2 text-black">
              {activity.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-right mb-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-700">
                {activity.rating.score.toFixed(1)}/5
              </span>
              <span className="text-sm text-gray-500">
                ({activity.rating.totalReviews})
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-right mb-2">
              <LocationIcon />
              <span className="text-sm text-gray-700">
                {activity.location.distanceKm} كم، {activity.location.city}
              </span>
            </div>

            {/* Price and Audience */}
            <div className="flex items-center gap-2 text-right">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-500"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="#9B9B9C"
                />
              </svg>
              <span className="text-sm text-gray-700">
                {activity.pricing.audience} • {formatPrice()}
              </span>
            </div>
          </div>
        </div>

        {/* Directions Button */}
        <div className="flex items-center p-4">
          <button
            onClick={handleDirections}
            className="bg-[#6027D2] hover:bg-[#5020B8] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-medium">الاتجاهات</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
