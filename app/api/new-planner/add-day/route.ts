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
    const eventsCatalog = (eventsData.data || []).map((item: any) => ({
      id: item.id,
      title: item.title_en || item.title,
      description: item.description_en || item.description,
    }));

    // 3. Build Prompt
    const prompt = `
You are a local travel guide for Aseer, Saudi Arabia.
The user already has a trip plan for ${currentDaysCount} days, and they want to add an additional day (Day ${newDayNumber}).

Here is their CURRENT plan:
${JSON.stringify(currentPlanData, null, 2)}

Your task is to generate ONLY the new Day ${newDayNumber} using ONLY the provided catalogs.
Do NOT repeat items that are already in the current plan!

CATALOGS:
RESTAURANTS: ${JSON.stringify(restaurantsCatalog)}
EXPERIENCES: ${JSON.stringify(experiencesCatalog)}
EVENTS: ${JSON.stringify(eventsCatalog)}

RULES:
1. Output valid JSON only. No markdown formatting, no extra text.
2. For Events, return ONLY the itemId.
3. For Restaurants, return the itemId and the mealType (e.g. 'breakfast', 'lunch', 'dinner', 'coffee', 'tea').
4. For Experiences, return the itemId, a scheduled 'time', and 'travelToNext'.
5. Limit the day to reasonable activities based on the trip style inferred from the current plan.

JSON SCHEMA:
{
  "dayLabel": "Day ${newDayNumber}",
  "date": "Day ${newDayNumber} Date",
  "events": [ { "itemId": 1 } ],
  "experiences": [ { "itemId": 2, "time": "10:00 AM", "travelToNext": { "duration": "10 min" } } ],
  "restaurants": [ { "itemId": 3, "mealType": "breakfast" } ]
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
    if (Array.isArray(newDayData.events)) {
      newDayData.events = newDayData.events.map((ev: any) => {
        const matched = eventsData.data.find(
          (e: any) => String(e.id) === String(ev.itemId),
        );
        return { ...ev, itemData: matched || null };
      });
    }
    if (Array.isArray(newDayData.experiences)) {
      newDayData.experiences = newDayData.experiences.map((exp: any) => {
        const matched = experiencesData.data.find(
          (e: any) => String(e.id) === String(exp.itemId),
        );
        return { ...exp, itemData: matched || null };
      });
    }
    if (Array.isArray(newDayData.restaurants)) {
      newDayData.restaurants = newDayData.restaurants.map((res: any) => {
        const matched = restaurantsData.data.find(
          (r: any) => String(r.id) === String(res.itemId),
        );
        return { ...res, itemData: matched || null };
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
