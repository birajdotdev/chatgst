import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import { VerifyOtpView } from "@/modules/auth/views/verify-reset-otp-view";

export default function Page(props: PageProps<"/forgot-password/verify">) {
  return (
    <Suspense fallback={<Spinner />}>
      <VerifyOtpView searchParams={props.searchParams} />
    </Suspense>
  );
}
