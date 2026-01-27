import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { deleteCookie } from "vinxi/http";
import { c as createServerFn } from "../server.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const logoutFn_createServerFn_handler = createServerRpc({
  id: "8049cc69294c272842b7e79f43fd004930122117ae4cae183aa78ee4017cf142",
  name: "logoutFn",
  filename: "src/modules/auth/actions/logout-action.ts"
}, (opts, signal) => logoutFn.__executeServer(opts, signal));
const logoutFn = createServerFn({
  method: "POST"
}).handler(logoutFn_createServerFn_handler, async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  return {
    success: true
  };
});
export {
  logoutFn_createServerFn_handler
};
