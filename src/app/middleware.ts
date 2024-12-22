import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value; // 엑세스 토큰 저장 이름 확인 필요!!!!

  const protectedRoutes = ["/mypage", "/home"];
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route)))
    return NextResponse.redirect(new URL("/login", request.url));

  const publicRoutes = ["/login", "/signUp", "/profile"];
  if (token && publicRoutes.some((route) => pathname.startsWith(route)))
    return NextResponse.redirect(new URL("/home", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage", "/home", "/login", "/signUp", "/profile"],
};
