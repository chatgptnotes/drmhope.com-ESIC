import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@/auth";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle auth routes
  if (pathname.startsWith('/api/auth')) {
    return await authMiddleware(request);
  }

  // Get the token from the cookie
  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

  // If user is not logged in and trying to access dashboard
  if (!sessionToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and trying to access login or signup page
  if (sessionToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
