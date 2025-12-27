import Link from "next/link";

import { Logo } from "@/components/logo";

export function ForgetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <div className="mx-auto h-auto">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
