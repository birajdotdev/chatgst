import { ForgotPasswordEmailForm } from "@/modules/auth/components/forgot-password";
import { ForgetPasswordLayout } from "@/modules/auth/layouts/forget-password-layout";

export function ForgotPasswordView() {
  return (
    <ForgetPasswordLayout>
      <ForgotPasswordEmailForm />
    </ForgetPasswordLayout>
  );
}
