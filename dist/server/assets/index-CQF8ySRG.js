import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useLocation, Link, useNavigate } from "@tanstack/react-router";
import { L as Logo } from "./logo-DoHeR5o3.js";
import { cva } from "class-variance-authority";
import { NavigationMenu as NavigationMenu$1, Avatar as Avatar$1 } from "radix-ui";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { Menu, ChevronDownIcon, UserRoundIcon, PaletteIcon, LogOutIcon } from "lucide-react";
import { S as Sheet, h as SheetTrigger, i as SheetContent, j as SheetFooter, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, D as DropdownMenu, k as DropdownMenuTrigger, l as DropdownMenuContent, m as DropdownMenuLabel, n as DropdownMenuSeparator, o as DropdownMenuGroup, p as DropdownMenuItem, q as DropdownMenuSub, r as DropdownMenuSubTrigger, s as DropdownMenuPortal, t as DropdownMenuSubContent, u as DropdownMenuCheckboxItem } from "./alert-dialog-Cj9ELzHO.js";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { S as Spinner } from "./field-CcmYbgZh.js";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { c as createServerFn } from "../server.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, P as ProfileForm } from "./profile-form-Kv1Sy6HW.js";
import { S as Skeleton } from "./skeleton-hioRrLEH.js";
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenu$1.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenu$1.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenu$1.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenu$1.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenu$1.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
const navMenuItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "How it works", href: "/#how-it-works" }
];
const navMenuAuthenticatedItems = [
  { title: "Chat", href: "/chat" },
  { title: "Appeal Draft", href: "/appeal-draft" },
  { title: "Language Assistance", href: "/language-assistance" }
];
function NavMenu({ isAuthenticated = false, ...props }) {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsx(NavigationMenu, { ...props, children: /* @__PURE__ */ jsx(NavigationMenuList, { className: "gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start", children: (isAuthenticated ? navMenuAuthenticatedItems : navMenuItems).map(
    (item) => /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
      NavigationMenuLink,
      {
        active: pathname === item.href || pathname.startsWith(item.href),
        className: "bg-transparent! text-base underline-offset-4 hover:text-primary! hover:underline data-active:text-primary! data-active:underline",
        asChild: true,
        children: /* @__PURE__ */ jsx(
          Link,
          {
            to: item.href,
            className: "flex flex-row items-center gap-2 whitespace-nowrap",
            children: item.title
          }
        )
      }
    ) }, item.title)
  ) }) });
}
function NavigationSheet() {
  return /* @__PURE__ */ jsxs(Sheet, { children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Menu, {}) }) }),
    /* @__PURE__ */ jsxs(SheetContent, { className: "max-h-screen px-6 py-3", children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(NavMenu, { orientation: "vertical", className: "mt-6 [&>div]:h-full" }),
      /* @__PURE__ */ jsxs(SheetFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", size: "lg", className: "inline-flex", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Get Started" }) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "inline-flex", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign In" }) })
      ] })
    ] })
  ] });
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Avatar$1.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      ),
      ...props
    }
  );
}
const logoutFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("8049cc69294c272842b7e79f43fd004930122117ae4cae183aa78ee4017cf142"));
function LogoutAlertDialog(props) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    }
  });
  const handelLogout = (e) => {
    e.preventDefault();
    mutation.mutate();
  };
  return /* @__PURE__ */ jsx(AlertDialog, { ...props, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you sure you want to logout?" }),
      /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This action cannot be undone. You will need to log in again to access your account." })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
      /* @__PURE__ */ jsx(
        AlertDialogAction,
        {
          className: "min-w-20",
          onClick: handelLogout,
          disabled: mutation.isPending,
          children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Logout"
        }
      )
    ] })
  ] }) });
}
const getProfileFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("663e1af1141f112ce528bb454e44cbf262050cba8608dc5d84f97dcee10319e9"));
function ProfileFormSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-[150px]" }) })
  ] });
}
function ProfileUpdateDialog({
  open,
  onOpenChange
}) {
  const [profileData, setProfileData] = useState(null);
  const mutation = useMutation({
    mutationFn: () => getProfileFn(),
    onSuccess: (result) => {
      if (result?.data) {
        const rawData = result.data;
        const cleanData = Object.fromEntries(
          Object.entries(rawData).map(([key, value]) => [
            key,
            value === "string" ? "" : value
          ])
        );
        setProfileData(cleanData);
      }
    }
  });
  useEffect(() => {
    if (open) {
      mutation.mutate();
    }
  }, [open]);
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] w-full max-w-5xl overflow-y-auto sm:max-w-5xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Update Profile" }) }),
    mutation.isPending ? /* @__PURE__ */ jsx(ProfileFormSkeleton, {}) : profileData ? /* @__PURE__ */ jsx(
      ProfileForm,
      {
        initialData: profileData,
        onSuccess: () => onOpenChange(false)
      }
    ) : /* @__PURE__ */ jsx("div", { className: "py-10 text-center text-muted-foreground", children: "Failed to load profile." })
  ] }) });
}
function UserButton({
  name = "",
  email = ""
}) {
  const { theme, setTheme } = useTheme();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProfileUpdateDialog,
      {
        open: showProfileDialog,
        onOpenChange: setShowProfileDialog
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          className: "h-auto cursor-pointer p-0 hover:bg-transparent",
          children: [
            /* @__PURE__ */ jsxs(Avatar, { children: [
              /* @__PURE__ */ jsx(
                AvatarImage,
                {
                  src: `https://api.dicebear.com/9.x/avataaars/svg?seed=${name || "User"}`,
                  alt: "Profile image"
                }
              ),
              /* @__PURE__ */ jsx(AvatarFallback, { children: name ? name.charAt(0) + name.charAt(1) : "" })
            ] }),
            /* @__PURE__ */ jsx(ChevronDownIcon, { "aria-hidden": "true" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "max-w-64", align: "end", children: [
        /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "flex min-w-0 flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "truncate text-sm font-medium text-foreground", children: name }),
          /* @__PURE__ */ jsx("span", { className: "truncate text-xs font-normal text-muted-foreground", children: email })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: () => setShowProfileDialog(true), children: [
            /* @__PURE__ */ jsx(UserRoundIcon, { "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: "Account" })
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [
              /* @__PURE__ */ jsx(PaletteIcon, { "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { children: "Theme" })
            ] }),
            /* @__PURE__ */ jsx(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
              /* @__PURE__ */ jsx(
                DropdownMenuCheckboxItem,
                {
                  checked: theme === "light",
                  onCheckedChange: () => setTheme("light"),
                  children: "Light"
                }
              ),
              /* @__PURE__ */ jsx(
                DropdownMenuCheckboxItem,
                {
                  checked: theme === "dark",
                  onCheckedChange: () => setTheme("dark"),
                  children: "Dark"
                }
              ),
              /* @__PURE__ */ jsx(
                DropdownMenuCheckboxItem,
                {
                  checked: theme === "system",
                  onCheckedChange: () => setTheme("system"),
                  children: "System"
                }
              )
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: () => setOpenLogoutDialog(true), children: [
          /* @__PURE__ */ jsx(LogOutIcon, { "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: "Logout" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      LogoutAlertDialog,
      {
        open: openLogoutDialog,
        onOpenChange: setOpenLogoutDialog
      }
    )
  ] });
}
function Navbar({ className, isAuthenticated, user }) {
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: cn(
        "fixed top-0 right-0 left-0 z-50 h-16 px-4 sm:px-6 lg:px-8",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between", children: [
        isAuthenticated ? /* @__PURE__ */ jsx(Logo, {}) : /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }),
        /* @__PURE__ */ jsx(
          NavMenu,
          {
            className: "hidden md:block",
            isAuthenticated
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsx(UserButton, { email: user?.email, name: user?.full_name }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "default",
              size: "lg",
              className: "hidden min-w-[120px] md:inline-flex",
              asChild: true,
              children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Get Started" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "hidden min-w-[120px] md:inline-flex",
              asChild: true,
              children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign In" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(NavigationSheet, {}) })
        ] })
      ] })
    }
  );
}
export {
  Navbar as N
};
