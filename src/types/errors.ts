/**
 * Error handling types and utilities for AI SDK integration
 */

/**
 * Standard error codes used across the application
 */
export const ErrorCodes = {
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  BACKEND_ERROR: "BACKEND_ERROR",
  STREAM_ERROR: "STREAM_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NO_USER_MESSAGE: "NO_USER_MESSAGE",
  EMPTY_MESSAGE: "EMPTY_MESSAGE",
  NO_RESPONSE_BODY: "NO_RESPONSE_BODY",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Structured error format for consistent error handling
 */
export interface StructuredError {
  code: ErrorCode;
  message: string;
  status?: number;
  details?: Record<string, unknown>;
}

/**
 * Backend error response format from FastAPI
 */
export interface BackendErrorResponse {
  detail?: string;
  [key: string]: unknown;
}

/**
 * Sanitizes errors before sending to client, preventing information leakage
 * Converts various error types into a structured format
 */
export function sanitizeError(error: unknown): StructuredError {
  // Handle null/undefined
  if (error == null) {
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: "An unknown error occurred",
      status: 500,
    };
  }

  // Handle string errors
  if (typeof error === "string") {
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: error,
      status: 500,
    };
  }

  // Handle Error instances
  if (error instanceof Error) {
    // Check for known error patterns
    if (error.message.includes("quota")) {
      return {
        code: ErrorCodes.QUOTA_EXCEEDED,
        message: "You have reached your free quota. Please login to continue.",
        status: 403,
      };
    }

    if (error.message.includes("No response body")) {
      return {
        code: ErrorCodes.NO_RESPONSE_BODY,
        message: "Failed to receive response from server",
        status: 500,
      };
    }

    // Generic error
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: "An error occurred while processing your request",
      status: 500,
    };
  }

  // Handle structured errors that are already in correct format
  if (typeof error === "object" && "code" in error && "message" in error) {
    return error as StructuredError;
  }

  // Fallback for unknown error types
  return {
    code: ErrorCodes.BACKEND_ERROR,
    message: "An unknown error occurred",
    status: 500,
  };
}

/**
 * Detects and categorizes backend error responses
 */
export function parseBackendError(
  response: Response,
  errorData: BackendErrorResponse | null,
  errorText: string
): StructuredError {
  const status = response.status;

  // Check for quota exceeded error (403)
  if (
    status === 403 &&
    (errorData?.detail?.toLowerCase().includes("quota") ||
      errorText.toLowerCase().includes("quota"))
  ) {
    return {
      code: ErrorCodes.QUOTA_EXCEEDED,
      message:
        "You have reached your free quota. Please login or signup to continue.",
      status: 403,
      details: errorData || undefined,
    };
  }

  // Check for validation errors (400)
  if (status === 400) {
    return {
      code: ErrorCodes.VALIDATION_ERROR,
      message: errorData?.detail || "Invalid request",
      status: 400,
      details: errorData || undefined,
    };
  }

  // Check for server errors (5xx)
  if (status >= 500) {
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: "Server error occurred. Please try again later.",
      status,
      details: errorData || undefined,
    };
  }

  // Generic error
  return {
    code: ErrorCodes.BACKEND_ERROR,
    message: errorData?.detail || response.statusText || "An error occurred",
    status,
    details: errorData || undefined,
  };
}

/**
 * Parses error from useChat hook's onError callback
 * Handles both JSON string errors and Error objects
 */
export function parseClientError(error: Error): StructuredError {
  try {
    // Try parsing if it's a JSON string
    const parsed = JSON.parse(error.message);
    if (parsed && typeof parsed === "object" && "code" in parsed) {
      return parsed as StructuredError;
    }
  } catch {
    // Not JSON, continue with error object handling
  }

  // Fallback to sanitizing the error
  return sanitizeError(error);
}
