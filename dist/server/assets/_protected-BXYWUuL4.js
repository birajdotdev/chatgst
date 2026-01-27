import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { g as getOptionalSession, a as getOptionalUser } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { c as createServerFn } from "../server.js";
import "@tanstack/react-router";
import "./env-CgjodLxP.js";
import "zod";
import "./createSsrRpc-D8jcV7CB.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
async function auth() {
  const session = await getOptionalSession();
  const user = session ? await getOptionalUser() : null;
  return {
    isAuthenticated: session !== null,
    user
  };
}
const getAuthData_createServerFn_handler = createServerRpc({
  id: "586106710aa4ebaa280b7148db77ad9947aa1a2200401cb96c271426bf992248",
  name: "getAuthData",
  filename: "src/app/_protected.tsx"
}, (opts, signal) => getAuthData.__executeServer(opts, signal));
const getAuthData = createServerFn({
  method: "GET"
}).handler(getAuthData_createServerFn_handler, async () => {
  return await auth();
});
export {
  getAuthData_createServerFn_handler
};
