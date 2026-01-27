import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, createContext, useContext, use, cache, Suspense, useEffect, useMemo, useRef, useCallback, Activity } from "react";
import { S as Spinner, d as FieldSet, e as FieldTitle, F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, L as Label } from "./field-CcmYbgZh.js";
import { C as CardFooter, a as Card, b as CardHeader, c as CardContent, d as CardTitle, e as CardDescription } from "./card-BEA0qkFW.js";
import { CircleCheckIcon, PanelLeftIcon, EllipsisIcon, PenBoxIcon, Trash2Icon, ClockIcon, SquarePenIcon, CircleXIcon, RotateCcwIcon, Bold, Italic, Strikethrough, UnderlineIcon, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Minus, Undo, Redo, InfoIcon, ChevronDownIcon, FileTextIcon, XCircleIcon, UploadIcon, AlertCircleIcon, DownloadIcon } from "lucide-react";
import { B as Button, c as cn, b as buttonVariants } from "./button-D5vTpyVN.js";
import { u as useSearchParamsContext, S as SearchParamsProvider, b as Route } from "./router-CXy64lwh.js";
import { S as Stepper, a as StepperItem, b as StepperTrigger, c as StepperIndicator, d as StepperTitle, e as StepperDescription, f as StepperSeparator, C as Checkbox } from "./checkbox-BP7MQL0w.js";
import { cva } from "class-variance-authority";
import { Slot, Toggle as Toggle$1, Switch as Switch$1, Accordion as Accordion$1 } from "radix-ui";
import { S as Sheet, i as SheetContent, v as SheetHeader, w as SheetTitle, x as SheetDescription, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, D as DropdownMenu, k as DropdownMenuTrigger, l as DropdownMenuContent, p as DropdownMenuItem, n as DropdownMenuSeparator } from "./alert-dialog-Cj9ELzHO.js";
import { S as Skeleton } from "./skeleton-hioRrLEH.js";
import { T as TooltipProvider, b as Tooltip, c as TooltipTrigger, d as TooltipContent, S as Suggestions, a as Suggestion } from "./tooltip-DRYX_Imi.js";
import { ErrorBoundary } from "react-error-boundary";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { c as createServerFn } from "../server.js";
import "server-only";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySession } from "./dal-C6aCU8zj.js";
import "./session.server-oiI_kIZw.js";
import { useNavigate } from "@tanstack/react-router";
import { S as Separator } from "./separator-COtF-INC.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { I as Input } from "./input-DokJ73Yy.js";
import { u as updateDocumentSchema } from "./extracted-details-schema-BMSGdfgv.js";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEditor, useEditorState, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import { z } from "zod";
import { S as ScrollArea } from "./scroll-area-Bvwd_GHq.js";
import { B as Badge } from "./badge-BlrAC-0Q.js";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "vinxi/http";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "./helpers-CIAyAvNc.js";
import "@base-ui/react/scroll-area";
const FormContext = createContext(null);
function FormProvider({ children }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  return /* @__PURE__ */ jsx(
    FormContext.Provider,
    {
      value: { isSubmitting, setIsSubmitting, isDirty, setIsDirty },
      children
    }
  );
}
function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
}
function AppealDraftFooter({ searchParams }) {
  const { step, mode } = searchParams;
  const { setSearchParams } = useSearchParamsContext();
  const { isSubmitting, isDirty } = useFormContext();
  const handleBack = () => {
    setSearchParams({ step: step - 1, mode: void 0 }, { shallow: false });
  };
  const handleNext = () => {
    setSearchParams({ step: step + 1, mode: void 0 }, { shallow: false });
  };
  const handleCancel = () => {
    setSearchParams({ mode: void 0 });
  };
  return /* @__PURE__ */ jsxs(CardFooter, { className: "border-t bg-card px-10 py-4!", hidden: step === 1, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "secondary",
        className: "min-w-28",
        onClick: handleBack,
        hidden: step === 1 || mode === "edit",
        children: "Back"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "secondary",
        className: "min-w-28",
        onClick: handleCancel,
        hidden: mode !== "edit",
        children: "Cancel"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        form: "extracted-details-form",
        className: "ml-auto min-w-28",
        hidden: step !== 2 || mode !== "edit",
        disabled: isSubmitting || !isDirty,
        children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          "Saving..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(CircleCheckIcon, {}),
          "Save Details"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        form: "appeal-draft-form",
        className: "ml-auto min-w-28",
        hidden: step !== 5,
        disabled: isSubmitting,
        children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          "Saving..."
        ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Continue" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        className: "ml-auto min-w-28",
        onClick: handleNext,
        hidden: step === 2 && mode === "edit" || step === 5 || step === 6,
        children: "Continue"
      }
    )
  ] });
}
const steps = [
  {
    description: "Document Upload",
    step: 1,
    title: "Upload"
  },
  {
    description: "Extract",
    step: 2,
    title: "Basic Details"
  },
  {
    description: "Issue Selection",
    step: 3,
    title: "Issues"
  },
  {
    description: "Legal Knowledge",
    step: 4,
    title: "References"
  },
  {
    description: "Appeal Generation",
    step: 5,
    title: "Draft"
  },
  {
    description: "Final Review",
    step: 6,
    title: "Review"
  }
];
function AppealDraftStepper({ className }) {
  const { get } = useSearchParamsContext();
  const step = get("step");
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-8 text-center", className), children: /* @__PURE__ */ jsx(Stepper, { value: step ?? 1, children: steps.map(({ step: step2, title, description }) => /* @__PURE__ */ jsxs(
    StepperItem,
    {
      className: "relative flex-1 flex-col!",
      step: step2,
      children: [
        /* @__PURE__ */ jsxs(StepperTrigger, { className: "flex-col gap-3 rounded", children: [
          /* @__PURE__ */ jsx(StepperIndicator, { className: "z-10 md:size-9 md:text-sm" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5 px-2", children: [
            /* @__PURE__ */ jsx(StepperTitle, { className: "text-xs md:text-sm", children: title }),
            /* @__PURE__ */ jsx(StepperDescription, { className: "text-xs max-sm:hidden", children: description })
          ] })
        ] }),
        step2 < steps.length && /* @__PURE__ */ jsx(StepperSeparator, { className: "absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none md:top-5" })
      ]
    },
    step2
  )) }) });
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    void 0
  );
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper flex h-full w-full has-data-[variant=inset]:bg-sidebar",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed top-16 z-10 hidden h-[calc(100vh-4rem)] w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative list-none", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot.Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const [width] = React.useState(
    () => `${Math.floor(Math.random() * 40) + 50}%`
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
const deleteAppealFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1d6d5f189feb09a3a2f96f6d5f4892c50d12c22b3b88cafc645f6adda06244d0"));
function DeleteAppealDialog({
  open,
  onOpenChange,
  appeal
}) {
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");
  const mutation = useMutation({
    mutationFn: (input) => deleteAppealFn({ data: input }),
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete appeal"
      );
    }
  });
  const handleDelete = () => {
    if (!documentId) {
      toast.error("Unable to delete: missing document context");
      return;
    }
    mutation.mutate({ appealId: appeal.id, documentId });
  };
  return /* @__PURE__ */ jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
        'This action cannot be undone. This will permanently delete the appeal draft "',
        /* @__PURE__ */ jsx("span", { className: "break-all", children: appeal.appeal_name }),
        '".'
      ] })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
      /* @__PURE__ */ jsx(
        AlertDialogAction,
        {
          onClick: handleDelete,
          className: buttonVariants({ variant: "destructive" }),
          disabled: mutation.isPending,
          children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Delete"
        }
      )
    ] })
  ] }) });
}
function DraftHistoryItem({
  appeal,
  isActive,
  onSelect
}) {
  const { isMobile } = useSidebar();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [
      /* @__PURE__ */ jsx(
        SidebarMenuButton,
        {
          isActive,
          onClick: (e) => {
            e.preventDefault();
            onSelect();
          },
          children: /* @__PURE__ */ jsx("span", { className: "block truncate", children: appeal.appeal_name })
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          SidebarMenuAction,
          {
            showOnHover: true,
            className: "rounded-sm data-[state=open]:bg-accent",
            children: [
              /* @__PURE__ */ jsx(EllipsisIcon, {}),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(
          DropdownMenuContent,
          {
            className: "w-24 rounded-lg",
            side: isMobile ? "bottom" : "right",
            align: isMobile ? "end" : "start",
            children: [
              /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsx(PenBoxIcon, {}),
                /* @__PURE__ */ jsx("span", { children: "Edit" })
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  variant: "destructive",
                  onSelect: () => setDeleteDialogOpen(true),
                  children: [
                    /* @__PURE__ */ jsx(Trash2Icon, {}),
                    /* @__PURE__ */ jsx("span", { children: "Delete" })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DeleteAppealDialog,
      {
        open: deleteDialogOpen,
        onOpenChange: setDeleteDialogOpen,
        appeal
      }
    )
  ] });
}
function DraftHistoryClient({ appeals }) {
  const appealsData = use(appeals);
  const { searchParams, setSearchParams } = useSearchParamsContext();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: appealsData.map((appeal) => /* @__PURE__ */ jsx(
    DraftHistoryItem,
    {
      appeal,
      isActive: searchParams.appealId === appeal.id,
      onSelect: () => setSearchParams({ appealId: appeal.id })
    },
    appeal.id
  )) });
}
const getAllAppeals = cache(async (documentId) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/appeals/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json"
      },
      next: {
        tags: [`document-appeals-${documentId}`],
        revalidate: 60
      }
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Error fetching appeals");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occurred while fetching appeals");
  }
});
function DraftHistorySidebar() {
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 group-data-[collapsible=icon]:items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row-reverse items-center justify-between gap-2 px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:px-0", children: [
      /* @__PURE__ */ jsx(SidebarTrigger, { className: "group-data-[collapsible=icon]:order-first" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium group-data-[collapsible=icon]:order-last", children: [
        /* @__PURE__ */ jsx(ClockIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "group-data-[collapsible=icon]:hidden", children: "Recent Drafts" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsx(SidebarGroup, { children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(
      ErrorBoundary,
      {
        fallback: /* @__PURE__ */ jsx(SidebarMenuItem, { className: "text-destructive", children: "Error loading drafts" }),
        children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(AppealHistorySkeleton, {}), children: documentId && /* @__PURE__ */ jsx(DraftHistoryClient, { appeals: getAllAppeals(documentId) }) })
      }
    ) }) }) })
  ] });
}
function AppealHistorySkeleton() {
  return /* @__PURE__ */ jsx(SidebarMenu, { children: Array.from({ length: 8 }).map((_, idx) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuSkeleton, {}) }, idx)) });
}
function DraftHistoryLayout({
  children,
  step
}) {
  return /* @__PURE__ */ jsxs(SidebarProvider, { children: [
    step === 6 && /* @__PURE__ */ jsx(DraftHistorySidebar, {}),
    /* @__PURE__ */ jsx(SidebarInset, { children })
  ] });
}
cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "item-title",
      className: cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      ),
      ...props
    }
  );
}
function ItemHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "item-header",
      className: cn(
        "flex basis-full items-center justify-between gap-2",
        className
      ),
      ...props
    }
  );
}
const summaries = [
  {
    title: "Entity Extraction",
    description: "Used Named Entity Recognition (NER) to identify GST-specific entities like GSTIN, order numbers, and dates."
  },
  {
    title: "Pattern Recognition",
    description: "Applied regex patterns and ML models trained on GST document formats to extract structured data."
  },
  {
    title: "Confidence Score",
    description: "High accuracy achieved through document structure analysis."
  }
];
function AiProcessingSummaryBanner() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4.5 rounded-xl border border-primary bg-primary/10 px-6 py-3", children: [
    /* @__PURE__ */ jsx(ItemHeader, { children: /* @__PURE__ */ jsx(ItemTitle, { className: "text-lg", children: "AI Processing Summary" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-[32px] md:flex-row", children: summaries.map((summary, idx) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex size-full flex-1 flex-col gap-2.5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[16px] font-medium", children: summary.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground", children: summary.description })
      ] }),
      idx !== summaries.length - 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Separator,
          {
            orientation: "vertical",
            className: "hidden max-h-10 bg-primary md:block"
          }
        ),
        /* @__PURE__ */ jsx(
          Separator,
          {
            orientation: "horizontal",
            className: "block w-full bg-primary md:hidden"
          }
        )
      ] })
    ] }, summary.title)) })
  ] });
}
function EditModeButton() {
  const { setSearchParams } = useSearchParamsContext();
  const handleClick = () => {
    setSearchParams({ mode: "edit" });
  };
  return /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: handleClick, children: [
    /* @__PURE__ */ jsx(SquarePenIcon, {}),
    "Edit Details"
  ] });
}
function BasicDetailsStepSkeleton({
  isEditMode = false
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !isEditMode && /* @__PURE__ */ jsx(EditModeButton, {}),
    /* @__PURE__ */ jsx(
      Skeleton,
      {
        className: cn(
          "min-h-80 w-full rounded-xl bg-card",
          isEditMode && "min-h-[31.85rem]"
        )
      }
    )
  ] });
}
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-header",
      className: cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      ),
      ...props
    }
  );
}
const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-title",
      className: cn("text-lg font-medium tracking-tight", className),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      ),
      ...props
    }
  );
}
function ErrorFallback({ error, resetErrorBoundary }) {
  return /* @__PURE__ */ jsxs(Empty, { className: "w-full rounded-xl bg-card", children: [
    /* @__PURE__ */ jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsx(
        EmptyMedia,
        {
          variant: "icon",
          className: "bg-destructive text-destructive-foreground dark:bg-destructive/60",
          children: /* @__PURE__ */ jsx(CircleXIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(EmptyTitle, { children: error instanceof Error ? error.message : "An unexpected error occurred" }),
      /* @__PURE__ */ jsx(EmptyDescription, { children: "Please try again or contact support if the problem persists." })
    ] }),
    /* @__PURE__ */ jsx(EmptyContent, { children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", onClick: resetErrorBoundary, children: [
      /* @__PURE__ */ jsx(RotateCcwIcon, {}),
      "Try Again"
    ] }) })
  ] });
}
async function ExtractedDetails({ document: document2 }) {
  const documentData = await document2;
  const staticDetails = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "Name",
          value: documentData.assessee_details.assessee_name
        },
        {
          name: "Address",
          value: documentData.assessee_details.assessee_address
        }
      ]
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "Officer",
          value: documentData.jurisdiction_details.jurisdiction_officer
        },
        {
          name: "Jurisdiction Office",
          value: documentData.jurisdiction_details.jurisdiction_office
        }
      ]
    }
  ];
  const dynamicOrderDetails = (documentData.order_details ?? []).flatMap(
    (order) => [
      {
        title: "Order Details",
        fields: [
          {
            name: "Order Number",
            value: order.order_number
          },
          {
            name: "Order Date",
            value: order.order_date
          }
        ]
      },
      {
        title: "Other Details",
        fields: [
          {
            name: "Tax Period",
            value: order.tax_period
          },
          {
            name: "Demand Amount",
            value: order.demand_amount
          }
        ]
      }
    ]
  );
  const extractedDetails = [...staticDetails, ...dynamicOrderDetails];
  return /* @__PURE__ */ jsxs("div", { className: "size-full space-y-6 rounded-xl bg-card px-6 pt-3 pb-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-lg font-medium", children: "Extracted Details" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: extractedDetails.map((detail, idx) => /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 text-sm font-semibold text-primary", children: detail.title }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: detail.fields.map((field, fieldIdx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex min-w-0 flex-col gap-1 pl-5",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: field.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium wrap-break-word text-card-foreground", children: field.value })
          ]
        },
        `field-${fieldIdx}`
      )) })
    ] }) }, `detail-${idx}`)) })
  ] });
}
const updateDocumentFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateDocumentSchema.parse(data)).handler(createSsrRpc("568be227f0e1df929cdf5506140e923491e236b0d10fcaba82ec1cb940943cc8"));
function ExtractedDetailsForm({ document: document2 }) {
  const documentData = use(document2);
  const navigate = useNavigate();
  const { setIsSubmitting, setIsDirty } = useFormContext();
  const form = useForm({
    resolver: zodResolver(updateDocumentSchema),
    defaultValues: documentData,
    mode: "onBlur"
  });
  const mutation = useMutation({
    mutationFn: (input) => updateDocumentFn({ data: input }),
    onMutate: () => setIsSubmitting(true),
    onSettled: () => setIsSubmitting(false),
    onError: (error) => {
      toast.error(error.message || "Failed to update document");
    },
    onSuccess: (_, variables) => {
      navigate({
        to: "/appeal-draft",
        search: { step: 2, documentId: variables.id }
      });
    }
  });
  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  useEffect(() => {
    setIsDirty(false);
  }, [documentData.id, setIsDirty]);
  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: { isDirty: true },
      callback: (state) => {
        setIsDirty(state.isDirty);
      }
    });
    return () => unsubscribe();
  }, [form, setIsDirty]);
  const staticFieldGroups = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "assessee_details.assessee_name",
          label: "Name"
        },
        {
          name: "assessee_details.assessee_address",
          label: "Address"
        }
      ]
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "jurisdiction_details.jurisdiction_officer",
          label: "Officer"
        },
        {
          name: "jurisdiction_details.jurisdiction_office",
          label: "Office"
        }
      ]
    }
  ];
  const dynamicOrderFieldGroups = documentData.order_details.flatMap(
    (_, index) => [
      {
        title: "Order Details",
        fields: [
          {
            name: `order_details.${index}.order_number`,
            label: "Order Number"
          },
          {
            name: `order_details.${index}.order_date`,
            label: "Order Date"
          }
        ]
      },
      {
        title: "Other Details",
        fields: [
          {
            name: `order_details.${index}.tax_period`,
            label: "Tax Period"
          },
          {
            name: `order_details.${index}.demand_amount`,
            label: "Demand Amount"
          }
        ]
      }
    ]
  );
  const formFieldGroups = [...staticFieldGroups, ...dynamicOrderFieldGroups];
  return /* @__PURE__ */ jsxs(
    "form",
    {
      id: "extracted-details-form",
      className: "size-full space-y-6 rounded-xl bg-card px-6 pt-3 pb-5",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-medium", children: "Extracted Details" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: formFieldGroups.map((fieldGroup) => /* @__PURE__ */ jsxs(FieldSet, { className: "gap-2", children: [
          /* @__PURE__ */ jsx(FieldTitle, { className: "font-semibold text-primary", children: fieldGroup.title }),
          /* @__PURE__ */ jsx(FieldGroup, { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: fieldGroup.fields.map((formField) => /* @__PURE__ */ jsx(
            Controller,
            {
              control: form.control,
              name: formField.name,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(
                Field,
                {
                  "aria-invalid": fieldState.invalid,
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: formField.label }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        ...field,
                        id: field.name,
                        value: field.value ?? "",
                        "aria-invalid": fieldState.invalid,
                        autoComplete: "off"
                      }
                    ),
                    fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
                  ]
                }
              )
            },
            formField.name
          )) })
        ] }, fieldGroup.title)) })
      ]
    }
  );
}
const generateAppeal = cache(async (documentId) => {
  const session = await verifySession();
  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/appeal/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      next: {
        tags: [`document-${documentId}-appeal`],
        revalidate: 60
        // Cache for 60 seconds
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.detail || "Error occurred while generating the appeal"
      );
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
const getAppeal = cache(async (appealId) => {
  const session = await verifySession();
  try {
    const res = await fetch(`${env.API_URL}/documents/appeals/${appealId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      next: {
        tags: [`appeal-${appealId}`],
        revalidate: 60
      }
    });
    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Error occurred while fetching the appeal";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
const getDocument = cache(async (documentId) => {
  const session = await verifySession();
  try {
    const res = await fetch(`${env.API_URL}/documents/${documentId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      next: {
        tags: [`document-${documentId}`],
        revalidate: 60
        // Cache for 60 seconds
      }
    });
    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Error occurred while fetching the document";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
const getLegalReferences = cache(async (documentId) => {
  const session = await verifySession();
  try {
    const res = await fetch(
      `${env.API_URL}/documents/${documentId}/references/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`
        },
        next: {
          tags: [`document-${documentId}-legal-references`],
          revalidate: 60
          // Cache for 60 seconds
        }
      }
    );
    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Failed to fetch legal references";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred");
  }
});
const getPotentialIssues = cache(async (documentId) => {
  const session = await verifySession();
  try {
    const res = await fetch(
      `${env.API_URL}/documents/${documentId}/potential-issues/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`
        },
        next: {
          tags: [`document-${documentId}-potential-issues`],
          revalidate: 60
          // Cache for 60 seconds
        }
      }
    );
    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      let errorMessage = "Error occurred while fetching potential issues";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorMessage;
      } else {
        errorMessage = `API Error: ${res.status} ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Unexpected error occurred!");
  }
});
function BasicDetailsView() {
  const { all } = useSearchParamsContext();
  const { mode, documentId } = all();
  const navigate = useNavigate();
  if (!documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  const isEditMode = mode === "edit";
  return /* @__PURE__ */ jsxs("div", { className: "flex size-full max-h-fit flex-col items-end gap-4.5", children: [
    /* @__PURE__ */ jsx(AiProcessingSummaryBanner, {}),
    isEditMode ? /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(BasicDetailsStepSkeleton, { isEditMode: true }), children: /* @__PURE__ */ jsx(ExtractedDetailsForm, { document: getDocument(documentId) }) }) }) : /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(BasicDetailsStepSkeleton, {}), children: [
      /* @__PURE__ */ jsx(EditModeButton, {}),
      /* @__PURE__ */ jsx(ExtractedDetails, { document: getDocument(documentId) })
    ] }) })
  ] });
}
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Toggle$1.Root,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}
function MinimalTiptap({
  content = "",
  onChange,
  placeholder = "Start typing...",
  editable = true,
  className
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2"
        }
      }),
      Underline
    ],
    content,
    editable,
    onUpdate: ({ editor: editor2 }) => {
      onChange?.(editor2.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm lg:prose-base xl:prose-lg dark:prose-invert mx-auto focus:outline-none",
          "min-h-[200px] p-4 border-0 min-w-full"
        )
      }
    }
  });
  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isBold: e?.isActive("bold") ?? false,
      isItalic: e?.isActive("italic") ?? false,
      isStrike: e?.isActive("strike") ?? false,
      isUnderline: e?.isActive("underline") ?? false,
      isCode: e?.isActive("code") ?? false,
      isHeading1: e?.isActive("heading", { level: 1 }) ?? false,
      isHeading2: e?.isActive("heading", { level: 2 }) ?? false,
      isHeading3: e?.isActive("heading", { level: 3 }) ?? false,
      isBulletList: e?.isActive("bulletList") ?? false,
      isOrderedList: e?.isActive("orderedList") ?? false,
      isBlockquote: e?.isActive("blockquote") ?? false
    })
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  if (!editor || !editorState) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("overflow-hidden rounded-lg border", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b p-2", children: [
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isBold,
          onPressedChange: () => editor.chain().focus().toggleBold().run(),
          disabled: !editor.can().chain().focus().toggleBold().run(),
          children: /* @__PURE__ */ jsx(Bold, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isItalic,
          onPressedChange: () => editor.chain().focus().toggleItalic().run(),
          disabled: !editor.can().chain().focus().toggleItalic().run(),
          children: /* @__PURE__ */ jsx(Italic, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isStrike,
          onPressedChange: () => editor.chain().focus().toggleStrike().run(),
          disabled: !editor.can().chain().focus().toggleStrike().run(),
          children: /* @__PURE__ */ jsx(Strikethrough, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isUnderline,
          onPressedChange: () => editor.chain().focus().toggleUnderline().run(),
          disabled: !editor.can().chain().focus().toggleUnderline().run(),
          children: /* @__PURE__ */ jsx(UnderlineIcon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isCode,
          onPressedChange: () => editor.chain().focus().toggleCode().run(),
          disabled: !editor.can().chain().focus().toggleCode().run(),
          children: /* @__PURE__ */ jsx(Code, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6" }),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isHeading1,
          onPressedChange: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          children: /* @__PURE__ */ jsx(Heading1, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isHeading2,
          onPressedChange: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          children: /* @__PURE__ */ jsx(Heading2, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isHeading3,
          onPressedChange: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          children: /* @__PURE__ */ jsx(Heading3, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6" }),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isBulletList,
          onPressedChange: () => editor.chain().focus().toggleBulletList().run(),
          children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isOrderedList,
          onPressedChange: () => editor.chain().focus().toggleOrderedList().run(),
          children: /* @__PURE__ */ jsx(ListOrdered, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Toggle,
        {
          size: "sm",
          pressed: editorState.isBlockquote,
          onPressedChange: () => editor.chain().focus().toggleBlockquote().run(),
          children: /* @__PURE__ */ jsx(Quote, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => editor.chain().focus().setHorizontalRule().run(),
          children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().chain().focus().undo().run(),
          children: /* @__PURE__ */ jsx(Undo, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().chain().focus().redo().run(),
          children: /* @__PURE__ */ jsx(Redo, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor, placeholder })
  ] });
}
function decodeHtmlEntities(text) {
  const entities = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " "
  };
  return text.replace(
    /&lt;|&gt;|&amp;|&quot;|&#39;|&nbsp;/g,
    (match) => entities[match] || match
  );
}
function extractBodyContent(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}
function removeUnsupportedElements(html) {
  const cleaned = html.replace(/<!DOCTYPE[^>]*>/gi, "").replace(/<html[^>]*>/gi, "").replace(/<\/html>/gi, "").replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "").replace(/<body[^>]*>/gi, "").replace(/<\/body>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<meta[^>]*>/gi, "").replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
  return cleaned;
}
function processCodeBlocks(html) {
  return html.replace(
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_match, content) => {
      const decoded = decodeHtmlEntities(content);
      const sanitized = DOMPurify.sanitize(decoded);
      const paragraphs = sanitized.split(/(?:<br\s*\/?>\s*){2,}|\n{2,}/gi).map((p) => p.trim()).filter((p) => p.length > 0);
      return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
    }
  );
}
function convertUnsupportedTags(html) {
  return html.replace(/<div[^>]*>/gi, "<p>").replace(/<\/div>/gi, "</p>").replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "").replace(/<br\s*\/?>/gi, "<br />");
}
function cleanWhitespace(html) {
  return html.replace(/\n{3,}/g, "\n\n").trim();
}
function sanitizeHtmlForTiptap(html) {
  if (!html || typeof html !== "string") {
    return "";
  }
  let sanitized = html;
  sanitized = extractBodyContent(sanitized);
  sanitized = removeUnsupportedElements(sanitized);
  sanitized = processCodeBlocks(sanitized);
  sanitized = convertUnsupportedTags(sanitized);
  sanitized = cleanWhitespace(sanitized);
  return sanitized;
}
const updateAppealSchema = z.object({
  appealId: z.string(),
  appeal_name: z.string(),
  appeal_text: z.string()
});
const updateAppealFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateAppealSchema.parse(data)).handler(createSsrRpc("8cf5829d2f77c547d6ed7823d30b8439f3d34fd4b385b82189e3525c1feb5fdd"));
function DraftEditor({
  appealId,
  documentId,
  initialName,
  initialContent
}) {
  const sanitizedInitialContent = useMemo(
    () => sanitizeHtmlForTiptap(initialContent),
    [initialContent]
  );
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(sanitizedInitialContent);
  const { setIsSubmitting, setIsDirty } = useFormContext();
  const { setSearchParams } = useSearchParamsContext();
  const shouldNavigateRef = useRef(false);
  const mutation = useMutation({
    mutationFn: (input) => updateAppealFn({ data: input }),
    onSuccess: () => {
      toast.success("Appeal updated successfully");
      setIsDirty(false);
      if (shouldNavigateRef.current) {
        shouldNavigateRef.current = false;
        setSearchParams(
          {
            step: 6,
            documentId,
            appealId
          },
          { shallow: false }
        );
      }
    },
    onError: (error) => {
      shouldNavigateRef.current = false;
      toast.error(
        error instanceof Error ? error.message : "Failed to update appeal"
      );
    }
  });
  useEffect(() => {
    setIsSubmitting(mutation.isPending);
  }, [mutation.isPending, setIsSubmitting]);
  const handleSubmit = (e) => {
    e.preventDefault();
    shouldNavigateRef.current = true;
    mutation.mutate({
      appealId,
      appeal_name: name,
      appeal_text: content
    });
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      id: "appeal-draft-form",
      onSubmit: handleSubmit,
      className: "flex flex-col gap-5",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "appeal-name",
              className: "text-sm font-semibold text-muted-foreground",
              children: "Appeal Name"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "appeal-name",
              value: name,
              onChange: (e) => {
                setName(e.target.value);
                setIsDirty(true);
              },
              placeholder: "Enter appeal name...",
              className: "h-11 bg-background text-base font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-semibold text-muted-foreground", children: "Appeal Content" }),
          /* @__PURE__ */ jsx(
            MinimalTiptap,
            {
              className: "bg-background",
              content,
              onChange: (val) => {
                setContent(val);
                setIsDirty(true);
              }
            }
          )
        ] })
      ]
    }
  );
}
function URLUpdater({ appealId }) {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  useEffect(() => {
    if (searchParams.documentId && !searchParams.appealId) {
      setSearchParams({ appealId }, { shallow: false });
    }
  }, [appealId, searchParams, setSearchParams]);
  return null;
}
async function DraftContent({
  appealId,
  documentId: _documentId,
  appealPromise
}) {
  const appealData = await appealPromise;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !appealId && /* @__PURE__ */ jsx(URLUpdater, { appealId: appealData.id }),
    /* @__PURE__ */ jsx(
      DraftEditor,
      {
        appealId: appealData.id,
        documentId: appealData.document_id,
        initialName: appealData.appeal_name,
        initialContent: appealData.appeal_text
      }
    )
  ] });
}
function DraftStepSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "flex size-full flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 border-b p-2", children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-8 rounded-md" }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[90%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[95%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[85%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[92%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[88%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-20 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[94%]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-[91%]" })
    ] })
  ] });
}
function DraftView() {
  const { all } = useSearchParamsContext();
  const { appealId, documentId } = all();
  const navigate = useNavigate();
  if (!appealId && !documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  const appealPromise = appealId ? getAppeal(appealId) : documentId ? generateAppeal(documentId) : null;
  if (!appealPromise) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex size-full max-h-fit flex-col gap-4.5", children: /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(DraftStepSkeleton, {}), children: /* @__PURE__ */ jsx(
    DraftContent,
    {
      appealId,
      documentId,
      appealPromise
    }
  ) }) }) });
}
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertMessage({
  message,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Alert,
    {
      className: cn("border-none bg-transparent px-3 py-0", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(InfoIcon, {}),
        /* @__PURE__ */ jsx(AlertTitle, { children: message })
      ]
    }
  );
}
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Switch$1.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Switch$1.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
          )
        }
      )
    }
  );
}
const toggleIssueSelectionSchema = z.object({
  issueId: z.string()
});
const toggleIssueSelectionFn = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleIssueSelectionSchema.parse(data)).handler(createSsrRpc("f4c7caca3dce3bbf3bc8924b59451f1ed9cbba6281b1c9e968140cd59a449b8b"));
function IssueToggleSwitch({
  issueId,
  selected
}) {
  const [optimisticSelected, setOptimisticSelected] = useState(
    selected ?? false
  );
  const mutation = useMutation({
    mutationFn: (input) => toggleIssueSelectionFn({ data: input }),
    onMutate: () => {
      const previousValue = optimisticSelected;
      setOptimisticSelected(!optimisticSelected);
      return { previousValue };
    },
    onError: (error, _, context) => {
      if (context?.previousValue !== void 0) {
        setOptimisticSelected(context.previousValue);
      }
      toast.error(error.message || "Failed to toggle issue selection");
    }
  });
  return /* @__PURE__ */ jsxs(
    Field,
    {
      orientation: "horizontal",
      className: "text-muted-foreground has-data-[state=checked]:*:last:text-primary",
      children: [
        /* @__PURE__ */ jsx(FieldLabel, { children: "Dispute" }),
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: optimisticSelected,
            disabled: !issueId,
            onCheckedChange: () => {
              if (!issueId) return;
              mutation.mutate({ issueId });
            }
          }
        ),
        /* @__PURE__ */ jsx(FieldLabel, { children: "Accept" })
      ]
    }
  );
}
function IssueCard({
  id,
  title,
  supporting_text,
  dispute_type,
  legal_bases,
  selected
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "@container/card gap-4 py-5", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "gap-0 px-6", children: /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(IssueToggleSwitch, { issueId: id, selected }) }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "grow space-y-2 px-6", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-[16px] leading-[20px] font-medium", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-xs", children: dispute_type }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-xs text-secondary-foreground dark:text-accent-foreground", children: supporting_text })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col items-start gap-2 px-6", children: [
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: "bg-linear-to-r from-blue-600 to-pink-600 text-sm font-medium",
          style: {
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          },
          children: "AI Suggestions"
        }
      ),
      /* @__PURE__ */ jsx(Suggestions, { scrollFade: true, children: legal_bases.map((suggestion) => /* @__PURE__ */ jsx(
        Suggestion,
        {
          suggestion,
          className: "px-3.5 py-1.5 text-xs"
        },
        suggestion
      )) })
    ] })
  ] });
}
async function IssuesSection({ issues }) {
  const issuesData = await issues;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AlertMessage,
      {
        message: `Identified ${issuesData.length} potential ${issuesData.length === 1 ? "issue" : "issues"} using legal pattern recognition.`
      }
    ),
    /* @__PURE__ */ jsx(ScrollArea, { className: "max-h-[34rem]", scrollFade: true, children: /* @__PURE__ */ jsx("section", { className: "grid grid-cols-1 gap-4.5 md:grid-cols-2", children: issuesData.map((issue, index) => /* @__PURE__ */ jsx(IssueCard, { ...issue }, index)) }) })
  ] });
}
function IssuesSectionSkeleton() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AlertMessage, { message: "Identifying potential issues using legal pattern recognition..." }),
    /* @__PURE__ */ jsx("section", { className: "grid grid-cols-1 gap-4.5 md:grid-cols-2", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { className: "h-72 w-full rounded-xl bg-card" }, index)) })
  ] });
}
function IssueSelectionView() {
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");
  const navigate = useNavigate();
  if (!documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex size-full max-h-fit flex-col gap-4.5", children: /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(IssuesSectionSkeleton, {}), children: /* @__PURE__ */ jsx(IssuesSection, { issues: getPotentialIssues(documentId) }) }) }) });
}
function ReferenceSectionSkeleton() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AlertMessage, { message: "Analyzing legal authorities from our comprehensive GST database..." }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/6 rounded-full bg-card" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-[100px] rounded-full bg-card" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "grid grid-cols-1 gap-4.5 md:grid-cols-2", children: Array.from({ length: 2 }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full rounded-xl bg-card" }, index)) })
  ] });
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(Accordion$1.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Accordion$1.Item,
    {
      "data-slot": "accordion-item",
      className: cn("", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(Accordion$1.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    Accordion$1.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&:hover_h1]:underline [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Accordion$1.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const toggleLegalReferenceSchema = z.object({
  sectionId: z.string()
});
const toggleLegalReferenceSelectionFn = createServerFn({
  method: "POST"
}).inputValidator((data) => toggleLegalReferenceSchema.parse(data)).handler(createSsrRpc("4c9debdffd5b89046eb07123f6f129c883d26ecf2f72bec28fe3efe6dbb9fa5c"));
function LegalReferenceSelection({
  referenceId,
  selected
}) {
  const checkboxId = referenceId || "legal-reference-selection";
  const [optimisticSelected, setOptimisticSelected] = useState(
    selected ?? false
  );
  const mutation = useMutation({
    mutationFn: (input) => toggleLegalReferenceSelectionFn({ data: input }),
    onMutate: () => {
      setOptimisticSelected((prev) => !prev);
    },
    onError: (error) => {
      setOptimisticSelected((prev) => !prev);
      toast.error(
        error instanceof Error ? error.message : "Failed to toggle legal reference selection"
      );
    }
  });
  return /* @__PURE__ */ jsxs(Field, { orientation: "horizontal", children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        id: checkboxId,
        checked: optimisticSelected,
        disabled: !referenceId || mutation.isPending,
        onCheckedChange: () => {
          if (!referenceId) return;
          mutation.mutate({ sectionId: referenceId });
        }
      }
    ),
    /* @__PURE__ */ jsx(FieldLabel, { htmlFor: checkboxId, className: "text-muted-foreground", children: "Select" })
  ] });
}
function ReferenceCard({ reference, ...props }) {
  return /* @__PURE__ */ jsxs(Card, { className: "@container/card gap-4 py-5", ...props, children: [
    /* @__PURE__ */ jsxs(CardFooter, { children: [
      /* @__PURE__ */ jsx(
        LegalReferenceSelection,
        {
          referenceId: reference.id,
          selected: reference.selected
        }
      ),
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-full", children: "ACT" })
    ] }),
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-[16px] leading-[20px]", children: reference.section_name }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-xs", children: reference.brief_description_of_section })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-[4px] text-xs font-medium", children: [
      /* @__PURE__ */ jsx("h3", { className: "leading-[20px]", children: "Authority" }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground", children: reference.authority })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-[4px] text-xs font-medium", children: [
      /* @__PURE__ */ jsx("h3", { className: "leading-[20px]", children: "Key Points" }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc space-y-[6px] px-4 text-foreground", children: reference.key_points.map((point, index) => /* @__PURE__ */ jsx("li", { children: point }, `point-${index}`)) })
    ] })
  ] });
}
async function ReferencesContent({ references }) {
  const data = await references;
  const defaultValues = data.map(
    (reference, index) => `${reference.dispute_type}-${index}`
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AlertMessage,
      {
        message: `Analyzed ${data.length} legal authorities from our comprehensive GST database.`
      }
    ),
    /* @__PURE__ */ jsx(ScrollArea, { className: "max-h-[34rem]", scrollFade: true, children: /* @__PURE__ */ jsx(
      Accordion,
      {
        type: "multiple",
        defaultValue: defaultValues,
        className: "space-y-6",
        children: data.map((reference, index) => {
          const selectedCount = reference.sections.filter(
            (section) => section.selected
          ).length;
          return /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              value: `${reference.dispute_type}-${index}`,
              children: [
                /* @__PURE__ */ jsxs(AccordionTrigger, { className: "mb-3 items-center p-0", children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-lg", children: reference.dispute_type }),
                  selectedCount !== 0 && /* @__PURE__ */ jsxs("p", { className: "ml-auto text-primary no-underline!", children: [
                    selectedCount,
                    " selected item",
                    selectedCount !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsx(AccordionContent, { className: "grid grid-cols-1 gap-4.5 pb-0 md:grid-cols-2", children: reference.sections.map((section, secIndex) => /* @__PURE__ */ jsx(
                  ReferenceCard,
                  {
                    reference: section
                  },
                  `section-${secIndex}`
                )) })
              ]
            },
            `${reference.dispute_type}-${index}`
          );
        })
      }
    ) })
  ] });
}
function ReferencesView() {
  const { get } = useSearchParamsContext();
  const documentId = get("documentId");
  const navigate = useNavigate();
  if (!documentId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex size-full max-h-fit flex-col gap-4.5", children: /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: ErrorFallback, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(ReferenceSectionSkeleton, {}), children: /* @__PURE__ */ jsx(ReferencesContent, { references: getLegalReferences(documentId) }) }) }) });
}
const useFileUpload = (options = {}) => {
  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded
  } = options;
  const [state, setState] = useState({
    errors: [],
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url
    })),
    isDragging: false
  });
  const inputRef = useRef(null);
  const validateFile = useCallback(
    (file) => {
      if (file instanceof File) {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      } else {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      }
      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file instanceof File ? file.type || "" : file.type;
        const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`;
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });
        if (!isAccepted) {
          return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
        }
      }
      return null;
    },
    [accept, maxSize]
  );
  const createPreview = useCallback(
    (file) => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file.url;
    },
    []
  );
  const generateUniqueId = useCallback((file) => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  }, []);
  const clearFiles = useCallback(() => {
    setState((prev) => {
      for (const file of prev.files ?? []) {
        if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
          URL.revokeObjectURL(file.preview);
        }
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      const newState = {
        ...prev,
        errors: [],
        files: []
      };
      onFilesChange?.(newState.files);
      return newState;
    });
  }, [onFilesChange]);
  const addFiles = useCallback(
    (newFiles) => {
      if (!newFiles || newFiles.length === 0) return;
      const newFilesArray = Array.from(newFiles);
      const errors = [];
      setState((prev) => ({ ...prev, errors: [] }));
      if (!multiple) {
        clearFiles();
      }
      if (multiple && maxFiles !== Number.POSITIVE_INFINITY && state.files.length + newFilesArray.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
        setState((prev) => ({ ...prev, errors }));
        return;
      }
      const validFiles = [];
      for (const file of newFilesArray) {
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size
          );
          if (isDuplicate) {
            continue;
          }
        }
        if (file.size > maxSize) {
          errors.push(
            multiple ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.` : `File exceeds the maximum size of ${formatBytes(maxSize)}.`
          );
          continue;
        }
        const error = validateFile(file);
        if (error) {
          errors.push(error);
          continue;
        }
        validFiles.push({
          file,
          id: generateUniqueId(file),
          preview: createPreview(file)
        });
      }
      if (validFiles.length > 0) {
        onFilesAdded?.(validFiles);
        setState((prev) => {
          const newFiles2 = !multiple ? validFiles : [...prev.files, ...validFiles];
          onFilesChange?.(newFiles2);
          return {
            ...prev,
            errors,
            files: newFiles2
          };
        });
      } else if (errors.length > 0) {
        setState((prev) => ({
          ...prev,
          errors
        }));
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      state.files,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesChange,
      onFilesAdded
    ]
  );
  const removeFile = useCallback(
    (id) => {
      setState((prev) => {
        const fileToRemove = prev.files.find((file) => file.id === id);
        if (fileToRemove?.preview && fileToRemove.file instanceof File && fileToRemove.file.type.startsWith("image/")) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const newFiles = prev.files.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);
        return {
          ...prev,
          errors: [],
          files: newFiles
        };
      });
    },
    [onFilesChange]
  );
  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: []
    }));
  }, []);
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));
      if (inputRef.current?.disabled) {
        return;
      }
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (!multiple) {
          const file = e.dataTransfer.files[0];
          addFiles([file]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple]
  );
  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles]
  );
  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);
  const getInputProps = useCallback(
    (props = {}) => {
      return {
        ...props,
        accept: props.accept || accept,
        multiple: props.multiple !== void 0 ? props.multiple : multiple,
        onChange: handleFileChange,
        // Cast to `any` to prevent mismatched React ref type errors across workspaces
        // biome-ignore lint/suspicious/noExplicitAny: Intentional
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: inputRef,
        type: "file"
      };
    },
    [accept, multiple, handleFileChange]
  );
  return [
    state,
    {
      addFiles,
      clearErrors,
      clearFiles,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      removeFile
    }
  ];
};
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
function FileUploader({
  label = "Upload Your Document",
  maxSizeMB = 10,
  maxFiles = 1,
  accept = ["application/pdf", "application/msword"],
  className,
  dropAreaClassName,
  onFileUpload,
  isExecuting,
  onOpenFileDialog,
  fileKey = "pdf_file",
  hideSubmitButton = false
}) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps
    }
  ] = useFileUpload({
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: accept.join(",")
  });
  const handelOpenFileDialog = () => {
    if (onOpenFileDialog) {
      onOpenFileDialog();
    }
    openFileDialog();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    files.forEach((f) => {
      if (f.file instanceof File) {
        formData.append(fileKey, f.file);
      }
    });
    if (onFileUpload) {
      onFileUpload(formData);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: cn("flex w-full flex-col items-center gap-8", className),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex min-h-72 w-full flex-col items-center rounded-xl border border-dashed border-input bg-card p-4 transition-colors not-data-files:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50",
              dropAreaClassName
            ),
            "data-dragging": isDragging || void 0,
            "data-files": files.length > 0 || void 0,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...getInputProps(),
                  "aria-label": "Upload files",
                  className: "sr-only"
                }
              ),
              files.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-full space-y-2", children: files.map((file) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 overflow-hidden", children: [
                        /* @__PURE__ */ jsx(FileTextIcon, { className: "size-6 shrink-0 opacity-60" }),
                        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
                          /* @__PURE__ */ jsx("p", { className: "truncate text-[13px] font-medium", children: file.file instanceof File ? file.file.name : file.file.name }),
                          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatBytes(
                            file.file instanceof File ? file.file.size : file.file.size
                          ) })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          type: "button",
                          "aria-label": "Remove file",
                          className: "size-8 rounded-full text-muted-foreground/80 hover:bg-transparent hover:text-foreground",
                          onClick: () => removeFile(file.id),
                          size: "icon",
                          variant: "ghost",
                          disabled: isExecuting,
                          children: /* @__PURE__ */ jsx(XCircleIcon, { "aria-hidden": "true", className: "size-6" })
                        }
                      )
                    ]
                  },
                  file.id
                )) }),
                /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-fit flex-col gap-3", children: [
                  !hideSubmitButton && /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isExecuting, children: isExecuting ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(UploadIcon, { "aria-hidden": "true", className: "-ms-1" }),
                    "Upload file & Process"
                  ] }) }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      type: "button",
                      className: "text-primary!",
                      variant: "ghost",
                      disabled: isExecuting,
                      onClick: handelOpenFileDialog,
                      children: "Choose Different File"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [
                /* @__PURE__ */ jsx(
                  UploadIcon,
                  {
                    "aria-hidden": "true",
                    className: "mb-2 size-10 shrink-0 opacity-60"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "mb-4 text-[16px] font-medium", children: label }),
                /* @__PURE__ */ jsxs("p", { className: "mb-2 text-xs text-muted-foreground", children: [
                  "Supported formats:",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-card-foreground", children: "PDF, DOCS" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Max Size: ",
                  /* @__PURE__ */ jsx("span", { className: "text-card-foreground", children: "10 MB" })
                ] }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    className: "mt-4",
                    onClick: handelOpenFileDialog,
                    children: [
                      /* @__PURE__ */ jsx(FileTextIcon, { "aria-hidden": "true", className: "-ms-1" }),
                      "Choose File"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        errors.length > 0 && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-1 text-xs text-destructive",
            role: "alert",
            children: [
              /* @__PURE__ */ jsx(AlertCircleIcon, { className: "size-3 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: errors[0] })
            ]
          }
        )
      ]
    }
  );
}
const attachSupportingDocumentsFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("114fbb07700c233a6bedf29f9acc2b40fcae0d7b5e8f6728b100c120d5b69c03"));
function AttachSupportingDocument({
  appealId
}) {
  const mutation = useMutation({
    mutationFn: (formData) => {
      const files = formData.getAll("files");
      return attachSupportingDocumentsFn({ data: { appealId, files } });
    },
    onSuccess: () => {
      toast.success("Supporting documents attached successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to attach documents"
      );
    }
  });
  const handleFileUpload = (formData) => {
    mutation.mutate(formData);
  };
  return /* @__PURE__ */ jsx(
    FileUploader,
    {
      label: "Attach Supporting Document",
      onFileUpload: handleFileUpload,
      isExecuting: mutation.isPending,
      fileKey: "files",
      maxFiles: 5,
      hideSubmitButton: !!mutation.data,
      onOpenFileDialog: mutation.reset
    }
  );
}
function ExportPdfButton({ appeal, appealPDF }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleExportPdf = async () => {
    try {
      setIsLoading(true);
      const [appealData, blob] = await Promise.all([appeal, appealPDF]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = appealData.appeal_name ? `${appealData.appeal_name}.pdf` : `appeal-${appealData.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: "outline",
      onClick: handleExportPdf,
      disabled: isLoading,
      children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Spinner, {}),
        "Exporting..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(DownloadIcon, {}),
        "Export as PDF"
      ] })
    }
  );
}
const generateAppealPdf = cache(async (appealId) => {
  const session = await verifySession();
  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(
      `${env.API_URL}/documents/appeals/${appealId}/pdf/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/pdf"
        }
      }
    );
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to generate PDF");
    }
    const pdfBlob = await res.blob();
    return pdfBlob;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while generating the PDF");
  }
});
function ReviewView() {
  const { all } = useSearchParamsContext();
  const { appealId } = all();
  const navigate = useNavigate();
  if (!appealId) {
    navigate({ to: "/appeal-draft", search: { step: 1 } });
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex size-full max-h-fit flex-col gap-4.5", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-2.5", children: appealId ? /* @__PURE__ */ jsx(
      ExportPdfButton,
      {
        appeal: getAppeal(appealId),
        appealPDF: generateAppealPdf(appealId)
      }
    ) : /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", disabled: true, children: [
      /* @__PURE__ */ jsx(DownloadIcon, {}),
      "Export as PDF"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Still want to add something?" }),
      appealId ? /* @__PURE__ */ jsx(AttachSupportingDocument, { appealId }) : /* @__PURE__ */ jsx("div", { className: "flex min-h-40 items-center justify-center rounded-xl border border-dashed text-muted-foreground", children: "Save appeal draft first to attach documents" })
    ] })
  ] });
}
const extractEntitiesFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("7410d524e125003a516ec84ca8008c0bff6d7ad56963d5d8aea7d2f89819bd7c"));
function UploadDocumentView() {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const { documentId } = searchParams;
  const mutation = useMutation({
    mutationFn: (formData) => {
      const file = formData.get("pdf_file");
      if (!file) {
        throw new Error("No file provided");
      }
      return extractEntitiesFn({ data: { pdf_file: file } });
    },
    onSuccess: (data) => {
      setSearchParams({ step: 2, documentId: data.data.id });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to process file"
      );
    }
  });
  const handleOpenFileDialog = () => {
    if (documentId) {
      setSearchParams({ documentId: void 0 });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8", children: [
    /* @__PURE__ */ jsx("p", { className: "w-full max-w-lg text-center text-sm leading-loose", children: "Upload your GST Show Cause Notice or Order. Our AI will extract all relevant information to begin drafting your appeal." }),
    /* @__PURE__ */ jsx(
      FileUploader,
      {
        className: "max-w-3xl",
        isExecuting: mutation.isPending,
        onOpenFileDialog: handleOpenFileDialog,
        onFileUpload: (formData) => mutation.mutate(formData)
      }
    )
  ] });
}
const APPEAL_DRAFT_STEPS = [
  { step: 1, Component: UploadDocumentView },
  { step: 2, Component: BasicDetailsView },
  { step: 3, Component: IssueSelectionView },
  { step: 4, Component: ReferencesView },
  { step: 5, Component: DraftView },
  { step: 6, Component: ReviewView }
];
function AppealDraftView({ searchParams }) {
  const { step, ...rest } = searchParams;
  return /* @__PURE__ */ jsx(SearchParamsProvider, { searchParams, children: /* @__PURE__ */ jsx(FormProvider, { children: /* @__PURE__ */ jsx(DraftHistoryLayout, { step, children: /* @__PURE__ */ jsx("main", { className: "size-full p-6", children: /* @__PURE__ */ jsx("section", { className: "mx-auto size-full max-w-(--breakpoint-xl)", children: /* @__PURE__ */ jsxs("div", { className: "flex size-full flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsx(AppealDraftStepper, { className: "w-full md:max-w-2/3" }),
    /* @__PURE__ */ jsxs(Card, { className: "size-full max-h-fit gap-0 overflow-hidden rounded-3xl bg-muted p-0", children: [
      /* @__PURE__ */ jsx(CardContent, { className: "size-full px-4 py-6", children: APPEAL_DRAFT_STEPS.map(({ step: itemStep, Component }) => /* @__PURE__ */ jsx(
        Activity,
        {
          mode: step === itemStep ? "visible" : "hidden",
          children: /* @__PURE__ */ jsx(Component, {})
        },
        `appeal-draft-step-${itemStep}`
      )) }),
      /* @__PURE__ */ jsx(
        AppealDraftFooter,
        {
          searchParams: {
            step,
            ...rest
          }
        }
      )
    ] })
  ] }) }) }) }) }) });
}
function AppealDraftLoading() {
  return /* @__PURE__ */ jsx("main", { className: "flex size-full items-center justify-center p-6", children: /* @__PURE__ */ jsx(Spinner, { className: "size-12 text-primary" }) });
}
function AppealDraftPage() {
  const searchParams = Route.useSearch();
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(AppealDraftLoading, {}), children: /* @__PURE__ */ jsx(AppealDraftView, { searchParams }) });
}
export {
  AppealDraftPage as component
};
