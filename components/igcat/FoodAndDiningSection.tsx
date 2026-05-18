"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const DISH_IDS = ["1", "2", "3", "4"] as const;

type SelectedDish = {
  id: string;
  image: string;
  innerImage: string;
};

export default function FoodAndDiningSection() {
  const tSection = useTranslations("igcat.food");
  const tDish = useTranslations("igcat.igcatDishes");
  const [selectedDish, setSelectedDish] = useState<SelectedDish | null>(null);

  const openDish = (id: string) => {
    setSelectedDish({
      id,
      image: tDish(`items.${id}.image`),
      innerImage: tDish(`items.${id}.innerImage`),
    });
  };

  return (
    <div className="w-full">
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between gap-4">
            <h2 className="text-start text-[28px] font-bold leading-tight text-foreground md:text-[36px]">
              {tSection("dishesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {DISH_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => openDish(id)}
                className="group relative h-[320px] overflow-hidden rounded-2xl text-start shadow-md transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-[360px]"
              >
                <img
                  src={tDish(`items.${id}.image`)}
                  alt={tDish(`items.${id}.title`)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 start-0 end-0 z-10 p-5 md:p-6">
                  <h3 className="text-[18px] font-bold leading-tight text-white md:text-[22px]">
                    {tDish(`items.${id}.title`)}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedDish !== null}
        onClose={() => setSelectedDish(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-background text-start align-middle shadow-xl transition-all">
            {selectedDish && (
              <>
                <div className="relative h-64 w-full bg-muted sm:h-80">
                  <img
                    src={selectedDish.innerImage || selectedDish.image}
                    alt={tDish(`items.${selectedDish.id}.title`)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedDish(null)}
                    className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus:outline-none"
                    aria-label={tSection("close")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-2xl font-bold leading-6 text-foreground"
                  >
                    {tDish(`items.${selectedDish.id}.title`)}
                  </Dialog.Title>
                  <p className="text-base leading-[1.8] text-muted-foreground">
                    {tDish(`items.${selectedDish.id}.description`)}
                  </p>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
