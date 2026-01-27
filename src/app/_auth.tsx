import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { getSessionFn } from "@/lib/session.server";
import { AuthLayout } from "@/modules/auth/layouts/auth-layout";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    // Redirect authenticated users to chat
    if (session !== null) {
      throw redirect({ to: "/chat" });
    }
  },
  component: AuthLayoutRoute,
});

function AuthLayoutRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
