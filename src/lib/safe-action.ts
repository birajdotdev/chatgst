import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

import { verifySession } from "@/lib/auth";

// Create the client with error handling configuration.
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    // Log the error on the server for debugging
    console.error("Action error:", e.message);

    // Return the error message to the client
    // You can customize this based on error types or use DEFAULT_SERVER_ERROR_MESSAGE for production
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized: No valid session found.");
  }

  if (!session.accessToken || !session.refreshToken) {
    throw new Error("Unauthorized: Missing authentication tokens.");
  }

  // You can attach user info or tokens to the context if needed
  return next({
    ctx: {
      ...session,
    },
  });
});
