import { jsx } from "react/jsx-runtime";
import { c as cn } from "./button-D5vTpyVN.js";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-accent", className),
      ...props
    }
  );
}
export {
  Skeleton as S
};
