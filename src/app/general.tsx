import { createFileRoute } from "@tanstack/react-router";

import { GeneralChatProvider } from "@/modules/chat/components/general-chat-context";
import HomeLayout from "@/modules/home/layouts/home-layout";
import { GeneralChatView } from "@/modules/home/views/general-chat-view";

export const Route = createFileRoute("/general")({
  component: GeneralPage,
});

function GeneralPage() {
  return (
    <GeneralChatProvider>
      <HomeLayout>
        <GeneralChatView />
      </HomeLayout>
    </GeneralChatProvider>
  );
}
