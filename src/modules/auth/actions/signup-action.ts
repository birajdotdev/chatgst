"use server";

import { actionClient } from "@/lib/safe-action";
import { signupActionSchema } from "@/modules/auth/validations/signup-schema";

export const signupAction = actionClient
  .inputSchema(signupActionSchema)
  .action(async ({ parsedInput }) => {
    // parsedInput is now SignupActionOutput (with full_name, no first_name/last_name/confirm_password)
    console.log(parsedInput);
    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
