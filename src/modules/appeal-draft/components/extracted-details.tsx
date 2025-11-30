export function ExtractedDetails() {
  const extractedDetails = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "Name",
          value: "ABC Trading Company Private Limited",
        },
        {
          name: "Address",
          value: "123, Industrial Area, Phase-II, Bangalore - 560058",
        },
      ],
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "Officer",
          value: "Assistant Commissioner, GST Division-3",
        },
        {
          name: "Jurisdiction Office",
          value: "GST Bhawan, Bangalore South, Karnataka",
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
