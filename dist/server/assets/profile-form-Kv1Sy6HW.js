import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { XIcon, LockIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { P as PhoneInput, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, f as SelectItem } from "./select-CfgWoe1T.js";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, S as Spinner } from "./field-CcmYbgZh.js";
import { I as Input } from "./input-DokJ73Yy.js";
import { C as CONSTITUTION_OF_BUSINESS_VALUES, U as USER_TYPE_VALUES } from "./user-types-DQBxjyNb.js";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { u as updateProfileSchema } from "./profile-schema-CGuN1h7-.js";
import { c as createServerFn } from "../server.js";
import { Dialog as Dialog$1 } from "radix-ui";
import { useNavigate } from "@tanstack/react-router";
import { P as PasswordInput } from "./password-input-CeIDaVYP.js";
import { r as resetPasswordSchema } from "./reset-password-schema-FFnudqMF.js";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog$1.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      Dialog$1.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            Dialog$1.Close,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const updateProfileFn = createServerFn({
  method: "POST"
}).inputValidator((data) => updateProfileSchema.parse(data)).handler(createSsrRpc("ec1437b8ae4bfbced3278d2ef71546d53d8230a2916e166670e54dc943097e1a"));
const resetProfilePasswordFn = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(createSsrRpc("acb412f615e5d4850877d8658d06340c5093eec8fe1dc087911f3ea89b53c47e"));
function ResetPasswordForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    }
  });
  const mutation = useMutation({
    mutationFn: (input) => resetProfilePasswordFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully");
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      );
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4", children: [
      /* @__PURE__ */ jsx(
        Controller,
        {
          name: "current_password",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Current Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                autoComplete: "current-password",
                placeholder: "••••••••",
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
          name: "new_password",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "New Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                autoComplete: "new-password",
                placeholder: "••••••••",
                showStrengthIndicator: true,
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
          name: "confirm_password",
          control: form.control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Confirm New Password" }),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                ...field,
                id: field.name,
                autoComplete: "new-password",
                placeholder: "••••••••",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        className: "w-full sm:w-auto",
        disabled: mutation.isPending,
        children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Update Password"
      }
    ) })
  ] });
}
function ResetPasswordDialog({
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[95vw] sm:max-w-[425px]", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Change Password" }) }),
    /* @__PURE__ */ jsx(ResetPasswordForm, {})
  ] }) });
}
function ProfileForm({ initialData, onSuccess }) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData
  });
  const mutation = useMutation({
    mutationFn: (input) => updateProfileFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "full_name",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "Full Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    placeholder: "e.g. John Doe",
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
              name: "email",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "Email ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    type: "email",
                    "aria-invalid": fieldState.invalid,
                    disabled: true,
                    className: "cursor-not-allowed bg-muted opacity-60"
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsx(
          Controller,
          {
            name: "phone_number",
            control: form.control,
            render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
              /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                "Phone ",
                /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                PhoneInput,
                {
                  ...field,
                  id: field.name,
                  "aria-invalid": fieldState.invalid,
                  defaultCountry: "IN",
                  international: true,
                  required: true
                }
              ),
              fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "gstin",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "GSTIN ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
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
              name: "business_name",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "Business Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    required: true
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "constitution_of_business",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "Constitution of Business",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    onValueChange: field.onChange,
                    defaultValue: field.value,
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: field.name,
                          "aria-invalid": fieldState.invalid,
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select..." })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: CONSTITUTION_OF_BUSINESS_VALUES.map((val) => /* @__PURE__ */ jsx(SelectItem, { value: val, children: val }, val)) })
                    ]
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "state_or_jurisdiction",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "State / Jurisdiction",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    required: true
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "user_type",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "User Type ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    onValueChange: field.onChange,
                    defaultValue: field.value,
                    children: [
                      /* @__PURE__ */ jsx(
                        SelectTrigger,
                        {
                          id: field.name,
                          "aria-invalid": fieldState.invalid,
                          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select..." })
                        }
                      ),
                      /* @__PURE__ */ jsx(SelectContent, { children: USER_TYPE_VALUES.map((val) => /* @__PURE__ */ jsx(SelectItem, { value: val, children: val }, val)) })
                    ]
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "organization_name",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
                  "Organization Name",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    required: true
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "designation",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Designation" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    value: field.value || ""
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "professional_registration_number",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Professional Registration Number" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    value: field.value || ""
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: /* @__PURE__ */ jsx(
          Controller,
          {
            name: "address",
            control: form.control,
            render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
              /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Address" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  ...field,
                  id: field.name,
                  "aria-invalid": fieldState.invalid,
                  value: field.value || ""
                }
              ),
              fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "pincode",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Pincode" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    value: field.value || ""
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            Controller,
            {
              name: "alternate_email_or_phone",
              control: form.control,
              render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Alternate Email or Phone" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    ...field,
                    id: field.name,
                    "aria-invalid": fieldState.invalid,
                    value: field.value || ""
                  }
                ),
                fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            type: "button",
            className: "w-full sm:w-auto",
            onClick: () => setPasswordDialogOpen(true),
            children: [
              /* @__PURE__ */ jsx(LockIcon, { className: "h-4 w-4" }),
              " Change Password"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full sm:w-[150px]",
            disabled: mutation.isPending,
            children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Update Profile"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ResetPasswordDialog,
      {
        open: passwordDialogOpen,
        onOpenChange: setPasswordDialogOpen
      }
    )
  ] });
}
export {
  Dialog as D,
  ProfileForm as P,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c
};
