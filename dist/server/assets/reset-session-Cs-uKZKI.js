import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { getCookie, setCookie, deleteCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
import { R as RESET_SESSION_COOKIE_NAME, a as RESET_SESSION_MAX_AGE } from "./forgot-password-action-ULRUiGBy.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "./createSsrRpc-D8jcV7CB.js";
import "./forgot-password-schema-TEY8kxah.js";
import "./helpers-CIAyAvNc.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const getResetSessionCookieFn_createServerFn_handler = createServerRpc({
  id: "8a4bed782dd5916d72dbc7c7ed5e8a58c2f7c0bd279c1f6eb928632735fdefd6",
  name: "getResetSessionCookieFn",
  filename: "src/modules/auth/lib/reset-session.ts"
}, (opts, signal) => getResetSessionCookieFn.__executeServer(opts, signal));
const getResetSessionCookieFn = createServerFn({
  method: "GET"
}).handler(getResetSessionCookieFn_createServerFn_handler, async () => {
  const value = getCookie(RESET_SESSION_COOKIE_NAME);
  return value ? {
    name: RESET_SESSION_COOKIE_NAME,
    value
  } : null;
});
const setResetSessionCookieFn_createServerFn_handler = createServerRpc({
  id: "1d8a994e70d083c82ee6f27cd3e27a57b9d3d5d4fa595e1bf21454b192d97fcc",
  name: "setResetSessionCookieFn",
  filename: "src/modules/auth/lib/reset-session.ts"
}, (opts, signal) => setResetSessionCookieFn.__executeServer(opts, signal));
const setResetSessionCookieFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(setResetSessionCookieFn_createServerFn_handler, async ({
  data
}) => {
  setCookie(RESET_SESSION_COOKIE_NAME, data.value, {
    httpOnly: true,
    maxAge: RESET_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production"
  });
  return {
    success: true
  };
});
const deleteResetSessionCookieFn_createServerFn_handler = createServerRpc({
  id: "af4da6140c0802856bbdf87723e8fd8d0592d7af3f93d37fc6ab893045cdc24d",
  name: "deleteResetSessionCookieFn",
  filename: "src/modules/auth/lib/reset-session.ts"
}, (opts, signal) => deleteResetSessionCookieFn.__executeServer(opts, signal));
const deleteResetSessionCookieFn = createServerFn({
  method: "POST"
}).handler(deleteResetSessionCookieFn_createServerFn_handler, async () => {
  deleteCookie(RESET_SESSION_COOKIE_NAME);
  return {
    success: true
  };
});
export {
  deleteResetSessionCookieFn_createServerFn_handler,
  getResetSessionCookieFn_createServerFn_handler,
  setResetSessionCookieFn_createServerFn_handler
};
