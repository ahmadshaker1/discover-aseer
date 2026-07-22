import { NextRequest, NextResponse } from "next/server";

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
    console.log("==========================================");
    console.log("🚀 STARTING NEW PLANNER API ROUTE (SIMPLE ENGLISH)");
    console.log("==========================================");

    const body: PlannerData = await request.json();
    console.log("📦 RECEIVED BODY:", JSON.stringify(body, null, 2));

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("❌ ERROR: ANTHROPIC_API_KEY is missing");
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 },
      );
    }

    // 1. Fetch from Directus
    console.log("📥 FETCHING DATA FROM DIRECTUS...");
    const [restaurantsRes, experiencesRes, eventsRes] = await Promise.all([
      fetch("https://tool-portal.discoveraseer.com/items/restaurants").catch(
        () => null,
      ),
      fetch("https://tool-portal.discoveraseer.com/items/experiences").catch(
        () => null,
      ),
      fetch("https://tool-portal.discoveraseer.com/items/events").catch(
        () => null,
      ),
    ]);

    const restaurantsData = restaurantsRes
      ? await restaurantsRes.json()
      : { data: [] };
    const experiencesData = experiencesRes
      ? await experiencesRes.json()
      : { data: [] };
    const eventsData = eventsRes ? await eventsRes.json() : { data: [] };

    // 2. Map data (Extract essential fields only to save tokens)
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

    console.log("🍽️ RESTAURANTS CATALOG:");
    console.log(JSON.stringify(restaurantsCatalog, null, 2));

    console.log("🧗 EXPERIENCES CATALOG:");
    console.log(JSON.stringify(experiencesCatalog, null, 2));

    console.log("🎉 EVENTS CATALOG:");
    console.log(JSON.stringify(eventsCatalog, null, 2));

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
      "3. For Events, return ONLY the itemId.",
      "4. For Restaurants, return the itemId and the mealType (e.g. 'breakfast', 'lunch', 'dinner', 'coffee', 'tea'). Ensure you provide the number of meals requested per day.",
      "5. For Experiences, return the itemId, a scheduled 'time', and 'travelToNext'.",
      "6. Limit each day to reasonable activities based on the trip style.",
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
          "events": [
            { "itemId": 1 }
          ],
          "experiences": [
            { 
              "itemId": 2, 
              "time": "10:00 AM",
              "travelToNext": { "duration": "10 min" }
            }
          ],
          "restaurants": [
            { 
              "itemId": 3, 
              "mealType": "breakfast" 
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

    console.log("📝 GENERATED PROMPT:");
    console.log("-------------------------------------------------");
    console.log(prompt);
    console.log("-------------------------------------------------");

    // Call Direct Anthropic API
    let response: Response;
    try {
      console.log("🌐 SENDING REQUEST DIRECTLY TO ANTHROPIC API...");

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
      console.log("✅ RECEIVED RESPONSE FROM API. Status:", response.status);
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
    console.log("📄 EXTRACTED FULL CONTENT:");
    console.log(content);

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

    console.log(
      "📤 FINAL SCHEDULE RESPONSE OBJECT:",
      JSON.stringify(scheduleData, null, 2),
    );

    return NextResponse.json(scheduleData, { status: 200 });
  } catch (error) {
    console.error("❌ UNEXPECTED FAILURE", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
