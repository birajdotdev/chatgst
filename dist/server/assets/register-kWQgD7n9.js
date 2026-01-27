import { jsx, jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Controller, useWatch, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { B as Button } from "./button-D5vTpyVN.js";
import { S as Stepper, a as StepperItem, b as StepperTrigger, c as StepperIndicator, d as StepperTitle, f as StepperSeparator, C as Checkbox } from "./checkbox-BP7MQL0w.js";
import { useState, createContext, useContext } from "react";
import { a as Card, b as CardHeader, c as CardContent, C as CardFooter } from "./card-BEA0qkFW.js";
import { F as FieldGroup, a as Field, b as FieldLabel, c as FieldError, f as FieldDescription, S as Spinner } from "./field-CcmYbgZh.js";
import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { s as signupSchema } from "./signup-schema-Ve76AbRC.js";
import { c as createServerFn } from "../server.js";
import { I as Input } from "./input-DokJ73Yy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, f as SelectItem, P as PhoneInput } from "./select-CfgWoe1T.js";
import { a as CONSTITUTION_OF_BUSINESS_OPTIONS, b as USER_TYPE_OPTIONS } from "./user-types-DQBxjyNb.js";
import { P as PasswordInput } from "./password-input-CeIDaVYP.js";
import { S as ScrollArea } from "./scroll-area-Bvwd_GHq.js";
import "class-variance-authority";
import "radix-ui";
import "clsx";
import "tailwind-merge";
import "libphonenumber-js";
import "zod";
import "./helpers-CIAyAvNc.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "react-phone-number-input";
import "react-phone-number-input/flags";
import "cmdk";
import "./input-group-HiwdIxtQ.js";
import "@base-ui/react/scroll-area";
const MultiStepFormContext = createContext(null);
function MultiStepFormProvider({
  children,
  stepsFields,
  onStepValidation
}) {
  const [steps2, setStepsState] = useState(stepsFields);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const goToNext = async () => {
    const currentStepData = steps2[currentStepIndex - 1];
    if (onStepValidation) {
      const isValid = await onStepValidation(currentStepData);
      if (!isValid) return false;
    }
    if (currentStepIndex < steps2.length) {
      setCurrentStepIndex((prev) => prev + 1);
      return true;
    }
    return false;
  };
  const goToPrevious = () => {
    if (currentStepIndex > 1) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };
  const goToFirstStep = () => {
    setCurrentStepIndex(1);
  };
  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= steps2.length) {
      setCurrentStepIndex(stepNumber);
    }
  };
  const setSteps = (newSteps) => {
    setStepsState(newSteps);
    if (currentStepIndex > newSteps.length) {
      setCurrentStepIndex(1);
    }
  };
  const value = {
    steps: steps2,
    currentStepIndex,
    currentStepData: steps2[currentStepIndex - 1],
    progress: currentStepIndex / steps2.length * 100,
    isFirstStep: currentStepIndex === 1,
    isLastStep: currentStepIndex === steps2.length,
    goToNext,
    goToPrevious,
    goToFirstStep,
    goToStep,
    setSteps
  };
  return /* @__PURE__ */ jsx(
    MultiStepFormContext.Provider,
    {
      value,
      children
    }
  );
}
function useMultiStepForm() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }
  return context;
}
const NextButton = (props) => {
  const { isLastStep, goToNext } = useMultiStepForm();
  if (isLastStep) return null;
  return /* @__PURE__ */ jsx(Button, { size: "sm", type: "button", onClick: () => goToNext(), ...props });
};
const PreviousButton = (props) => {
  const { isFirstStep, goToPrevious } = useMultiStepForm();
  if (isFirstStep) return null;
  return /* @__PURE__ */ jsx(
    Button,
    {
      size: "sm",
      type: "button",
      variant: "outline",
      onClick: () => goToPrevious(),
      ...props
    }
  );
};
const SubmitButton = (props) => {
  const { isLastStep } = useMultiStepForm();
  if (!isLastStep) return null;
  return /* @__PURE__ */ jsx(Button, { size: "sm", type: "button", ...props });
};
const FormHeader = (props) => {
  const { currentStepIndex } = useMultiStepForm();
  const { steps: stepTitles, ...divProps } = props;
  return /* @__PURE__ */ jsx("div", { className: "space-y-8 text-center", ...divProps, children: /* @__PURE__ */ jsx(Stepper, { defaultValue: 1, value: currentStepIndex, children: stepTitles.map(({ step, title }) => /* @__PURE__ */ jsxs(
    StepperItem,
    {
      step,
      className: "relative flex-1 flex-col!",
      children: [
        /* @__PURE__ */ jsxs(StepperTrigger, { className: "flex-col gap-3 rounded", children: [
          /* @__PURE__ */ jsx(StepperIndicator, { className: "size-7" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0.5 px-2", children: /* @__PURE__ */ jsx(StepperTitle, { className: "text-muted-foreground group-data-[state=active]/step:text-primary", children: title }) })
        ] }),
        step < stepTitles.length && /* @__PURE__ */ jsx(StepperSeparator, { className: "absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" })
      ]
    },
    step
  )) }) });
};
const StepFields = (props) => {
  const { currentStepIndex, steps: steps2 } = useMultiStepForm();
  const currentFormStep = steps2[currentStepIndex - 1];
  if (!currentFormStep || currentStepIndex < 1 || currentStepIndex > steps2.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 15 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -15 },
      transition: { duration: 0.4, type: "spring" },
      ...props,
      children: currentFormStep.component
    },
    currentStepIndex
  ) });
};
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((data) => signupSchema.parse(data)).handler(createSsrRpc("93ae0e98c8004f73756f815967f3548ecb2d343b5c510adae0c0046c7503fc9f"));
function ContactStepFields({ control }) {
  return /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4 px-12", children: [
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "address",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. Baneshwor, Kathmandu, Nepal"
            }
          ),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "pincode",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Pincode" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g: 44600"
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Alternate Email/Phone" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. example@gmail.com"
            }
          ),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    )
  ] });
}
function GstStepFields({ control }) {
  return /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4 px-12", children: [
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "gstin",
        control,
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
              placeholder: "e.g. 22AAAAA0000A1Z5",
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Business/Trade Name ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. Achme Corp",
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
        name: "constitution_of_business",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Constitution of Business",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              name: field.name,
              value: field.value,
              onValueChange: field.onChange,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: field.name, "aria-invalid": fieldState.invalid, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "- Select -" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: CONSTITUTION_OF_BUSINESS_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "State/Jurisdiction",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" }),
            " (for GST zone-based feature)"
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. Maharashtra",
              required: true
            }
          ),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    )
  ] });
}
function PersonalStepFields({ control }) {
  return /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4 px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(
        Controller,
        {
          name: "first_name",
          control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
              "First Name ",
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ...field,
                id: field.name,
                "aria-invalid": fieldState.invalid,
                placeholder: "e.g. John",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(
        Controller,
        {
          name: "middle_name",
          control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Middle Name" }),
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
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(
        Controller,
        {
          name: "last_name",
          control,
          render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
            /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
              "Last Name ",
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                ...field,
                id: field.name,
                "aria-invalid": fieldState.invalid,
                placeholder: "e.g. Doe",
                required: true
              }
            ),
            fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "email",
        control,
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
              placeholder: "e.g. example@gmail.com",
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
        name: "phone_number",
        control,
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
    ),
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "password",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Password ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            PasswordInput,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "********",
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Confirm Password ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            PasswordInput,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "********",
              required: true
            }
          ),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    )
  ] });
}
function PreviewStepFields({ control }) {
  const formValues = useWatch({ control });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "min-h-[370px] px-12", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-80", children: /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-sm font-medium text-primary", children: "Personal Information" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Full Name" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: [
              formValues.first_name,
              formValues.middle_name,
              formValues.last_name
            ].filter(Boolean).join(" ") || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.email || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Phone Number" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.phone_number || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-sm font-medium text-primary", children: "GST Specific" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-y-3.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "GSTIN" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.gstin || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Business/Trade Name" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.business_name || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Constitution of Business" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm capitalize", children: formValues.constitution_of_business || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "State / Jurisdiction" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm capitalize", children: formValues.state_or_jurisdiction || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-sm font-medium text-primary", children: "Professional" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-y-3.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "User Type" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm capitalize", children: formValues.user_type || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Firm Name / Organization" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.organization_name || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Designation / Role" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.designation || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Professional Registration No." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.professional_registration_number || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-sm font-medium text-primary", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-y-3.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm capitalize", children: formValues.address || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Pincode" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.pincode || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs text-muted-foreground", children: "Alternate Email/Phone" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: formValues.alternate_email_or_phone || "N/A" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs(FieldGroup, { className: "-mb-6 block space-y-2 border-t px-12 py-3!", children: [
      /* @__PURE__ */ jsx(FieldLabel, { className: "text-xs text-muted-foreground", children: "Terms & Conditions" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
        /* @__PURE__ */ jsx(
          Controller,
          {
            name: "terms_and_privacy_policy",
            control,
            render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { orientation: "horizontal", "data-invalid": fieldState.invalid, children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: field.name,
                  name: field.name,
                  "aria-invalid": fieldState.invalid,
                  checked: field.value,
                  onCheckedChange: field.onChange
                }
              ),
              /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "I agree to Terms and Privacy Policy" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Controller,
          {
            name: "receive_updates_or_newsletter",
            control,
            render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { orientation: "horizontal", "data-invalid": fieldState.invalid, children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: field.name,
                  name: field.name,
                  "aria-invalid": fieldState.invalid,
                  checked: field.value,
                  onCheckedChange: field.onChange
                }
              ),
              /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "I consent to receive updates/newsletters" })
            ] })
          }
        )
      ] })
    ] })
  ] });
}
function ProfessionalStepFields({
  control
}) {
  return /* @__PURE__ */ jsxs(FieldGroup, { className: "gap-4 px-12", children: [
    /* @__PURE__ */ jsx(
      Controller,
      {
        name: "user_type",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "User Type",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              name: field.name,
              value: field.value,
              onValueChange: field.onChange,
              required: true,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: field.name, "aria-invalid": fieldState.invalid, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "e.g. Consultant" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: USER_TYPE_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Firm Name / Organization",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. Achme Corp",
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
        name: "designation",
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Designation" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. Lawyer",
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
        control,
        render: ({ field, fieldState }) => /* @__PURE__ */ jsxs(Field, { "data-invalid": fieldState.invalid, children: [
          /* @__PURE__ */ jsxs(FieldLabel, { htmlFor: field.name, children: [
            "Professional Registration Number",
            /* @__PURE__ */ jsx(FieldDescription, { className: "ml-1", children: "(for CA/Advocate users)" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              id: field.name,
              "aria-invalid": fieldState.invalid,
              placeholder: "e.g. CA"
            }
          ),
          fieldState.invalid && /* @__PURE__ */ jsx(FieldError, { errors: [fieldState.error] })
        ] })
      }
    )
  ] });
}
const steps = [
  { step: 1, title: "Personal" },
  { step: 2, title: "GST Specific" },
  { step: 3, title: "Professional" },
  { step: 4, title: "Contact" },
  { step: 5, title: "Preview" }
];
function SignupForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      gstin: "",
      business_name: "",
      constitution_of_business: void 0,
      state_or_jurisdiction: "",
      user_type: void 0,
      organization_name: ""
    }
  });
  const mutation = useMutation({
    mutationFn: (input) => signupFn({ data: input }),
    onSuccess: (data) => {
      const searchParams = new URLSearchParams({ email: data.email });
      router.navigate({ to: `/register/verify?${searchParams.toString()}` });
      toast.success(data.message || "Verification code sent!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  const stepsFields = [
    {
      fields: [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
        "password",
        "confirm_password"
      ],
      component: /* @__PURE__ */ jsx(PersonalStepFields, { control: form.control })
    },
    {
      fields: [
        "gstin",
        "business_name",
        "constitution_of_business",
        "state_or_jurisdiction"
      ],
      component: /* @__PURE__ */ jsx(GstStepFields, { control: form.control })
    },
    {
      fields: [
        "user_type",
        "organization_name",
        "designation",
        "professional_registration_number"
      ],
      component: /* @__PURE__ */ jsx(ProfessionalStepFields, { control: form.control })
    },
    {
      fields: ["address", "pincode", "alternate_email_or_phone"],
      component: /* @__PURE__ */ jsx(ContactStepFields, { control: form.control })
    },
    {
      fields: ["terms_and_privacy_policy", "receive_updates_or_newsletter"],
      component: /* @__PURE__ */ jsx(PreviewStepFields, { control: form.control })
    }
  ];
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsx(
    MultiStepFormProvider,
    {
      stepsFields,
      onStepValidation: async (step) => {
        const isValid = await form.trigger(step.fields);
        return isValid;
      },
      children: /* @__PURE__ */ jsxs(Card, { className: "min-h-[620px] p-0 pt-7", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-12", children: /* @__PURE__ */ jsx(FormHeader, { steps }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "flex-1 p-0", children: /* @__PURE__ */ jsx(StepFields, {}) }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "border-t px-12 py-3!", children: [
          /* @__PURE__ */ jsxs(PreviousButton, { className: "group mr-auto w-[120px]", children: [
            /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "transition-transform group-hover:-translate-x-1" }),
            "Previous"
          ] }),
          /* @__PURE__ */ jsxs(NextButton, { className: "group ml-auto w-[120px]", children: [
            "Next",
            /* @__PURE__ */ jsx(ChevronRightIcon, { className: "transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsx(
            SubmitButton,
            {
              className: "w-[120px]",
              type: "submit",
              disabled: mutation.isPending,
              children: mutation.isPending ? /* @__PURE__ */ jsx(Spinner, {}) : "Submit"
            }
          )
        ] })
      ] })
    }
  ) });
}
function SignUpView() {
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm md:max-w-4xl", children: /* @__PURE__ */ jsx(SignupForm, {}) });
}
function RegisterPage() {
  return /* @__PURE__ */ jsx(SignUpView, {});
}
export {
  RegisterPage as component
};
