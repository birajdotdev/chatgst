import { DraftEditor } from "@/modules/appeal-draft/components/draft-editor";
import { URLUpdater } from "@/modules/appeal-draft/components/url-updater";
import { GenerateAppealApiResponse } from "@/modules/appeal-draft/types";

interface DraftContentProps {
  appealId?: string | null;
  documentId?: string | null;
  appealPromise: Promise<GenerateAppealApiResponse["data"]>;
}

export async function DraftContent({
  appealId,
  documentId: _documentId,
  appealPromise,
}: DraftContentProps) {
  const appealData = await appealPromise;

  return (
    <>
      {!appealId && <URLUpdater appealId={appealData.id} />}
      <DraftEditor
        appealId={appealData.id}
        documentId={appealData.document_id}
        initialName={appealData.appeal_name}
        initialContent={appealData.appeal_text}
      />
    </>
  );
}
