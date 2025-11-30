import { SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AiProcessingSummaryBanner } from "./ai-processing-summary-banner";
import { ExtractedDetails } from "./extracted-details";

export default function BasicDetailsStep() {
  return (
    <div className="flex size-full max-h-fit flex-col items-end gap-4.5">
      <AiProcessingSummaryBanner />
      <Button variant="outline">
        <SquarePenIcon />
        Edit Details
      </Button>
      <ExtractedDetails />
    </div>
  );
}
