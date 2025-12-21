import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";

export function DraftStep() {
  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <MinimalTiptap className="bg-background" />
    </div>
  );
}
