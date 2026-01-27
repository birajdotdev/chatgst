import { Suspense } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { Spinner } from "@/components/ui/spinner";
import { VerifyOtpView } from "@/modules/auth/views/verify-otp-view";

export const Route = createFileRoute("/_auth/register/verify")({
  component: VerifyPage,
});

function VerifyPage() {
  return (
    <Suspense fallback={<Spinner className="size-12 text-primary" />}>
      <VerifyOtpView />
    </Suspense>
  );
}
