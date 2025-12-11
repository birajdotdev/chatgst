"use server";

import { z } from "zod";

import { getUserProfile } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const getProfileAction = actionClient
  .inputSchema(z.object({}))
  .action(async () => {
    const profile = await getUserProfile();
    return { data: profile };
  });
