import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id: number;
  email: string;
  exp: number;
}

// Helper function to determine user role from email
function getUserRole(email?: string): 'admin' | 'user' {
  return email === 'john@mail.com' ? 'admin' : 'user';
} 
console.log(getUserRole())

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/login", "/"];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get auth data from cookies
  const token = request.cookies.get("auth-token")?.value;
  const email = request.cookies.get("email")?.value;

  // If no token, redirect to login
  if (!token || !email) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set("error", "login-required");
    return NextResponse.redirect(loginUrl);
  }

  // Basic JWT validation (no API calls for performance)
  try {
  //   const decoded = jwtDecode(token);


  //   if (decoded.exp * 1000 < Date.now()) {
  //     const loginUrl = new URL("/login", request.url);
  //     loginUrl.searchParams.set("redirect", pathname);
  //     loginUrl.searchParams.set("error", "session-expired");


  //     const response = NextResponse.redirect(loginUrl);
  //     response.cookies.delete("auth-token");
  //     response.cookies.delete("email");
  //     response.cookies.delete("user-role");
  //     return response;
  //   }

    const userRole = getUserRole(email);

    console.log('User role in middleware:', userRole);

    // Role-based access control
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      const accessDeniedUrl = new URL("/login", request.url);
      accessDeniedUrl.searchParams.set("error", "admin-required");
      return NextResponse.redirect(accessDeniedUrl);
    }

    // Redirect admin away from user routes
    if (pathname.startsWith("/user") && userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Add user info to headers for downstream use
    const response = NextResponse.next();
    response.headers.set('x-user-email', email);
    response.headers.set('x-user-role', userRole);

    return response;

  } catch (error) {
    // JWT decode failed, clear tokens and redirect
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set("error", "validation-error");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("auth-token");
    response.cookies.delete("email");
    response.cookies.delete("user-role");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};