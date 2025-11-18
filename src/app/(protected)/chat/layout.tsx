import { ChatLayout } from "@/modules/chat/layouts/chat-layout";

export default function Layout(props: LayoutProps<"/chat">) {
  return <ChatLayout>{props.children}</ChatLayout>;
}
