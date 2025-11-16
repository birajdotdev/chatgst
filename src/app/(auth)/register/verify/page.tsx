import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import { VerifyOtpView } from "@/modules/auth/views/verify-otp-view";

export default function Page() {
  return (
    <Suspense fallback={<Spinner className="size-12 text-primary" />}>
      <VerifyOtpView />
    </Suspense>
  );
}
