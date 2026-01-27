"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { sanitizeHtmlForTiptap } from "@/lib/sanitize-html";
import {
  type UpdateAppealInput,
  updateAppealFn,
} from "@/modules/appeal-draft/actions/update-appeal-action";
import { useSearchParamsContext } from "@/modules/appeal-draft/components/search-params";
import { useFormContext } from "@/modules/appeal-draft/contexts/form-context";

interface DraftEditorProps {
  appealId: string;
  documentId: string;
  initialName: string;
  initialContent: string;
}

export function DraftEditor({
  appealId,
  documentId,
  initialName,
  initialContent,
}: DraftEditorProps) {
  // Sanitize the initial HTML content from the API
  const sanitizedInitialContent = useMemo(
    () => sanitizeHtmlForTiptap(initialContent),
    [initialContent]
  );

  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(sanitizedInitialContent);
  const { setIsSubmitting, setIsDirty } = useFormContext();
  const { setSearchParams } = useSearchParamsContext();

  // Track whether we should navigate to step 6 after successful submission
  const shouldNavigateRef = useRef(false);

  const mutation = useMutation({
    mutationFn: (input: UpdateAppealInput) => updateAppealFn({ data: input }),
    onSuccess: () => {
      toast.success("Appeal updated successfully");
      setIsDirty(false);

      // Handle navigation after successful submission
      if (shouldNavigateRef.current) {
        shouldNavigateRef.current = false;
        setSearchParams(
          {
            step: 6,
            documentId: documentId,
            appealId: appealId,
          },
          { shallow: false }
        );
      }
    },
    onError: (error) => {
      shouldNavigateRef.current = false;
      toast.error(
        error instanceof Error ? error.message : "Failed to update appeal"
      );
    },
  });

  useEffect(() => {
    setIsSubmitting(mutation.isPending);
  }, [mutation.isPending, setIsSubmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set flag to indicate we want to navigate after success
    shouldNavigateRef.current = true;
    mutation.mutate({
      appealId,
      appeal_name: name,
      appeal_text: content,
    });
  };

  return (
    <form
      id="appeal-draft-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="appeal-name"
          className="text-sm font-semibold text-muted-foreground"
        >
          Appeal Name
        </Label>
        <Input
          id="appeal-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIsDirty(true);
          }}
          placeholder="Enter appeal name..."
          className="h-11 bg-background text-base font-medium"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold text-muted-foreground">
          Appeal Content
        </Label>
        <MinimalTiptap
          className="bg-background"
          content={content}
          onChange={(val) => {
            setContent(val);
            setIsDirty(true);
          }}
        />
      </div>
    </form>
  );
}
