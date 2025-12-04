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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");

    if (!chatId) {
      const error: StructuredError = {
        code: ErrorCodes.BACKEND_ERROR,
        message: "Chat ID is required",
        status: 400,
      };
      return Response.json(error, { status: 400 });
    }

    const clientCookies = req.headers.get("cookie");

    // Parse access_token from cookies
    const cookies = clientCookies?.split(";").reduce(
      (acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const accessToken = cookies?.["access_token"];

    if (!accessToken) {
      const error: StructuredError = {
        code: ErrorCodes.BACKEND_ERROR,
        message: "Unauthorized",
        status: 401,
      };
      return Response.json(error, { status: 401 });
    }

    const backendResponse = await fetch(`${env.API_URL}/chats/${chatId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      let errorData: BackendErrorResponse | null = null;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        // Not JSON, use text directly
      }

      const structuredError = parseBackendError(
        backendResponse,
        errorData,
        errorText
      );

      console.error("Backend error:", {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        body: errorText,
        structuredError,
      });

      return Response.json(structuredError, {
        status: structuredError.status || 500,
      });
    }

    const chatHistory = await backendResponse.json();
    return Response.json(chatHistory);
  } catch (error) {
    const sanitizedError = sanitizeError(error);

    console.error("❌ Error fetching chat history:", {
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

    // Parse access_token from cookies
    const cookies = clientCookies?.split(";").reduce(
      (acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const accessToken = cookies?.["access_token"];

    if (!accessToken) {
      const error: StructuredError = {
        code: ErrorCodes.BACKEND_ERROR,
        message: "Unauthorized",
        status: 401,
      };
      return Response.json(error, { status: 401 });
    }

    // Get chatId from query params if continuing existing chat
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");

    const body = new URLSearchParams({ query: userQuery }).toString();

    // Build API URL with chat_id if provided
    const apiUrl = chatId
      ? `${env.API_URL}/chats/?chat_id=${chatId}`
      : `${env.API_URL}/chats/`;

    const backendResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
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
            let isFirstChunk = true;
            let extractedChatId: string | null = null;

            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              let chunk = decoder.decode(value, { stream: true });

              // Extract chat ID from first chunk if not provided
              if (isFirstChunk && !chatId) {
                isFirstChunk = false;
                // Response format: "chatId response text"
                const spaceIndex = chunk.indexOf(" ");
                if (spaceIndex > 0) {
                  extractedChatId = chunk.substring(0, spaceIndex);
                  chunk = chunk.substring(spaceIndex + 1); // Remove chatId from text

                  // Emit chat ID as custom metadata
                  writer.write({
                    type: "data-chatId",
                    data: extractedChatId,
                  } as any);
                }
              }

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
