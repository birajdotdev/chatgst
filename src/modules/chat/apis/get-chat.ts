import { cookies } from "next/headers";

import "server-only";

import { env } from "@/env";

interface APIResponse {
  message: string;
  data: Datum;
}

interface Datum {
  query: string;
  response: string;
}

export async function getChat(chatId: string) {
  try {
    const cookeStore = await cookies();
    const accessToken = cookeStore.get("access_token")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized access");
    }

    const res = await fetch(`${env.API_URL}/chats/${chatId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.detail || "Failed to fetch chat");
    }

    const data: APIResponse = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unexpected error occurred while fetching chat");
  }
}
