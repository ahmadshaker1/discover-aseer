"use client";

import { useState } from "react";
import WelcomePage from "./WelcomePage";

export default function NewPlanner() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStartPlanning = () => {
    // Proceed to the first actual planning step
    setCurrentStep(1);
  };

  return (
    <>
      {/*For the welcome page*/}
      {currentStep === 0 && (
        <WelcomePage onStartPlanning={handleStartPlanning} />
      )}

      {/*For the steps*/}
      {currentStep === 1 && (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <h2 className="text-3xl font-bold">
            Step 1: Choose your preferences
          </h2>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => setCurrentStep(0)}
          >
            Back to Welcome
          </button>
        </div>
      )}
    </>
  );
}
