import { NextRequest, NextResponse } from "next/server";

const REQUIRED_ANSWER_COUNT = 6;
const MAX_FILES = 10;
const DEFAULT_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
] as const;

function getEnv(name: string): string {
  return (process.env[name] || "").trim();
}

function getAllowedMimeTypes(): string[] {
  const custom = getEnv("TOUR_GUIDE_UPLOAD_ALLOWED_MIME_TYPES");
  if (!custom) return [...DEFAULT_ALLOWED_MIME_TYPES];
  return custom
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function getMaxFileSizeBytes(): number {
  const mbRaw = Number(getEnv("TOUR_GUIDE_UPLOAD_MAX_MB") || "10");
  const mb = Number.isFinite(mbRaw) && mbRaw > 0 ? mbRaw : 10;
  return Math.floor(mb * 1024 * 1024);
}

function normalizeAnswers(values: FormDataEntryValue[]): string[] {
  return values
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);
}

function toFiles(values: FormDataEntryValue[]): File[] {
  const files: File[] = [];
  for (const value of values) {
    if (value instanceof File && value.size > 0) files.push(value);
  }
  return files;
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

function formatAttachments(fileIds: string[]): unknown {
  const format = getEnv("DIRECTUS_TOUR_GUIDE_ATTACHMENTS_FORMAT") || "ids";
  if (format === "m2m") {
    return fileIds.map((id) => ({ directus_files_id: id }));
  }
  return fileIds;
}

export async function POST(request: NextRequest) {
  try {
    const directusWriteBase =
      getEnv("DIRECTUS_WRITE_BASE_URL") ||
      getEnv("NEXT_PUBLIC_DIRECTUS_APP_URL");
    const directusToken = getEnv("DIRECTUS_WRITE_TOKEN");
    const collection =
      getEnv("DIRECTUS_TOUR_GUIDE_APPLICATIONS_COLLECTION") ||
      "tour_guide_applications";
    const answersField =
      getEnv("DIRECTUS_TOUR_GUIDE_ANSWERS_FIELD") || "answers";
    const attachmentsField =
      getEnv("DIRECTUS_TOUR_GUIDE_ATTACHMENTS_FIELD") || "attachments";

    if (!directusWriteBase || !directusToken) {
      return NextResponse.json(
        { error: "Tour guide submission is not configured" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const answers = normalizeAnswers(formData.getAll("answers[]"));
    const files = toFiles(formData.getAll("files"));

    if (answers.length < REQUIRED_ANSWER_COUNT) {
      return NextResponse.json(
        { error: "يرجى تعبئة جميع الحقول المطلوبة." },
        { status: 400 },
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "يرجى إرفاق ملف واحد على الأقل." },
        { status: 400 },
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `الحد الأقصى لعدد الملفات هو ${MAX_FILES}.` },
        { status: 400 },
      );
    }

    const allowedMimeTypes = getAllowedMimeTypes();
    const maxFileSizeBytes = getMaxFileSizeBytes();

    for (const file of files) {
      if (file.size > maxFileSizeBytes) {
        return NextResponse.json(
          {
            error: `حجم الملف كبير جدا. الحد الأقصى ${(maxFileSizeBytes / (1024 * 1024)).toFixed(0)}MB.`,
          },
          { status: 400 },
        );
      }
      if (!allowedMimeTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "نوع الملف غير مدعوم." },
          { status: 400 },
        );
      }
    }

    const uploadedFileIds: string[] = [];
    for (const file of files) {
      const fileId = await uploadFileToDirectus(
        directusWriteBase,
        directusToken,
        file,
      );
      uploadedFileIds.push(fileId);
    }

    const payload: Record<string, unknown> = {
      submitted_at: new Date().toISOString(),
      source: "discover-aseer-web",
      status: "submitted",
      [answersField]: answers,
      [attachmentsField]: formatAttachments(uploadedFileIds),
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
      uploadedFiles: uploadedFileIds.length,
    });
  } catch (error) {
    console.error("Tour guide register API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء إرسال النموذج." },
      { status: 500 },
    );
  }
}
