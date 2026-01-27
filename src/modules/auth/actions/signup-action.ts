import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "vinxi/http";
import { z } from "zod";

import { env } from "@/env";
import { sendOtpFn } from "@/modules/auth/actions/otp-action";
import { signupSchema } from "@/modules/auth/validations/signup-schema";

export type SignupInput = z.infer<typeof signupSchema>;

export const signupFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signupSchema.parse(data))
  .handler(async ({ data }) => {
    const { first_name, middle_name, last_name, confirm_password, ...rest } =
      data;

    const full_name = [first_name, middle_name, last_name]
      .filter(Boolean)
      .join(" ");

    const transformedData = {
      ...rest,
      full_name,
    };

    // Send OTP to email
    const otpResult = await sendOtpFn({ data: { email: data.email } });

    if (!otpResult?.success) {
      throw new Error("Failed to send verification code. Please try again.");
    }

    setCookie("pendingRegistration", JSON.stringify(transformedData), {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes expiry
      path: "/",
    });

    return {
      success: true,
      message: "Verification code sent! Please check your email.",
      email: data.email as string,
    };
  });
