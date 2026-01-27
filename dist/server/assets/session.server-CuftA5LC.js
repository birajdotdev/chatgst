import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { decodeJwt } from "jose";
import { getCookie, setCookie, deleteCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const DEBUG_AUTH = env.NODE_ENV === "development";
function authLog(level, message) {
  if (!DEBUG_AUTH) return;
  const prefix = "[Auth]";
  switch (level) {
    case "info":
      console.log(prefix, message);
      break;
    case "warn":
      console.warn(prefix, message);
      break;
    case "error":
      console.error(prefix, message);
      break;
  }
}
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};
function decodeToken(token) {
  try {
    return decodeJwt(token);
  } catch {
    return null;
  }
}
function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1e3 - 1e4;
}
const getSessionFn_createServerFn_handler = createServerRpc({
  id: "3d82bde82f26c89034216a22956c8746729c62e208bb72d3bdae08c5d406ef7c",
  name: "getSessionFn",
  filename: "src/lib/session.server.ts"
}, (opts, signal) => getSessionFn.__executeServer(opts, signal));
const getSessionFn = createServerFn({
  method: "GET"
}).handler(getSessionFn_createServerFn_handler, async () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  if (!accessToken || !refreshToken) {
    return null;
  }
  return {
    accessToken,
    refreshToken
  };
});
const createSessionFn_createServerFn_handler = createServerRpc({
  id: "e30d56bee5d09b16918aa78f8d5a871d9305251df85e233e52d32e06dce1f317",
  name: "createSessionFn",
  filename: "src/lib/session.server.ts"
}, (opts, signal) => createSessionFn.__executeServer(opts, signal));
const createSessionFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSessionFn_createServerFn_handler, async ({
  data
}) => {
  setCookie("access_token", data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24
    // 24 hours
  });
  setCookie("refresh_token", data.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7
    // 7 days
  });
  return {
    success: true
  };
});
const updateAccessTokenFn_createServerFn_handler = createServerRpc({
  id: "ba7b06fe48b1583455a04f827c1f1899ac9b667c5295b2a7ab4e4f8bb2b0de95",
  name: "updateAccessTokenFn",
  filename: "src/lib/session.server.ts"
}, (opts, signal) => updateAccessTokenFn.__executeServer(opts, signal));
const updateAccessTokenFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateAccessTokenFn_createServerFn_handler, async ({
  data
}) => {
  setCookie("access_token", data.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24
    // 24 hours
  });
  return {
    success: true
  };
});
const deleteSessionFn_createServerFn_handler = createServerRpc({
  id: "dafcf6a7374d783f34818d1e228e3c725608f417952133c82e677c305f3ebdb7",
  name: "deleteSessionFn",
  filename: "src/lib/session.server.ts"
}, (opts, signal) => deleteSessionFn.__executeServer(opts, signal));
const deleteSessionFn = createServerFn({
  method: "POST"
}).handler(deleteSessionFn_createServerFn_handler, async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  return {
    success: true
  };
});
const verifySessionFn_createServerFn_handler = createServerRpc({
  id: "715af993a56fb9ddf0148aadc6f24492f6de40edfcafb54f9841669a6020ee07",
  name: "verifySessionFn",
  filename: "src/lib/session.server.ts"
}, (opts, signal) => verifySessionFn.__executeServer(opts, signal));
const verifySessionFn = createServerFn({
  method: "GET"
}).handler(verifySessionFn_createServerFn_handler, async () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  if (!accessToken || !refreshToken) {
    authLog("warn", "No session tokens found");
    return null;
  }
  if (!isTokenExpired(accessToken)) {
    return {
      accessToken,
      refreshToken
    };
  }
  authLog("info", "Access token expired, attempting refresh");
  try {
    const res = await fetch(`${env.API_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    });
    if (!res.ok) {
      authLog("warn", `Token refresh failed: ${res.status}`);
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      return null;
    }
    const data = await res.json();
    const newAccessToken = data.data.access_token;
    setCookie("access_token", newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24
      // 24 hours
    });
    authLog("info", "Token refreshed successfully");
    return {
      accessToken: newAccessToken,
      refreshToken
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    authLog("error", `Network error during refresh: ${message}`);
    return null;
  }
});
export {
  createSessionFn_createServerFn_handler,
  deleteSessionFn_createServerFn_handler,
  getSessionFn_createServerFn_handler,
  updateAccessTokenFn_createServerFn_handler,
  verifySessionFn_createServerFn_handler
};
