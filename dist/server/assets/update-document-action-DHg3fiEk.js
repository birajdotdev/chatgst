import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { u as updateDocumentSchema } from "./extracted-details-schema-BMSGdfgv.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "@tanstack/react-router";
import "./createSsrRpc-D8jcV7CB.js";
import "./helpers-CIAyAvNc.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const updateDocumentFn_createServerFn_handler = createServerRpc({
  id: "568be227f0e1df929cdf5506140e923491e236b0d10fcaba82ec1cb940943cc8",
  name: "updateDocumentFn",
  filename: "src/modules/appeal-draft/actions/update-document-action.ts"
}, (opts, signal) => updateDocumentFn.__executeServer(opts, signal));
const updateDocumentFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateDocumentSchema.parse(data)).handler(updateDocumentFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const res = await fetch(`${env.API_URL}/document/${data.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while updating the document");
  }
  return res.json();
});
export {
  updateDocumentFn_createServerFn_handler
};
