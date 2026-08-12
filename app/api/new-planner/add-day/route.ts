import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPlanData } = body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const currentDaysCount = currentPlanData.days.length;
    const newDayNumber = currentDaysCount + 1;

    // 1. Fetch from Directus
    const [restaurantsRes, experiencesRes, eventsRes] = await Promise.all([
      fetch(
        "https://tool-portal.discoveraseer.com/items/restaurants?limit=-1",
      ).catch(() => null),
      fetch(
        "https://tool-portal.discoveraseer.com/items/experiences?limit=-1",
      ).catch(() => null),
      fetch(
        "https://tool-portal.discoveraseer.com/items/events?limit=-1",
      ).catch(() => null),
    ]);

    const restaurantsData = restaurantsRes
      ? await restaurantsRes.json()
      : { data: [] };
    const experiencesData = experiencesRes
      ? await experiencesRes.json()
      : { data: [] };
    const eventsData = eventsRes ? await eventsRes.json() : { data: [] };

    // 2. Map data
    const restaurantsCatalog = (restaurantsData.data || []).map(
      (item: any) => ({
        id: item.id,
        title: item.title_en || item.title_ar,
        cuisine: item.cuisine_type,
        description: item.content || item.content_ar,
      }),
    );
    const experiencesCatalog = (experiencesData.data || []).map(
      (item: any) => ({
        id: item.id,
        title: item.title_eng || item.title,
        type: item.type_en || item.type,
        duration: item.duration_En || item.duration,
        description: item.description_eng || item.description,
      }),
    );
    const todayStr = new Date().toISOString().split("T")[0];
    const eventsCatalog = (eventsData.data || [])
      .filter((item: any) => !item.end_date || item.end_date >= todayStr)
      .map((item: any) => ({
        id: item.id,
        title: item.title_en || item.title,
        description: item.description_en || item.description,
        end_date: item.end_date,
      }));

    // 3. Build Prompt
    const prompt = `
You are a local travel guide for Aseer, Saudi Arabia.
The user already has a trip plan for ${currentDaysCount} days, and they want to add an additional day (Day ${newDayNumber}).

Here is their CURRENT plan:
${JSON.stringify(currentPlanData, null, 2)}

Your task is to generate ONLY the new Day ${newDayNumber} using ONLY the provided catalogs.
Do NOT repeat items that are already in the current plan!

--- CATALOGS ---
RESTAURANTS: ${JSON.stringify(restaurantsCatalog)}
EXPERIENCES: ${JSON.stringify(experiencesCatalog)}
EVENTS: ${JSON.stringify(eventsCatalog)}

--- RULES ---
1. Output valid JSON only. No markdown formatting, no extra text.
2. Structure the day into exactly three periods: 'Morning', 'Afternoon', 'Evening'.
3. Inside each period, provide an 'items' array containing the activities for that period. You determine the order.
4. For Event items, set 'type' to 'event', and return 'itemId' and a scheduled 'time' as a time range (e.g., '09:00 AM - 11:00 AM').
5. For Restaurant items, set 'type' to 'restaurant', and return 'itemId' and 'mealType' (e.g. 'breakfast', 'lunch', 'dinner').
6. For Experience items, set 'type' to 'experience', and return 'itemId' and 'travelToNext'.
7. Limit the day to reasonable activities based on the trip style inferred from the current plan. If the inferred style is 'light' (around 2 items per day), include EXACTLY 2 items/stops in the new day. If 'balanced', include EXACTLY 3 items/stops. If 'intensive', include EXACTLY 4 items/stops. Do NOT exceed these limits.
8. Maintain the budget style inferred from the current plan. Budget ranges per person: Economy (Restaurants < 50, Experiences < 200, Events < 25 or free), Medium (Restaurants 50-120, Experiences 200-400, Events 25-75 or free), Premium (Restaurants > 120, Experiences > 400, Events > 75 or free). You can use free experiences or events if they suit the plan. You may also use items from the catalog even if they do not have a price specified.

--- JSON SCHEMA ---
{
  "dayLabel": "Day ${newDayNumber}",
  "date": "Day ${newDayNumber} Date",
  "periods": [
    {
      "periodName": "Morning",
      "items": [
        { "type": "event", "itemId": 1, "time": "09:00 AM - 11:00 AM" },
        { "type": "restaurant", "itemId": 3, "mealType": "breakfast" },
        { "type": "experience", "itemId": 2, "travelToNext": { "duration": "15 min" } }
      ]
    },
    {
      "periodName": "Afternoon",
      "items": []
    },
    {
      "periodName": "Evening",
      "items": []
    }
  ]
}
`;

    // 4. Call Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2500,
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

    let newDayData: any;
    try {
      newDayData = JSON.parse(content);
    } catch (e) {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        newDayData = JSON.parse(match[0]);
      } else {
        return NextResponse.json(
          { error: "Invalid JSON returned by AI" },
          { status: 500 },
        );
      }
    }

    // 5. Enrich Data
    if (newDayData && Array.isArray(newDayData.periods)) {
      newDayData.periods.forEach((period: any) => {
        if (Array.isArray(period.items)) {
          period.items = period.items.map((item: any) => {
            let matched = null;
            if (item.type === "event") {
              matched = eventsData.data.find(
                (e: any) => String(e.id) === String(item.itemId),
              );
            } else if (item.type === "experience") {
              matched = experiencesData.data.find(
                (e: any) => String(e.id) === String(item.itemId),
              );
            } else if (item.type === "restaurant") {
              matched = restaurantsData.data.find(
                (r: any) => String(r.id) === String(item.itemId),
              );
            }
            return { ...item, itemData: matched || null };
          });
        }
      });
    }

    return NextResponse.json({ newDay: newDayData }, { status: 200 });
  } catch (error) {
    console.error("Add Day API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
