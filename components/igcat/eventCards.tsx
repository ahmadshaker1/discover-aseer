"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";
import { getAssetUrl } from "@/lib/siteAssets";

const IGCAT_EVENTS_DATA = [
  {
    id: "1",
    type: "single",
    image: "/assets/igcat/event/1.jpeg",
    assetKey: "Featured events 22",
    innerImage: "/assets/igcat/event/1.1.jpg",
    innerAssetKey: "Featured events 22 Inner",
  },
  {
    id: "2",
    type: "multiple",
    cards: [
      {
        id: "card1",
        image: "/assets/igcat/event/2.png",
        assetKey: "Featured events 23 (1)",
        innerImage: "/assets/igcat/event/2.2.jpg",
        innerAssetKey: "Featured events 23 (1) inner",
      },
      {
        id: "card2",
        image: "/assets/igcat/event/3.png",
        assetKey: "Featured events 23 (2)",
        innerImage: "/assets/igcat/event/4.jpg",
        innerAssetKey: "Featured events 23 (2) inner",
      },
      {
        id: "card3",
        image: "/assets/igcat/event/5.png",
        assetKey: "Featured events 23 (3)",
        innerImage: "/assets/igcat/event/6.jpg",
        innerAssetKey: "Featured events 23 (3) inner",
      },
      {
        id: "card4",
        image: "/assets/igcat/event/7.png",
        assetKey: "Featured events 23 (4)",
        innerImage: "/assets/igcat/event/8.jpg",
        innerAssetKey: "Featured events 23 (4) inner",
      },
      {
        id: "card5",
        image: "/assets/igcat/event/9.png",
        assetKey: "Featured events 23 (5)",
        innerImage: "/assets/igcat/event/10.jpg",
        innerAssetKey: "Featured events 23 (5) inner",
      },
    ],
  },
  {
    id: "3",
    type: "multiple",
    cards: [
      {
        id: "card1",
        image: "/assets/igcat/event/3.1.png",
        assetKey: "Featured events 24 (1)",
        innerImage: "/assets/igcat/event/3.1.1.jpg",
        innerAssetKey: "Featured events 24 (1) inner",
      },
      {
        id: "card2",
        image: "/assets/igcat/event/3.2.png",
        assetKey: "Featured events 24 (2)",
        innerImage: "/assets/igcat/event/3.2.1.jpg",
        innerAssetKey: "Featured events 24 (2) inner",
      },
    ],
  },
  {
    id: "4",
    type: "multiple",
    cards: [
      {
        id: "card1",
        image: "/assets/igcat/event/4.1.png",
        assetKey: "Featured events 25-1",
        innerImage: "/assets/igcat/event/4.1.1.jpg",
        innerAssetKey: "Featured events 25-1 inner",
      },
      {
        id: "card2",
        image: "/assets/igcat/event/4.2.png",
        assetKey: "Featured events 25-2",
        innerImage: "/assets/igcat/event/4.2.1.jpg",
        innerAssetKey: "Featured events 25-2 inner",
      },
      {
        id: "card3",
        image: "/assets/igcat/event/4.3.png",
        assetKey: "Featured events 25-3",
        innerImage: "/assets/igcat/event/4.3.1.jpg",
        innerAssetKey: "Featured events 25-3 inner",
      },
    ],
  },
  {
    id: "5",
    type: "single",
    image: "/assets/igcat/event/5.1.png",
    assetKey: "Featured events 3",
    innerImage: "/assets/igcat/event/5.1.1.jpg",
    innerAssetKey: "Featured events 3 inner",
  },
];

interface Props {
  assets?: Record<string, string>;
}

