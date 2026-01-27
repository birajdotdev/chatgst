import { createFileRoute } from "@tanstack/react-router";

import { GeneralChatProvider } from "@/modules/chat/components/general-chat-context";
import HomeLayout from "@/modules/home/layouts/home-layout";
import { LandingView } from "@/modules/home/views/landing-view";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <GeneralChatProvider>
      <HomeLayout>
        <LandingView />
      </HomeLayout>
    </GeneralChatProvider>
  );
}
