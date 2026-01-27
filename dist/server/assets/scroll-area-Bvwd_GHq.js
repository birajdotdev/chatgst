import { jsxs, jsx } from "react/jsx-runtime";
import { ScrollArea as ScrollArea$1 } from "@base-ui/react/scroll-area";
import { c as cn } from "./button-D5vTpyVN.js";
function ScrollArea({
  className,
  children,
  scrollFade = false,
  scrollbarGutter = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollArea$1.Root,
    {
      className: cn("size-full min-h-0", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollArea$1.Viewport,
          {
            className: cn(
              "transition-shadows h-full overscroll-contain rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              scrollFade && "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] [--fade-size:1.5rem]",
              scrollbarGutter && "data-has-overflow-x:pb-2.5 data-has-overflow-y:pe-2.5"
            ),
            "data-slot": "scroll-area-viewport",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, { orientation: "vertical" }),
        /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" }),
        /* @__PURE__ */ jsx(ScrollArea$1.Corner, { "data-slot": "scroll-area-corner" })
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollArea$1.Scrollbar,
    {
      className: cn(
        "m-1 flex opacity-0 transition-opacity delay-300 data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-100 data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-100 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-1.5",
        className
      ),
      "data-slot": "scroll-area-scrollbar",
      orientation,
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollArea$1.Thumb,
        {
          className: "relative flex-1 rounded-full bg-foreground/20",
          "data-slot": "scroll-area-thumb"
        }
      )
    }
  );
}
export {
  ScrollArea as S,
  ScrollBar as a
};
