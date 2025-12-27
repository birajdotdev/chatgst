import { ResetPasswordForm } from "@/modules/auth/components/forgot-password";
import { ForgetPasswordLayout } from "@/modules/auth/layouts/forget-password-layout";

export function ResetPasswordView() {
  return (
    <ForgetPasswordLayout>
      <ResetPasswordForm />
    </ForgetPasswordLayout>
  );
}
