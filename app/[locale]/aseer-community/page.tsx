import CommunityHero, {
  type CommunityHeroData,
} from "@/components/community/CommunityHero";
import CommunityMainSlider, {
  type CommunityMainSliderContent,
} from "@/components/community/CommunityMainSlider";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import { getTranslations } from "next-intl/server";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";

const SLIDE_IMAGES = [
  "/assets/community/id1.webp",
  "/assets/community/id2.webp",
  "/assets/community/id3.webp",
] as const;

const SLIDE_KEYS = ["slide1", "slide2", "slide3"] as const;

const AseerCommunityPage = async () => {
  const t = await getTranslations("aseerCommunity");
  const tCommon = await getTranslations("common");
  const tServices = await getTranslations("servicesSupport");

  const communityPageData: {
    hero: CommunityHeroData;
    slider: CommunityMainSliderContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: tServices("bannerCrumb") },
      ],
      title: t("title"),
      subtitle: t("subtitle"),
      backgroundImage: "/assets/community/hero.webp",
      //!i dont thik we have this in the project
      // ribbonPatternImage: "/hero-pattern/ribbon.jpg",
      socialLinks: discoverAseerLinks
        .filter((link) =>
          ["x", "youtube", "instagram", "facebook"].includes(link.platform),
        )
        .map((link) => ({
          platform: link.platform,
          url: link.href,
        })),
    },
    slider: {
      sectionTitle: t("slider.sectionTitle"),
      sectionSubtitle: t("slider.sectionSubtitle"),
      prevLabel: tCommon("previous"),
      nextLabel: tCommon("next"),
      slides: SLIDE_KEYS.map((key, index) => ({
        id: `community-${index + 1}`,
        image: SLIDE_IMAGES[index],
        title: t(`slider.slides.${key}.title`),
        description: t(`slider.slides.${key}.description`),
      })),
    },
  };

  return (
    <div className="flex w-full flex-col">
      <CommunityHero data={communityPageData.hero} />
      <section className="bg-surface">
        <CommunityMainSlider content={communityPageData.slider} />
      </section>
      <EventsInfo />
    </div>
  );
};

export default AseerCommunityPage;
