import "@fontsource-variable/outfit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles/globals.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "ChatGST" },
      {
        name: "description",
        content:
          "Simplify GST appeals with automated data extraction, an intelligent knowledge base, and multilingual support. Transform complex legal documents into accurate, structured appeals in minutes.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Outlet />
            <Toaster richColors />
          </ThemeProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
