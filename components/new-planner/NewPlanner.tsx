"use client";

import { useState } from "react";
import WelcomePage from "./WelcomePage";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import ResultsPage from "./results/ResultsPage";
import { PlannerData } from "./types";

/**
 * --- Planner State Management Strategy ---
 * We use a State-based approach combined with LocalStorage:
 * 1. Navigation: `currentStep` is managed via React state.
 * 2. Data Collection: All user inputs (destinations, dates, interests) will be gathered in a central State (or Context) here.
 * 3. Persistence: The data state will be synced with `localStorage` so if the user refreshes, they won't lose their progress.
 */
export default function NewPlanner() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [plannerData, setPlannerData] = useState<PlannerData>({
    selectedDays: null,
    selectedDate: null,
    tripStyle: null,
    budget: null,
    companion: null,
    interests: [],
    mealsCount: null,
    foodPreferences: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const updatePlannerData = (updates: Partial<PlannerData>) => {
    setPlannerData((prev) => ({ ...prev, ...updates }));
  };

  const handleStartPlanning = () => {
    // Proceed to the first actual planning step
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Sending data to /api/new-planner:", plannerData);

      const res = await fetch("/api/new-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plannerData),
      });

      const data = await res.json();
      console.log("✅ AI Plan Generated Successfully:");
      console.log(data);

      // Navigate to results page
      setGeneratedPlan(data);
      setCurrentStep(5);
    } catch (err) {
      console.error("❌ Error generating plan:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/*For the welcome page*/}
      {currentStep === 0 && (
        <WelcomePage onStartPlanning={handleStartPlanning} />
      )}

      {/*For the steps*/}
      {currentStep === 1 && (
        <Step1
          onNext={() => setCurrentStep(2)}
          onPrev={() => setCurrentStep(0)}
          plannerData={plannerData}
          updatePlannerData={updatePlannerData}
        />
      )}

      {currentStep === 2 && (
        <Step2
          onPrev={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
          plannerData={plannerData}
          updatePlannerData={updatePlannerData}
        />
      )}

      {currentStep === 3 && (
        <Step3
          onPrev={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
          plannerData={plannerData}
          updatePlannerData={updatePlannerData}
        />
      )}
      {currentStep === 4 && (
        <Step4
          onPrev={() => setCurrentStep(3)}
          onSubmit={handleSubmit}
          plannerData={plannerData}
          updatePlannerData={updatePlannerData}
          isSubmitting={isSubmitting}
        />
      )}

      {currentStep === 5 && (
        <ResultsPage
          data={generatedPlan}
          plannerData={plannerData}
          onRestart={() => {
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
