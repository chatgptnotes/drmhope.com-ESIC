import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'IMQYhPXxOTOgU90xDPS0zhpPWHiQvsmj6vR29cPLmUU='
  });
  const pathname = request.nextUrl.pathname;

  // If user is not logged in and trying to access dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and trying to access login or signup page
  if (token && (pathname === "/login" || pathname === "/signup")) {
    // Redirect based on role
    const role = token.role as string;
    switch (role) {
      case "super-admin":
        return NextResponse.redirect(new URL("/dashboard/super-admin", request.url));
      case "admin":
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      case "hospital":
        return NextResponse.redirect(new URL("/dashboard/hospital", request.url));
      case "clinic":
        return NextResponse.redirect(new URL("/dashboard/clinic", request.url));
      default:
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
