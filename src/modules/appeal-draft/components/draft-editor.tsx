"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";

interface DraftEditorProps {
  initialName: string;
  initialContent: string;
}

export function DraftEditor({ initialName, initialContent }: DraftEditorProps) {
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(initialContent);

  return (
    <div className="flex flex-col gap-5">
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
          onChange={(e) => setName(e.target.value)}
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
          onChange={setContent}
        />
      </div>
    </div>
  );
}
