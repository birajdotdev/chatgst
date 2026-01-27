"use client";

import { redirect } from "@tanstack/react-router";

import { ForgotPasswordOtpForm } from "@/modules/auth/components/forgot-password";
import { ForgetPasswordLayout } from "@/modules/auth/layouts/forget-password-layout";

interface VerifyOtpViewProps {
  email?: string;
}

export function VerifyOtpView({ email }: VerifyOtpViewProps) {
  if (!email) {
    throw redirect({ to: "/forgot-password" });
  }

  return (
    <ForgetPasswordLayout>
      <ForgotPasswordOtpForm email={email} />
    </ForgetPasswordLayout>
  );
}
