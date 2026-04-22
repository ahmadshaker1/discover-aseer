import Hero from "@/components/Hero/Hero";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AseerCuisineRestaurantsSection from "@/components/aseer-cuisine/AseerCuisineRestaurantsSection";
import AseerCuisineSection from "@/components/aseer-cuisine/AseerCuisineSection";
import AseerCuisineCookingExperiencesSection from "@/components/aseer-cuisine/AseerCuisineCookingExperiencesSection";
import { fetchAseerCuisineDishes } from "@/components/aseer-cuisine/data";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { fetchLandmarks } from "@/components/landmarks/data";
import { fetchRestaurants } from "@/components/restaurants/data";
import { fetchExperiences } from "@/components/experiences/data";

export default async function Home() {
  const [landmarks, restaurants, experiencesResult, cuisineDishes] = await Promise.all([
    fetchLandmarks(),
    fetchRestaurants(),
    fetchExperiences(),
    fetchAseerCuisineDishes(),
  ]);

  const homeRestaurants = restaurants.slice(0, 6).map((restaurant) => ({
    id: restaurant.id,
    image: restaurant.image,
    title: restaurant.name,
    location: restaurant.location,
    cuisineType: restaurant.category || "مطعم",
    priceRange: restaurant.priceBand || restaurant.priceRange || "غير محدد",
    rating: restaurant.rating > 0 ? restaurant.rating : 4.5,
    reviewsCount: restaurant.reviewsCount ?? 0,
  }));

  const homeExperiences = experiencesResult.experiences.slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      <Hero />
      <PointsOfInterest />
      <AttractionsLandmarksSection
        landmarks={landmarks}
        title="أشهر المعالم في عسير"
        description="عسير.. ثروةٌ من المعالم والتجارب"
        decorationImageSrc="/assets/landing/landmarks-zigzag.png"
      />
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(21, 21, 131, 0.25) 100%)",
        }}
      >
        <AseerCuisineCookingExperiencesSection
          data={{
            title: "التجارب",
            description:
              "في المطبخ العسيري ستكتفي بكل ما يُشبع حواسك من منطقة واحدة، ستبدأ بشرب فنجان قهوتك من البن العسيري من أشجارها المعمرة على سفوح الجبال والمحمص بعناية ليأسر برائحته وطعمه ذائقتك مع حبات من تمر الصفري من نخيل بيشة الباسق. ثم جرب أطباقا من قمح جبالها",
            ctaLabel: "عرض الكل",
            ctaHref: "/experiences",
            cards: homeExperiences,
          }}
        />
      </div>

      <AseerCuisineRestaurantsSection
        data={{
          title: "المطاعم",
          subtitle: "عسير.. ثروةٌ من المعالم والتجارب",
          ctaLabel: "المطاعم",
          ctaHref: "/restaurants",
          showFilters: true,
          cards: homeRestaurants,
        }}
      />
      <AseerCuisineSection dishes={cuisineDishes} />
      <EventsInfo />
    </div>
  );
}
