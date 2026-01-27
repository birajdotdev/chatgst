import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import { d as deleteSessionFn } from "./session.server-oiI_kIZw.js";
import { r as resetPasswordSchema } from "./reset-password-schema-FFnudqMF.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "@tanstack/react-router";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const resetProfilePasswordFn_createServerFn_handler = createServerRpc({
  id: "acb412f615e5d4850877d8658d06340c5093eec8fe1dc087911f3ea89b53c47e",
  name: "resetProfilePasswordFn",
  filename: "src/modules/profile/actions/reset-password-action.ts"
}, (opts, signal) => resetProfilePasswordFn.__executeServer(opts, signal));
const resetProfilePasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(resetProfilePasswordFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const {
    current_password,
    new_password
  } = data;
  const res = await fetch(`${env.API_URL}/reset-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: JSON.stringify({
      current_password,
      new_password
    })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to reset password");
  }
  await deleteSessionFn();
  return {
    success: true,
    message: "Password changed successfully! Please login again."
  };
});
export {
  resetProfilePasswordFn_createServerFn_handler
};
