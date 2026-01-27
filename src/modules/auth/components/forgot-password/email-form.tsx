"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

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
import { forgotPasswordFn } from "@/modules/auth/actions/forgot-password-action";
import { forgotPasswordSchema } from "@/modules/auth/validations/forgot-password-schema";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordEmailForm() {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: ForgotPasswordFormData) =>
      forgotPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({
        to: "/forgot-password/verify",
        search: { email: form.getValues("email") },
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset code"
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
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Send Reset Code"}
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/login">
              <ArrowLeft className="mr-2 size-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
