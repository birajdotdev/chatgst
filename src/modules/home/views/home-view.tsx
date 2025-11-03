"use client";

import { Activity, startTransition, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";

import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChatView } from "@/modules/home/views/chat-view";
import { LandingView } from "@/modules/home/views/landing-view";
import { ErrorCodes, parseClientError } from "@/types/errors";

export function HomeView() {
  const [hasChatStarted, setHasChatStarted] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { messages, status, sendMessage, stop, regenerate } = useChat({
    id: "chat-gst-general",
    transport: new DefaultChatTransport({
      api: "/general/api",
    }),
    onError: (error) => {
      // Parse structured error from the response
      const errorData = parseClientError(error);

      // Handle quota exceeded error with alert dialog
      if (errorData.code === ErrorCodes.QUOTA_EXCEEDED) {
        setOpenAlert(true);
        return;
      }

      // Handle validation errors
      if (
        errorData.code === ErrorCodes.NO_USER_MESSAGE ||
        errorData.code === ErrorCodes.EMPTY_MESSAGE ||
        errorData.code === ErrorCodes.VALIDATION_ERROR
      ) {
        toast.error("Invalid message", {
          description: errorData.message,
        });
        return;
      }

      // Handle all other errors with retry option
      toast.error("Failed to send chat", {
        description: errorData.message || "An unknown error occurred.",
        action: {
          label: "Retry",
          onClick: () => regenerate(),
        },
      });
    },
  });

  const handleSubmit = (message: PromptInputMessage) => {
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setInput("");
    startTransition(() => setHasChatStarted(true));
  };

  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      <Activity mode={hasChatStarted ? "hidden" : "visible"}>
        <LandingView
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          status={status}
        />
      </Activity>

      <Activity mode={hasChatStarted ? "visible" : "hidden"}>
        <ChatView
          value={input}
          onChange={setInput}
          messages={messages}
          onSubmit={handleSubmit}
          status={status}
        />
      </Activity>

      <AlertDialogContent className="gap-6 rounded-xl!">
        <div className="flex h-fit! justify-center">
          <div className="rounded-full bg-primary/5 p-2 pb-0.5">
            <div className="inline-block rounded-full bg-primary/10 p-3">
              <CircleAlert className="text-primary" />
            </div>
          </div>
        </div>
        <AlertDialogHeader className="gap-3 text-center!">
          <AlertDialogTitle className="text-xl">
            Limit reached! Please login to chat more
          </AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;ve used your 3 free chats. Please log in to continue
            chatting without interruptions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center! gap-3">
          <AlertDialogCancel className="min-w-[145px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="min-w-[145px]">
            Log In to continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
