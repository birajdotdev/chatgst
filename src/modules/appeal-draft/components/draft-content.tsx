import { DraftEditor } from "@/modules/appeal-draft/components/draft-editor";
import { GenerateAppealApiResponse } from "@/modules/appeal-draft/types";

interface DraftContentProps {
  appealPromise: Promise<GenerateAppealApiResponse["data"]>;
}

export async function DraftContent({ appealPromise }: DraftContentProps) {
  const appealData = await appealPromise;

  return (
    <DraftEditor
      initialName={appealData.appeal_name}
      initialContent={appealData.appeal_text}
    />
  );
}
