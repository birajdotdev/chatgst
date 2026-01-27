import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "@tanstack/react-router";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const deleteAppealFn_createServerFn_handler = createServerRpc({
  id: "1d6d5f189feb09a3a2f96f6d5f4892c50d12c22b3b88cafc645f6adda06244d0",
  name: "deleteAppealFn",
  filename: "src/modules/appeal-draft/actions/delete-appeal.ts"
}, (opts, signal) => deleteAppealFn.__executeServer(opts, signal));
const deleteAppealFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteAppealFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const res = await fetch(`${env.API_URL}/documents/appeals/${data.appealId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/json"
    }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to delete appeal");
  }
  return {
    success: true,
    message: "Appeal deleted successfully"
  };
});
export {
  deleteAppealFn_createServerFn_handler
};
