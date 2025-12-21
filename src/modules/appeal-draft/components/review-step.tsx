import { BookmarkIcon, DownloadIcon } from "lucide-react";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { AppealSummary } from "@/modules/appeal-draft/components/appeal-summary";

export function ReviewStep() {
  return (
    <div className="flex size-full max-h-fit flex-col gap-4.5">
      <div className="flex items-center justify-end gap-2.5">
        <Button type="button" variant="outline">
          <DownloadIcon />
          Export as PDF
        </Button>
        <Button type="button" variant="outline">
          <BookmarkIcon />
          Save Draft
        </Button>
      </div>

      <AppealSummary />

      <FileUploader label="Attach Supporting Document" />
    </div>
  );
}
