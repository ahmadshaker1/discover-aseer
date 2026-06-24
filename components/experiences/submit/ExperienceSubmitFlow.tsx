"use client";

import ExperienceSubmitForm from "@/components/experiences/submit/ExperienceSubmitForm";
import ExperienceSubmitHero from "@/components/experiences/submit/ExperienceSubmitHero";

const ExperienceSubmitFlow = () => {
  return (
    <div className="flex min-h-0 w-full flex-col bg-background pb-4 text-foreground sm:pb-6">
      <ExperienceSubmitHero />
      <div className="w-full px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:px-8 lg:pb-32 lg:pt-14">
        <ExperienceSubmitForm />
      </div>
    </div>
  );
};

export default ExperienceSubmitFlow;
