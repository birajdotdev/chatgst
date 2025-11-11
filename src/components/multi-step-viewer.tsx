"use client";

import * as React from "react";

import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, type MotionProps, motion } from "motion/react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useMultiStepForm } from "@/hooks/use-multi-step-viewer";

const NextButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) => {
  const { isLastStep, goToNext } = useMultiStepForm();
  if (isLastStep) return null;
  return (
    <Button size="sm" type="button" onClick={() => goToNext()} {...props} />
  );
};

const PreviousButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) => {
  const { isFirstStep, goToPrevious } = useMultiStepForm();
  if (isFirstStep) return null;
  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => goToPrevious()}
      {...props}
    />
  );
};

const SubmitButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) => {
  const { isLastStep } = useMultiStepForm();
  if (!isLastStep) return null;
  return <Button size="sm" type="button" {...props} />;
};

const ResetButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) => {
  return <Button size="sm" type="button" variant="ghost" {...props} />;
};

const FormHeader = (
  props: React.ComponentProps<"div"> & {
    steps: Array<{ step: number; title: string }>;
  }
) => {
  const { currentStepIndex } = useMultiStepForm();
  const { steps: stepTitles, ...divProps } = props;

  return (
    <div className="space-y-8 text-center" {...divProps}>
      <Stepper defaultValue={1} value={currentStepIndex}>
        {stepTitles.map(({ step, title }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 flex-col!"
          >
            <StepperTrigger className="flex-col gap-3 rounded">
              <StepperIndicator className="size-7" />
              <div className="space-y-0.5 px-2">
                <StepperTitle className="text-muted-foreground group-data-[state=active]/step:text-primary">
                  {title}
                </StepperTitle>
              </div>
            </StepperTrigger>
            {step < stepTitles.length && (
              <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
};
const FormFooter = (props: React.ComponentProps<"div">) => {
  return (
    <div
      className="flex w-full items-center justify-end gap-3 pt-3"
      {...props}
    />
  );
};

const StepFields = (props: React.ComponentProps<"div"> & MotionProps) => {
  const { currentStepIndex, steps } = useMultiStepForm();
  const currentFormStep = steps[currentStepIndex - 1];
  if (
    !currentFormStep ||
    currentStepIndex < 1 ||
    currentStepIndex > steps.length
  ) {
    return null;
  }
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.4, type: "spring" }}
        {...props}
      >
        {currentFormStep.component}
      </motion.div>
    </AnimatePresence>
  );
};

function MultiStepFormContent(props: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-2 pt-3" {...props} />;
}

export {
  FormFooter,
  FormHeader,
  MultiStepFormContent,
  // Form Actions
  NextButton,
  PreviousButton,
  ResetButton,
  StepFields,
  SubmitButton,
};
