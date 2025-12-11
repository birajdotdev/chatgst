# Fix: ERR_TOO_MANY_REDIRECTS Issue

## Problem

The application was experiencing an `ERR_TOO_MANY_REDIRECTS` error when refresh tokens were stored in cookies. This was caused by an infinite redirect loop in the authentication middleware.

## Root Cause

The issue occurred in `/src/proxy.ts` where:

1. **Invalid Token Detection**: The middleware would check for a `refresh_token` cookie and attempt to refresh the access token, even if the refresh token itself was expired or invalid.

2. **Redirect Loop**: When the refresh attempt failed:
   - Cookies were deleted
   - User was redirected to `/login`
   - But the middleware would execute again on the `/login` route
   - Since there might still be stale cookie data in the request, it could attempt to refresh again
   - This created an infinite loop: refresh fails → redirect to login → refresh fails → redirect to login...

3. **Incomplete Authentication Check**: The `isAuthenticated` check only verified the presence of an `accessToken`, not whether it was actually valid.

## Solution

The fix implements several key improvements:

### 1. **Validate Refresh Token Before Use** (Line 41-42)

```typescript
const isRefreshTokenExpired = refreshToken ? isTokenExpired(refreshToken) : true;

if (refreshToken && !isRefreshTokenExpired && ...) {
```

Now we check if the refresh token is expired BEFORE attempting to use it.

### 2. **Proper Cookie Cleanup** (Lines 75-77, 89-91)

```typescript
accessToken = undefined;
const loginUrl = new URL("/login", request.url);
response = NextResponse.redirect(loginUrl);
response.cookies.delete("access_token");
response.cookies.delete("refresh_token");
```

Cookies are deleted on the redirect response itself, ensuring they're cleared in the same round trip.

### 3. **Handle Expired Refresh Tokens** (Lines 105-109)

```typescript
if (refreshToken && isRefreshTokenExpired) {
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  accessToken = undefined;
}
```

If we detect an expired refresh token, immediately clear all auth cookies to prevent retry attempts.

### 4. **Validated Authentication Check** (Line 112)

```typescript
const isAuthenticated = !!accessToken && !isTokenExpired(accessToken);
```

Now checks both presence AND validity of the access token.

### 5. **Additional Safety on Protected Routes** (Lines 120-126)

```typescript
if (isProtectedRoute && !isAuthenticated) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  response = NextResponse.redirect(loginUrl);
  // Ensure cookies are cleared when redirecting unauthenticated users
  if (!accessToken || (accessToken && isTokenExpired(accessToken))) {
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
  }
  return response;
}
```

Extra safety measure to clear cookies when redirecting unauthenticated users from protected routes.

## Testing

After applying this fix:

1. Clear your browser cookies
2. Restart the development server
3. Try logging in - the redirect loop should be resolved
4. Test token expiration scenarios

## Additional Notes

- The middleware now properly handles expired refresh tokens without entering infinite loops
- Cookie cleanup is now atomic with redirects
- The authentication state is validated at multiple checkpoints to prevent stale states
