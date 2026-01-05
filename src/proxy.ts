import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { decodeJwt } from "jose";

// Routes that require authentication
const protectedRoutes = ["/chat", "/appeal-draft", "/profile"];

// Routes that should redirect to /chat if already authenticated
const authRoutes = ["/login", "/register", "/forgot-password"];

// Routes that redirect to /chat only on exact match
const exactAuthRoutes = ["/", "/general"];

/**
 * Optimistic check: decode JWT to check expiry.
 * Does NOT verify signature (backend owns the secret).
 *
 * This is safe because:
 * 1. We only use this for routing decisions, not authorization
 * 2. Actual authorization happens in the DAL/Server Actions
 * 3. A tampered token would fail backend validation anyway
 */
function isTokenLikelyValid(token: string): boolean {
  try {
    const payload = decodeJwt(token);
    if (typeof payload.exp !== "number") return false;
    // Check if token expires in the next 30 seconds
    // We're generous here because DAL will handle the actual refresh
    return Date.now() < payload.exp * 1000 - 30000;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get tokens from cookies (optimistic read only - no API calls)
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // Optimistic auth check:
  // - If access token is valid, consider authenticated
  // - If access token expired but refresh token exists and valid, consider authenticated
  //   (DAL will handle the actual refresh when the page loads)
  // - Otherwise, not authenticated
  const hasValidAccess = accessToken && isTokenLikelyValid(accessToken);
  const hasValidRefresh = refreshToken && isTokenLikelyValid(refreshToken);
  const isLikelyAuthenticated = hasValidAccess || hasValidRefresh;

  // Check route types
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isExactAuthRoute = exactAuthRoutes.includes(pathname);

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isLikelyAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);
    // Clear potentially stale cookies
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  // Redirect to /chat if accessing auth routes while authenticated
  if ((isAuthRoute || isExactAuthRoute) && isLikelyAuthenticated) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc.)
     * - API routes (handled separately by Route Handlers)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
