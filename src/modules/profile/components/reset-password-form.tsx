"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { resetPasswordAction } from "@/modules/profile/actions/reset-password-action";
import { resetPasswordSchema } from "@/modules/profile/validations/reset-password-schema";

export function ResetPasswordForm() {
  const {
    form: { control, handleSubmit },
    action: { isExecuting, execute },
  } = useHookFormAction(resetPasswordAction, zodResolver(resetPasswordSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success(data?.message || "Password changed successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to change password");
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(execute)} className="space-y-6">
      <FieldGroup className="gap-4">
        <Controller
          name="current_password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="new_password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                autoComplete="new-password"
                placeholder="••••••••"
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
              <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                autoComplete="new-password"
                placeholder="••••••••"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isExecuting}
        >
          {isExecuting ? <Spinner /> : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
