import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FilmmakerForm from "@/components/film/FilmmakerForm";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("filmmakerForm");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FilmmakerFormPage() {
  const t = await getTranslations("filmmakerForm");

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8 bg-background px-4 py-12 text-foreground sm:px-6 md:py-16">
      <nav className="text-start">
        <Link
          href="/film"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("backToFilm")}
        </Link>
      </nav>

      <header className="flex flex-col gap-3 text-start">
        <h1
          className="text-[36px] font-bold leading-tight text-foreground sm:text-[44px]"
          style={{ fontFamily: ara }}
        >
          {t("title")}
        </h1>
        <p
          className="text-[15px] font-light leading-relaxed text-muted-foreground"
          style={{ fontFamily: ibm }}
        >
          {t("description")}
        </p>
      </header>

      <FilmmakerForm />
    </div>
  );
}
