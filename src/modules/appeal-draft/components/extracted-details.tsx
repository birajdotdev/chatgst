"use client";

import { use } from "react";

import { DocumentData } from "@/modules/appeal-draft/types";

interface ExtractedDetailsProps {
  document: Promise<DocumentData>;
}

export function ExtractedDetails({ document }: ExtractedDetailsProps) {
  const documentData = use(document);

  const staticDetails = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "Name",
          value: documentData.assessee_details.assessee_name,
        },
        {
          name: "Address",
          value: documentData.assessee_details.assessee_address,
        },
      ],
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "Officer",
          value: documentData.jurisdiction_details.jurisdiction_officer,
        },
        {
          name: "Jurisdiction Office",
          value: documentData.jurisdiction_details.jurisdiction_office,
        },
      ],
    },
  ];

  const dynamicOrderDetails = (documentData.order_details ?? []).flatMap(
    (order) => [
      {
        title: "Order Details",
        fields: [
          {
            name: "Order Number",
            value: order.order_number,
          },
          {
            name: "Order Date",
            value: order.order_date,
          },
        ],
      },
      {
        title: "Other Details",
        fields: [
          {
            name: "Tax Period",
            value: order.tax_period,
          },
          {
            name: "Demand Amount",
            value: order.demand_amount,
          },
        ],
      },
    ]
  );

  const extractedDetails = [...staticDetails, ...dynamicOrderDetails];

  return (
    <div className="size-full space-y-6 rounded-xl bg-card px-6 pt-3 pb-5">
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
