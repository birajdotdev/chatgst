import { jsx, jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { a as Field, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import { useNavigate, Link, redirect } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { B as Button } from "./button-D5vTpyVN.js";
import "clsx";
import "./input-group-HiwdIxtQ.js";
import { v as verifyResetOtpFn, f as forgotPasswordFn, F as ForgetPasswordLayout } from "./forget-password-layout-BG6nGBsU.js";
import { v as verifyResetOtpSchema } from "./forgot-password-schema-TEY8kxah.js";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { a as Card, b as CardHeader, d as CardTitle, e as CardDescription, c as CardContent, C as CardFooter } from "./card-BEA0qkFW.js";
import { I as InputOTP, a as InputOTPGroup, b as InputOTPSlot } from "./input-otp-k9cfdBTP.js";
import { c as Route } from "./router-CXy64lwh.js";
import "lucide-react";
import "class-variance-authority";
import "radix-ui";
import "tailwind-merge";
import "./input-DokJ73Yy.js";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "./logo-DoHeR5o3.js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "input-otp";
import "next-themes";
import "./session.server-oiI_kIZw.js";
import "vinxi/http";
import "./env-CgjodLxP.js";
function ForgotPasswordOtpForm({ email }) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: {
      otp: ""
    }
  });
  const verifyMutation = useMutation({
    mutationFn: (input) => verifyResetOtpFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({ to: "/forgot-password/reset" });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Invalid OTP");
    }
  });
  const resendMutation = useMutation({
    mutationFn: (input) => forgotPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP"
      );
    }
  });
  const handleResend = () => {
    resendMutation.mutate({ email });
  };
  const onSubmit = form.handleSubmit((data) => {
    verifyMutation.mutate(data);
  });
  const isLoading = verifyMutation.isPending || resendMutation.isPending;
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Verify Your Email" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        "We've sent a 6-digit code to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: email }),
        ". Please enter the code below to continue."
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "flex flex-col items-center", children: /* @__PURE__ */ jsx(
      Controller,
      {
        name: "otp",
        control: form.control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(
          Field,
          {
            "data-invalid": fieldState.invalid,
            className: "items-center justify-center *:w-auto!",
            children: [
              /* @__PURE__ */ jsx(
                InputOTP,
                {
                  maxLength: 6,
                  value: field.value,
                  onChange: field.onChange,
                  disabled: isLoading,
                  "aria-invalid": fieldState.invalid,
                  required: true,
                  children: /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 2 }),
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
                    /* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
                  ] })
                }
              ),
              fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: verifyMutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Verify Code" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
        "Didn't receive the code?",
        " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleResend,
            disabled: isLoading,
            className: "font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50",
            children: resendMutation.isPending ? "Sending..." : "Resend"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          className: "w-full",
          disabled: isLoading,
          asChild: true,
          children: /* @__PURE__ */ jsx(Link, { to: "/forgot-password", children: "Change Email" })
        }
      )
    ] })
  ] }) });
}
function VerifyOtpView({ email }) {
  if (!email) {
    throw redirect({ to: "/forgot-password" });
  }
  return /* @__PURE__ */ jsx(ForgetPasswordLayout, { children: /* @__PURE__ */ jsx(ForgotPasswordOtpForm, { email }) });
}
function VerifyResetPage() {
  const {
    email
  } = Route.useSearch();
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Spinner, {}), children: /* @__PURE__ */ jsx(VerifyOtpView, { email }) });
}
export {
  VerifyResetPage as component
};
