import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { LandingView } from "@/modules/home/views/landing-view";

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/chat");
  }

  return <LandingView />;
}
