import { NextResponse } from "next/server";

/** Must match the Directus collection and field names you create. */
const COLLECTION = "filmmaker_form_submissions";

function directusBaseUrl(): string | null {
  const raw =
    process.env.DIRECTUS_WRITE_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

function directusHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = process.env.DIRECTUS_WRITE_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const base = directusBaseUrl();
    if (!base) {
      return NextResponse.json(
        { error: "Server is not configured for submissions." },
        { status: 503 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const b = body as Record<string, unknown>;
    const first_name = String(b.first_name ?? "").trim();
    const last_name = String(b.last_name ?? "").trim();
    const email = String(b.email ?? "").trim();
    const phone = String(b.phone ?? "").trim();
    const message = String(b.message ?? "").trim();

    if (!first_name || !last_name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const payload = {
      first_name,
      last_name,
      email,
      phone,
      message,
    };

    const directusResponse = await fetch(
      `${base}/items/${COLLECTION}`,
      {
        method: "POST",
        headers: directusHeaders(),
        body: JSON.stringify(payload),
      },
    );

    if (directusResponse.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const responseText = await directusResponse.text();
    let directusResult: unknown = null;
    try {
      directusResult = responseText ? JSON.parse(responseText) : null;
    } catch {
      directusResult = responseText;
    }

    if (!directusResponse.ok) {
      console.error("Filmmaker form Directus error:", directusResult);
      return NextResponse.json(
        { error: "Could not save your submission. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, data: directusResult }, { status: 200 });
  } catch (error) {
    console.error("Filmmaker form route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
