import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { b as getUser } from "./dal-C6aCU8zj.js";
import { c as createServerFn } from "../server.js";
import "@tanstack/react-router";
import "./env-CgjodLxP.js";
import "zod";
import "./session.server-oiI_kIZw.js";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const getUserProfile_createServerFn_handler = createServerRpc({
  id: "c91aa17c75770a201a72b152bfcd8a8b52640e16c31bb2a2687d77cdb45508a0",
  name: "getUserProfile",
  filename: "src/app/_protected/profile.tsx"
}, (opts, signal) => getUserProfile.__executeServer(opts, signal));
const getUserProfile = createServerFn({
  method: "GET"
}).handler(getUserProfile_createServerFn_handler, async () => {
  const user = await getUser();
  return {
    user
  };
});
export {
  getUserProfile_createServerFn_handler
};
