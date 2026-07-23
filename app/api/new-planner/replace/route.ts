import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dayIndex, itemType, itemIdToReplace, currentPlanData } = body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 },
      );
    }

    // 1. Fetch the specific catalog based on itemType
    let catalogUrl = "";
    if (itemType === "restaurant")
      catalogUrl =
        "https://tool-portal.discoveraseer.com/items/restaurants?limit=-1";
    else if (itemType === "experience")
      catalogUrl =
        "https://tool-portal.discoveraseer.com/items/experiences?limit=-1";
    else if (itemType === "event")
      catalogUrl =
        "https://tool-portal.discoveraseer.com/items/events?limit=-1";
    else
      return NextResponse.json({ error: "Invalid itemType" }, { status: 400 });

    const res = await fetch(catalogUrl).catch(() => null);
    const catalogData = res ? await res.json() : { data: [] };

    // 2. Map catalog to essential fields to save tokens
    let mappedCatalog: any[] = [];
    if (itemType === "restaurant") {
      mappedCatalog = (catalogData.data || []).map((item: any) => ({
        id: item.id,
        title: item.title_en || item.title_ar,
        cuisine: item.cuisine_type,
        description: item.content || item.content_ar,
      }));
    } else if (itemType === "experience") {
      mappedCatalog = (catalogData.data || []).map((item: any) => ({
        id: item.id,
        title: item.title_eng || item.title,
        type: item.type_en || item.type,
        duration: item.duration_En || item.duration,
        description: item.description_eng || item.description,
      }));
    } else if (itemType === "event") {
      mappedCatalog = (catalogData.data || []).map((item: any) => ({
        id: item.id,
        title: item.title_en || item.title,
        description: item.description_en || item.description,
      }));
    }

    // 3. Filter out the item to replace
    mappedCatalog = mappedCatalog.filter(
      (item: any) => String(item.id) !== String(itemIdToReplace),
    );

    // Also filter out items already in that day
    const dayData = currentPlanData.days[dayIndex];
    if (itemType === "restaurant" && dayData.restaurants) {
      const existingIds = dayData.restaurants.map((r: any) => String(r.itemId));
      mappedCatalog = mappedCatalog.filter(
        (item: any) => !existingIds.includes(String(item.id)),
      );
    } else if (itemType === "experience" && dayData.experiences) {
      const existingIds = dayData.experiences.map((r: any) => String(r.itemId));
      mappedCatalog = mappedCatalog.filter(
        (item: any) => !existingIds.includes(String(item.id)),
      );
    } else if (itemType === "event" && dayData.events) {
      const existingIds = dayData.events.map((r: any) => String(r.itemId));
      mappedCatalog = mappedCatalog.filter(
        (item: any) => !existingIds.includes(String(item.id)),
      );
    }

    // 4. Build Prompt
    const prompt = `
You are a local travel guide for Aseer, Saudi Arabia.
The user wants to replace a specific ${itemType} in their itinerary.
Here is the current itinerary for the day:
${JSON.stringify(dayData, null, 2)}

The ${itemType} with ID ${itemIdToReplace} needs to be replaced.
Here is the catalog of available alternative ${itemType}s:
${JSON.stringify(mappedCatalog)}

Please pick exactly ONE alternative ${itemType} from the catalog that fits well with the rest of the day.
Return ONLY valid JSON. No markdown formatting, no extra text.

JSON Schema:
{
  "newItemId": 123
${itemType === "restaurant" ? ', "mealType": "lunch"' : ""}
${
  itemType === "experience"
    ? ', "time": "10:00 AM", "travelToNext": { "duration": "15 min" }'
    : ""
}
}
`;

    // 5. Call Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        temperature: 0.7,
        system: "You are a travel planner for Aseer. Return valid JSON only.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("Anthropic error:", err);
      return NextResponse.json(
        { error: "Failed to fetch from Anthropic" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || "";

    let replacementData: any;
    try {
      replacementData = JSON.parse(content);
    } catch (e) {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        replacementData = JSON.parse(match[0]);
      } else {
        return NextResponse.json(
          { error: "Invalid JSON returned by AI" },
          { status: 500 },
        );
      }
    }

    // 6. Map back the original itemData from the catalog
    const matchedItemData = catalogData.data.find(
      (e: any) => String(e.id) === String(replacementData.newItemId),
    );

    if (!matchedItemData) {
      return NextResponse.json(
        { error: "AI returned an invalid ID" },
        { status: 500 },
      );
    }

    const finalItem = {
      itemId: replacementData.newItemId,
      itemData: matchedItemData,
      ...(itemType === "restaurant"
        ? { mealType: replacementData.mealType || "lunch" }
        : {}),
      ...(itemType === "experience"
        ? {
            time: replacementData.time || "10:00 AM",
            travelToNext: replacementData.travelToNext || {
              duration: "15 min",
            },
          }
        : {}),
    };

    return NextResponse.json({ finalItem }, { status: 200 });
  } catch (error) {
    console.error("Replacement API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
