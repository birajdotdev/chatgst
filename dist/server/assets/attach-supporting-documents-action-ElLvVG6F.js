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
const attachSupportingDocumentsFn_createServerFn_handler = createServerRpc({
  id: "114fbb07700c233a6bedf29f9acc2b40fcae0d7b5e8f6728b100c120d5b69c03",
  name: "attachSupportingDocumentsFn",
  filename: "src/modules/appeal-draft/actions/attach-supporting-documents-action.ts"
}, (opts, signal) => attachSupportingDocumentsFn.__executeServer(opts, signal));
const attachSupportingDocumentsFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(attachSupportingDocumentsFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const {
    appealId,
    files
  } = data;
  const formData = new FormData();
  const fileArray = Array.isArray(files) ? files : [files];
  fileArray.forEach((file) => {
    formData.append("files", file);
  });
  const res = await fetch(`${env.API_URL}/documents/appeals/${appealId}/attachments/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: formData
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while uploading attachments");
  }
  return res.json();
});
export {
  attachSupportingDocumentsFn_createServerFn_handler
};
