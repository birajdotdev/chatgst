"use server";

import { cookies } from "next/headers";

import { zfd } from "zod-form-data";

import { actionClient } from "@/lib/safe-action";

// Empty schema for actions that don't need input from the form
const schema = zfd.formData({});

export const logoutAction = actionClient
  .inputSchema(schema)
  .action(async () => {
    const cookieStore = await cookies();

    // Delete authentication cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return {
      success: true,
      message: "Logged out successfully",
    };
  });
