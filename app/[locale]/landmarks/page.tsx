import { redirect } from "@/i18n/navigation";

type LandmarksPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LandmarksPage({ params }: LandmarksPageProps) {
  const { locale } = await params;
  redirect({ href: "/attractions?city=mahayil", locale });
}
