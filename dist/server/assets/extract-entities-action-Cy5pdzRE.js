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
const extractEntitiesFn_createServerFn_handler = createServerRpc({
  id: "7410d524e125003a516ec84ca8008c0bff6d7ad56963d5d8aea7d2f89819bd7c",
  name: "extractEntitiesFn",
  filename: "src/modules/appeal-draft/actions/extract-entities-action.ts"
}, (opts, signal) => extractEntitiesFn.__executeServer(opts, signal));
const extractEntitiesFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(extractEntitiesFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const formData = new FormData();
  formData.append("pdf_file", data.pdf_file);
  const res = await fetch(`${env.API_URL}/documents/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: formData
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while processing the file");
  }
  const responseData = await res.json();
  return {
    success: true,
    data: responseData.data
  };
});
export {
  extractEntitiesFn_createServerFn_handler
};
