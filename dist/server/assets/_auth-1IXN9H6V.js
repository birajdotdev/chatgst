import { jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
function AuthLayout({ children }) {
  return /* @__PURE__ */ jsx("main", { className: "flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10", children });
}
function AuthLayoutRoute() {
  return /* @__PURE__ */ jsx(AuthLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
export {
  AuthLayoutRoute as component
};
