import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

// Server function to get auth data
const getAuthData = createServerFn({ method: "GET" }).handler(async () => {
  return await auth();
});

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthData();
    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  loader: async () => {
    return await getAuthData();
  },
  component: ProtectedLayoutRoute,
});

function ProtectedLayoutRoute() {
  const { isAuthenticated, user } = Route.useLoaderData();

  return (
    <main className="flex h-screen flex-col">
      <Navbar
        className="shrink-0 border-b bg-background"
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <div className="flex flex-1 pt-16">
        <Outlet />
      </div>
    </main>
  );
}
