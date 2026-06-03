import MediaKitHero from "@/components/media-kit/hero";
import MediaCategoriesClient from "@/components/media-kit/card";

async function getCategories() {
  const res = await fetch(
    "https://tool-portal.discoveraseer.com/items/media_categories",
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.data;
}

async function getMediaItems() {
  const res = await fetch(
    "https://tool-portal.discoveraseer.com/items/media_items",
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.data;
}

export default async function MediaKitPage() {
  const [categories, items] = await Promise.all([
    getCategories(),
    getMediaItems(),
  ]);

  return (
    <div className="flex w-full flex-col">
      <MediaKitHero />

      <section className="min-h-screen w-full bg-[#FBF9FF] py-16" dir="rtl">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MediaCategoriesClient categories={categories} items={items} />
        </div>
      </section>
    </div>
  );
}
