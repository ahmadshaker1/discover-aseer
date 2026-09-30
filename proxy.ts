import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Legacy links used capital "G"; must be case-sensitive so `/ar/getting-here-and-around` is not redirected (Windows + next.config redirects can match case-insensitively and loop). */
const LEGACY_GETTING_HERE = /^\/(ar|en|zh)\/Getting-here-and-around(\/.*)?$/;
const ZH_EXPERIENCES = /^\/zh\/experiences(\/.*)?$/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (ZH_EXPERIENCES.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/zh";
    url.search = "";
    return NextResponse.redirect(url, 307);
  }
  if (LEGACY_GETTING_HERE.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(
      "/Getting-here-and-around",
      "/getting-here-and-around",
    );
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|booklet|_next|_vercel|.*\\..*).*)"],
};

