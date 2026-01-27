import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { u as updateProfileSchema } from "./profile-schema-CGuN1h7-.js";
import { c as createServerFn } from "../server.js";
import "zod";
import "@tanstack/react-router";
import "./createSsrRpc-D8jcV7CB.js";
import "libphonenumber-js";
import "./user-types-DQBxjyNb.js";
import "./helpers-CIAyAvNc.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const updateProfileFn_createServerFn_handler = createServerRpc({
  id: "ec1437b8ae4bfbced3278d2ef71546d53d8230a2916e166670e54dc943097e1a",
  name: "updateProfileFn",
  filename: "src/modules/profile/actions/update-profile-action.ts"
}, (opts, signal) => updateProfileFn.__executeServer(opts, signal));
const updateProfileFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateProfileSchema.parse(data)).handler(updateProfileFn_createServerFn_handler, async ({
  data
}) => {
  const session = await verifySession();
  const {
    email,
    terms_and_privacy_policy,
    receive_updates_or_newsletter,
    ...payload
  } = data;
  const res = await fetch(`${env.API_URL}/profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to update profile");
  }
  const responseData = await res.json();
  return {
    success: true,
    data: responseData,
    message: "Profile updated successfully"
  };
});
export {
  updateProfileFn_createServerFn_handler
};
