import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import TravelTipsEmergencySection from "@/components/travel-tips/TravelTipsEmergencySection";
import TravelTipsFaq, {
  type TravelFaqItem,
} from "@/components/travel-tips/TravelTipsFaq";

const FAQ_ITEM_IDS = ["1", "2", "3"] as const;

type ApiFaqQuestion = {
  question_ar?: string | null;
  answer_ar?: string | null;
  question_en?: string | null;
  answer_en?: string | null;
};

type ApiFaqItem = {
  id?: string | number;
  questions?: ApiFaqQuestion[];
};

type ApiFaqResponse = {
  data?: ApiFaqItem[] | ApiFaqItem;
};

const FAQ_API_BASE_URL = "https://tool-portal.discoveraseer.com";

async function fetchFaqItems(
  locale: string,
  fallbackItems: TravelFaqItem[]
): Promise<TravelFaqItem[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() || FAQ_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/items/faq`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return fallbackItems;
    }

    const payload = (await response.json()) as ApiFaqResponse;
    const records = Array.isArray(payload.data)
      ? payload.data
      : payload.data
        ? [payload.data]
        : [];

    const mapped: TravelFaqItem[] = records.flatMap((record, recordIndex) => {
      const questions = Array.isArray(record.questions) ? record.questions : [];

      return questions
        .map((item, questionIndex) => {
          const question =
            locale === "en"
              ? item.question_en?.trim() || item.question_ar?.trim() || ""
              : item.question_ar?.trim() || item.question_en?.trim() || "";
          const answer =
            locale === "en"
              ? item.answer_en?.trim() || item.answer_ar?.trim() || ""
              : item.answer_ar?.trim() || item.answer_en?.trim() || "";

          if (!question || !answer) {
            return null;
          }

          return {
            id: `${record.id ?? recordIndex}-${questionIndex}`,
            question,
            answer,
          };
        })
        .filter((item): item is TravelFaqItem => item !== null);
    });

    return mapped.length > 0
      ? mapped
      : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

const TravelTipsPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations("travelTips");
  const tCommon = await getTranslations("common");

  const defaultFaqItems: TravelFaqItem[] = FAQ_ITEM_IDS.map((id) => ({
    id,
    question: t(`faq.items.${id}.question`),
    answer: t(`faq.items.${id}.answer`),
  }));

  const faqItems = await fetchFaqItems(locale, defaultFaqItems);

  const emergency = [
    { id: "e1", title: t("emergencyPolice"), number: "911" },
    { id: "e2", title: t("emergencyCivilDefense"), number: "998" },
    { id: "e3", title: t("emergencyAmbulance"), number: "997" },
    { id: "e4", title: t("emergencyRoadSecurity"), number: "996" },
    { id: "e5", title: t("emergencyTraffic"), number: "993" },
    { id: "e6", title: t("emergencyTourism"), number: "930" },
    { id: "e7", title: t("emergencyFire"), number: "998" },
    { id: "e8", title: t("emergencyGeneralSecurity"), number: "911" },
  ];

  return (
    <div className="flex w-full flex-col">
      <PageBanner
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: t("breadcrumb") },
        ]}
        title={t("title")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/experiences/experiences.png"
      />

      <section className="bg-background text-foreground">
        <TravelTipsFaq items={faqItems} />
        <TravelTipsEmergencySection contacts={emergency} />
      </section>
    </div>
  );
};

export default TravelTipsPage;
