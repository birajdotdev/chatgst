"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { ArrowLeft, Mail } from "lucide-react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { forgotPasswordAction } from "@/modules/auth/actions/forgot-password-action";
import { forgotPasswordSchema } from "@/modules/auth/validations/forgot-password-schema";

export function ForgotPasswordEmailForm() {
  const router = useRouter();

  const {
    form,
    action: { isExecuting },
    handleSubmitWithAction,
  } = useHookFormAction(
    forgotPasswordAction,
    zodResolver(forgotPasswordSchema),
    {
      formProps: {
        defaultValues: {
          email: "",
        },
      },
      actionProps: {
        onSuccess: ({ data, input }) => {
          toast.success(data.message);
          const queryParams = new URLSearchParams({
            email: input.email,
          });
          router.push(`/forgot-password/verify?${queryParams}`);
        },
        onError: ({ error }) => {
          // Fallback for unexpected server errors (network failures, etc.)
          if (error.serverError) {
            toast.error(error.serverError);
          }
        },
      },
    }
  );

  return (
    <form onSubmit={handleSubmitWithAction}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a code to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <Mail className="size-4" />
                    </InputGroupAddon>
                  </InputGroup>
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
            {isExecuting ? <Spinner /> : "Send Reset Code"}
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 size-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
