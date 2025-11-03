import {
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

import { env } from "@/env";
import {
  type BackendErrorResponse,
  ErrorCodes,
  type StructuredError,
  parseBackendError,
  sanitizeError,
} from "@/types/errors";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      const error: StructuredError = {
        code: ErrorCodes.NO_USER_MESSAGE,
        message: "No user message found",
        status: 400,
      };
      return Response.json(error, { status: 400 });
    }

    const userQuery = lastUserMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { type: "text"; text: string }).text)
      .join(" ");

    if (!userQuery.trim()) {
      const error: StructuredError = {
        code: ErrorCodes.EMPTY_MESSAGE,
        message: "Empty message content",
        status: 400,
      };
      return Response.json(error, { status: 400 });
    }

    const clientCookies = req.headers.get("cookie");

    const formData = new FormData();
    formData.append("query", userQuery);

    const backendResponse = await fetch(`${env.API_URL}/general-query/`, {
      method: "POST",
      headers: {
        ...(clientCookies && { cookie: clientCookies }),
      },
      credentials: "include",
      body: formData,
    });

    // Handle errors from backend
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      let errorData: BackendErrorResponse | null = null;

      // Try to parse as JSON
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // Not JSON, use text directly
      }

      // Parse and structure the error
      const structuredError = parseBackendError(
        backendResponse,
        errorData,
        errorText
      );

      // Log full error details server-side for debugging
      console.error("Backend error:", {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        body: errorText,
        structuredError,
      });

      // Return structured error to client (sanitized)
      return Response.json(structuredError, {
        status: structuredError.status || 500,
      });
    }

    const setCookieHeader = backendResponse.headers.get("set-cookie");

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        try {
          writer.write({
            type: "text-start",
            id: "response-text",
          });

          const reader = backendResponse.body?.getReader();
          const decoder = new TextDecoder();

          if (!reader) {
            const error = sanitizeError(
              new Error("No response body from backend")
            );
            console.error("Stream error: No response body");

            writer.write({
              type: "error",
              errorText: JSON.stringify(error),
            });

            // Close the text stream and finish properly
            writer.write({
              type: "text-end",
              id: "response-text",
            });

            writer.write({
              type: "finish",
            });

            return;
          }

          try {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const chunk = decoder.decode(value, { stream: true });

              writer.write({
                type: "text-delta",
                id: "response-text",
                delta: chunk,
              });
            }
          } finally {
            reader.releaseLock();
          }

          writer.write({
            type: "text-end",
            id: "response-text",
          });

          writer.write({
            type: "finish",
          });
        } catch (error) {
          // Handle errors during streaming
          const sanitizedError = sanitizeError(error);

          console.error("Stream execution error:", {
            name: error instanceof Error ? error.name : "Unknown",
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined,
            sanitizedError,
          });

          // Emit error event through the stream
          writer.write({
            type: "error",
            errorText: JSON.stringify(sanitizedError),
          });

          // Properly terminate the stream
          writer.write({
            type: "finish",
          });
        }
      },
    });

    const streamResponse = createUIMessageStreamResponse({ stream });

    // Forward Set-Cookie headers from backend to client
    if (setCookieHeader) {
      streamResponse.headers.set("Set-Cookie", setCookieHeader);
    }

    return streamResponse;
  } catch (error) {
    // Sanitize error before sending to client
    const sanitizedError = sanitizeError(error);

    console.error("❌ Error in chat API:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      sanitizedError,
    });

    return Response.json(sanitizedError, {
      status: sanitizedError.status || 500,
    });
  }
}
