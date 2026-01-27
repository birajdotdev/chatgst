import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { f as forgotPasswordSchema, v as verifyResetOtpSchema, r as resetPasswordSchema } from "./forgot-password-schema-TEY8kxah.js";
import { c as createServerFn } from "../server.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as Logo } from "./logo-DoHeR5o3.js";
const forgotPasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => forgotPasswordSchema.parse(data)).handler(createSsrRpc("9ccda1449568e561784d1e6387114bad2178ffbcd298a655c2df67808f088fbb"));
const verifyResetOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => verifyResetOtpSchema.parse(data)).handler(createSsrRpc("9a5bb0bc178e3b2603b2a67e4eb9ad71dd0cdd4b3265e19358e9a672eec2a1d5"));
const resetPasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(createSsrRpc("58bfcf80d1477dff57a2620fbe8bf32201968f46db3faa185855e0e0e4b37d97"));
function ForgetPasswordLayout({
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto h-auto", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }) }),
    children
  ] }) });
}
export {
  ForgetPasswordLayout as F,
  forgotPasswordFn as f,
  resetPasswordFn as r,
  verifyResetOtpFn as v
};
