import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login" && request.nextUrl.search) {
    const clean = request.nextUrl.clone();
    clean.search = "";
    return NextResponse.redirect(clean);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
