"use client";

import { use, useEffect } from "react";

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
import { useFormContext } from "@/modules/appeal-draft/contexts/form-context";
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

interface ExtractedDetailsFormProps {
  document: Promise<DocumentData>;
}

export function ExtractedDetailsForm({ document }: ExtractedDetailsFormProps) {
  const documentData = use(document);

  const { setIsSubmitting, setIsDirty } = useFormContext();
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateDocumentAction,
    zodResolver(updateDocumentSchema),
    {
      actionProps: {
        onExecute: () => setIsSubmitting(true),
        onSettled: () => setIsSubmitting(false),
        onError: ({ error }) => {
          toast.error(error.serverError || "Failed to update document");
        },
      },
      formProps: {
        defaultValues: documentData,
        mode: "onBlur",
      },
    }
  );

  // Initialize isDirty to false when component mounts or document changes
  useEffect(() => {
    setIsDirty(false);
  }, [documentData.id, setIsDirty]);

  // Subscribe to form isDirty state changes
  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: { isDirty: true },
      callback: (state) => {
        setIsDirty(state.isDirty as boolean);
      },
    });

    return () => unsubscribe();
  }, [form, setIsDirty]);

  const staticFieldGroups: FormFieldGroup[] = [
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
  ];

  const dynamicOrderFieldGroups = documentData.order_details.flatMap(
    (_, index) => [
      {
        title: "Order Details",
        fields: [
          {
            name: `order_details.${index}.order_number` as StringFieldPath,
            label: "Order Number",
          },
          {
            name: `order_details.${index}.order_date` as StringFieldPath,
            label: "Order Date",
          },
        ],
      },
      {
        title: "Other Details",
        fields: [
          {
            name: `order_details.${index}.tax_period` as StringFieldPath,
            label: "Tax Period",
          },
          {
            name: `order_details.${index}.demand_amount` as StringFieldPath,
            label: "Demand Amount",
          },
        ],
      },
    ]
  );

  const formFieldGroups = [...staticFieldGroups, ...dynamicOrderFieldGroups];

  return (
    <form
      id="extracted-details-form"
      className="size-full space-y-6 rounded-xl bg-card px-6 pt-3 pb-5"
      onSubmit={handleSubmitWithAction}
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
