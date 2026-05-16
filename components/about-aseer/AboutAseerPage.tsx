import { getLocale, getTranslations } from "next-intl/server";
import AboutAseerHero, {
  type AboutAseerHeroData,
} from "@/components/about-aseer/AboutAseerHero";
import AboutAseerStorySection, {
  type AboutStoryContent,
} from "@/components/about-aseer/AboutAseerStorySection";
import {
  resolveAboutHighlightLandmark,
  type AboutHighlightId,
} from "@/components/about-aseer/aboutHighlightLandmarks";
import { fetchLandmarks } from "@/components/landmarks/data";

const HIGHLIGHT_IDS: AboutHighlightId[] = ["h-1", "h-2", "h-3", "h-4"];
const HIGHLIGHT_TITLE_KEYS = [
  "story.highlights.h1",
  "story.highlights.h2",
  "story.highlights.h3",
  "story.highlights.h4",
] as const;

const AboutAseerPage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("aboutAseer");
  const tCommon = await getTranslations("common");
  const landmarks = await fetchLandmarks(locale);

  const highlightCards = HIGHLIGHT_IDS.map((id, index) => {
    const landmark = resolveAboutHighlightLandmark(id, landmarks);
    return {
      id,
      title: t(HIGHLIGHT_TITLE_KEYS[index]),
      image: landmark?.image ?? "/assets/experiences/experiences.png",
      href: landmark ? `/attractions/${landmark.slug}` : undefined,
    };
  });

  const aboutPageData: {
    hero: AboutAseerHeroData;
    story: AboutStoryContent;
  } = {
    hero: {
      breadcrumbs: [
        { label: t("breadcrumbAbout") },
        { label: tCommon("breadcrumbHome"), href: "/" },
      ],
      title: t("title"),
      subtitle: t("heroSubtitle"),
      backgroundImage: "/assets/experiences/experiences.png",
      socialLinks: [
        { platform: "linkedin", url: "https://www.linkedin.com/" },
        { platform: "x", url: "https://x.com/" },
        { platform: "youtube", url: "https://www.youtube.com/" },
        { platform: "instagram", url: "https://www.instagram.com/" },
        { platform: "facebook", url: "https://www.facebook.com/" },
      ],
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
          id: "culture-1",
          image: "/assets/experiences/experiences.png",
          title: t("story.slides.culture1.title"),
          description: t("story.slides.culture1.description"),
        },
        {
          id: "nature-2",
          image: "/assets/experiences/experiences.png",
          title: t("story.slides.nature2.title"),
          description: t("story.slides.nature2.description"),
        },
        {
          id: "heritage-3",
          image: "/assets/experiences/experiences.png",
          title: t("story.slides.heritage3.title"),
          description: t("story.slides.heritage3.description"),
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
