import { getTranslations } from "next-intl/server";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";
import AboutAseerHero, {
  type AboutAseerHeroData,
} from "@/components/about-aseer/AboutAseerHero";
import AboutAseerStorySection, {
  type AboutStoryContent,
} from "@/components/about-aseer/AboutAseerStorySection";
import {
  ABOUT_ASEER_HIGHLIGHT_DESTINATION_FILTERS,
  LANDSCAPE_HIGHLIGHT_IMAGES,
} from "@/components/destinations/filterOptions";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

const HIGHLIGHT_TITLE_KEYS = [
  "story.highlights.h1",
  "story.highlights.h2",
  "story.highlights.h3",
  "story.highlights.h4",
] as const;

const AboutAseerPage = async () => {
  const t = await getTranslations("aboutAseer");
  const tCommon = await getTranslations("common");

  const assets = await fetchSiteAssets("aboutAseer");

  const getAssetImage = (key: string, fallback: string) => {
    return getAssetUrl(assets, key, fallback);
  };

  const HIGHLIGHT_KEYS = [
    "Mountain peaks",
    "Tihama plains",
    "coastal beaches",
    "desert nature",
  ];

  const highlightCards = HIGHLIGHT_TITLE_KEYS.map((titleKey, index) => ({
    id: `h-${index + 1}`,
    title: t(titleKey),
    image: getAssetImage(
      HIGHLIGHT_KEYS[index],
      LANDSCAPE_HIGHLIGHT_IMAGES[index],
    ),
    href: {
      pathname: "/destinations",
      query: { filter: ABOUT_ASEER_HIGHLIGHT_DESTINATION_FILTERS[index] },
    },
  }));

  const aboutPageData: {
    hero: AboutAseerHeroData;
    story: AboutStoryContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumbAbout") },
      ],
      title: t("title"),
      subtitle: t("heroSubtitle"),
      backgroundImage: getAssetImage(
        "Banner",
        "/assets/aboutAseer/about_banner.webp",
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
    story: {
      sectionTitle: t("story.sectionTitle"),
      sectionSubtitle: t("story.sectionSubtitle"),
      sectionCaption: t("story.sectionCaption"),
      highlightCards,
      slides: [
        {
          id: "culture-1",
          image: getAssetImage(
            "Culture and Arts",
            "/assets/aboutAseer/culture.jpg",
          ),
          title: t("story.slides.culture1.title"),
          description: t("story.slides.culture1.description"),
        },
        {
          id: "nature-2",
          image: getAssetImage(
            "Breathtaking Nature",
            "/assets/aboutAseer/nature.jpg",
          ),
          title: t("story.slides.nature2.title"),
          description: t("story.slides.nature2.description"),
        },
        {
          id: "heritage-3",
          image: getAssetImage(
            "A Legacy of Pride",
            "/assets/aboutAseer/heritage.jpg",
          ),
          title: t("story.slides.heritage3.title"),
          description: t("story.slides.heritage3.description"),
        },
        {
          id: "architectural-4",
          image: getAssetImage(
            "Architectural Heritage",
            "/assets/aboutAseer/architectural.jpg",
          ),
          title: t("story.slides.architectural4.title"),
          description: t("story.slides.architectural4.description"),
        },
        {
          id: "culinaryArts-5",
          image: getAssetImage(
            "Culinary Arts",
            "/assets/aboutAseer/culinary.jpg",
          ),
          title: t("story.slides.culinaryArts5.title"),
          description: t("story.slides.culinaryArts5.description"),
        },
      ],
    },
  };
  return (
    <div className="flex w-full flex-col">
      <AboutAseerHero data={aboutPageData.hero} />
      <section className="bg-background text-foreground">
        <AboutAseerStorySection content={aboutPageData.story} />
      </section>
    </div>
  );
};

export default AboutAseerPage;