export default function IGCatEventCards({ assets = {} }: Props) {
  const t = useTranslations("igcat.events");
  const [activeIndex, setActiveIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    image: string;
    innerImage: string;
    isSingle?: boolean;
  } | null>(null);

  const activeTab = IGCAT_EVENTS_DATA[activeIndex];

  const handleCardClick = (
    cardId: string,
    image: string,
    innerImage: string = image,
    isSingle: boolean = false,
  ) => {
    setSelectedCard({ id: cardId, image, innerImage, isSingle });
    setIsModalOpen(true);
  };

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-auto flex flex-col md:flex-row justify-between text-start mb-8 gap-6">
          <div className="flex flex-col items-start text-start hover:cursor-pointer">
            {/* <span className="mb-4 inline-block rounded-full border border-primary px-5 py-1 text-[14px] font-bold text-primary ">
              {t("badge")}
            </span> */}
            <h2 className="text-[32px] font-bold text-foreground md:text-[40px]">
              {t("title")}
            </h2>
          </div>
          <div className="flex items-center text-start">
            <p className="max-w-3xl text-[18px]">{t("discription")}</p>
          </div>
        </div>

        <div
          className="hide-scrollbar mb-8 flex justify-start gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {IGCAT_EVENTS_DATA.map((tab, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-[40px] px-6 shrink-0 flex-col items-center justify-center rounded-[999px] border transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-center text-[14px] font-bold leading-tight whitespace-nowrap">
                  {t(`items.${tab.id}.tabTop`)}
                </span>
              </button>
            );
          })}
        </div>

        {activeTab.type === "single" ? (
          <div
            className="group relative h-[380px] w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            onClick={() =>
              handleCardClick(
                activeTab.id,
                getAssetUrl(
                  assets,
                  activeTab.assetKey as string,
                  activeTab.image as string,
                ),
                getAssetUrl(
                  assets,
                  (activeTab as any).innerAssetKey,
                  (activeTab as any).innerImage,
                ),
                true,
              )
            }
          >
            <img
              src={getAssetUrl(
                assets,
                activeTab.assetKey as string,
                activeTab.image as string,
              )}
              alt={t(`items.${activeTab.id}.title`)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-start">
              <h3 className="mb-2 text-[24px] font-bold text-white md:text-[32px]">
                {t(`items.${activeTab.id}.title`)}
              </h3>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3 w-full">
            {activeTab.cards?.map((card) => (
              <div
                key={card.id}
                className="group relative h-[300px] sm:h-[350px] w-full overflow-hidden rounded-2xl shadow-md cursor-pointer"
                onClick={() =>
                  handleCardClick(
                    card.id,
                    getAssetUrl(assets, card.assetKey, card.image),
                    getAssetUrl(
                      assets,
                      (card as any).innerAssetKey,
                      (card as any).innerImage,
                    ),
                  )
                }
              >
                <img
                  src={getAssetUrl(assets, card.assetKey, card.image)}
                  alt={t(`items.${activeTab.id}.${card.id}.title`)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-3 text-start">
                  <h4 className="text-white font-bold text-[24px] md:text-[24px] leading-tight mb-2">
                    {t(`items.${activeTab.id}.${card.id}.title`)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-background text-start align-middle shadow-xl transition-all">
            {selectedCard && (
              <>
                <div className="relative h-64 sm:h-80 w-full bg-muted">
                  <img
                    src={selectedCard.innerImage || selectedCard.image}
                    alt={
                      selectedCard.isSingle
                        ? t(`items.${activeTab.id}.title`)
                        : t(`items.${activeTab.id}.${selectedCard.id}.title`)
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
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
                    className="text-2xl font-bold leading-6 text-foreground mb-4"
                  >
                    {selectedCard.isSingle
                      ? t(`items.${activeTab.id}.title`)
                      : t(`items.${activeTab.id}.${selectedCard.id}.title`)}
                  </Dialog.Title>
                  <p className="text-base text-muted-foreground leading-[1.8]">
                    {selectedCard.isSingle
                      ? t(`items.${activeTab.id}.description`)
                      : t(
                          `items.${activeTab.id}.${selectedCard.id}.description`,
                        )}
                  </p>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
