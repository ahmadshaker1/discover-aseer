import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { fetchExperienceById } from "@/components/experiences/data";

interface ExperienceDetailsPageProps {
  params: Promise<{ id: string }>;
}

const TRAVELER_MESSAGE_KEYS: Record<string, "travelerFemale" | "travelerIndividual" | "travelerCouple" | "travelerFamily" | "travelerGroups"> = {
  female: "travelerFemale",
  individual: "travelerIndividual",
  couple: "travelerCouple",
  family: "travelerFamily",
  groups: "travelerGroups",
};

export default async function ExperienceDetailsPage({
  params,
}: ExperienceDetailsPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations("experiencesDetail");
  const experience = await fetchExperienceById(id);

  if (!experience) {
    notFound();
  }

  const splitRegex = locale === "en" ? /[.!?]+/ : /[.!?؟]+/;
  const detailsParagraphs = experience.description
    .split(splitRegex)
    .map((part) => part.trim())
    .filter(Boolean);

  const currency = experience.currency ?? t("currencyFallback");

  return (
    <main className="pb-16" dir={locale === "ar" ? "rtl" : "ltr"}>
      <section className="relative h-[360px] w-full overflow-hidden md:h-[500px]">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-4 pb-8 text-white md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3 text-sm">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              {experience.category}
            </span>
            <Link
              href="/experiences"
              className="rounded-full border border-white/60 px-4 py-2 transition-colors hover:bg-white/10"
            >
              {t("backToExperiences")}
            </Link>
          </div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            {experience.title}
          </h1>
          <p className="mt-3 text-base text-white/90 md:text-lg">{experience.duration}</p>
        </div>
      </section>

      <div className="container mx-auto mt-10 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <article className="space-y-8">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-xl font-bold text-black">{t("aboutExperience")}</h2>
              <div className="space-y-4 text-[15px] leading-8 text-gray-700">
                {(detailsParagraphs.length > 0
                  ? detailsParagraphs
                  : [experience.description]
                ).map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("providerLabel")}</p>
                <p className="text-base font-semibold text-black">{experience.provider}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("priceLabel")}</p>
                <p className="text-base font-semibold text-black">
                  {experience.price} {currency}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("groupSizeLabel")}</p>
                <p className="text-base font-semibold text-black">x{experience.groupSize}</p>
              </div>
            </section>

            {experience.filterInterests.length > 0 ? (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="mb-4 text-lg font-bold text-black">{t("interestsHeading")}</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.filterInterests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-black"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {experience.filterTravelers.length > 0 ? (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="mb-4 text-lg font-bold text-black">{t("travelersHeading")}</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.filterTravelers.map((traveler) => {
                    const msgKey = TRAVELER_MESSAGE_KEYS[traveler];
                    const label = msgKey ? t(msgKey) : traveler;
                    return (
                      <span
                        key={traveler}
                        className="rounded-full bg-[#CD8CFF24] px-3 py-1.5 text-sm text-[#5A18B5]"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{t("bookingTitle")}</p>
              <p className="mt-2 text-2xl font-bold text-black">
                {experience.price} {currency}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t("groupMinimum", { size: experience.groupSize })}
              </p>
              <a
                href={experience.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#7300CD] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t("bookNow")}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
