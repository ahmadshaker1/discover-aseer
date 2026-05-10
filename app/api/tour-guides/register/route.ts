import { NextResponse } from "next/server";

async function uploadFileToDirectus(file: File) {
  const fileData = new FormData();
  fileData.append("file", file);

  console.log(`📤 جاري رفع الملف: ${file.name} ...`);

  const response = await fetch("https://tool-portal.discoveraseer.com/files", {
    method: "POST",
    body: fileData,
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("❌ خطأ من دايركتس أثناء رفع الملف:", json);
    throw new Error(`Directus File Upload Error: ${JSON.stringify(json)}`);
  }

  console.log(`✅ تم رفع الملف بنجاح، الـ ID: ${json.data.id}`);
  return json.data.id;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("📦 البيانات وصلت للسيرفر الداخلي بنجاح!");

    const personalPhoto = formData.get("Personal_photo");
    const touristLicense = formData.get("Tourist_Guide_License");

    // التأكد من أن الملفات حقيقية وليست نصوص
    if (personalPhoto && typeof personalPhoto === "string") {
      throw new Error("الصورة الشخصية وصلت كنص وليس كملف! تأكد من الواجهة.");
    }

    let photoId = null;
    let licenseId = null;

    if (personalPhoto instanceof File && personalPhoto.size > 0) {
      photoId = await uploadFileToDirectus(personalPhoto);
    }

    if (touristLicense instanceof File && touristLicense.size > 0) {
      licenseId = await uploadFileToDirectus(touristLicense);
    }

    const finalData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== "Personal_photo" && key !== "Tourist_Guide_License") {
        finalData[key] = value;
      }
    });

    if (photoId) finalData.Personal_photo = photoId;
    if (licenseId) finalData.Tourist_Guide_License = licenseId;

    console.log("🚀 جاري إرسال البيانات النهائية لجدول المرشدين:", finalData);

    // 5. الإرسال لدايركتس
    const directusResponse = await fetch(
      "https://tool-portal.discoveraseer.com/items/tour_guides_form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      },
    );

    // 🌟 التعديل السحري هنا: إذا كان الرد 204 يعني نجح بدون ما يرجع بيانات
    if (directusResponse.status === 204) {
      console.log("✅ تم حفظ البيانات في دايركتس بنجاح (رد 204)");
      return NextResponse.json(
        { success: true, message: "تم التسجيل بنجاح" },
        { status: 200 },
      );
    }

    // أما إذا كان الرد شيء ثاني (خطأ مثلاً)، نقرأه بأمان
    const responseText = await directusResponse.text();
    const directusResult = responseText ? JSON.parse(responseText) : {};

    if (!directusResponse.ok) {
      console.error("❌ Directus Form Error:", directusResult);
      return NextResponse.json(
        { error: "Directus rejected" },
        { status: directusResponse.status },
      );
    }

    return NextResponse.json(
      { success: true, data: directusResult },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("🚨 Server Fatal Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
