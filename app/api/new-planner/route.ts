import { NextRequest, NextResponse } from "next/server";
import { fetchPlannerCatalogs } from "@/lib/planner/directusCatalog";

interface PlannerData {
  selectedDays: number | null;
  selectedDate: string | null;
  tripStyle: string | null;
  budget: string | null;
  companion: string | null;
  interests: string[];
  mealsCount: number | null;
  foodPreferences: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: PlannerData = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("❌ ERROR: ANTHROPIC_API_KEY is missing");
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const skipRestaurants = String(body.mealsCount) === "0";

    const {
      restaurantsCatalog,
      experiencesCatalog,
      eventsCatalog,
      restaurantsData,
      experiencesData,
      eventsData,
    } = await fetchPlannerCatalogs({ skipRestaurants });

    const numberOfDays = body.selectedDays || 1;
    const startDate = body.selectedDate || "Unknown Date";

    // 3. Build Prompt
    const promptHeader =
      "You are a local travel guide for Aseer, Saudi Arabia. Write a realistic daily itinerary using ONLY the provided catalogs.";

    const promptRules = [
      "--- TRIP DETAILS ---",
      `Dates: Starting ${startDate} for ${numberOfDays} days`,
      body.tripStyle ? `Trip Style: ${body.tripStyle}` : null,
      body.budget ? `Budget: ${body.budget}` : null,
      body.budget === "economy"
        ? "Budget Rule (per person): Restaurants < 50, Experiences < 200, Events < 25 or free."
        : null,
      body.budget === "medium"
        ? "Budget Rule (per person): Restaurants 50-120, Experiences 200-400, Events 25-75 or free."
        : null,
      body.budget === "premium"
        ? "Budget Rule (per person): Restaurants > 120, Experiences > 400, Events > 75 or free."
        : null,
      body.budget
        ? "Note: You can always use free experiences or events if they suit the plan. You may also use items from the catalog even if they do not have a price specified."
        : null,
      body.companion ? `Companion: ${body.companion}` : null,
      body.interests?.length ? `Interests: ${body.interests.join(", ")}` : null,
      body.mealsCount ? `Meals per day: ${body.mealsCount}` : null,
      body.foodPreferences?.length
        ? `Food Preferences: ${body.foodPreferences.join(", ")}`
        : null,
      "",
      "--- CATALOGS ---",
      "You must ONLY pick items from the following catalogs:",
      "RESTAURANTS: " + JSON.stringify(restaurantsCatalog),
      "EXPERIENCES: " + JSON.stringify(experiencesCatalog),
      "EVENTS: " + JSON.stringify(eventsCatalog),
      "",
      "--- RULES ---",
      "1. Output valid JSON only. No markdown formatting, no extra text before or after the JSON.",
      "2. Pick appropriate items from the catalogs by matching the user's details.",
      "3. Structure each day into exactly three periods: 'Morning', 'Afternoon', 'Evening'.",
      "4. Inside each period, provide an 'items' array containing the activities for that period. You determine the order.",
      "5. For Event items, set 'type' to 'event', and return 'itemId' and a scheduled 'time' as a time range (e.g., '09:00 AM - 11:00 AM').",
      "6. For Restaurant items, set 'type' to 'restaurant', and return 'itemId' and 'mealType' (e.g. 'breakfast', 'lunch', 'dinner').",
      "7. For Experience items, set 'type' to 'experience', and return 'itemId' and 'travelToNext'.",
      "8. Limit each day to reasonable activities based on the trip style. For 'light' trip style, include EXACTLY 2 items/stops per day across all periods combined. For 'balanced', include EXACTLY 3 items/stops per day. For 'intensive', include EXACTLY 4 items/stops per day. Do NOT exceed these limits.",
      "9. IMPORTANT: Your itinerary MUST include a mix of restaurants, experiences, and events. Ensure that you pick at least one restaurant, one experience, and one event per day whenever possible.",
      "",
      "--- JSON SCHEMA ---",
      `{
  "planDetails": {
    "title": "Your Aseer Trip Plan",
    "totalDays": ${numberOfDays}
  },
  "days": [`,
    ];

    const promptActivities: string[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      const dayNumber = i + 1;
      promptActivities.push(
        `        {
          "dayLabel": "Day ${dayNumber}",
          "date": "Day ${dayNumber} Date",
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
        }${i < numberOfDays - 1 ? "," : ""}`,
      );
    }

    const prompt = [
      promptHeader,
      ...promptRules.filter((line) => line !== null),
      ...promptActivities,
      "      ]",
      "    }",
    ].join("\n");

    // Call Direct Anthropic API
    let response: Response;
    try {
      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 25000,
          temperature: 0.7,
          system:
            "You are a travel planner for Aseer, Saudi Arabia. Return valid JSON only. ONLY pick from the provided catalogs.",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });
    } catch (fetchError) {
      console.error("❌ NETWORK FAILURE", fetchError);
      return NextResponse.json(
        { error: "Failed to connect to Anthropic API" },
        { status: 503 },
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("❌ API RETURNED NON-OK STATUS", errorData);
      return NextResponse.json(
        { error: errorData?.error?.message || "Failed to generate schedule" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || "";

    if (!content.trim()) {
      return NextResponse.json(
        { error: "Anthropic API returned empty content" },
        { status: 502 },
      );
    }

    let scheduleData: unknown;
    try {
      scheduleData = JSON.parse(content);
    } catch (parseError) {
      const jsonObjectMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonObjectMatch) {
        return NextResponse.json(
          { error: "Failed to parse JSON from AI response" },
          { status: 502 },
        );
      }
      try {
        scheduleData = JSON.parse(jsonObjectMatch[0]);
      } catch (fallbackParseError) {
        return NextResponse.json(
          { error: "AI response was not valid JSON" },
          { status: 502 },
        );
      }
    }

    // ENRICH DATA
    if (
      scheduleData &&
      typeof scheduleData === "object" &&
      "days" in scheduleData
    ) {
      const plan = scheduleData as any;
      if (Array.isArray(plan.days)) {
        plan.days.forEach((day: any) => {
          if (Array.isArray(day.periods)) {
            day.periods.forEach((period: any) => {
              if (Array.isArray(period.items)) {
                period.items = period.items.map((item: any) => {
                  let matched = null;
                  if (item.type === "event") {
                    matched = eventsData.find(
                      (e: any) => String(e.id) === String(item.itemId),
                    );
                  } else if (item.type === "experience") {
                    matched = experiencesData.find(
                      (e: any) => String(e.id) === String(item.itemId),
                    );
                  } else if (item.type === "restaurant") {
                    matched = restaurantsData.find(
                      (r: any) => String(r.id) === String(item.itemId),
                    );
                  }
                  return { ...item, itemData: matched || null };
                });
              }
            });
          }
        });
      }

      // Store mealsCount in planDetails so add-day can use it
      if (typeof plan.planDetails === "object") {
        plan.planDetails.mealsCount = body.mealsCount;
      }
    }

    return NextResponse.json(scheduleData);
  } catch (error) {
    return NextResponse.json(
      { error: `An unexpected error occurred ${error}` },
      { status: 500 },
    );
  }
}
