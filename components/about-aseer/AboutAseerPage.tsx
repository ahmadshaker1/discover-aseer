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

const HIGHLIGHT_TITLE_KEYS = [
  "story.highlights.h1",
  "story.highlights.h2",
  "story.highlights.h3",
  "story.highlights.h4",
] as const;

const AboutAseerPage = async () => {
  const t = await getTranslations("aboutAseer");
  const tCommon = await getTranslations("common");

  const highlightCards = HIGHLIGHT_TITLE_KEYS.map((titleKey, index) => ({
    id: `h-${index + 1}`,
    title: t(titleKey),
    image: LANDSCAPE_HIGHLIGHT_IMAGES[index],
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
      backgroundImage: "/assets/aboutAseer/about_banner.webp",
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
      prevLabel: tCommon("previous"),
      nextLabel: tCommon("next"),
      highlightCards,
      slides: [
        {
          id: "heritage-3",
          image: "/assets/aboutAseer/heritage.jpg",
          title: t("story.slides.heritage3.title"),
          description: t("story.slides.heritage3.description"),
        },
        {
          id: "nature-2",
          image: "/assets/aboutAseer/nature.jpg",
          title: t("story.slides.nature2.title"),
          description: t("story.slides.nature2.description"),
        },
        {
          id: "culture-1",
          image: "/assets/aboutAseer/culture.jpg",
          title: t("story.slides.culture1.title"),
          description: t("story.slides.culture1.description"),
        },
        {
          id: "architectural-4",
          image: "/assets/aboutAseer/architectural.jpg",
          title: t("story.slides.architectural4.title"),
          description: t("story.slides.architectural4.description"),
        },
        {
          id: "culinaryArts-5",
          image: "/assets/aboutAseer/culinary.jpg",
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
