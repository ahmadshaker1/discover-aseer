import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchExperienceById } from "@/components/experiences/data";

interface ExperienceDetailsPageProps {
  params: Promise<{ id: string }>;
}

const travelerLabels: Record<string, string> = {
  female: "مسافرة منفردة",
  individual: "رحلة فردية",
  couple: "زوج",
  family: "عائلة و أطفال",
  groups: "رحلة جماعية",
};

export default async function ExperienceDetailsPage({
  params,
}: ExperienceDetailsPageProps) {
  const { id } = await params;
  const experience = await fetchExperienceById(id);

  if (!experience) {
    notFound();
  }

  const detailsParagraphs = experience.description
    .split(/[.!؟]/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <main className="pb-16" dir="rtl">
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
              العودة إلى التجارب
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
              <h2 className="mb-4 text-xl font-bold text-black">عن التجربة</h2>
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
                <p className="mb-1 text-sm text-gray-500">الجهة المقدمة</p>
                <p className="text-base font-semibold text-black">{experience.provider}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">السعر</p>
                <p className="text-base font-semibold text-black">
                  {experience.price} {experience.currency ?? "ر.س"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">حجم المجموعة</p>
                <p className="text-base font-semibold text-black">x{experience.groupSize}</p>
              </div>
            </section>

            {experience.filterInterests.length > 0 ? (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="mb-4 text-lg font-bold text-black">الاهتمامات المناسبة</h3>
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
                <h3 className="mb-4 text-lg font-bold text-black">نوع المسافرين المناسب</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.filterTravelers.map((traveler) => (
                    <span
                      key={traveler}
                      className="rounded-full bg-[#CD8CFF24] px-3 py-1.5 text-sm text-[#5A18B5]"
                    >
                      {travelerLabels[traveler] ?? traveler}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">ابدأ الحجز</p>
              <p className="mt-2 text-2xl font-bold text-black">
                {experience.price} {experience.currency ?? "ر.س"}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                الحد الأدنى للمجموعة: x{experience.groupSize}
              </p>
              <a
                href={experience.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#7300CD] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                احجز الآن
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
