import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * next.config redirects match sources case-insensitively, so a rule like
 * /ATS-Checker → /ats-checker also matches /ats-checker and causes an infinite
 * redirect loop on Windows. Normalize only when the path has uppercase chars.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
