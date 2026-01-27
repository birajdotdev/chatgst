import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { S as ScrollArea, a as ScrollBar } from "./scroll-area-Bvwd_GHq.js";
import { Tooltip as Tooltip$1 } from "radix-ui";
const Suggestions = ({
  className,
  children,
  ...props
}) => /* @__PURE__ */ jsxs(ScrollArea, { className: "w-full overflow-x-auto whitespace-nowrap", ...props, children: [
  /* @__PURE__ */ jsx("div", { className: cn("flex w-max flex-nowrap items-center gap-2", className), children }),
  /* @__PURE__ */ jsx(ScrollBar, { className: "hidden", orientation: "horizontal" })
] });
const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: cn("cursor-pointer rounded-full px-4", className),
      onClick: handleClick,
      size,
      type: "button",
      variant,
      ...props,
      children: children || suggestion
    }
  );
};
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tooltip$1.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Tooltip$1.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Tooltip$1.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(Tooltip$1.Portal, { children: /* @__PURE__ */ jsxs(
    Tooltip$1.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Tooltip$1.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
export {
  Suggestions as S,
  TooltipProvider as T,
  Suggestion as a,
  Tooltip as b,
  TooltipTrigger as c,
  TooltipContent as d
};
