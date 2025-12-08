"use client";

import { DocumentData } from "@/modules/appeal-draft/types";

interface ExtractedDetailsProps {
  document: DocumentData;
}

export function ExtractedDetails({ document }: ExtractedDetailsProps) {
  const extractedDetails = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "Name",
          value: document.assessee_details.assessee_name,
        },
        {
          name: "Address",
          value: document.assessee_details.assessee_address,
        },
      ],
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "Officer",
          value: document.jurisdiction_details.jurisdiction_officer,
        },
        {
          name: "Jurisdiction Office",
          value: document.jurisdiction_details.jurisdiction_office,
        },
      ],
    },
    {
      title: "Order Details",
      fields: [
        {
          name: "Order Number",
          value: document.order_details[0].order_number,
        },
        {
          name: "Order Date",
          value: document.order_details[0].order_date,
        },
      ],
    },
    {
      title: "Other Details",
      fields: [
        {
          name: "Tax Period",
          value: document.order_details[0].tax_period,
        },
        {
          name: "Demand Amount",
          value: document.order_details[0].demand_amount,
        },
      ],
    },
    {
      title: "Order Details",
      fields: [
        {
          name: "Order Number",
          value: "GST/AC/BLR-S/2024/ORD/125",
        },
        {
          name: "Order Date",
          value: "2024-03-15",
        },
      ],
    },
    {
      title: "Other Details",
      fields: [
        {
          name: "Tax Period",
          value: "April 2023 to September 2023",
        },
        {
          name: "Demand Amount",
          value: "₹2,45,680",
        },
      ],
    },
  ];

  return (
    <div className="size-full space-y-6 rounded-xl bg-card px-6 py-3">
      <h1 className="text-lg font-medium">Extracted Details</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {extractedDetails.map((detail, idx) => (
          <div key={`detail-${idx}`} className="flex flex-col gap-4">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-primary">
                {detail.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {detail.fields.map((field, fieldIdx) => (
                  <div
                    key={`field-${fieldIdx}`}
                    className="flex min-w-0 flex-col gap-1 pl-5"
                  >
                    <p className="text-sm text-muted-foreground">
                      {field.name}
                    </p>
                    <p className="text-sm font-medium wrap-break-word text-card-foreground">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
