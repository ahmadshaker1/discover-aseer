import { NextResponse } from "next/server";
import {
  directusFetchCurrentUser,
  directusUploadFile,
  getBearerToken,
  getDirectusServerUrl,
} from "@/lib/directus/server";

export async function POST(request: Request) {
  const baseUrl = getDirectusServerUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server is not configured for tour guide portal." },
      { status: 503 },
    );
  }

  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await directusFetchCurrentUser(baseUrl, accessToken);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized.";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  try {
    const id = await directusUploadFile(baseUrl, accessToken, file);
    return NextResponse.json({ data: { id } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "File upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
