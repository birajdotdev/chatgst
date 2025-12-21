import { use } from "react";

import { Separator } from "@/components/ui/separator";
import {
  DocumentData,
  LegalReference,
  PotentialIssues,
} from "@/modules/appeal-draft/types";

interface AppealSummaryProps {
  document: Promise<DocumentData>;
  issues: Promise<PotentialIssues>;
  references: Promise<LegalReference[]>;
}

export function AppealSummary({
  document,
  issues,
  references,
}: AppealSummaryProps) {
  const documentData = use(document);
  const issuesData = use(issues);
  const referencesData = use(references);

  // Extract relevant details from the document
  const orderDetail = documentData.order_details[0];
  const selectedIssues = issuesData.filter((i) => i.selected);

  const summaryData = {
    applicantDetails: {
      name: documentData.assessee_details.assessee_name,
      gstin: "Not Available", // Current types don't show GSTIN explicitly
      orderDate: orderDetail?.order_date || "N/A",
    },
    issuesDisputed:
      selectedIssues.length > 0
        ? selectedIssues.map((i) => i.title)
        : ["No issues selected"],
    authorities: {
      total: referencesData.reduce((acc, r) => acc + r.sections.length, 0),
      acts: referencesData.length,
      caseLaws: 0, // Current types don't separate case laws
    },
    draftStats: {
      words: 0,
      pages: 0,
      attachments: 0,
    },
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-3">
      <h2 className="text-base font-medium text-card-foreground">
        Appeal Summary
      </h2>

      <div className="flex w-full flex-col items-start gap-3 md:flex-row">
        <SummarySection title="Applicants Detail">
          <SummaryField
            label="Name :"
            value={summaryData.applicantDetails.name}
          />
          <SummaryField
            label="GSTIN :"
            value={summaryData.applicantDetails.gstin}
          />
          <SummaryField
            label="Order Date :"
            value={summaryData.applicantDetails.orderDate}
          />
        </SummarySection>

        <Separator
          orientation="vertical"
          className="my-auto hidden max-h-12 md:block"
        />
        <Separator className="md:hidden" />

        <SummarySection title="Issue Disputed">
          <ul className="space-y-1">
            {summaryData.issuesDisputed.map((issue, index) => (
              <li
                key={index}
                className="ml-4 list-disc text-xs font-medium text-foreground"
              >
                {issue}
              </li>
            ))}
          </ul>
        </SummarySection>

        <Separator
          orientation="vertical"
          className="my-auto hidden max-h-12 md:block"
        />
        <Separator className="md:hidden" />

        <SummarySection title="Legal References">
          <SummaryField
            label="Total :"
            value={`${summaryData.authorities.total} authorities`}
          />
          <SummaryField
            label="Acts :"
            value={summaryData.authorities.acts.toString()}
          />
          <SummaryField
            label="Case laws :"
            value={summaryData.authorities.caseLaws.toString()}
          />
        </SummarySection>

        <Separator
          orientation="vertical"
          className="my-auto hidden max-h-12 md:block"
        />
        <Separator className="md:hidden" />

        <SummarySection title="Draft Stats">
          <SummaryField
            label="Words :"
            value={`${summaryData.draftStats.words} Words`}
          />
          <SummaryField
            label="Pages :"
            value={`~${summaryData.draftStats.pages}`}
          />
          <SummaryField
            label="Attachment :"
            value={summaryData.draftStats.attachments.toString()}
          />
        </SummarySection>
      </div>
    </div>
  );
}

interface SummarySectionProps {
  title: string;
  children: React.ReactNode;
}

function SummarySection({ title, children }: SummarySectionProps) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex items-start gap-1">
        <h3 className="text-xs leading-5 font-medium text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

interface SummaryFieldProps {
  label: string;
  value: string;
}

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="flex items-start gap-1.5 text-xs leading-normal">
      <p className="w-20.5 shrink-0 font-medium text-muted-foreground">
        {label}
      </p>
      <p className="flex-1 font-medium text-foreground">{value}</p>
    </div>
  );
}
