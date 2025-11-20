import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/chat");
  }

  return <div></div>;
}
