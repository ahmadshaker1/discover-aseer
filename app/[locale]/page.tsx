import { getLocale } from "next-intl/server";
import Hero from "@/components/Hero/Hero";
import LandingWelcomeSection from "@/components/landing/LandingWelcomeSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AseerExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import LandingStoriesFromAseerSection from "@/components/landing/LandingStoriesFromAseerSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { fetchLandmarks } from "@/components/landmarks/data";
import { fetchRestaurants } from "@/components/restaurants/data";
import { fetchExperiences } from "@/components/experiences/data";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";

export default async function LocalizedHomePage() {
  const locale = (await getLocale()) as "ar" | "en";
  const [landmarks, restaurants, experiencesResult] = await Promise.all([
    fetchLandmarks(locale),
    fetchRestaurants(locale),
    fetchExperiences(),
  ]);

  const homeExperiences = experiencesResult.experiences.slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      <Hero
        title={locale === "ar" ? "ألف مرحبا بكم في عسير" : "A warm welcome to Aseer"}
        subtitle={
          locale === "ar"
            ? "حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا من الثقافة والمغامرة والجمال الذي لا مثيل له."
            : "Where timeless traditions meet stunning landscapes, with a unique blend of culture, adventure and unmatched beauty."
        }
      />
      <LandingWelcomeSection
        title={locale === "ar" ? "اكتشف عسير" : "Discover Aseer"}
        description={
          locale === "ar"
            ? "في ثنائيات من البهاء؛ تلتقي قمم الجبال مع لؤلؤ الشطآن الصافية، وتصافح الرمال الذهبية الهضاب الخضراء. طبيعة يتماهى فيها المطر مع دفء السهول، ويختال فيها الضباب مع شموخ المكان."
            : "Aseer unites mountain peaks with clear coastlines and golden dunes with green highlands. Nature here blends rain, warmth and mist in a singular landscape."
        }
        cards={
          locale === "ar"
            ? [
                { title: "الفعاليات و المواسم", href: "/events", image: "/assets/landing/fireworks.png" },
                { title: "التجارب", href: "/experiences", image: "/assets/activities/activities.jpg" },
                { title: "واجهات رئيسية", href: "/destinations/browse", image: "/assets/landing/city1.jpg" },
                { title: "الإقامة في عسير", href: "/accommodation", image: "/assets/landing/manwalking.jpg" },
                { title: "المطبخ العسيري", href: "/aseer-cuisine", image: "/assets/activities/aseer-cuisine.jpg" },
                { title: "المعالم السياحية", href: "/attractions", image: "/assets/experiences/experiences.png" },
              ]
            : [
                { title: "Events & seasons", href: "/events", image: "/assets/landing/fireworks.png" },
                { title: "Experiences", href: "/experiences", image: "/assets/activities/activities.jpg" },
                { title: "Main destinations", href: "/destinations/browse", image: "/assets/landing/city1.jpg" },
                { title: "Stay in Aseer", href: "/accommodation", image: "/assets/landing/manwalking.jpg" },
                { title: "Aseeri cuisine", href: "/aseer-cuisine", image: "/assets/activities/aseer-cuisine.jpg" },
                { title: "Attractions", href: "/attractions", image: "/assets/experiences/experiences.png" },
              ]
        }
      />
      <PointsOfInterest />
      <AttractionsLandmarksSection
        landmarks={landmarks}
        title={locale === "ar" ? "أشهر المعالم في عسير" : "Top attractions in Aseer"}
        description={locale === "ar" ? "عسير.. ثروةٌ من المعالم والتجارب" : "Aseer is rich with attractions and experiences"}
        decorationImageSrc="/assets/landing/landmarks-zigzag.png"
        landmarkCardHref="/attractions"
      />
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(21, 21, 131, 0.25) 100%)",
        }}
      >
        <AseerExperiencesSection
          data={{
            title: locale === "ar" ? "تجارب في عسير" : "Experiences in Aseer",
            description:
              locale === "ar"
                ? "في المطبخ العسيري ستكتفي بكل ما يُشبع حواسك من منطقة واحدة، ستبدأ بشرب فنجان قهوتك من البن العسيري من أشجارها المعمرة على سفوح الجبال والمحمص بعناية ليأسر برائحته وطعمه ذائقتك مع حبات من تمر الصفري من نخيل بيشة الباسق. ثم جرب أطباقا من قمح جبالها"
                : "Discover unique local experiences, mountain culture and authentic hospitality across Aseer.",
            ctaLabel: locale === "ar" ? "عرض الكل" : "View all",
            ctaHref: "/experiences",
            cards: homeExperiences,
          }}
        />
      </div>

      <LandingStoriesFromAseerSection
        title={locale === "ar" ? "قصص من عسير" : "Stories from Aseer"}
        playVideoLabelPrefix={locale === "ar" ? "تشغيل الفيديو" : "Play video"}
      />
      <EventsInfo />
    </div>
  );
}

