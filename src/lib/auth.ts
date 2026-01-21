import { cache } from "react";

import "server-only";

import {
  getOptionalSession,
  getOptionalUser,
  getUser,
  verifySession,
} from "./dal";

// Re-export everything from dal.ts for backward compatibility
export { verifySession, getOptionalSession, getUser, getOptionalUser };
export type { UserProfile, VerifiedSession } from "./dal";

// Re-export session utilities that might be needed directly
export { createSession, deleteSession } from "./session";

/**
 * Combined auth helper for layouts and pages.
 * Returns both authentication status and user profile.
 *
 * @example
 * ```tsx
 * async function AuthenticatedNavbar() {
 *   const { isAuthenticated, user } = await auth();
 *   return <Navbar isAuthenticated={isAuthenticated} user={user} />;
 * }
 * ```
 */
export const auth = cache(async () => {
  const session = await getOptionalSession();
  const user = session ? await getOptionalUser() : null;

  return {
    isAuthenticated: session !== null,
    user,
  };
});
