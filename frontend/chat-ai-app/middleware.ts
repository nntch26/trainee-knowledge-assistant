import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAuthPage = req.nextUrl.pathname === "/login";

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/chat") ||
    req.nextUrl.pathname.startsWith("/upload");

  // ไม่มี token เด้งไป login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // มี token ไป chat
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/upload/:path*", "/login"],
};