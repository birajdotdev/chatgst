import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { setCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
import { s as sendOtpFn } from "./otp-action-EKLsQble.js";
import { s as signupSchema } from "./signup-schema-Ve76AbRC.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "./createSsrRpc-D8jcV7CB.js";
import "./otp-schema-CrqXLMtA.js";
import "./helpers-CIAyAvNc.js";
import "libphonenumber-js";
import "./user-types-DQBxjyNb.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const signupFn_createServerFn_handler = createServerRpc({
  id: "93ae0e98c8004f73756f815967f3548ecb2d343b5c510adae0c0046c7503fc9f",
  name: "signupFn",
  filename: "src/modules/auth/actions/signup-action.ts"
}, (opts, signal) => signupFn.__executeServer(opts, signal));
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((data) => signupSchema.parse(data)).handler(signupFn_createServerFn_handler, async ({
  data
}) => {
  const {
    first_name,
    middle_name,
    last_name,
    confirm_password,
    ...rest
  } = data;
  const full_name = [first_name, middle_name, last_name].filter(Boolean).join(" ");
  const transformedData = {
    ...rest,
    full_name
  };
  const otpResult = await sendOtpFn({
    data: {
      email: data.email
    }
  });
  if (!otpResult?.success) {
    throw new Error("Failed to send verification code. Please try again.");
  }
  setCookie("pendingRegistration", JSON.stringify(transformedData), {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    // 15 minutes expiry
    path: "/"
  });
  return {
    success: true,
    message: "Verification code sent! Please check your email.",
    email: data.email
  };
});
export {
  signupFn_createServerFn_handler
};
