import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import TravelTipsEmergencySection from "@/components/travel-tips/TravelTipsEmergencySection";
import TravelTipsFaq, {
  type TravelFaqItem,
} from "@/components/travel-tips/TravelTipsFaq";

const DEFAULT_FAQ_ITEMS_AR: TravelFaqItem[] = [
  {
    id: "1",
    question: 'بماذا تعدني "عسير" كوجهة سياحية؟',
    answer:
      "تُعتبر عسير من أهم الوجهات السياحية في المملكة العربية السعودية والمنطقة بأكملها، وذلك نظراً لما تمتلكه من تنوعٍ كبير في التضاريس من جبال، وسهول، ووديان، وشواطئ تتباين معه درجات الحرارة في مختلف المواسم. كما أن عسير تشتهر بمعالمها التاريخية، وأنماطها العمرانية التراثية، ومهرجاناتها المتنوعة، والمواقع الحضرية الحديثة بها، والتجارب الثقافية في الفنون والطعام والأزياء. كما يوجد بها أماكن الإقامة المتنوعة التي تناسب جميع الأذواق وتتوافق مع مختلف الميزانيات، ناهيك عن الأنشطة المتنوعة التي يمكنك القيام بها كسائح في مجتمع يُدهشك بكرم ضيافته وترحابه، وتقاليده الفريدة، وأصالة قيمة مع طموحه للمستقبل الذي يشارك منطقته في السباق إليه.",
  },
  {
    id: "2",
    question: "ما هو أفضل وقت للسياحة في عسير؟",
    answer:
      "الربيع والصيف يمنحان عسير طقساً معتدلاً في المرتفعات، مع تنوع في الفعاليات والمهرجانات. الشتاء يجلب جواً باردًا في الجبال مع مشاهد ضبابية مميزة، بينما الخريف يوفر أجواء هادئة للتنزه.",
  },
  {
    id: "3",
    question: "ما الذي يجب اصطحابه معي خلال رحلتي إلى عسير؟",
    answer:
      "يُفضّل إحضار ملابس مناسبة لتقلبات الطقس بين الساحل والمرتفعات، وأحذية مريحة للمشي، وواقٍ من الشمس، والهوية الشخصية، مع التحقق من أي متطلبات خاصة بالفعاليات أو المواقع التي تنوي زيارتها.",
  },
];

const DEFAULT_FAQ_ITEMS_EN: TravelFaqItem[] = [
  {
    id: "1",
    question: 'What does Aseer offer as a tourism destination?',
    answer:
      "Aseer is one of Saudi Arabia’s standout regions, with varied landscapes—mountains, plains, wadis and coastlines—and different weather across seasons. It blends heritage architecture, festivals, modern urban hubs and cultural experiences across food, arts and fashion, with accommodation for many budgets and activities year-round.",
  },
  {
    id: "2",
    question: "When is the best time to visit Aseer?",
    answer:
      "Spring and summer bring milder weather in the highlands plus lively events. Winter can be cool and misty in the mountains; autumn often offers calm hiking conditions.",
  },
  {
    id: "3",
    question: "What should I pack for Aseer?",
    answer:
      "Pack layers for shifts between coast and mountains, comfortable shoes, sun protection and ID. Check any extra requirements for festivals or sites you plan to visit.",
  },
];

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

async function fetchFaqItems(locale: string): Promise<TravelFaqItem[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() || FAQ_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/items/faq`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return locale === "en" ? DEFAULT_FAQ_ITEMS_EN : DEFAULT_FAQ_ITEMS_AR;
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
      : locale === "en"
        ? DEFAULT_FAQ_ITEMS_EN
        : DEFAULT_FAQ_ITEMS_AR;
  } catch {
    return locale === "en" ? DEFAULT_FAQ_ITEMS_EN : DEFAULT_FAQ_ITEMS_AR;
  }
}

const TravelTipsPage = async () => {
  const locale = await getLocale();
  const faqItems = await fetchFaqItems(locale);
  const t = await getTranslations("travelTips");
  const tCommon = await getTranslations("common");

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
          { label: t("breadcrumb") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={t("title")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/experiences/experiences.png"
      />

      <section className="bg-[#f6f6f6]">
        <TravelTipsFaq items={faqItems} />
        <TravelTipsEmergencySection contacts={emergency} />
      </section>
    </div>
  );
};

export default TravelTipsPage;
