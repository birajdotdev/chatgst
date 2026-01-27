import { jsx, jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "@tanstack/react-router";
import { Mail, ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { B as Button } from "./button-D5vTpyVN.js";
import { a as Card, b as CardHeader, d as CardTitle, e as CardDescription, c as CardContent, C as CardFooter } from "./card-BEA0qkFW.js";
import { F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import { I as InputGroup, d as InputGroupInput, a as InputGroupAddon } from "./input-group-HiwdIxtQ.js";
import { f as forgotPasswordFn, F as ForgetPasswordLayout } from "./forget-password-layout-BG6nGBsU.js";
import { f as forgotPasswordSchema } from "./forgot-password-schema-TEY8kxah.js";
import "clsx";
import "./input-otp-k9cfdBTP.js";
import "react";
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
function ForgotPasswordEmailForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });
  const mutation = useMutation({
    mutationFn: (input) => forgotPasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({
        to: "/forgot-password/verify",
        search: { email: form.getValues("email") }
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset code"
      );
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Forgot Password" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your email address and we'll send you a code to reset your password." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(FieldGroup, { children: /* @__PURE__ */ jsx(
      Controller,
      {
        name: "email",
        control: form.control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Email" }),
          /* @__PURE__ */ jsxs(InputGroup, { children: [
            /* @__PURE__ */ jsx(
              InputGroupInput,
              {
                ...field,
                id: field.name,
                type: "email",
                "aria-invalid": fieldState.invalid,
                placeholder: "Enter your email",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx(Mail, { className: "size-4" }) })
          ] }),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: mutation.isPending,
          children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Send Reset Code"
        }
      ),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 size-4" }),
        "Back to Login"
      ] }) })
    ] })
  ] }) });
}
function ForgotPasswordView() {
  return /* @__PURE__ */ jsx(ForgetPasswordLayout, { children: /* @__PURE__ */ jsx(ForgotPasswordEmailForm, {}) });
}
function ForgotPasswordPage() {
  return /* @__PURE__ */ jsx(ForgotPasswordView, {});
}
export {
  ForgotPasswordPage as component
};
