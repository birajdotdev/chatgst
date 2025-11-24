import { notFound } from "next/navigation";

import { getChat } from "@/modules/chat/apis/get-chat";

export default async function Page(props: PageProps<"/chat/[id]">) {
  const { id } = await props.params;
  const chat = await getChat(id);

  if (!chat) {
    notFound();
  }
  return <pre>{JSON.stringify(chat, null, 2)}</pre>;
}
