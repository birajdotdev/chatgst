import { redirect } from "next/navigation";

import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

import {
  authLog,
  deleteSession,
  getSession,
  isTokenExpired,
  refreshAccessToken,
  updateAccessToken,
} from "./session";

/**
 * Custom error class for authentication failures.
 * When thrown, triggers a redirect to the login page.
 */
export class AuthenticationError extends Error {
  constructor(message = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Base action client with error handling.
 * Use this for public actions (login, signup, forgot-password, etc.)
 */
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    // Handle authentication errors by redirecting to login
    if (e instanceof AuthenticationError) {
      redirect("/login");
    }

    // Return error message to client
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

/**
 * Session type provided in the action context.
 */
export interface ActionSession {
  accessToken: string;
  refreshToken: string;
}

/**
 * Protected action client with authentication middleware.
 * Automatically verifies the session and provides it in the action context.
 *
 * Use this for any action that requires authentication.
 *
 * @example
 * ```ts
 * export const updateProfile = protectedActionClient
 *   .inputSchema(schema)
 *   .action(async ({ parsedInput, ctx: { session } }) => {
 *     // session.accessToken is guaranteed to be valid
 *     const res = await fetch(url, {
 *       headers: { Authorization: `Bearer ${session.accessToken}` }
 *     });
 *   });
 * ```
 */
export const protectedActionClient = actionClient.use(async ({ next }) => {
  authLog("info", "Protected action: verifying session");
  const session = await getSession();

  // No session at all
  if (!session) {
    authLog("warn", "Protected action: no session found");
    throw new AuthenticationError();
  }

  const { accessToken, refreshToken } = session;

  // Check if refresh token is expired (can't recover)
  if (isTokenExpired(refreshToken)) {
    authLog("warn", "Protected action: refresh token expired");
    await deleteSession();
    throw new AuthenticationError("Session expired");
  }

  // Check if access token needs refresh
  if (isTokenExpired(accessToken)) {
    authLog("info", "Protected action: access token expired, refreshing");
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      authLog("error", "Protected action: token refresh failed");
      await deleteSession();
      throw new AuthenticationError("Session expired");
    }

    // Update the cookie with new access token
    await updateAccessToken(newAccessToken);

    authLog("info", "Protected action: session verified (token refreshed)");
    // Return session with new access token in context
    return next({
      ctx: {
        session: {
          accessToken: newAccessToken,
          refreshToken,
        } satisfies ActionSession,
      },
    });
  }

  authLog("info", "Protected action: session verified");
  // Return valid session in context
  return next({
    ctx: {
      session: {
        accessToken,
        refreshToken,
      } satisfies ActionSession,
    },
  });
});
