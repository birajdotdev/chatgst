import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { getCookie, deleteCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
import { s as sendOtpSchema, v as verifyOtpSchema } from "./otp-schema-CrqXLMtA.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const sendOtpFn_createServerFn_handler = createServerRpc({
  id: "06fd1849caa911a803219791b0037b1774667c374965f82387156fcb78ab7ad3",
  name: "sendOtpFn",
  filename: "src/modules/auth/actions/otp-action.ts"
}, (opts, signal) => sendOtpFn.__executeServer(opts, signal));
const sendOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => sendOtpSchema.parse(data)).handler(sendOtpFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams(data);
  const res = await fetch(`${env.API_URL}/register/otp/?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(typeof errorData.detail === "string" ? errorData.detail : "Failed to send OTP. Please try again.");
  }
  return {
    success: true,
    message: "OTP sent successfully! Please check your email."
  };
});
const verifyOtpFn_createServerFn_handler = createServerRpc({
  id: "ee32b3f2b0fdc7bab9d2d789e2032b225aa5915f25bc8b30350a64a204881ad6",
  name: "verifyOtpFn",
  filename: "src/modules/auth/actions/otp-action.ts"
}, (opts, signal) => verifyOtpFn.__executeServer(opts, signal));
const verifyOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => verifyOtpSchema.parse(data)).handler(verifyOtpFn_createServerFn_handler, async ({
  data
}) => {
  const res = await fetch(`${env.API_URL}/register/otp/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(typeof errorData.detail === "string" ? errorData.detail : "OTP verification failed. Please try again.");
  }
  const storedData = getCookie("pendingRegistration");
  if (!storedData) {
    throw new Error("Registration data not found. Please start the registration process again.");
  }
  const registrationData = JSON.parse(storedData);
  const registerRes = await fetch(`${env.API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registrationData)
  });
  if (!registerRes.ok) {
    const errorData = await registerRes.json();
    throw new Error(errorData.detail || "Account creation failed. Please try again.");
  }
  deleteCookie("pendingRegistration");
  return {
    success: true,
    message: "Account created successfully!"
  };
});
export {
  sendOtpFn_createServerFn_handler,
  verifyOtpFn_createServerFn_handler
};
