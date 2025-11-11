import { Control, Controller } from "react-hook-form";

import { PasswordInput } from "@/components/password-input";
import { PhoneInput } from "@/components/phone-input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SignupFormInput } from "@/modules/auth/validations/signup-schema";

interface PersonalStepFieldsProps {
  control: Control<SignupFormInput>;
}

export function PersonalStepFields({ control }: PersonalStepFieldsProps) {
  return (
    <FieldGroup className="gap-4 px-12">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Controller
            name="first_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  First Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. John"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="middle_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Middle Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="last_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Last Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Doe"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Email <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="e.g. example@gmail.com"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="phone_number"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Phone <span className="text-destructive">*</span>
            </FieldLabel>
            <PhoneInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              defaultCountry="IN"
              international
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Password <span className="text-destructive">*</span>
            </FieldLabel>
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="********"
              showStrengthIndicator
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="confirm_password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Confirm Password <span className="text-destructive">*</span>
            </FieldLabel>
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="********"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
