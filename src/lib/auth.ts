import {
  getOptionalSession,
  getOptionalUser,
  getUser,
  verifySession,
} from "./dal";
import { createSessionFn, deleteSessionFn } from "./session.server";

// Re-export everything from dal.ts for backward compatibility
export { verifySession, getOptionalSession, getUser, getOptionalUser };
export type { UserProfile, VerifiedSession } from "./dal";

// Re-export session utilities that might be needed directly
export { createSessionFn, deleteSessionFn };

/**
 * Combined auth helper for layouts and pages.
 * Returns both authentication status and user profile.
 *
 * @example
 * ```tsx
 * const { isAuthenticated, user } = await auth();
 * return <Navbar isAuthenticated={isAuthenticated} user={user} />;
 * ```
 */
export async function auth() {
  const session = await getOptionalSession();
  const user = session ? await getOptionalUser() : null;

  return {
    isAuthenticated: session !== null,
    user,
  };
}
