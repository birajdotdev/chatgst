import {
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

export const maxDuration = 30;

interface ChatGSTResponse {
  query: string;
  optimized_query: string;
  response: string;
}

/**
 * Query the ChatGST FastAPI RAG backend
 * @param query - User's question about GST
 * @returns Promise with ChatGST API response
 */
async function queryChatGST(query: string): Promise<ChatGSTResponse> {
  const response = await fetch("https://chatgst.in/api/general-query/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ query }),
  });

  if (!response.ok) {
    throw new Error(`ChatGST API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Next.js API Route - Industry Standard Wrapper Pattern
 * Acts as an adapter between AI SDK's DefaultChatTransport and ChatGST FastAPI backend
 */
export async function POST(req: Request) {
  try {
    // Parse incoming request from AI SDK's DefaultChatTransport
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("📨 Received messages:", messages.length);

    // Extract the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      return new Response(JSON.stringify({ error: "No user message found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract text from message parts (AI SDK format)
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

    console.log("🔍 Query to ChatGST:", userQuery);

    // Call ChatGST FastAPI RAG backend
    const result = await queryChatGST(userQuery);

    console.log("✅ ChatGST response received:", result.optimized_query);

    // Transform ChatGST response to AI SDK UIMessage stream format
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        // Start the text message
        writer.write({
          type: "text-start",
          id: "response-text",
        });

        // Write the HTML response as text chunks
        const htmlResponse = result.response;

        // Split into chunks for smooth streaming effect
        const chunkSize = 50;
        for (let i = 0; i < htmlResponse.length; i += chunkSize) {
          const chunk = htmlResponse.slice(i, i + chunkSize);
          writer.write({
            type: "text-delta",
            id: "response-text",
            delta: chunk,
          });
          // Small delay for smooth streaming UX
          await new Promise((resolve) => setTimeout(resolve, 20));
        }

        // End the text message
        writer.write({
          type: "text-end",
          id: "response-text",
        });

        // Finish the message
        writer.write({
          type: "finish",
        });
      },
    });

    // Return response using createUIMessageStreamResponse
    return createUIMessageStreamResponse({ stream });
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
