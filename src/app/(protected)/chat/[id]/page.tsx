import { notFound } from "next/navigation";

import { getChat } from "@/modules/chat/apis/get-chat";
import { DefaultChatProvider } from "@/modules/chat/components/default-chat-context";
import { ChatView } from "@/modules/chat/views/chat-view";

export default async function Page(props: PageProps<"/chat/[id]">) {
  const { id } = await props.params;
  const chat = await getChat(id);

  if (!chat) {
    notFound();
  }

  return (
    <DefaultChatProvider chatId={id}>
      <ChatView />
    </DefaultChatProvider>
  );
}
