"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { resetProfilePasswordFn } from "@/modules/profile/actions/reset-password-action";
import { resetPasswordSchema } from "@/modules/profile/validations/reset-password-schema";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: ResetPasswordFormData) =>
      resetProfilePasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully");
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      );
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FieldGroup className="gap-4">
        <Controller
          name="current_password"
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Spinner /> : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
