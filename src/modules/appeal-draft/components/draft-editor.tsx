"use client";

import { useEffect, useState } from "react";

import { useAction } from "next-safe-action/hooks";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { updateAppealAction } from "@/modules/appeal-draft/actions/update-appeal-action";
import { appealDraftSearchParams } from "@/modules/appeal-draft/components/search-params";
import { useFormContext } from "@/modules/appeal-draft/contexts/form-context";

interface DraftEditorProps {
  appealId: string;
  initialName: string;
  initialContent: string;
}

export function DraftEditor({
  appealId,
  initialName,
  initialContent,
}: DraftEditorProps) {
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(initialContent);
  const { setIsSubmitting, setIsDirty } = useFormContext();
  const [_, setSearchParams] = useQueryStates(appealDraftSearchParams);

  const { execute, isPending } = useAction(updateAppealAction, {
    onSuccess: () => {
      toast.success("Appeal updated successfully");
      setIsDirty(false);
      setSearchParams({ step: 6, documentId: null }, { shallow: false });
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to update appeal");
    },
  });

  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending, setIsSubmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({
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
