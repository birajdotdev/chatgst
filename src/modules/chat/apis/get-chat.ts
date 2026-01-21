import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/dal";

interface APIResponse {
  message: string;
  data: Datum;
}

interface Datum {
  query: string;
  response: string;
}

export const getChat = cache(async (chatId: string) => {
  const session = await verifySession();

  const res = await fetch(`${env.API_URL}/chats/${chatId}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      (errorData as { detail?: string }).detail || "Failed to fetch chat"
    );
  }

  const data: APIResponse = await res.json();
  return data.data;
});
