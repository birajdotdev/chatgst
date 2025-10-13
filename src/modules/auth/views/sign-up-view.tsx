"use client";

import { SignupForm } from "@/modules/auth/components/signup-form";

export function SignUpView() {
  return (
    <div className="w-full max-w-sm md:max-w-5xl">
      <SignupForm />
    </div>
  );
}
