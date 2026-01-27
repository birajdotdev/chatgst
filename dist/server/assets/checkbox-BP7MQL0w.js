import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useContext } from "react";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { Slot, Checkbox as Checkbox$1 } from "radix-ui";
import { c as cn } from "./button-D5vTpyVN.js";
const StepperContext = createContext(
  void 0
);
const StepItemContext = createContext(
  void 0
);
const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};
const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};
function Stepper({
  defaultValue = 0,
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}) {
  const [activeStep, setInternalStep] = React.useState(defaultValue);
  const setActiveStep = React.useCallback(
    (step) => {
      if (value === void 0) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange]
  );
  const currentStep = value ?? activeStep;
  return /* @__PURE__ */ jsx(
    StepperContext.Provider,
    {
      value: {
        activeStep: currentStep,
        setActiveStep,
        orientation
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          "data-slot": "stepper",
          className: cn(
            "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
            className
          ),
          "data-orientation": orientation,
          ...props
        }
      )
    }
  );
}
function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}) {
  const { activeStep } = useStepper();
  const state = completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";
  const isLoading = loading && step === activeStep;
  return /* @__PURE__ */ jsx(
    StepItemContext.Provider,
    {
      value: { step, state, isDisabled: disabled, isLoading },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          "data-slot": "stepper-item",
          className: cn(
            "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
            className
          ),
          "data-state": state,
          ...isLoading ? { "data-loading": true } : {},
          ...props,
          children
        }
      )
    }
  );
}
function StepperTrigger({
  asChild = false,
  className,
  children,
  ...props
}) {
  const { setActiveStep } = useStepper();
  const { step, isDisabled } = useStepItem();
  if (asChild) {
    return /* @__PURE__ */ jsx(
      Slot.Slot,
      {
        "data-slot": "stepper-trigger",
        className,
        onClick: () => !isDisabled && setActiveStep(step),
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-slot": "stepper-trigger",
      className: cn(
        "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className
      ),
      onClick: () => setActiveStep(step),
      disabled: isDisabled,
      ...props,
      children
    }
  );
}
function StepperIndicator({
  asChild = false,
  className,
  children,
  ...props
}) {
  const { state, step, isLoading } = useStepItem();
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "stepper-indicator",
      className: cn(
        "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground",
        className
      ),
      "data-state": state,
      ...props,
      children: asChild ? children : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "transition-all group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0", children: step }),
        /* @__PURE__ */ jsx(
          CheckIcon,
          {
            className: "absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100",
            size: 16,
            "aria-hidden": "true"
          }
        ),
        isLoading && /* @__PURE__ */ jsx("span", { className: "absolute transition-all", children: /* @__PURE__ */ jsx(
          LoaderCircleIcon,
          {
            className: "animate-spin",
            size: 14,
            "aria-hidden": "true"
          }
        ) })
      ] })
    }
  );
}
function StepperTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      "data-slot": "stepper-title",
      className: cn("text-sm font-medium", className),
      ...props
    }
  );
}
function StepperDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "stepper-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function StepperSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "stepper-separator",
      className: cn(
        "m-0.5 bg-muted group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5 group-data-[state=completed]/step:bg-primary",
        className
      ),
      ...props
    }
  );
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Checkbox$1.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Checkbox$1.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
export {
  Checkbox as C,
  Stepper as S,
  StepperItem as a,
  StepperTrigger as b,
  StepperIndicator as c,
  StepperTitle as d,
  StepperDescription as e,
  StepperSeparator as f
};
