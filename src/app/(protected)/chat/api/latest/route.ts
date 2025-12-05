import { NextRequest } from "next/server";

/**
 * Simple endpoint to get the latest chat ID from the last stream response
 * This uses a cookie to temporarily store the chat ID created in the POST request
 */
export async function GET(req: NextRequest) {
  // Get the chat ID from a cookie if it was set
  const chatIdCookie = req.cookies.get("latest_chat_id");

  if (chatIdCookie?.value) {
    // Clear the cookie after reading
    const response = Response.json({ chatId: chatIdCookie.value });
    response.headers.set(
      "Set-Cookie",
      "latest_chat_id=; Path=/; Max-Age=0; HttpOnly"
    );
    return response;
  }

  return Response.json({ chatId: null });
}
