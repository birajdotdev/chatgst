import { jsxs, jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import { a as Field, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { L as Logo } from "./logo-DoHeR5o3.js";
import { B as Button } from "./button-D5vTpyVN.js";
import { a as Card, b as CardHeader, d as CardTitle, e as CardDescription, c as CardContent, C as CardFooter } from "./card-BEA0qkFW.js";
import { I as InputOTP, a as InputOTPGroup, b as InputOTPSlot } from "./input-otp-k9cfdBTP.js";
import { v as verifyOtpFn, s as sendOtpFn } from "./otp-action-EKLsQble.js";
import { v as verifyOtpSchema } from "./otp-schema-CrqXLMtA.js";
import "lucide-react";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "input-otp";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./helpers-CIAyAvNc.js";
function VerifyOtpForm() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const email = search.email || "";
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: ""
    }
  });
  const verifyMutation = useMutation({
    mutationFn: (input) => verifyOtpFn({ data: input }),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
    }
  });
  const resendMutation = useMutation({
    mutationFn: (input) => sendOtpFn({ data: input }),
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
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit, children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto h-auto", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Verify Your Email" }),
        /* @__PURE__ */ jsx(CardDescription, { className: "", children: "We've sent a 6-digit code to your email. Please enter the code below to continue" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "mx-auto text-center", children: /* @__PURE__ */ jsx(
        Controller,
        {
          name: "otp",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(InputOTP, { ...field, maxLength: 6, disabled: isLoading, children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(InputOTPGroup, { children: /* @__PURE__ */ jsx(
              InputOTPSlot,
              {
                index,
                "aria-invalid": fieldState.invalid
              }
            ) }, index)) }),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: verifyMutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Verify" }),
        /* @__PURE__ */ jsxs(CardDescription, { children: [
          /* @__PURE__ */ jsx("span", { children: "Didn't receive the code?" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "link",
              className: "ml-1 p-0",
              onClick: handleResend,
              disabled: isLoading,
              children: "Resend"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function VerifyOtpView() {
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsx(VerifyOtpForm, {}) });
}
function VerifyPage() {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Spinner, { className: "size-12 text-primary" }), children: /* @__PURE__ */ jsx(VerifyOtpView, {}) });
}
export {
  VerifyPage as component
};
