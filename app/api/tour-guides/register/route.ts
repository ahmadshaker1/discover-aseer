import { NextRequest, NextResponse } from "next/server";

const PROFILE_IMAGE_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const LICENSE_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
] as const;

function getEnv(name: string): string {
  return (process.env[name] || "").trim();
}

function getMaxFileSizeBytes(): number {
  const mbRaw = Number(getEnv("TOUR_GUIDE_UPLOAD_MAX_MB") || "10");
  const mb = Number.isFinite(mbRaw) && mbRaw > 0 ? mbRaw : 10;
  return Math.floor(mb * 1024 * 1024);
}

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getBoolean(formData: FormData, name: string): boolean {
  const value = getText(formData, name).toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

function getFile(formData: FormData, name: string): File | null {
  const value = formData.get(name);
  if (!(value instanceof File)) return null;
  if (value.size <= 0) return null;
  return value;
}

async function uploadFileToDirectus(
  baseUrl: string,
  token: string,
  file: File,
): Promise<string> {
  const uploadBody = new FormData();
  uploadBody.append("file", file, file.name);

  const uploadResponse = await fetch(`${baseUrl}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: uploadBody,
  });

  if (!uploadResponse.ok) {
    const text = await uploadResponse.text();
    throw new Error(
      `Upload failed (${uploadResponse.status}): ${text.slice(0, 200)}`,
    );
  }

  const uploadJson = (await uploadResponse.json()) as {
    data?: { id?: string };
  };
  const fileId = uploadJson?.data?.id;
  if (!fileId) {
    throw new Error("Upload succeeded but response had no file id");
  }

  return fileId;
}

function fileUrlFromId(baseUrl: string, fileId: string): string {
  return `${baseUrl}/assets/${fileId}`;
}

function isLicenseDateValid(dateText: string): boolean {
  if (!dateText) return false;
  const picked = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

function normalizePhone(value: string): string {
  return value.trim().replace(/\.0+$/, "").replace(/\D/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const directusWriteBase =
      getEnv("DIRECTUS_WRITE_BASE_URL") ||
      getEnv("NEXT_PUBLIC_DIRECTUS_APP_URL");
    const directusToken = getEnv("DIRECTUS_WRITE_TOKEN");
    const collection =
      getEnv("DIRECTUS_TOUR_GUIDE_APPLICATIONS_COLLECTION") || "tourist_guides";
    const profileImageField =
      getEnv("DIRECTUS_TOUR_GUIDE_PROFILE_IMAGE_FIELD") || "image";
    const licenseAttachmentField =
      getEnv("DIRECTUS_TOUR_GUIDE_LICENSE_ATTACHMENT_FIELD") ||
      "license_attachment";

    if (!directusWriteBase || !directusToken) {
      return NextResponse.json(
        { error: "Tour guide submission is not configured" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const name = getText(formData, "name");
    const nameEn = getText(formData, "name_en");
    const gender = getText(formData, "gender");
    const nationalId = getText(formData, "national_id");
    const description = getText(formData, "description");
    const licenseNumber = getText(formData, "license_number");
    const expiryDate = getText(formData, "date");
    const arabicLevel = getText(formData, "arabic_language_level");
    const englishLevel = getText(formData, "english_language_level");
    const otherLanguages = getText(formData, "other_languages");
    const transportation = getBoolean(formData, "transportation");
    const specializations = getText(formData, "specializations");
    const email = getText(formData, "email");
    const phoneNumber = normalizePhone(getText(formData, "phone_number"));
    const whatsapp = normalizePhone(getText(formData, "whatsapp"));
    const website = getText(formData, "website");
    const instagram = getText(formData, "instagram");
    const xPlatform = getText(formData, "x_platform");
    const tiktok = getText(formData, "tiktok");

    const commitment1 = getBoolean(formData, "commitment_1");
    const commitment2 = getBoolean(formData, "commitment_2");
    const commitment3 = getBoolean(formData, "commitment_3");

    const profileImage = getFile(formData, "profile_image");
    const licenseAttachment = getFile(formData, "license_attachment");

    if (
      !name ||
      !nameEn ||
      !gender ||
      !nationalId ||
      !description ||
      !licenseNumber ||
      !expiryDate ||
      !arabicLevel ||
      !englishLevel ||
      !specializations ||
      !email ||
      !phoneNumber ||
      !whatsapp
    ) {
      return NextResponse.json(
        { error: "يرجى تعبئة جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (!isLicenseDateValid(expiryDate)) {
      return NextResponse.json(
        { error: "تاريخ انتهاء الترخيص منتهي أو غير صالح." },
        { status: 400 },
      );
    }

    if (!profileImage || !licenseAttachment) {
      return NextResponse.json(
        { error: "يرجى إرفاق الصورة الشخصية ورخصة الإرشاد السياحي." },
        { status: 400 },
      );
    }

    if (!commitment1 || !commitment2 || !commitment3) {
      return NextResponse.json(
        { error: "يجب الموافقة على جميع التعهدات." },
        { status: 400 },
      );
    }

    const maxFileSizeBytes = getMaxFileSizeBytes();

    if (
      profileImage.size > maxFileSizeBytes ||
      licenseAttachment.size > maxFileSizeBytes
    ) {
      return NextResponse.json(
        {
          error: `حجم الملف كبير جدا. الحد الأقصى ${(maxFileSizeBytes / (1024 * 1024)).toFixed(0)}MB.`,
        },
        { status: 400 },
      );
    }

    if (
      !PROFILE_IMAGE_ALLOWED_MIME_TYPES.includes(
        profileImage.type as (typeof PROFILE_IMAGE_ALLOWED_MIME_TYPES)[number],
      )
    ) {
      return NextResponse.json(
        { error: "الصورة الشخصية يجب أن تكون JPG أو PNG أو WEBP." },
        { status: 400 },
      );
    }

    if (
      !LICENSE_ALLOWED_MIME_TYPES.includes(
        licenseAttachment.type as (typeof LICENSE_ALLOWED_MIME_TYPES)[number],
      )
    ) {
      return NextResponse.json(
        { error: "مرفق الرخصة يجب أن يكون JPG أو JPEG أو PDF." },
        { status: 400 },
      );
    }

    const profileImageId = await uploadFileToDirectus(
      directusWriteBase,
      directusToken,
      profileImage,
    );

    const licenseAttachmentId = await uploadFileToDirectus(
      directusWriteBase,
      directusToken,
      licenseAttachment,
    );

    const payload: Record<string, unknown> = {
      name,
      name_en: nameEn,
      gender,
      national_id: nationalId,
      description,
      license_number: licenseNumber,
      date: expiryDate,
      arabic_language_level: arabicLevel,
      english_language_level: englishLevel,
      other_languages: otherLanguages || null,
      transportation,
      specializations,
      email,
      phone_number: phoneNumber,
      whatsapp,
      website: website || null,
      instagram: instagram || null,
      x_platform: xPlatform || null,
      tiktok: tiktok || null,
      commitment_1: commitment1,
      commitment_2: commitment2,
      commitment_3: commitment3,
      [profileImageField]: fileUrlFromId(directusWriteBase, profileImageId),
      [licenseAttachmentField]: fileUrlFromId(
        directusWriteBase,
        licenseAttachmentId,
      ),
    };

    const createResponse = await fetch(
      `${directusWriteBase}/items/${encodeURIComponent(collection)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${directusToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!createResponse.ok) {
      const text = await createResponse.text();
      return NextResponse.json(
        { error: `تعذر حفظ الطلب في قاعدة البيانات. ${text.slice(0, 200)}` },
        { status: 502 },
      );
    }

    const createJson = (await createResponse.json()) as {
      data?: { id?: string | number };
    };

    return NextResponse.json({
      success: true,
      applicationId: createJson?.data?.id ?? null,
      uploadedFiles: 2,
    });
  } catch (error) {
    console.error("Tour guide register API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء إرسال النموذج." },
      { status: 500 },
    );
  }
}
