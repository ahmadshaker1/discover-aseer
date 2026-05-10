"use client";

import { useTranslations } from "next-intl";
import { Button } from "@headlessui/react";
import { useRouter } from "@/i18n/navigation";

const RestaurantsShowMoreButton = () => {
  const router = useRouter();
  const t = useTranslations("common");

  const handleClick = () => {
    router.push("/restaurants");
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-10 inline-flex items-center justify-center rounded-full bg-[#6027D2] px-10 py-3 text-sm md:text-base font-semibold text-white  cursor-pointer hover:bg-[#4f1fb0] transition-colors"
    >
      {t("browseMore")}
    </Button>
  );
};

export default RestaurantsShowMoreButton;
