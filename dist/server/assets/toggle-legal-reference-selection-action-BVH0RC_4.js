import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { z } from "zod";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { c as createServerFn } from "../server.js";
import "@tanstack/react-router";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const toggleLegalReferenceSchema = z.object({
  sectionId: z.string()
});
const toggleLegalReferenceSelectionFn_createServerFn_handler = createServerRpc({
  id: "4c9debdffd5b89046eb07123f6f129c883d26ecf2f72bec28fe3efe6dbb9fa5c",
  name: "toggleLegalReferenceSelectionFn",
  filename: "src/modules/appeal-draft/actions/toggle-legal-reference-selection-action.ts"
}, (opts, signal) => toggleLegalReferenceSelectionFn.__executeServer(opts, signal));
const toggleLegalReferenceSelectionFn = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleLegalReferenceSchema.parse(data)).handler(toggleLegalReferenceSelectionFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const res = await fetch(`${env.API_URL}/documents/references/sections/${data.sectionId}/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while toggling legal reference selection");
  }
  return {
    success: true
  };
});
export {
  toggleLegalReferenceSelectionFn_createServerFn_handler
};
