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
const updateAppealSchema = z.object({
  appealId: z.string(),
  appeal_name: z.string(),
  appeal_text: z.string()
});
const updateAppealFn_createServerFn_handler = createServerRpc({
  id: "8cf5829d2f77c547d6ed7823d30b8439f3d34fd4b385b82189e3525c1feb5fdd",
  name: "updateAppealFn",
  filename: "src/modules/appeal-draft/actions/update-appeal-action.ts"
}, (opts, signal) => updateAppealFn.__executeServer(opts, signal));
const updateAppealFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateAppealSchema.parse(data)).handler(updateAppealFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const {
    appealId,
    appeal_name,
    appeal_text
  } = data;
  const res = await fetch(`${env.API_URL}/documents/appeals/${appealId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: JSON.stringify({
      appeal_name,
      appeal_text
    })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while updating the appeal");
  }
  return res.json();
});
export {
  updateAppealFn_createServerFn_handler
};
