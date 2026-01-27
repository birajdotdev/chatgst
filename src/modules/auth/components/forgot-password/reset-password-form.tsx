"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { resetPasswordFn } from "@/modules/auth/actions/forgot-password-action";
import { resetPasswordSchema } from "@/modules/auth/validations/forgot-password-schema";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: ResetPasswordFormData) =>
      resetPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset password"
      );
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Your Password</CardTitle>
          <CardDescription>
            Create a new password for your account. Make sure it&apos;s strong
            and unique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your new password"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your new password"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Reset Password"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
