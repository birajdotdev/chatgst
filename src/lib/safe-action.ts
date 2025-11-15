import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

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
});
