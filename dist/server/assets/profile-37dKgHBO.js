import { jsx } from "react/jsx-runtime";
import { P as ProfileForm } from "./profile-form-Kv1Sy6HW.js";
import { a as Route } from "./router-CXy64lwh.js";
import "react";
import "@hookform/resolvers/zod";
import "@tanstack/react-query";
import "lucide-react";
import "react-hook-form";
import "sonner";
import "./select-CfgWoe1T.js";
import "react-phone-number-input";
import "react-phone-number-input/flags";
import "./button-D5vTpyVN.js";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "cmdk";
import "./input-DokJ73Yy.js";
import "./scroll-area-Bvwd_GHq.js";
import "@base-ui/react/scroll-area";
import "./field-CcmYbgZh.js";
import "./user-types-DQBxjyNb.js";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "./profile-schema-CGuN1h7-.js";
import "libphonenumber-js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "./password-input-CeIDaVYP.js";
import "./input-group-HiwdIxtQ.js";
import "./reset-password-schema-FFnudqMF.js";
import "next-themes";
import "./session.server-oiI_kIZw.js";
import "vinxi/http";
import "./env-CgjodLxP.js";
function ProfileView({ user }) {
  return /* @__PURE__ */ jsx("div", { className: "container max-w-5xl py-10", children: /* @__PURE__ */ jsx(
    ProfileForm,
    {
      initialData: user
    }
  ) });
}
function ProfilePage() {
  const {
    user
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx(ProfileView, { user });
}
export {
  ProfilePage as component
};
