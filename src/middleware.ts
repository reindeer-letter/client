import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedURL = ["/myPage", "/home", "/openLetter"];
  if (!token && protectedURL.some((route) => pathname.startsWith(route)))
    return NextResponse.redirect(new URL("/login", request.url));

  const publicURL = ["/login", "/signUp", "/profile"];
  if (token && publicURL.some((route) => pathname.startsWith(route)))
    return NextResponse.redirect(new URL("/home", request.url));

  return NextResponse.next();
}

// matcher 설정
export const config = {
  matcher: [
    "/myPage",
    "/home",
    "/login",
    "/signUp",
    "/profile",
    "/openLetter/:id*",
  ],
};
