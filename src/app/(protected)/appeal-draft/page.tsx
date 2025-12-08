import { Suspense } from "react";

import { getDocumentAction } from "@/modules/appeal-draft/actions/get-document-action";
import BasicDetailsStep from "@/modules/appeal-draft/components/basic-details-step";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";
import { AppealDraftView } from "@/modules/appeal-draft/views/appeal-draft-view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    step?: string;
    documentId?: string;
    mode?: string;
  }>;
}) {
  const params = await searchParams;
  const step = Number(params.step) || 1;
  const documentId = params.documentId || null;
  const mode = params.mode || null;

  // Fetch document data for step 2 if documentId exists
  let document = null;
  if (documentId && step === 2) {
    document = await getDocumentAction(documentId);
  }

  return (
    <AppealDraftView step={step} documentId={documentId} mode={mode}>
      {step === 1 && <UploadDocumentStep />}
      {step === 2 && documentId && document && (
        <Suspense fallback={<BasicDetailsStepSkeleton />}>
          <BasicDetailsStep
            documentId={documentId}
            mode={mode}
            document={document}
          />
        </Suspense>
      )}
      {step > 2 && (
        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
          Step {step} Content Placeholder
        </div>
      )}
    </AppealDraftView>
  );
}
