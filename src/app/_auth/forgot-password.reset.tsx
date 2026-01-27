import { createFileRoute } from "@tanstack/react-router";

import { ResetPasswordView } from "@/modules/auth/views/reset-password-view";

export const Route = createFileRoute("/_auth/forgot-password/reset")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return <ResetPasswordView />;
}
