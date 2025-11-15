"use server";

import { cookies } from "next/headers";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import { sendOtpAction } from "@/modules/auth/actions/otp-action";
import { signupSchema } from "@/modules/auth/validations/signup-schema";

export const signupAction = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { first_name, middle_name, last_name, confirm_password, ...rest } =
      parsedInput;

    const full_name = [first_name, middle_name, last_name]
      .filter(Boolean)
      .join(" ");

    const transformedData = {
      ...rest,
      full_name,
    };

    const otpResult = await sendOtpAction({ email: parsedInput.email });

    if (!otpResult?.data?.success) {
      throw new Error(otpResult.serverError);
    }

    const cookieStore = await cookies();
    cookieStore.set("pendingRegistration", JSON.stringify(transformedData), {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes expiry
      path: "/",
    });

    return {
      success: true,
      message: "Verification code sent! Please check your email.",
      email: parsedInput.email,
    };
  });
