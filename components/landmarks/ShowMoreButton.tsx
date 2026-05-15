"use client";

import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";

const ShowMoreButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/attractions");
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-10 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-10 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:text-base"
    >
      عرض المزيد
    </Button>
  );
};

export default ShowMoreButton;
