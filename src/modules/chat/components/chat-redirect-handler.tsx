"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { useDefaultChat } from "./default-chat-context";

/**
 * Component that monitors chat submissions and handles redirect for new chats
 * This wraps children and listens to message changes to detect when a new chat ID is created
 */
export function ChatRedirectHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const { chat } = useDefaultChat();
  const chatId = params?.id as string | undefined;

  const hasRedirectedRef = useRef(false);
  const previousMessageCountRef = useRef(0);

  useEffect(() => {
    // Only handle redirects for new chats (not on /chat/[id])
    if (chatId || hasRedirectedRef.current) {
      return;
    }

    // Check if a new message was added (user submitted something)
    const currentMessageCount = chat.messages.length;
    if (currentMessageCount > previousMessageCountRef.current) {
      previousMessageCountRef.current = currentMessageCount;

      // When a new message is added, poll the API to get the chat ID
      const pollForChatId = async () => {
        // Wait a bit for the backend to process
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          // Make a simple fetch to our API with a special header to get just the chat ID
          const response = await fetch("/chat/api/current-id");

          if (response.ok) {
            const data = await response.json();
            if (data.chatId) {
              console.log("[ChatRedirectHandler] Found chat ID:", data.chatId);
              hasRedirectedRef.current = true;
              router.replace(`/chat/${data.chatId}`);
            }
          }
        } catch (err) {
          console.error(
            "[ChatRedirectHandler] Error polling for chat ID:",
            err
          );
        }
      };

      pollForChatId();
    }
  }, [chat.messages, chatId, router]);

  return <>{children}</>;
}
