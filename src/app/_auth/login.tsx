import { createFileRoute } from "@tanstack/react-router";

import { SignInView } from "@/modules/auth/views/sign-in-view";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return <SignInView />;
}
