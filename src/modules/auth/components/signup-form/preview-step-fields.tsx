"use client";

import { Control, Controller, useWatch } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignupFormInput } from "@/modules/auth/validations/signup-schema";

interface PreviewStepFieldsProps {
  control: Control<SignupFormInput>;
}

export function PreviewStepFields({ control }: PreviewStepFieldsProps) {
  const formValues = useWatch({ control });

  return (
    <div className="flex flex-col">
      <div className="min-h-[370px] px-12">
        <ScrollArea className="h-80">
          <FieldGroup className="gap-4.5">
            <div className="space-y-3">
              <h1 className="text-sm font-medium text-primary">
                Personal Information
              </h1>
              <div className="grid grid-cols-3">
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">Full Name</h2>
                  <p className="text-sm">
                    {[
                      formValues.first_name,
                      formValues.middle_name,
                      formValues.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ") || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">Email</h2>
                  <p className="text-sm">{formValues.email || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Phone Number
                  </h2>
                  <p className="text-sm">{formValues.phone_number || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-sm font-medium text-primary">GST Specific</h1>
              <div className="grid grid-cols-3 gap-y-3.5">
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">GSTIN</h2>
                  <p className="text-sm">{formValues.gstin || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Business/Trade Name
                  </h2>
                  <p className="text-sm">{formValues.business_name || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Constitution of Business
                  </h2>
                  <p className="text-sm capitalize">
                    {formValues.constitution_of_business || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    State / Jurisdiction
                  </h2>
                  <p className="text-sm capitalize">
                    {formValues.state_or_jurisdiction || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-sm font-medium text-primary">Professional</h1>
              <div className="grid grid-cols-3 gap-y-3.5">
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">User Type</h2>
                  <p className="text-sm capitalize">
                    {formValues.user_type || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Firm Name / Organization
                  </h2>
                  <p className="text-sm">
                    {formValues.organization_name || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Designation / Role
                  </h2>
                  <p className="text-sm">{formValues.designation || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Professional Registration No.
                  </h2>
                  <p className="text-sm">
                    {formValues.professional_registration_number || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-sm font-medium text-primary">Contact</h1>
              <div className="grid grid-cols-3 gap-y-3.5">
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">Address</h2>
                  <p className="text-sm capitalize">
                    {formValues.address || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">Pincode</h2>
                  <p className="text-sm">{formValues.pincode || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs text-muted-foreground">
                    Alternate Email/Phone
                  </h2>
                  <p className="text-sm">
                    {formValues.alternate_email_or_phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </FieldGroup>
        </ScrollArea>
      </div>
      <FieldGroup className="-mb-6 block space-y-2 border-t px-12 py-3!">
        <FieldLabel className="text-xs text-muted-foreground">
          Terms & Conditions
        </FieldLabel>
        <div className="grid grid-cols-2">
          <Controller
            name="terms_and_privacy_policy"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>
                  I agree to Terms and Privacy Policy
                </FieldLabel>
              </Field>
            )}
          />
          <Controller
            name="receive_updates_or_newsletter"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>
                  I consent to receive updates/newsletters
                </FieldLabel>
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </div>
  );
}
