import CommunityHero, {
  type CommunityHeroData,
} from "@/components/community/CommunityHero";
import CommunityMainSlider, {
  type CommunityMainSliderContent,
} from "@/components/community/CommunityMainSlider";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import { getTranslations } from "next-intl/server";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

const SLIDE_IMAGES = [
  "/assets/community/id1.webp",
  "/assets/community/id2.webp",
  "/assets/community/id3.webp",
] as const;

const SLIDE_KEYS = ["slide1", "slide2", "slide3"] as const;

const SLIDE_IMAGE_KEYS = [
  "The Aseer cultural tapestry",
  "Community bonds",
  "A vibrant life",
] as const;

const AseerCommunityPage = async () => {
  const t = await getTranslations("aseerCommunity");
  const tCommon = await getTranslations("common");
  const tServices = await getTranslations("servicesSupport");

  const assets = await fetchSiteAssets("aseer-community");

  const communityPageData: {
    hero: CommunityHeroData;
    slider: CommunityMainSliderContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ],
      title: t("title"),
      subtitle: t("subtitle"),
      backgroundImage: getAssetUrl(
        assets,
        "Banner",
        "/assets/community/hero.webp",
      ),
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
        image: getAssetUrl(
          assets,
          SLIDE_IMAGE_KEYS[index],
          SLIDE_IMAGES[index],
        ),
        title: t(`slider.slides.${key}.title`),
        description: t(`slider.slides.${key}.description`),
      })),
    },
  };

  return (
    <div className="flex w-full flex-col">
      <CommunityHero data={communityPageData.hero} />
      <section className="">
        <CommunityMainSlider content={communityPageData.slider} />
      </section>
      <EventsInfo />
    </div>
  );
};

export default AseerCommunityPage;
