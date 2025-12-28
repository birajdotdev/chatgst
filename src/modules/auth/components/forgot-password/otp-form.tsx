"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
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
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import {
  forgotPasswordAction,
  verifyResetOtpAction,
} from "@/modules/auth/actions/forgot-password-action";
import { verifyResetOtpSchema } from "@/modules/auth/validations/forgot-password-schema";

interface ForgotPasswordOtpFormProps {
  email: string;
}

export function ForgotPasswordOtpForm({ email }: ForgotPasswordOtpFormProps) {
  const router = useRouter();

  const {
    form,
    handleSubmitWithAction,
    action: { isExecuting: isOtpVerifying },
  } = useHookFormAction(
    verifyResetOtpAction,
    zodResolver(verifyResetOtpSchema),
    {
      formProps: {
        defaultValues: {
          otp: "",
        },
      },
      actionProps: {
        onSuccess: ({ data }) => {
          toast.success(data.message);
          router.push("/forgot-password/reset");
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
    }
  );

  const { execute: resendOtp, isExecuting: isOtpSending } = useAction(
    forgotPasswordAction,
    {
      onSuccess: ({ data }) => {
        toast.success(data.message);
      },
      onError: ({ error }) => {
        // Show email validation errors from resend action via toast
        if (error.validationErrors?.email?._errors) {
          toast.error(error.validationErrors.email._errors.join(" "));
        } else if (error.serverError) {
          // Fallback for unexpected server errors
          toast.error(error.serverError);
        }
      },
    }
  );

  const handleResend = () => {
    resendOtp({ email });
  };

  const isLoading = isOtpVerifying || isOtpSending;

  return (
    <form onSubmit={handleSubmitWithAction}>
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
            {isOtpVerifying ? <Spinner /> : "Verify Code"}
          </Button>
          <div className="text-center text-sm">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50"
            >
              {isOtpSending ? "Sending..." : "Resend"}
            </button>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isLoading}
            asChild
          >
            <Link href={"/forgot-password"}>Change Email</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
