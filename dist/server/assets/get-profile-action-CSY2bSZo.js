import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { v as verifySession, b as getUser } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { c as createServerFn } from "../server.js";
import "@tanstack/react-router";
import "./env-CgjodLxP.js";
import "zod";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const getProfileFn_createServerFn_handler = createServerRpc({
  id: "663e1af1141f112ce528bb454e44cbf262050cba8608dc5d84f97dcee10319e9",
  name: "getProfileFn",
  filename: "src/modules/profile/actions/get-profile-action.ts"
}, (opts, signal) => getProfileFn.__executeServer(opts, signal));
const getProfileFn = createServerFn({
  method: "GET"
}).handler(getProfileFn_createServerFn_handler, async () => {
  await verifySession();
  const profile = await getUser();
  return {
    data: profile
  };
});
export {
  getProfileFn_createServerFn_handler
};
