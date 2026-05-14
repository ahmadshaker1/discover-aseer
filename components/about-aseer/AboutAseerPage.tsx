import { getTranslations } from "next-intl/server";
import AboutAseerHero, {
  type AboutAseerHeroData,
} from "@/components/about-aseer/AboutAseerHero";
import AboutAseerStorySection, {
  type AboutStoryContent,
} from "@/components/about-aseer/AboutAseerStorySection";

const AboutAseerPage = async () => {
  const t = await getTranslations("aboutAseer");
  const tCommon = await getTranslations("common");

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
      backgroundImage: "/assets/aboutAseer/HeroImage.png",
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
      highlightCards: [
        {
          id: "h-1",
          image: "/assets/aboutAseer/mountains.png",
          title: t("story.highlights.h1"),
        },
        {
          id: "h-2",
          image: "/assets/aboutAseer/plains.png",
          title: t("story.highlights.h2"),
        },
        {
          id: "h-3",
          image: "/assets/aboutAseer/beaches.jpg",
          title: t("story.highlights.h3"),
        },
        {
          id: "h-4",
          image: "/assets/aboutAseer/desert.jpg",
          title: t("story.highlights.h4"),
        },
      ],
      slides: [
        {
          id: "culture-1",
          image: "/assets/aboutAseer/ID1.webp",
          title: t("story.slides.culture1.title"),
          description: t("story.slides.culture1.description"),
        },
        {
          id: "nature-2",
          image: "/assets/aboutAseer/ID2.webp",
          title: t("story.slides.nature2.title"),
          description: t("story.slides.nature2.description"),
        },
        {
          id: "heritage-3",
          image: "/assets/aboutAseer/ID3.webp",
          title: t("story.slides.heritage3.title"),
          description: t("story.slides.heritage3.description"),
        },
        {
          id: "architectural-4",
          image: "/assets/aboutAseer/ID4.webp",
          title: t("story.slides.architectural4.title"),
          description: t("story.slides.architectural4.description"),
        },
        {
          id: "culinaryArts-5",
          image: "/assets/aboutAseer/ID5.webp",
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
