"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const DISH_IDS = ["1", "2", "3", "4"] as const;
const RESTAURANT_IDS = ["1", "2", "3"] as const;

type SelectedDish = {
  id: string;
  image: string;
  innerImage: string;
};

export default function FoodAndDiningSection() {
  const tSection = useTranslations("igcat.food");
  const tDish = useTranslations("igcat.igcatDishes");
  const tRestaurants = useTranslations("igcat.igcatRestaurants");
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
            <div className="flex flex-col items-start w-full sm:w-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {tSection("dishesTitle")}
              </h2>
            </div>

            <div className="order-1 sm:order-2 w-full sm:w-auto flex justify-end">
              <Link
                href="/aseer-cuisine"
                className="inline-block px-8 py-2 border border-primary text-primary rounded-full text-18 hover:bg-primary/10 transition-colors dark:border-white dark:text-white dark:hover:bg-white/10"
              >
                {tSection("dishesCta")}
              </Link>
            </div>
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
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
            <div className="flex flex-col items-start w-full sm:w-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {tSection("restaurantsTitle")}
              </h2>
            </div>

            <div className="order-1 sm:order-2 w-full sm:w-auto flex justify-end">
              <Link
                href="/restaurants"
                className="inline-block px-8 py-2 border border-primary text-primary rounded-full text-18 hover:bg-primary/10 transition-colors dark:border-white dark:text-white dark:hover:bg-white/10"
              >
                {tSection("restaurantsCta")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {RESTAURANT_IDS.map((id) => (
              <Link
                key={id}
                href="/restaurants"
                className="relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-md block"
              >
                {tRestaurants(`items.${id}.image`) ? (
                  <img
                    src={tRestaurants(`items.${id}.image`)}
                    alt={tRestaurants(`items.${id}.title`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      {tSection("noRestaurants")}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-0 start-0 end-0 p-6 md:p-8 text-start z-10">
                  <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-md">
                    {tRestaurants(`items.${id}.title`)}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed drop-shadow-sm">
                    {tRestaurants(`items.${id}.description`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section></section>

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
