import {
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

import { env } from "@/env";

export const maxDuration = 30;

interface ChatGSTResponse {
  query: string;
  response: string;
  time_taken: number;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      return new Response(JSON.stringify({ error: "No user message found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userQuery = lastUserMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { type: "text"; text: string }).text)
      .join(" ");

    if (!userQuery.trim()) {
      return new Response(JSON.stringify({ error: "Empty message content" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clientCookies = req.headers.get("cookie");

    const backendResponse = await fetch(`${env.API_URL}/general-query/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        ...(clientCookies && { cookie: clientCookies }),
      },
      credentials: "include",
      body: new URLSearchParams({ query: userQuery }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => null);
      const isQuotaError =
        backendResponse.status === 403 &&
        errorData?.detail?.includes("free quota");

      if (isQuotaError) {
        return new Response(
          JSON.stringify({
            error: "QUOTA_EXCEEDED",
            message: errorData.detail,
            requiresAuth: true,
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      throw new Error(`ChatGST API error: ${backendResponse.statusText}`);
    }

    const result: ChatGSTResponse = await backendResponse.json();
    const setCookieHeader = backendResponse.headers.get("set-cookie");

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        writer.write({
          type: "text-start",
          id: "response-text",
        });
        const response = result.response;
        const chunkSize = 20;

        for (let i = 0; i < response.length; i += chunkSize) {
          const chunk = response.slice(i, i + chunkSize);
          writer.write({
            type: "text-delta",
            id: "response-text",
            delta: chunk,
          });
          await new Promise((resolve) => setTimeout(resolve, 100));
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
    console.error("❌ Error in chat API:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
