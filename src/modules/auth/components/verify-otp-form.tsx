"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

import { Logo } from "@/components/logo";
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
  sendOtpAction,
  verifyOtpAction,
} from "@/modules/auth/actions/otp-action";
import { verifyOtpSchema } from "@/modules/auth/validations/otp-schema";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    form,
    handleSubmitWithAction,
    action: { isExecuting: isOtpVerifying },
    resetFormAndAction,
  } = useHookFormAction(verifyOtpAction, zodResolver(verifyOtpSchema), {
    formProps: {
      defaultValues: {
        email,
        otp: "",
      },
    },
    actionProps: {
      onSuccess: () => {
        toast.success("Email verified successfully!");
        router.push("/login");
        resetFormAndAction();
      },
      onError: ({ error }) => {
        if (error.serverError) {
          toast.error(error.serverError);
        }
      },
    },
  });

  const { execute: resendOtp, isExecuting: isOtpSending } = useAction(
    sendOtpAction,
    {
      onSuccess: ({ data }) => {
        toast.success(data.message);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    }
  );

  const handleResend = () => {
    if (!email) {
      toast.error("Email not found. Please try registering again.");
      return;
    }
    resendOtp({ email });
  };

  const isLoading = isOtpVerifying || isOtpSending;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
      <div className="mx-auto h-auto">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription className="">
            We&apos;ve sent a 6-digit code to your email. Please enter the code
            below to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="mx-auto text-center">
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputOTP {...field} maxLength={6} disabled={isLoading}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot
                        index={index}
                        aria-invalid={fieldState.invalid}
                      />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isOtpVerifying ? <Spinner /> : "Verify"}
          </Button>
          <CardDescription>
            <span>Didn&apos;t receive the code?</span>
            <Button
              type="button"
              variant="link"
              className="ml-1 p-0"
              onClick={handleResend}
              disabled={isLoading}
            >
              Resend
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </form>
  );
}
