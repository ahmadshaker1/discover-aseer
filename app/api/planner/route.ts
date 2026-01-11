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

    // Calculate number of days and format dates
    let numberOfDays = 1;
    let startDateFormatted = "";
    if (arrivalDate && departureDate) {
      const arrival = new Date(arrivalDate);
      const departure = new Date(departureDate);
      const diffTime = Math.abs(departure.getTime() - arrival.getTime());
      numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Format date in Arabic
      const months = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      startDateFormatted = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
    } else if (arrivalDate) {
      const arrival = new Date(arrivalDate);
      const months = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      startDateFormatted = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
    }

    prompt += `\nيرجى إنشاء جدول رحلة يومي تفصيلي لـ ${numberOfDays} ${numberOfDays === 1 ? "يوم" : "أيام"} يتضمن:\n`;
    prompt += `- الأماكن السياحية والمعالم في ${cityName}\n`;
    prompt += `- المطاعم والطعام المحلي\n`;
    prompt += `- الأنشطة والجولات\n`;
    prompt += `- أوقات الاستراحات (إفطار، غداء، عشاء)\n`;
    prompt += `- التوصيات العملية\n\n`;
    prompt += `يرجى تقديم الجدول بصيغة JSON فقط بدون أي نص إضافي. يجب أن يكون التنسيق كالتالي:\n\n`;
    prompt += `{\n`;
    prompt += `  "planDetails": {\n`;
    prompt += `    "title": "خطتك",\n`;
    prompt += `    "totalDays": ${numberOfDays}\n`;
    prompt += `  },\n`;
    prompt += `  "days": [\n`;
    for (let i = 0; i < numberOfDays; i++) {
      const dayNumber = i + 1;
      const dayLabels = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر"];
      const dayLabel = dayNumber <= 10 ? dayLabels[dayNumber - 1] : `رقم ${dayNumber}`;
      
      // Calculate date for this day
      let dayDate = startDateFormatted;
      if (arrivalDate && i > 0) {
        const arrival = new Date(arrivalDate);
        arrival.setDate(arrival.getDate() + i);
        const months = [
          "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
          "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        dayDate = `${arrival.getDate()} ${months[arrival.getMonth()]}`;
      }
      
      prompt += `    {\n`;
      prompt += `      "dayLabel": "اليوم ${dayLabel}",\n`;
      prompt += `      "date": "${dayDate}",\n`;
      prompt += `      "activities": [\n`;
      prompt += `        {\n`;
      prompt += `          "id": "activity-${i + 1}-1",\n`;
      prompt += `          "name": "اسم المكان أو النشاط",\n`;
      prompt += `          "type": { "label": "فطور" أو "فعالية" أو "تجربة" أو "غداء" أو "عشاء" },\n`;
      prompt += `          "imageUrl": "/assets/experiences/experiences.png",\n`;
      prompt += `          "rating": { "score": 4.8, "totalReviews": 233 },\n`;
      prompt += `          "location": { "city": "${cityName}", "distanceKm": 12 },\n`;
      prompt += `          "pricing": { "audience": "سعودي", "minPriceSAR": 50, "maxPriceSAR": 100 },\n`;
      prompt += `          "travelInfoToNext": { "durationMinutes": 12, "distanceKm": 8 },\n`;
      prompt += `          "directionsUrl": "https://www.google.com/maps/search/?api=1&query=اسم+المكان"\n`;
      prompt += `        }\n`;
      prompt += `      ]\n`;
      prompt += `    }${i < numberOfDays - 1 ? "," : ""}\n`;
    }
    prompt += `  ]\n`;
    prompt += `}\n\n`;
    prompt += `ملاحظات مهمة:\n`;
    prompt += `- استخدم أسماء أماكن حقيقية في ${cityName}\n`;
    prompt += `- أضف معلومات السفر (travelInfoToNext) بين كل نشاطين متتاليين\n`;
    prompt += `- استخدم أنواع الأنشطة: "فطور" للإفطار، "غداء" للغداء، "عشاء" للعشاء، "فعالية" للأنشطة، "تجربة" للتجارب\n`;
    prompt += `- تأكد من أن جميع الحقول موجودة وأن JSON صحيح\n`;
    prompt += `- استخدم اللغة العربية فقط في جميع النصوص\n`;
    prompt += `- قم بإنشاء أنشطة واقعية ومناسبة للمدينة المختارة\n`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد ذكي متخصص في تخطيط الرحلات السياحية في منطقة عسير، المملكة العربية السعودية. قم بإنشاء جداول رحلات تفصيلية ومنظمة بصيغة JSON فقط. تأكد من أن JSON صحيح وصالح.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" },
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
    const content = data.choices[0]?.message?.content || "";

    // Parse JSON response
    let scheduleData;
    try {
      scheduleData = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (jsonMatch) {
        scheduleData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Invalid JSON response from AI");
      }
    }

    return NextResponse.json({ schedule: scheduleData });
  } catch (error) {
    console.error("Error generating schedule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
