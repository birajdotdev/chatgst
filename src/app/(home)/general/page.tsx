import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { GeneralChatView } from "@/modules/home/views/general-chat-view";

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/chat");
  }

  return <GeneralChatView />;
}
