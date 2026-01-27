import { createFileRoute } from "@tanstack/react-router";

import { SignUpView } from "@/modules/auth/views/sign-up-view";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return <SignUpView />;
}
