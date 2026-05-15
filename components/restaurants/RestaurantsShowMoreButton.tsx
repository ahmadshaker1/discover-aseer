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
      className="mt-10 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-10 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:text-base"
    >
      {t("browseMore")}
    </Button>
  );
};

export default RestaurantsShowMoreButton;
