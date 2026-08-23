import MediaKitHero from "@/components/media-kit/hero";
import MediaCategoriesClient from "@/components/media-kit/card";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";

async function getCategories() {
  const res = await fetch(
    directusItemsUrl(getDirectusPublicUrl(), "media_categories", {
      fields: ["id", "name", "status"],
      limit: DIRECTUS_COLLECTION_LIMIT,
    }),
    directusCollectionFetch,
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.data;
}

async function getMediaItems() {
  const res = await fetch(
    directusItemsUrl(getDirectusPublicUrl(), "media_items", {
      fields: ["id", "type", "category", "file_id", "title", "status"],
      limit: DIRECTUS_COLLECTION_LIMIT,
    }),
    directusCollectionFetch,
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
