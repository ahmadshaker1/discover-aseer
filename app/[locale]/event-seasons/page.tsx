import { getTranslations } from "next-intl/server";

export default async function EventSeasonsPage() {
  const t = await getTranslations("events");

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-[720px] flex-col gap-4 px-4 py-16 text-center text-foreground">
      <h1 className="text-3xl font-bold text-secondary">{t("seasonsPageTitle")}</h1>
      <p className="text-lg text-muted-foreground">{t("seasonsPageBody")}</p>
    </div>
  );
}
