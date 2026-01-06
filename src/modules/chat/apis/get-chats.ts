import { cache } from "react";

import "server-only";

import { env } from "@/env";
import { verifySession } from "@/lib/dal";

export interface APIResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  title: string;
  created_at: Date;
}

export const getChats = cache(async () => {
  const session = await verifySession();

  const res = await fetch(`${env.API_URL}/chats/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: ["chats-list"],
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chats");
  }

  const data: APIResponse = await res.json();
  return data.data;
});
