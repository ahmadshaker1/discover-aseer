import { NextResponse } from "next/server";

/** Public tour guide registration is closed. */
export async function POST(request: Request) {
  const referer = request.headers.get("referer") || "";
  const isArabic = referer.includes("/ar/") || referer.endsWith("/ar");

  return NextResponse.json(
    {
      error: isArabic
        ? "التسجيل كمرشد سياحي مغلق حالياً."
        : "Tour guide registration is currently closed.",
    },
    { status: 403 },
  );
}
