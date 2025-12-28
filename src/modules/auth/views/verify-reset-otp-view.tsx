import { redirect } from "next/navigation";

import { ForgotPasswordOtpForm } from "@/modules/auth/components/forgot-password";
import { ForgetPasswordLayout } from "@/modules/auth/layouts/forget-password-layout";

interface VerifyOtpViewProps {
  searchParams: Promise<{ email?: string }>;
}

export async function VerifyOtpView({ searchParams }: VerifyOtpViewProps) {
  const email = (await searchParams).email;
  if (!email) {
    redirect("/forgot-password");
  }

  return (
    <ForgetPasswordLayout>
      <ForgotPasswordOtpForm email={email} />
    </ForgetPasswordLayout>
  );
}
