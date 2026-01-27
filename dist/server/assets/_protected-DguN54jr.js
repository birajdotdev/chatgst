import { jsxs, jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
import { N as Navbar } from "./index-CQF8ySRG.js";
import { R as Route } from "./router-CXy64lwh.js";
import "./logo-DoHeR5o3.js";
import "./button-D5vTpyVN.js";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./alert-dialog-Cj9ELzHO.js";
import "react";
import "next-themes";
import "@tanstack/react-query";
import "sonner";
import "./field-CcmYbgZh.js";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "./profile-form-Kv1Sy6HW.js";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./select-CfgWoe1T.js";
import "react-phone-number-input";
import "react-phone-number-input/flags";
import "cmdk";
import "./input-DokJ73Yy.js";
import "./scroll-area-Bvwd_GHq.js";
import "@base-ui/react/scroll-area";
import "./user-types-DQBxjyNb.js";
import "./profile-schema-CGuN1h7-.js";
import "libphonenumber-js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "./password-input-CeIDaVYP.js";
import "./input-group-HiwdIxtQ.js";
import "./reset-password-schema-FFnudqMF.js";
import "./skeleton-hioRrLEH.js";
import "./session.server-oiI_kIZw.js";
import "vinxi/http";
import "./env-CgjodLxP.js";
function ProtectedLayoutRoute() {
  const {
    isAuthenticated,
    user
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("main", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, { className: "shrink-0 border-b bg-background", isAuthenticated, user }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 pt-16", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  ProtectedLayoutRoute as component
};
