import { NextRequest, NextResponse } from "next/server";

interface PlannerRequestBody {
  description?: string;
  city?: string | null;
  arrivalDate?: string;
  departureDate?: string;
  duration?: string | null;
  interests?: string[];
}

interface NetworkErrorLike {
  code?: string;
  hostname?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log("==========================================");
    console.log("🚀 [1] STARTING PLANNER API ROUTE");
    console.log("==========================================");

    const body: PlannerRequestBody = await request.json();
    console.log("📦 [2] RECEIVED BODY:", JSON.stringify(body, null, 2));

    const {
      description,
      city,
      arrivalDate,
      departureDate,
      duration,
      interests = [],
    } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    console.log("🔑 [3] CONFIGURATION:", {
      hasApiKey: process.env.ANTHROPIC_API_KEY,
    });

    if (!apiKey) {
      console.error("❌ ERROR: ANTHROPIC_API_KEY is missing");
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 },
      );
    }

    // Get city name in Arabic
    const cityOptions: Record<string, string> = {
      abha: "أبها",
      khamis: "خميس مشيط",
      tanomah: "تنومة",
      bisha: "بيشة",
      mahayil: "محايل عسير",
      najran: "نجران",
    };

    const cityName = city ? cityOptions[city] || city : "عسير";

    // Get interests in Arabic
    const interestOptions: Record<string, string> = {
      adventure: "المغامرات",
      culture: "الثقافة والتراث",
      nature: "الطبيعة والهواء الطلق",
      food: "الطعام والمطاعم",
      relaxation: "الاسترخاء",
      shopping: "التسوق",
      historical: "المواقع التاريخية",
    };

    const selectedInterestsText = interests
      .map((id: string) => interestOptions[id] || id)
      .join("، ");

    // Get duration in Arabic
    const durationOptions: Record<string, string> = {
      morning: "صباحي (6 صباحاً - 12 ظهراً)",
      afternoon: "بعد الظهر (12 ظهراً - 6 مساءً)",
      evening: "مسائي (6 مساءً - 12 منتصف الليل)",
      "full-day": "يوم كامل",
    };

    const durationText = duration ? durationOptions[duration] || duration : "";
    // Build the prompt
    // ==========================================
    // 1. Calculate number of days and format dates
    // ==========================================
    let numberOfDays = 1;
    let startDateFormatted = "";

    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(departureDate);
      const diffTime = Math.abs(departure.getTime() - arrival.getTime());
      numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      startDateFormatted = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
    } else if (arrivalDate) {
      const arrival = new Date(arrivalDate);
      const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      startDateFormatted = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
    }

    // ==========================================
    // 2. Build the English Prompt
    // ==========================================
    let prompt = `You are an expert local travel guide for the Aseer region in Saudi Arabia. Your task is to create a realistic, well-paced daily itinerary.\n\n`;

    prompt += `--- TRIP PARAMETERS ---\n`;
    prompt += `Target City: ${cityName}\n`;
    if (description) prompt += `User Request: ${description}\n`;
    if (arrivalDate && departureDate)
      prompt += `Dates: From ${arrivalDate} to ${departureDate} (${numberOfDays} days)\n`;
    if (durationText) prompt += `Preferred Outing Time: ${durationText}\n`;
    if (selectedInterestsText)
      prompt += `User Interests: ${selectedInterestsText}\n`;

    prompt += `\n--- CRITICAL INSTRUCTIONS ---\n`;
    prompt += `1. STRICT JSON ONLY: You must output a valid JSON object. No markdown, no introductions, no explanations.\n`;
    prompt += `2. LANGUAGE RULE: All JSON Keys MUST be in English. All String Values (titles, types, descriptions, locations) MUST be in Arabic, EXCEPT googleMapsUrl which MUST be in English.\n`;
    prompt += `3. LIMIT: Maximum 5 activities per day. Do not overpack the schedule.\n`;
    prompt += `4. REALISM: Use real, existing restaurants, cafes, and tourist attractions in ${cityName}.\n`;
    prompt += `5. LOGIC: Sort activities chronologically by time (e.g., Morning to Evening).\n`;
    prompt += `6. DISTANCES: Calculate realistic "travelToNext" (duration and distance) between consecutive activities. The last activity of EVERY day MUST have "travelToNext": null.\n`;
    prompt += `7. GOOGLE MAPS URL: googleMapsUrl MUST be a real, valid Google Maps link using English place names only (Latin characters), and should open the exact place.\n\n`;

    prompt += `--- EXACT JSON SCHEMA REQUIRED ---\n`;
    prompt += `{
      "planDetails": {
        "title": "خطتك",
        "totalDays": ${numberOfDays}
      },
      "days": [\n`;

    for (let i = 0; i < numberOfDays; i++) {
      const dayNumber = i + 1;
      const dayLabels = [
        "الأول",
        "الثاني",
        "الثالث",
        "الرابع",
        "الخامس",
        "السادس",
        "السابع",
        "الثامن",
        "التاسع",
        "العاشر",
      ];
      const dayLabel =
        dayNumber <= 10 ? dayLabels[dayNumber - 1] : `رقم ${dayNumber}`;

      let dayDate = startDateFormatted;
      if (arrivalDate && i > 0) {
        const arrival = new Date(arrivalDate);
        arrival.setDate(arrival.getDate() + i);
        const months = [
          "يناير",
          "فبراير",
          "مارس",
          "أبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ];
        dayDate = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
      }

      prompt += `        {
          "dayLabel": "اليوم ${dayLabel}",
          "date": "${dayDate}",
          "activities": [
            {
              "type": "فطور", 
              "time": "09:00 صباحاً",
              "title": "اسم المكان الفعلي",
              "rating": 4.8,
              "reviewsCount": 233,
              "locationText": "12 كم، ${cityName}",
              "category": "تاريخي",
              "priceRange": "50-100 ﷼",
              "googleMapsUrl": "https://maps.google.com/...",
              "travelToNext": {
                "duration": "12 دقيقة",
                "distance": "8 كيلومتر"
              } 
            }
          ]
        }${i < numberOfDays - 1 ? "," : ""}\n`;
    }

    prompt += `      ]
    }`;

    console.log("📝 [4] GENERATED PROMPT LENGTH:", prompt.length, "characters");

    // Call Direct Anthropic API
    let response: Response;
    try {
      console.log("🌐 [5] SENDING REQUEST DIRECTLY TO ANTHROPIC API...");

      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01", // هذا الهيدر إجباري من أنثروبك
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001", // استخدمت لك أحدث وأذكى نسخة
          max_tokens: 8000,
          temperature: 0.7,
          system:
            "أنت مساعد ذكي متخصص في تخطيط الرحلات السياحية في منطقة عسير، المملكة العربية السعودية. قم بإنشاء جداول رحلات تفصيلية ومنظمة بصيغة JSON فقط. تأكد من أن JSON صحيح وصالح.",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });
      console.log(
        "✅ [6] RECEIVED RESPONSE FROM API. Status:",
        response.status,
      );
    } catch (fetchError) {
      console.error("❌ ERROR [5.1]: NETWORK FAILURE", fetchError);
      return NextResponse.json(
        { error: "Failed to connect to Anthropic API" },
        { status: 503 },
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("❌ ERROR [6.1]: API RETURNED NON-OK STATUS", errorData);
      return NextResponse.json(
        { error: errorData?.error?.message || "Failed to generate schedule" },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log(
      "🧠 [7] RAW AI RESPONSE RECEIVED :",
      JSON.stringify(data).substring(0, 100) + "...",
    );

    // أنثروبك ترجع النص داخل مصفوفة content
    const content = data.content?.[0]?.text || "";
    console.log("📄 [7.1] EXTRACTED CONTENT:", content);

    if (!content.trim()) {
      console.error("❌ ERROR [7.2]: EMPTY CONTENT FROM ANTHROPIC");
      return NextResponse.json(
        { error: "Anthropic API returned empty content" },
        { status: 502 },
      );
    }

    const isValidScheduleData = (
      value: unknown,
    ): value is { planDetails: unknown; days: unknown[] } => {
      if (!value || typeof value !== "object") return false;

      const candidate = value as {
        planDetails?: unknown;
        days?: unknown;
      };

      return (
        candidate.planDetails !== undefined && Array.isArray(candidate.days)
      );
    };

    // Parse JSON response
    let scheduleData: unknown;
    try {
      console.log("⚙️ [8] PARSING JSON CONTENT...");
      scheduleData = JSON.parse(content);
      console.log("✅ [9] JSON PARSED SUCCESSFULLY!");
    } catch (parseError) {
      console.warn(
        "⚠️ [8.1] DIRECT PARSE FAILED, ATTEMPTING REGEX EXTRACTION...",
      );

      const jsonObjectMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonObjectMatch) {
        console.error("❌ ERROR [8.2]: NO JSON OBJECT FOUND IN CONTENT");
        return NextResponse.json(
          { error: "Failed to parse JSON from AI response" },
          { status: 502 },
        );
      }

      try {
        scheduleData = JSON.parse(jsonObjectMatch[0]);
        console.log("✅ [9.1] JSON EXTRACTED AND PARSED SUCCESSFULLY!");
      } catch (fallbackParseError) {
        console.error(
          "❌ ERROR [8.3]: REGEX EXTRACTION PARSE FAILED",
          fallbackParseError,
        );
        return NextResponse.json(
          { error: "AI response was not valid JSON" },
          { status: 502 },
        );
      }
    }

    if (!isValidScheduleData(scheduleData)) {
      console.error("❌ ERROR [9.2]: INVALID SCHEDULE JSON STRUCTURE");
      return NextResponse.json(
        { error: "AI returned invalid schedule JSON structure" },
        { status: 502 },
      );
    }

    console.log(
      "📤 [10] FINAL SCHEDULE RESPONSE OBJECT:",
      JSON.stringify(scheduleData, null, 2),
    );

    return NextResponse.json(scheduleData, { status: 200 });
  } catch (error) {
    console.error("❌ ERROR: UNEXPECTED FAILURE", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
