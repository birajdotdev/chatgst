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
const toggleIssueSelectionSchema = z.object({
  issueId: z.string()
});
const toggleIssueSelectionFn_createServerFn_handler = createServerRpc({
  id: "f4c7caca3dce3bbf3bc8924b59451f1ed9cbba6281b1c9e968140cd59a449b8b",
  name: "toggleIssueSelectionFn",
  filename: "src/modules/appeal-draft/actions/toggle-issue-selection-action.ts"
}, (opts, signal) => toggleIssueSelectionFn.__executeServer(opts, signal));
const toggleIssueSelectionFn = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleIssueSelectionSchema.parse(data)).handler(toggleIssueSelectionFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const res = await fetch(`${env.API_URL}/documents/potential-issues/${data.issueId}/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`
    }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error occurred while toggling issue selection");
  }
  return {
    success: true
  };
});
export {
  toggleIssueSelectionFn_createServerFn_handler
};
