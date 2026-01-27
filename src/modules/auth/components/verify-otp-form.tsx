"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

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
import { sendOtpFn, verifyOtpFn } from "@/modules/auth/actions/otp-action";
import { verifyOtpSchema } from "@/modules/auth/validations/otp-schema";

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const email = (search as { email?: string }).email || "";

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (input: VerifyOtpFormData) => verifyOtpFn({ data: input }),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
    },
  });

  const resendMutation = useMutation({
    mutationFn: (input: { email: string }) => sendOtpFn({ data: input }),
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
    if (!email) {
      toast.error("Email not found. Please try registering again.");
      return;
    }
    resendMutation.mutate({ email });
  };

  const onSubmit = form.handleSubmit((data) => {
    verifyMutation.mutate(data);
  });

  const isLoading = verifyMutation.isPending || resendMutation.isPending;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="mx-auto h-auto">
        <Link to="/">
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
            {verifyMutation.isPending ? <Spinner /> : "Verify"}
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
