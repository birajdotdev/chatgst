import { jsx, jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { B as Button } from "./button-D5vTpyVN.js";
import "clsx";
import { F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import "./input-group-HiwdIxtQ.js";
import { r as resetPasswordFn, F as ForgetPasswordLayout } from "./forget-password-layout-BG6nGBsU.js";
import { r as resetPasswordSchema } from "./forgot-password-schema-TEY8kxah.js";
import "./input-otp-k9cfdBTP.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { P as PasswordInput } from "./password-input-CeIDaVYP.js";
import { a as Card, b as CardHeader, d as CardTitle, e as CardDescription, c as CardContent, C as CardFooter } from "./card-BEA0qkFW.js";
import "class-variance-authority";
import "radix-ui";
import "tailwind-merge";
import "lucide-react";
import "react";
import "./input-DokJ73Yy.js";
import "./createSsrRpc-D8jcV7CB.js";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "./logo-DoHeR5o3.js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "input-otp";
function ResetPasswordForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const mutation = useMutation({
    mutationFn: (input) => resetPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset password"
      );
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Reset Your Password" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Create a new password for your account. Make sure it's strong and unique." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
      /* @__PURE__ */ jsx(
        Controller,
        {
          name: "password",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "New Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                "aria-invalid": fieldState.invalid,
                placeholder: "Enter your new password",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        Controller,
        {
          name: "confirmPassword",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Confirm Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                "aria-invalid": fieldState.invalid,
                placeholder: "Confirm your new password",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: mutation.isPending,
          children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Reset Password"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Remember your password?",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/login",
            className: "font-medium text-primary underline-offset-4 hover:underline",
            children: "Sign in"
          }
        )
      ] })
    ] })
  ] }) });
}
function ResetPasswordView() {
  return /* @__PURE__ */ jsx(ForgetPasswordLayout, { children: /* @__PURE__ */ jsx(ResetPasswordForm, {}) });
}
function ResetPasswordPage() {
  return /* @__PURE__ */ jsx(ResetPasswordView, {});
}
export {
  ResetPasswordPage as component
};
