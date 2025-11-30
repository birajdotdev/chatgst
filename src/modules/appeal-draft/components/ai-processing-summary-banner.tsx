import { Fragment } from "react/jsx-runtime";

import { ItemHeader, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

const summaries = [
  {
    title: "Entity Extraction",
    description:
      "Used Named Entity Recognition (NER) to identify GST-specific entities like GSTIN, order numbers, and dates.",
  },
  {
    title: "Pattern Recognition",
    description:
      "Applied regex patterns and ML models trained on GST document formats to extract structured data.",
  },
  {
    title: "Confidence Score",
    description: "High accuracy achieved through document structure analysis.",
  },
] as { title: string; description: string }[];

export function AiProcessingSummaryBanner() {
  return (
    <div className="flex flex-col gap-4.5 rounded-xl border border-primary bg-primary/10 px-6 py-3">
      <ItemHeader>
        <ItemTitle className="text-lg">AI Processing Summary</ItemTitle>
      </ItemHeader>
      <div className="flex flex-col items-center gap-[32px] md:flex-row">
        {summaries.map((summary, idx) => (
          <Fragment key={summary.title}>
            <div className="flex size-full flex-1 flex-col gap-2.5">
              <h2 className="text-[16px] font-medium">{summary.title}</h2>
              <p className="text-xs text-foreground">{summary.description}</p>
            </div>
            {idx !== summaries.length - 1 && (
              <>
                <Separator
                  orientation="vertical"
                  className="hidden max-h-10 bg-primary md:block"
                />
                <Separator
                  orientation="horizontal"
                  className="block w-full bg-primary md:hidden"
                />
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
