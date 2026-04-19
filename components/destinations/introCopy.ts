import type { Destination } from "@/components/destinations/data";

/** Inner page intro — extend with Directus rich-text fields when available. */
export function destinationIntroParagraphs(d: Destination): string[] {
  const lead = d.description?.trim() || `تعرّف على ${d.title} في قلب عسير.`;
  return [
    lead,
    `${d.title} في ${d.location} تجمع بين الطبيعة والتراث والتجارب التي تناسب العائلات والزائر الباحث عن أصالة الجنوب.`,
  ];
}
