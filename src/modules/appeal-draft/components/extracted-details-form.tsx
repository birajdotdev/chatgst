"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Controller, type FieldPath } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateDocumentAction } from "@/modules/appeal-draft/actions/update-document-action";
import type { DocumentData } from "@/modules/appeal-draft/types";
import {
  extractedDetailsSchema,
  updateDocumentSchema,
} from "@/modules/appeal-draft/validations/extracted-details-schema";

type FormSchema = z.infer<typeof extractedDetailsSchema>;

type StringFieldPath = FieldPath<FormSchema> & string;

type FormField = { name: StringFieldPath; label: string };
type FormFieldGroup = {
  title: string;
  fields: FormField[];
};

export function ExtractedDetailsForm({
  document,
  documentId,
}: {
  document: DocumentData;
  documentId: string;
}) {
  const {
    form,
    action: { execute },
  } = useHookFormAction(
    updateDocumentAction,
    zodResolver(updateDocumentSchema),
    {
      actionProps: {
        onError: ({ error }) => {
          toast.error(error.serverError || "Failed to update document");
        },
      },
      formProps: {
        defaultValues: {
          assessee_details: document.assessee_details,
          jurisdiction_details: document.jurisdiction_details,
          order_details: document.order_details,
        },
        mode: "onBlur",
      },
    }
  );

  const formFieldGroups: FormFieldGroup[] = [
    {
      title: "Assessee Details",
      fields: [
        {
          name: "assessee_details.assessee_name",
          label: "Name",
        },
        {
          name: "assessee_details.assessee_address",
          label: "Address",
        },
      ],
    },
    {
      title: "Jurisdiction Details",
      fields: [
        {
          name: "jurisdiction_details.jurisdiction_officer",
          label: "Officer",
        },
        {
          name: "jurisdiction_details.jurisdiction_office",
          label: "Office",
        },
      ],
    },
    {
      title: "Order Details",
      fields: [
        {
          name: "order_details.0.order_number",
          label: "Order Number",
        },
        {
          name: "order_details.0.order_date",
          label: "Order Date",
        },
      ],
    },
    {
      title: "Other Details",
      fields: [
        {
          name: "order_details.0.tax_period",
          label: "Tax Period",
        },
        {
          name: "order_details.0.demand_amount",
          label: "Demand Amount",
        },
      ],
    },
  ];

  const onSubmit = (data: FormSchema) => {
    execute({ ...data, id: documentId });
  };

  return (
    <form
      id="extracted-details-form"
      className="size-full space-y-6 rounded-xl bg-card px-6 pt-3 pb-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h1 className="text-lg font-medium">Extracted Details</h1>
      <div className="grid grid-cols-1 gap-6">
        {formFieldGroups.map((fieldGroup) => (
          <FieldSet key={fieldGroup.title} className="gap-2">
            <FieldTitle className="font-semibold text-primary">
              {fieldGroup.title}
            </FieldTitle>
            <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fieldGroup.fields.map((formField) => (
                <Controller
                  key={formField.name}
                  control={form.control}
                  name={formField.name}
                  render={({ field, fieldState }) => (
                    <Field
                      aria-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <FieldLabel htmlFor={field.name}>
                        {formField.label}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        value={(field.value as string) ?? ""}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>
        ))}
      </div>
    </form>
  );
}
