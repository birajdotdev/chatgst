import {
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

import { env } from "@/env";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      return Response.json({ error: "No user message found" }, { status: 400 });
    }

    const userQuery = lastUserMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { type: "text"; text: string }).text)
      .join(" ");

    if (!userQuery.trim()) {
      return Response.json({ error: "Empty message content" }, { status: 400 });
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
      let errorData = null;

      // Try to parse as JSON
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // Not JSON, use text directly
      }

      const isQuotaError =
        backendResponse.status === 403 &&
        (errorData?.detail?.includes("free quota") ||
          errorText.includes("free quota"));

      if (isQuotaError) {
        return Response.json(
          {
            error:
              "QUOTA_EXCEEDED: You have reached your free quota. Please login or signup to continue.",
          },
          { status: 403 }
        );
      }

      // Log other errors for debugging
      console.error("Backend error:", {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        body: errorText,
      });

      throw new Error(`ChatGST API error: ${backendResponse.statusText}`);
    }

    const setCookieHeader = backendResponse.headers.get("set-cookie");

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        writer.write({
          type: "text-start",
          id: "response-text",
        });

        const reader = backendResponse.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response body from backend");
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
      },
    });

    const streamResponse = createUIMessageStreamResponse({ stream });

    if (setCookieHeader) {
      streamResponse.headers.set("Set-Cookie", setCookieHeader);
    }

    return streamResponse;
  } catch (error) {
    console.error("❌ Error in chat API:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process chat request",
      },
      { status: 500 }
    );
  }
}
