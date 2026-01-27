import { Suspense } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Spinner } from "@/components/ui/spinner";
import { VerifyOtpView } from "@/modules/auth/views/verify-reset-otp-view";

const searchSchema = z.object({
  email: z.string().email().optional(),
});

export const Route = createFileRoute("/_auth/forgot-password/verify")({
  validateSearch: searchSchema,
  component: VerifyResetPage,
});

function VerifyResetPage() {
  const { email } = Route.useSearch();

  return (
    <Suspense fallback={<Spinner />}>
      <VerifyOtpView email={email} />
    </Suspense>
  );
}
