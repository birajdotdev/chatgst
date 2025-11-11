import { Control, Controller } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_TYPE_OPTIONS } from "@/modules/auth/constants/user-types";
import type { SignupFormInput } from "@/modules/auth/validations/signup-schema";

interface ProfessionalStepFieldsProps {
  control: Control<SignupFormInput>;
}

export function ProfessionalStepFields({
  control,
}: ProfessionalStepFieldsProps) {
  return (
    <FieldGroup className="gap-4 px-12">
      <Controller
        name="user_type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              User Type
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              required
            >
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="e.g. Consultant" />
              </SelectTrigger>
              <SelectContent>
                {USER_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="organization_name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Firm Name / Organization
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Achme Corp"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="designation"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Designation</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Lawyer"
              value={field.value || ""}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="professional_registration_number"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Professional Registration Number
              <FieldDescription className="ml-1">
                (for CA/Advocate users)
              </FieldDescription>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. CA"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
