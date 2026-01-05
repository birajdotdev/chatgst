"use server";

import { z } from "zod";

import { getUser } from "@/lib/dal";
import { protectedActionClient } from "@/lib/safe-action";

export const getProfileAction = protectedActionClient
  .inputSchema(z.object({}))
  .action(async () => {
    // Session is already verified by protectedActionClient
    // getUser will use the valid session from DAL cache
    const profile = await getUser();
    return { data: profile };
  });
