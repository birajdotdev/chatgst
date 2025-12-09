import { Suspense } from "react";

import BasicDetailsStep from "@/modules/appeal-draft/components/basic-details-step";
import { BasicDetailsStepSkeleton } from "@/modules/appeal-draft/components/basic-details-step-skeleton";
import { UploadDocumentStep } from "@/modules/appeal-draft/components/upload-document-step";
import { getDocument } from "@/modules/appeal-draft/queries/get-document";
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
    try {
      document = await getDocument(documentId);
    } catch (error) {
      // Let error boundary handle it
      throw error;
    }
  }

  return (
    <AppealDraftView step={step} documentId={documentId} mode={mode}>
      {step === 1 && <UploadDocumentStep />}
      {step === 2 && documentId && (
        <Suspense fallback={<BasicDetailsStepSkeleton />}>
          {document ? (
            <BasicDetailsStep
              documentId={documentId}
              mode={mode}
              document={document}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-destructive">
                  Document not found
                </p>
                <p className="text-sm text-muted-foreground">
                  The document you&apos;re looking for doesn&apos;t exist or has
                  been deleted.
                </p>
              </div>
            </div>
          )}
        </Suspense>
      )}
      {step === 2 && !documentId && (
        <div className="flex h-full w-full items-center justify-center text-center">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-destructive">
              Missing document ID
            </p>
            <p className="text-sm text-muted-foreground">
              Please upload a document first to continue.
            </p>
          </div>
        </div>
      )}
      {step > 2 && (
        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
          Step {step} Content Placeholder
        </div>
      )}
    </AppealDraftView>
  );
}
