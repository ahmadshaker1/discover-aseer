import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // التأكد من وجود البيانات
    if (!body.plan_data) {
      return NextResponse.json(
        { error: "بيانات الخطة مفقودة" },
        { status: 400 },
      );
    }

    // إرسال البيانات إلى جدول saved_plans في دايركتس
    const directusResponse = await fetch(
      "https://tool-portal.discoveraseer.com/items/saved_plans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_data: body.plan_data,
        }),
      },
    );

    const result = await directusResponse.json();

    if (!directusResponse.ok) {
      console.error("❌ Directus Error:", result);
      return NextResponse.json(
        { error: "فشل الحفظ في قاعدة البيانات" },
        { status: directusResponse.status },
      );
    }

    // تمت العملية بنجاح! نرجع الـ ID (الـ UUID) اللي تولد في دايركتس للواجهة
    return NextResponse.json({ id: result.data.id }, { status: 200 });
  } catch (error) {
    console.error("🚨 Server API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
