import { createServerFn } from "@tanstack/react-start";

import { verifySession } from "@/lib/auth";
import { getUser } from "@/lib/dal";

export const getProfileFn = createServerFn({ method: "GET" }).handler(
  async () => {
    // Verify session first
    await verifySession();

    // Get user profile
    const profile = await getUser();
    return { data: profile };
  }
);
