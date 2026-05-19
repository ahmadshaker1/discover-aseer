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

type PromptLanguage = "ar" | "en";

const detectPromptLanguage = (description?: string): PromptLanguage => {
  if (!description) {
    return "ar";
  }

  return /[A-Za-z]/.test(description) ? "en" : "ar";
};

const monthNames: Record<PromptLanguage, string[]> = {
  ar: [
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
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const cityNames: Record<PromptLanguage, Record<string, string>> = {
  ar: {
    abha: "أبها",
    khamis: "خميس مشيط",
    tanomah: "تنومة",
    bisha: "بيشة",
    mahayil: "محايل عسير",
    najran: "نجران",
  },
  en: {
    abha: "Abha",
    khamis: "Khamis Mushait",
    tanomah: "Tanomah",
    bisha: "Bisha",
    mahayil: "Mahayil Asir",
    najran: "Najran",
  },
};

const interestNames: Record<PromptLanguage, Record<string, string>> = {
  ar: {
    adventure: "المغامرات",
    culture: "الثقافة والتراث",
    nature: "الطبيعة والهواء الطلق",
    food: "الطعام والمطاعم",
    relaxation: "الاسترخاء",
    shopping: "التسوق",
    historical: "المواقع التاريخية",
  },
  en: {
    adventure: "adventure",
    culture: "culture and heritage",
    nature: "nature and the outdoors",
    food: "food and dining",
    relaxation: "relaxation",
    shopping: "shopping",
    historical: "historical sites",
  },
};

const durationNames: Record<PromptLanguage, Record<string, string>> = {
  ar: {
    morning: "صباحي (6 صباحاً - 12 ظهراً)",
    afternoon: "بعد الظهر (12 ظهراً - 6 مساءً)",
    evening: "مسائي (6 مساءً - 12 منتصف الليل)",
    "full-day": "يوم كامل",
  },
  en: {
    morning: "morning (6 AM - 12 PM)",
    afternoon: "afternoon (12 PM - 6 PM)",
    evening: "evening (6 PM - 12 AM)",
    "full-day": "full day",
  },
};

const dayLabels: Record<PromptLanguage, string[]> = {
  ar: [
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
  ],
  en: [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ],
};

const buildDateLabel = (dateValue: string | Date, language: PromptLanguage) => {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  return `${date.getDate()} ${monthNames[language][date.getMonth()]}`;
};

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

    const promptLanguage = detectPromptLanguage(description);
    const isEnglishPrompt = promptLanguage === "en";

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

    const cityName = city
      ? cityNames[promptLanguage][city] || city
      : isEnglishPrompt
        ? "Aseer"
        : "عسير";

    const selectedInterestsText = interests
      .map((id: string) => interestNames[promptLanguage][id] || id)
      .join(isEnglishPrompt ? ", " : "، ");

    const durationText = duration
      ? durationNames[promptLanguage][duration] || duration
      : "";
    let numberOfDays = 1;
    let startDateFormatted = "";

    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(departureDate);
      const diffTime = Math.abs(departure.getTime() - arrival.getTime());
      numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      startDateFormatted = buildDateLabel(arrivalDate, promptLanguage);
    } else if (arrivalDate) {
      startDateFormatted = buildDateLabel(arrivalDate, promptLanguage);
    }

    const promptHeader = isEnglishPrompt
      ? "You are a local travel guide for Aseer, Saudi Arabia. Write a realistic daily itinerary."
      : "أنت دليل سفر محلي لمنطقة عسير في السعودية. اكتب جدول رحلة يومي واقعي ومختصر.";

    const promptRules = isEnglishPrompt
      ? [
          "--- TRIP DETAILS ---",
          `Target City: ${cityName}`,
          description ? `User Request: ${description}` : null,
          arrivalDate && departureDate
            ? `Dates: From ${arrivalDate} to ${departureDate} (${numberOfDays} days)`
            : null,
          durationText ? `Preferred Time: ${durationText}` : null,
          selectedInterestsText ? `Interests: ${selectedInterestsText}` : null,
          "",
          "--- RULES ---",
          "1. Output JSON only. No markdown, no extra text.",
          "2. Use English for all JSON keys.",
          "3. Use English for all string values.",
          "4. Keep it realistic and use real places in the target city.",
          "5. Sort activities by time.",
          "6. Limit each day to 5 activities max.",
          "7. Set travelToNext to null for the last activity of each day.",
          "8. Use a valid Google Maps link with English place names.",
          "",
          "--- JSON SCHEMA ---",
          `{
  "planDetails": {
    "title": "Your Plan",
    "totalDays": ${numberOfDays}
  },
  "days": [`,
        ]
      : [
          "--- تفاصيل الرحلة ---",
          `المدينة المستهدفة: ${cityName}`,
          description ? `طلب المستخدم: ${description}` : null,
          arrivalDate && departureDate
            ? `التواريخ: من ${arrivalDate} إلى ${departureDate} (${numberOfDays} أيام)`
            : null,
          durationText ? `الوقت المفضل: ${durationText}` : null,
          selectedInterestsText ? `الاهتمامات: ${selectedInterestsText}` : null,
          "",
          "--- القواعد ---",
          "1. أخرج JSON فقط. بدون شرح أو تنسيق إضافي.",
          "2. استخدم مفاتيح JSON بالإنجليزية.",
          "3. استخدم القيم النصية بالعربية.",
          "4. اجعل الجدول واقعيًا واستخدم أماكن حقيقية في المدينة.",
          "5. رتّب الأنشطة حسب الوقت.",
          "6. لا تتجاوز 5 أنشطة في اليوم.",
          "7. اجعل travelToNext = null في آخر نشاط من كل يوم.",
          "8. استخدم رابط Google Maps صحيحًا بأسماء أماكن إنجليزية.",
          "",
          "--- مخطط JSON ---",
          `{
  "planDetails": {
    "title": "خطتك",
    "totalDays": ${numberOfDays}
  },
  "days": [`,
        ];

    const promptActivities: string[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      const dayNumber = i + 1;
      const dayLabel =
        dayNumber <= 10
          ? dayLabels[promptLanguage][dayNumber - 1]
          : isEnglishPrompt
            ? `day ${dayNumber}`
            : `رقم ${dayNumber}`;

      let dayDate = startDateFormatted;
      if (arrivalDate && i > 0) {
        const arrival = new Date(arrivalDate);
        arrival.setDate(arrival.getDate() + i);
        dayDate = buildDateLabel(arrival, promptLanguage);
      }

      promptActivities.push(
        `        {
          "dayLabel": "${isEnglishPrompt ? "Day" : "اليوم"} ${dayLabel}",
          "date": "${dayDate}",
          "activities": [
            {
              "type": "${isEnglishPrompt ? "Breakfast" : "فطور"}",
              "time": "09:00 ${isEnglishPrompt ? "AM" : "صباحاً"}",
              "title": "${isEnglishPrompt ? "Actual place name" : "اسم المكان الفعلي"}",
              "rating": 4.8,
              "reviewsCount": 233,
              "locationText": "12 ${isEnglishPrompt ? "km" : "كم"}, ${cityName}",
              "category": "${isEnglishPrompt ? "Historical" : "تاريخي"}",
              "priceRange": "${isEnglishPrompt ? "SAR 50-100" : "50-100 ر.س"}",
              "googleMapsUrl": "https://maps.google.com/...",
              "travelToNext": {
                "duration": "12 ${isEnglishPrompt ? "minutes" : "دقيقة"}",
                "distance": "8 ${isEnglishPrompt ? "kilometers" : "كيلومتر"}"
              }
            }
          ]
        }${i < numberOfDays - 1 ? "," : ""}`,
      );
    }

    const prompt = [
      promptHeader,
      ...promptRules,
      ...promptActivities,
      "      ]",
      "    }",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

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
          system: isEnglishPrompt
            ? "You are a travel planner for Aseer, Saudi Arabia. Return valid JSON only."
            : "أنت مخطط رحلات لمنطقة عسير. أعد JSON صحيحًا فقط.",
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
