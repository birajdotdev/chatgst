import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, redirect, useNavigate, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ThemeProvider as ThemeProvider$1, useTheme } from "next-themes";
import { Loader2Icon, OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon } from "lucide-react";
import { Toaster as Toaster$1 } from "sonner";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { c as createServerFn } from "../server.js";
import { g as getSessionFn } from "./session.server-oiI_kIZw.js";
import { z } from "zod";
import { useCallback, useMemo, createContext, useContext } from "react";
import { setCookie } from "vinxi/http";
import { e as env } from "./env-CgjodLxP.js";
function ThemeProvider({
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(ThemeProvider$1, { ...props, children });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...props
    }
  );
};
const appCss = "/assets/globals-fFtLu93Q.css";
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      { title: "ChatGST" },
      {
        name: "description",
        content: "Simplify GST appeals with automated data extraction, an intelligent knowledge base, and multilingual support. Transform complex legal documents into accurate, structured appeals in minutes."
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  component: RootLayout
});
function RootLayout() {
  const { queryClient } = Route$f.useRouteContext();
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "font-sans antialiased", children: [
      /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(
        ThemeProvider,
        {
          attribute: "class",
          defaultTheme: "system",
          enableSystem: true,
          disableTransitionOnChange: true,
          children: [
            /* @__PURE__ */ jsx(Outlet, {}),
            /* @__PURE__ */ jsx(Toaster, { richColors: true })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$d = () => import("./general-8Fh03ut7.js");
const Route$e = createFileRoute("/general")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./_protected-DguN54jr.js");
const getAuthData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("586106710aa4ebaa280b7148db77ad9947aa1a2200401cb96c271426bf992248"));
const Route$d = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const {
      isAuthenticated
    } = await getAuthData();
    if (!isAuthenticated) {
      throw redirect({
        to: "/login"
      });
    }
  },
  loader: async () => {
    return await getAuthData();
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./_auth-1IXN9H6V.js");
const Route$c = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session !== null) {
      throw redirect({
        to: "/chat"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-Bh9XEaAy.js");
const Route$b = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./profile-37dKgHBO.js");
const getUserProfile = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c91aa17c75770a201a72b152bfcd8a8b52640e16c31bb2a2687d77cdb45508a0"));
const Route$a = createFileRoute("/_protected/profile")({
  loader: async () => {
    const {
      user
    } = await getUserProfile();
    if (!user) {
      throw redirect({
        to: "/login"
      });
    }
    return {
      user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const SearchParamsContext = createContext(
  null
);
function SearchParamsProvider({
  children,
  searchParams
}) {
  const navigate = useNavigate();
  const setSearchParams = useCallback(
    (updates, options) => {
      const cleanedUpdates = Object.fromEntries(
        Object.entries(updates).map(([key, value2]) => [
          key,
          value2 === null ? void 0 : value2
        ])
      );
      navigate({
        to: "/appeal-draft",
        search: (prev) => ({
          ...prev,
          ...cleanedUpdates
        }),
        replace: options?.shallow ?? true
      });
    },
    [navigate]
  );
  const get = useCallback(
    (key) => {
      return searchParams[key];
    },
    [searchParams]
  );
  const all = useCallback(() => searchParams, [searchParams]);
  const value = useMemo(
    () => ({
      searchParams,
      setSearchParams,
      get,
      all
    }),
    [searchParams, setSearchParams, get, all]
  );
  return /* @__PURE__ */ jsx(SearchParamsContext.Provider, { value, children });
}
function useSearchParamsContext() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useSearchParamsContext must be used within a SearchParamsProvider"
    );
  }
  return context;
}
const appealDraftSearchSchema = z.object({
  step: z.number().int().min(1).max(6).default(1),
  documentId: z.string().optional(),
  appealId: z.string().optional(),
  mode: z.string().optional()
});
const $$splitComponentImporter$8 = () => import("./appeal-draft-ABrLol-p.js");
const Route$9 = createFileRoute("/_protected/appeal-draft")({
  validateSearch: appealDraftSearchSchema,
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./register-kWQgD7n9.js");
const Route$8 = createFileRoute("/_auth/register")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-CWzJKBAU.js");
const Route$7 = createFileRoute("/_auth/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./forgot-password-CB1yV0RJ.js");
const Route$6 = createFileRoute("/_auth/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-CQd9wirn.js");
const Route$5 = createFileRoute("/_protected/chat/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};
const Route$4 = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const res = await fetch(`${env.API_URL}/token/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) {
          const errorData = await res.json();
          return new Response(
            JSON.stringify({
              success: false,
              message: errorData.detail || "Login failed"
            }),
            {
              status: res.status,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        const data = await res.json();
        setCookie("access_token", data.data.access_token, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24
          // 24 hours
        });
        setCookie("refresh_token", data.data.refresh_token, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24 * 7
          // 7 days
        });
        return new Response(
          JSON.stringify({
            success: true,
            message: data.message
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }
  }
});
const $$splitComponentImporter$3 = () => import("./_id-Bpkn9Rln.js");
const Route$3 = createFileRoute("/_protected/chat/$id")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./register.verify-DeKaxYad.js");
const Route$2 = createFileRoute("/_auth/register/verify")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./forgot-password.verify-pX0Yww2I.js");
const searchSchema = z.object({
  email: z.string().email().optional()
});
const Route$1 = createFileRoute("/_auth/forgot-password/verify")({
  validateSearch: searchSchema,
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./forgot-password.reset-KGtJctgS.js");
const Route = createFileRoute("/_auth/forgot-password/reset")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const GeneralRoute = Route$e.update({
  id: "/general",
  path: "/general",
  getParentRoute: () => Route$f
});
const ProtectedRoute = Route$d.update({
  id: "/_protected",
  getParentRoute: () => Route$f
});
const AuthRoute = Route$c.update({
  id: "/_auth",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const ProtectedProfileRoute = Route$a.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => ProtectedRoute
});
const ProtectedAppealDraftRoute = Route$9.update({
  id: "/appeal-draft",
  path: "/appeal-draft",
  getParentRoute: () => ProtectedRoute
});
const AuthRegisterRoute = Route$8.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => AuthRoute
});
const AuthLoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AuthRoute
});
const AuthForgotPasswordRoute = Route$6.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => AuthRoute
});
const ProtectedChatIndexRoute = Route$5.update({
  id: "/chat/",
  path: "/chat/",
  getParentRoute: () => ProtectedRoute
});
const ApiAuthLoginRoute = Route$4.update({
  id: "/api/auth/login",
  path: "/api/auth/login",
  getParentRoute: () => Route$f
});
const ProtectedChatIdRoute = Route$3.update({
  id: "/chat/$id",
  path: "/chat/$id",
  getParentRoute: () => ProtectedRoute
});
const AuthRegisterVerifyRoute = Route$2.update({
  id: "/verify",
  path: "/verify",
  getParentRoute: () => AuthRegisterRoute
});
const AuthForgotPasswordVerifyRoute = Route$1.update({
  id: "/verify",
  path: "/verify",
  getParentRoute: () => AuthForgotPasswordRoute
});
const AuthForgotPasswordResetRoute = Route.update({
  id: "/reset",
  path: "/reset",
  getParentRoute: () => AuthForgotPasswordRoute
});
const AuthForgotPasswordRouteChildren = {
  AuthForgotPasswordResetRoute,
  AuthForgotPasswordVerifyRoute
};
const AuthForgotPasswordRouteWithChildren = AuthForgotPasswordRoute._addFileChildren(AuthForgotPasswordRouteChildren);
const AuthRegisterRouteChildren = {
  AuthRegisterVerifyRoute
};
const AuthRegisterRouteWithChildren = AuthRegisterRoute._addFileChildren(
  AuthRegisterRouteChildren
);
const AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRouteWithChildren,
  AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRouteWithChildren
};
const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
const ProtectedRouteChildren = {
  ProtectedAppealDraftRoute,
  ProtectedProfileRoute,
  ProtectedChatIdRoute,
  ProtectedChatIndexRoute
};
const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  ProtectedRoute: ProtectedRouteWithChildren,
  GeneralRoute,
  ApiAuthLoginRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        // 5 minutes
        gcTime: 1e3 * 60 * 10
        // 10 minutes
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      queryClient
    }
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  SearchParamsProvider as S,
  Route$a as a,
  Route$9 as b,
  Route$1 as c,
  router as r,
  useSearchParamsContext as u
};
