import { getLocale, getTranslations } from "next-intl/server";
import AseerCuisineHero from "@/components/aseer-cuisine/AseerCuisineHero";
import CuisineBrowseHeader from "@/components/aseer-cuisine/CuisineBrowseHeader";
import CuisineGridCard from "@/components/aseer-cuisine/CuisineGridCard";
import { fetchCuisineItems, toCuisineCard } from "@/components/aseer-cuisine/data";

const CUISINE_VIDEO = "/videos/cooking.mp4";
const FALLBACK_POSTER = "/assets/activities/aseer-cuisine.jpg";

const AseerCuisineDishesBrowsePage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("aseerCuisine");

  const items = await fetchCuisineItems({
    locale,
    cuisineType: "dish",
    highlighted: false,
  });
  const cards = items.map(toCuisineCard);
  const posterImage = cards[0]?.image || FALLBACK_POSTER;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AseerCuisineHero
        data={{
          videoUrl: CUISINE_VIDEO,
          posterImage,
        }}
      />
      <CuisineBrowseHeader
        title={t("dishesBrowse.title")}
        backHref="/aseer-cuisine"
        backLabel={t("back")}
      />
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-8 md:px-[62px]">
        <div className="mx-auto grid w-full max-w-[1316px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <CuisineGridCard key={card.id} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AseerCuisineDishesBrowsePage;
