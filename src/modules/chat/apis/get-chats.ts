import { cookies } from "next/headers";

import "server-only";

import { env } from "@/env";

export interface APIResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  title: string;
  created_at: Date;
}

export async function getChats() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(`${env.API_URL}/chats/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch chats");
    }

    const data: APIResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}
