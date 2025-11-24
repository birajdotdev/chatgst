import { DefaultChatProvider } from "@/modules/chat/components/default-chat-context";
import { ChatLayout } from "@/modules/chat/layouts/chat-layout";

export default function Layout(props: LayoutProps<"/chat">) {
  return (
    <DefaultChatProvider>
      <ChatLayout>{props.children}</ChatLayout>
    </DefaultChatProvider>
  );
}
