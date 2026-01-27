import { jsx, jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "@tanstack/react-router";
import { Check, User } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { L as Logo } from "./logo-DoHeR5o3.js";
import { P as PasswordInput } from "./password-input-CeIDaVYP.js";
import { B as Button, c as cn } from "./button-D5vTpyVN.js";
import { a as Card, c as CardContent } from "./card-BEA0qkFW.js";
import { F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import { I as InputGroup, d as InputGroupInput, a as InputGroupAddon } from "./input-group-HiwdIxtQ.js";
import { z } from "zod";
import { r as requiredString } from "./helpers-CIAyAvNc.js";
import "react";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "./input-DokJ73Yy.js";
async function login(input) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}
const loginSchema = z.object({
  email: requiredString(),
  password: requiredString()
});
z.object({
  refresh_token: requiredString()
});
const listItems = [
  "Simplify legal work with the power of AI.",
  "Accelerate case management with smart automation.",
  "Enhance accuracy through intelligent insights."
];
function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      navigate({ to: "/chat" });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  return /* @__PURE__ */ jsx(Card, { className: cn("overflow-hidden p-0", className), ...props, children: /* @__PURE__ */ jsxs(CardContent, { className: "grid p-0 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative m-2 hidden rounded bg-primary p-6 text-white md:block", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/law.png",
          alt: "Law Symbol",
          className: "absolute right-0 -bottom-4 aspect-square opacity-40",
          width: 200,
          height: 200
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-20", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-10 max-w-xs text-2xl font-semibold", children: "Empowering Lawyers with the Speed of AI" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: listItems.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Check, { className: "size-4" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("form", { className: "p-6 md:p-8", onSubmit, children: /* @__PURE__ */ jsxs(FieldGroup, { className: "m-0 gap-0 md:mt-10 md:mb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col", children: [
        /* @__PURE__ */ jsx(Logo, { variant: "icon", className: "mb-5 size-10" }),
        /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm leading-0", children: "Welcome to" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-primary", children: "ChatGST" })
      ] }),
      /* @__PURE__ */ jsx(
        Controller,
        {
          name: "email",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { className: "mb-4", "data-invalid": fieldState.invalid, children: [
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
              /* @__PURE__ */ jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx(User, {}) })
            ] }),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        Controller,
        {
          name: "password",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { className: "mb-4", "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                "aria-invalid": fieldState.invalid,
                placeholder: "Enter your password",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex items-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/forgot-password",
          className: "ml-auto text-sm text-primary underline-offset-2 hover:underline",
          children: "Forgot your password?"
        }
      ) }),
      /* @__PURE__ */ jsxs(Field, { children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: mutation.isPending, children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Login" }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Sign Up" }) })
      ] })
    ] }) })
  ] }) });
}
function SignInView() {
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm md:max-w-4xl", children: /* @__PURE__ */ jsx(LoginForm, {}) });
}
function LoginPage() {
  return /* @__PURE__ */ jsx(SignInView, {});
}
export {
  LoginPage as component
};
