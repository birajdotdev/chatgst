"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

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
import { resetPasswordAction } from "@/modules/auth/actions/forgot-password-action";
import { resetPasswordSchema } from "@/modules/auth/validations/forgot-password-schema";

export function ResetPasswordForm() {
  const router = useRouter();

  const {
    form,
    action: { isExecuting },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(resetPasswordAction, zodResolver(resetPasswordSchema), {
    formProps: {
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    },
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        resetFormAndAction();
        router.push("/login");
      },
      onError: ({ error }) => {
        // Show root validation errors (like session expiration) via toast
        if (error.validationErrors?._errors) {
          toast.error(error.validationErrors._errors.join(" "));
        } else if (error.serverError) {
          // Fallback for unexpected server errors
          toast.error(error.serverError);
        }
      },
    },
  });

  return (
    <form onSubmit={handleSubmitWithAction}>
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
          <Button type="submit" className="w-full" disabled={isExecuting}>
            {isExecuting ? <Spinner /> : "Reset Password"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
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
