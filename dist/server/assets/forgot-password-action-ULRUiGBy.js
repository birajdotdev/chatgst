import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { setCookie, getCookie, deleteCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { c as createServerFn } from "../server.js";
import { f as forgotPasswordSchema, v as verifyResetOtpSchema, r as resetPasswordSchema } from "./forgot-password-schema-TEY8kxah.js";
const RESET_SESSION_COOKIE_NAME = "reset_session_id";
const RESET_SESSION_MAX_AGE = 600;
createServerFn({
  method: "GET"
}).handler(createSsrRpc("8a4bed782dd5916d72dbc7c7ed5e8a58c2f7c0bd279c1f6eb928632735fdefd6", () => import("./reset-session-Cs-uKZKI.js").then((m) => m["getResetSessionCookieFn_createServerFn_handler"])));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1d8a994e70d083c82ee6f27cd3e27a57b9d3d5d4fa595e1bf21454b192d97fcc", () => import("./reset-session-Cs-uKZKI.js").then((m) => m["setResetSessionCookieFn_createServerFn_handler"])));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("af4da6140c0802856bbdf87723e8fd8d0592d7af3f93d37fc6ab893045cdc24d", () => import("./reset-session-Cs-uKZKI.js").then((m) => m["deleteResetSessionCookieFn_createServerFn_handler"])));
function parseSetCookieHeader(setCookieHeader) {
  if (!setCookieHeader) return null;
  const match = setCookieHeader.match(/reset_session_id=([^;]+)/);
  return match ? match[1] : null;
}
function createCookieHeader(value) {
  return `${RESET_SESSION_COOKIE_NAME}=${value}`;
}
const forgotPasswordFn_createServerFn_handler = createServerRpc({
  id: "9ccda1449568e561784d1e6387114bad2178ffbcd298a655c2df67808f088fbb",
  name: "forgotPasswordFn",
  filename: "src/modules/auth/actions/forgot-password-action.ts"
}, (opts, signal) => forgotPasswordFn.__executeServer(opts, signal));
const forgotPasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => forgotPasswordSchema.parse(data)).handler(forgotPasswordFn_createServerFn_handler, async ({
  data
}) => {
  const res = await fetch(`${env.API_URL}/forget-password/send-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to send OTP. Please try again.");
  }
  const setCookieHeader = res.headers.get("Set-Cookie");
  const sessionId = parseSetCookieHeader(setCookieHeader);
  if (sessionId) {
    setCookie(RESET_SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      maxAge: RESET_SESSION_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: env.NODE_ENV === "production"
    });
  }
  const responseData = await res.json();
  return {
    success: true,
    message: responseData.message || "OTP sent successfully!"
  };
});
const verifyResetOtpFn_createServerFn_handler = createServerRpc({
  id: "9a5bb0bc178e3b2603b2a67e4eb9ad71dd0cdd4b3265e19358e9a672eec2a1d5",
  name: "verifyResetOtpFn",
  filename: "src/modules/auth/actions/forgot-password-action.ts"
}, (opts, signal) => verifyResetOtpFn.__executeServer(opts, signal));
const verifyResetOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => verifyResetOtpSchema.parse(data)).handler(verifyResetOtpFn_createServerFn_handler, async ({
  data
}) => {
  const resetSessionValue = getCookie(RESET_SESSION_COOKIE_NAME);
  if (!resetSessionValue) {
    throw new Error("Session expired. Please request a new OTP.");
  }
  const res = await fetch(`${env.API_URL}/forget-password/verify-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: createCookieHeader(resetSessionValue)
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Invalid OTP. Please try again.");
  }
  const responseData = await res.json();
  return {
    success: true,
    message: responseData.message || "OTP verified successfully!"
  };
});
const resetPasswordFn_createServerFn_handler = createServerRpc({
  id: "58bfcf80d1477dff57a2620fbe8bf32201968f46db3faa185855e0e0e4b37d97",
  name: "resetPasswordFn",
  filename: "src/modules/auth/actions/forgot-password-action.ts"
}, (opts, signal) => resetPasswordFn.__executeServer(opts, signal));
const resetPasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(resetPasswordFn_createServerFn_handler, async ({
  data
}) => {
  const resetSessionValue = getCookie(RESET_SESSION_COOKIE_NAME);
  if (!resetSessionValue) {
    throw new Error("Session expired. Please start the password reset process again.");
  }
  const res = await fetch(`${env.API_URL}/forget-password/reset/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: createCookieHeader(resetSessionValue)
    },
    body: JSON.stringify({
      new_password: data.password
    })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(typeof errorData.detail === "string" ? errorData.detail : "Failed to reset password. Please try again.");
  }
  deleteCookie(RESET_SESSION_COOKIE_NAME);
  const responseData = await res.json();
  return {
    success: true,
    message: responseData.message || "Password reset successfully! Please login with your new password."
  };
});
const forgotPasswordAction = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  forgotPasswordFn_createServerFn_handler,
  resetPasswordFn_createServerFn_handler,
  verifyResetOtpFn_createServerFn_handler
}, Symbol.toStringTag, { value: "Module" }));
export {
  RESET_SESSION_COOKIE_NAME as R,
  RESET_SESSION_MAX_AGE as a,
  forgotPasswordAction as f
};
