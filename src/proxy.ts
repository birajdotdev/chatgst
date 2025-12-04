import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { env } from "@/env";

// Routes that require authentication
const protectedRoutes = ["/chat"];

// Routes that should redirect to /chat if already authenticated
const authRoutes = ["/login", "/register"];

function isTokenExpired(token: string): boolean {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication tokens from cookies
  let accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  let response = NextResponse.next();

  // Check if access token is expired or missing, but refresh token exists
  if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
    try {
      const res = await fetch(`${env.API_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data.data.access_token;

        // Update request headers for downstream
        request.cookies.set("access_token", newAccessToken);
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });

        // Update response cookies for browser
        response.cookies.set("access_token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });

        accessToken = newAccessToken;
      } else {
        // Refresh failed - logout
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");

        // If API route, return 401
        if (pathname.startsWith("/chat/api")) {
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // Error refreshing - logout
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");

      if (pathname.startsWith("/chat/api")) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const isAuthenticated = !!accessToken;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to /chat if trying to access auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - api (API routes) - EXCLUDING /chat/api
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public|api/(?!chat/api)).*)",
  ],
};
