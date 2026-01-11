import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      description,
      city,
      arrivalDate,
      departureDate,
      duration,
      interests,
    } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
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
    let prompt = `أنت مساعد ذكي لخطط السفر في منطقة عسير في المملكة العربية السعودية. قم بإنشاء جدول رحلة تفصيلي بناءً على المعلومات التالية:\n\n`;

    if (description) {
      prompt += `وصف الرحلة من المستخدم:\n${description}\n\n`;
    }

    prompt += `المدينة: ${cityName}\n`;

    if (arrivalDate && departureDate) {
      prompt += `تاريخ الوصول: ${arrivalDate}\n`;
      prompt += `تاريخ المغادرة: ${departureDate}\n`;
    }

    if (durationText) {
      prompt += `فترة الخروج: ${durationText}\n`;
    }

    if (selectedInterestsText) {
      prompt += `الاهتمامات: ${selectedInterestsText}\n`;
    }

    prompt += `\nيرجى إنشاء جدول رحلة يومي تفصيلي يتضمن:\n`;
    prompt += `- الأماكن السياحية والمعالم في ${cityName}\n`;
    prompt += `- المطاعم والطعام المحلي\n`;
    prompt += `- الأنشطة والجولات\n`;
    prompt += `- أوقات الاستراحات (إفطار، غداء، عشاء)\n`;
    prompt += `- التوصيات العملية\n\n`;
    prompt += `يرجى تقديم الجدول بصيغة HTML منسقة مع استخدام العناوين والفقرات والقوائم لجعله سهل القراءة. استخدم اللغة العربية فقط.`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد ذكي متخصص في تخطيط الرحلات السياحية في منطقة عسير، المملكة العربية السعودية. قم بإنشاء جداول رحلات تفصيلية ومنظمة.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate schedule" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const schedule = data.choices[0]?.message?.content || "";

    return NextResponse.json({ schedule });
  } catch (error) {
    console.error("Error generating schedule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
