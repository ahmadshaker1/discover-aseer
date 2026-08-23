import { NextRequest, NextResponse } from "next/server";
import { fetchPlannerCatalogByType } from "@/lib/planner/directusCatalog";

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

    if (
      itemType !== "restaurant" &&
      itemType !== "experience" &&
      itemType !== "event"
    ) {
      return NextResponse.json({ error: "Invalid itemType" }, { status: 400 });
    }

    let mappedCatalog = await fetchPlannerCatalogByType(itemType);

    // 3. Filter out the item to replace
    mappedCatalog = mappedCatalog.filter(
      (item: any) => String(item.id) !== String(itemIdToReplace),
    );

    // Also filter out items already in that day
    const dayData = currentPlanData.days[dayIndex];
    const existingIds: string[] = [];
    if (dayData.periods) {
      dayData.periods.forEach((period: any) => {
        if (period.items) {
          period.items.forEach((item: any) => {
            if (item.type === itemType) {
              existingIds.push(String(item.itemId));
            }
          });
        }
      });
    }
    mappedCatalog = mappedCatalog.filter(
      (item: any) => !existingIds.includes(String(item.id)),
    );

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
Maintain the budget style inferred from the current plan. Budget ranges per person: Economy (Restaurants < 50, Experiences < 200, Events < 25 or free), Medium (Restaurants 50-120, Experiences 200-400, Events 25-75 or free), Premium (Restaurants > 120, Experiences > 400, Events > 75 or free). You can use free experiences or events if they suit the plan. You may also use items from the catalog even if they do not have a price specified.
Return ONLY valid JSON. No markdown formatting, no extra text.

JSON Schema:
{
  "newItemId": 123
${itemType === "restaurant" ? ', "mealType": "lunch"' : ""}
${itemType === "event" ? ', "time": "09:00 AM - 11:00 AM"' : ""}
${itemType === "experience" ? ', "travelToNext": { "duration": "15 min" }' : ""}
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
      type: itemType,
      itemId: replacementData.newItemId,
      itemData: matchedItemData,
      ...(itemType === "restaurant"
        ? { mealType: replacementData.mealType || "lunch" }
        : {}),
      ...(itemType === "event"
        ? { time: replacementData.time || "09:00 AM - 11:00 AM" }
        : {}),
      ...(itemType === "experience"
        ? {
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
