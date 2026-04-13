"use client";

import { useState } from "react";
import PlannerForm from "./PlannerForm";
import ScheduleDisplay from "./ScheduleDisplay";
import { PlanResponse } from "./types";

const PlannerPageContent = () => {
  const [schedule, setSchedule] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    description: string;
    city: string | null;
    arrivalDate: string;
    departureDate: string;
    duration: string | null;
    interests: string[];
  }) => {
    // Prevent multiple simultaneous submissions
    if (isLoading || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setError(null);
    setSchedule(null);

    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate schedule");
      }

      const result = await response.json();
      // Handle both old string format and new JSON format
      if (typeof result.schedule === "string") {
        // Legacy format - convert to new format or show error
        setError("يرجى تحديث الصفحة والمحاولة مرة أخرى");
      } else {
        setSchedule(result.schedule as PlanResponse);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الجدول",
      );
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <PlannerForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-right">
          {error}
        </div>
      )}

      {schedule && <ScheduleDisplay schedule={schedule} />}
    </div>
  );
};

export default PlannerPageContent;
