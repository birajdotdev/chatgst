"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import {
  forgotPasswordFn,
  verifyResetOtpFn,
} from "@/modules/auth/actions/forgot-password-action";
import { verifyResetOtpSchema } from "@/modules/auth/validations/forgot-password-schema";

interface ForgotPasswordOtpFormProps {
  email: string;
}

type VerifyOtpFormData = z.infer<typeof verifyResetOtpSchema>;

export function ForgotPasswordOtpForm({ email }: ForgotPasswordOtpFormProps) {
  const navigate = useNavigate();

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (input: VerifyOtpFormData) => verifyResetOtpFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({ to: "/forgot-password/reset" });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Invalid OTP");
    },
  });

  const resendMutation = useMutation({
    mutationFn: (input: { email: string }) => forgotPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP"
      );
    },
  });

  const handleResend = () => {
    resendMutation.mutate({ email });
  };

  const onSubmit = form.handleSubmit((data) => {
    verifyMutation.mutate(data);
  });

  const isLoading = verifyMutation.isPending || resendMutation.isPending;

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>. Please
            enter the code below to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="items-center justify-center *:w-auto!"
              >
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  required
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {verifyMutation.isPending ? <Spinner /> : "Verify Code"}
          </Button>
          <div className="text-center text-sm">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50"
            >
              {resendMutation.isPending ? "Sending..." : "Resend"}
            </button>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isLoading}
            asChild
          >
            <Link to="/forgot-password">Change Email</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
