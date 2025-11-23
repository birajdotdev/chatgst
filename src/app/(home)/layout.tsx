import { GeneralChatProvider } from "@/modules/chat/components/general-chat-context";
import HomeLayout from "@/modules/home/layouts/home-layout";

export default function Layout(props: LayoutProps<"/">) {
  return (
    <GeneralChatProvider>
      <HomeLayout>{props.children}</HomeLayout>
    </GeneralChatProvider>
  );
}
