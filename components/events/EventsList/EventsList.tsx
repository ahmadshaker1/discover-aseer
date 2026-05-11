"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@headlessui/react";
import EventCard, { EventCardProps } from "../EventCard/EventCard";
import { CalendarIcon } from "./Icons";

const EventsList = () => {
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Sample events data - replace with actual data from API
  const events: EventCardProps[] = [
    {
      id: 1,
      imageUrl: "/assets/events/event-1.jpg",
      title: "موسم شتاء منطقة عسير 2025",
      date: "يناير 2025",
      isHappeningNow: true,
      detailsUrl: "/events/1",
    },
    {
      id: 2,
      imageUrl: "/assets/events/event-2.jpg",
      title: "موسم شتاء منطقة عسير 2025",
      date: "يناير 2025",
      isHappeningNow: true,
      detailsUrl: "/events/2",
    },
    {
      id: 3,
      imageUrl: "/assets/events/event-3.jpg",
      title: "موسم شتاء منطقة عسير 2025",
      date: "يناير 2025",
      isHappeningNow: true,
      detailsUrl: "/events/3",
    },
  ];

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleArrivalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArrivalDate = e.target.value;

    // Validate that arrival date is not in the past
    if (newArrivalDate && newArrivalDate < today) {
      setDateError("لا يمكن اختيار تاريخ في الماضي");
      return;
    }

    setArrivalDate(newArrivalDate);

    if (departureDate && newArrivalDate >= departureDate) {
      setDateError("تاريخ الوصول يجب أن يكون قبل تاريخ المغادرة");
    } else {
      setDateError("");
    }
  };

  const handleDepartureDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDepartureDate = e.target.value;

    // Validate that departure date is not in the past
    if (newDepartureDate && newDepartureDate < today) {
      setDateError("لا يمكن اختيار تاريخ في الماضي");
      return;
    }

    setDepartureDate(newDepartureDate);

    if (arrivalDate && arrivalDate >= newDepartureDate) {
      setDateError("تاريخ الوصول يجب أن يكون قبل تاريخ المغادرة");
    } else {
      setDateError("");
    }
  };

  const getDisplayText = (): string => {
    if (!arrivalDate && !departureDate) {
      return "اختر تاريخ الوصول والمغادرة";
    }
    if (arrivalDate && departureDate) {
      return `${formatDate(arrivalDate)} - ${formatDate(departureDate)}`;
    }
    if (arrivalDate) {
      return `من ${formatDate(arrivalDate)}`;
    }
    return `إلى ${formatDate(departureDate)}`;
  };

  const today = new Date().toISOString().split("T")[0];

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-20 mx-auto -mt-24 w-full max-w-[66.666667%]">
      <div className="min-h-[75vh] rounded-3xl bg-surface p-8 text-foreground shadow-lg">
        {/* Header Section with Date Picker */}
        <div className="flex justify-center mb-8">
          <div className="relative" ref={popoverRef}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <CalendarIcon className="text-muted-foreground" />
              <span className="text-base font-medium text-foreground">
                {getDisplayText()}
              </span>
            </Button>

            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-96 rounded-lg border border-border bg-surface p-6 shadow-xl">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-right text-sm font-medium text-foreground">
                      تاريخ الوصول
                    </label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={handleArrivalDateChange}
                      min={today}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-right text-sm font-medium text-foreground">
                      تاريخ المغادرة
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={handleDepartureDateChange}
                      min={arrivalDate || today}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {dateError && (
                    <p className="text-sm text-red-600 text-right">
                      {dateError}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
