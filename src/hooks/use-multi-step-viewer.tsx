"use client";

import type { JSX } from "react";
import { type ReactNode, createContext, useContext, useState } from "react";

export interface Stepfields<TFieldNames extends string = string> {
  fields: TFieldNames[];
  component: JSX.Element;
}

export interface UseMultiFormStepsReturn<TFieldNames extends string = string> {
  steps: Stepfields<TFieldNames>[];
  currentStepIndex: number;
  currentStepData: Stepfields<TFieldNames>;
  progress: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToNext: () => Promise<boolean>;
  goToPrevious: () => void;
  goToFirstStep: () => void;
  goToStep: (stepNumber: number) => void;
  setSteps: (newSteps: Stepfields<TFieldNames>[]) => void;
}

// Context type
type MultiStepFormContextType<TFieldNames extends string = string> =
  UseMultiFormStepsReturn<TFieldNames>;

// Create context
const MultiStepFormContext =
  createContext<MultiStepFormContextType<string> | null>(null);

// Provider props
interface MultiStepFormProviderProps<TFieldNames extends string = string> {
  children: ReactNode;
  stepsFields: Stepfields<TFieldNames>[];
  onStepValidation?: (
    step: Stepfields<TFieldNames>
  ) => Promise<boolean> | boolean;
}

// Provider component
export function MultiStepFormProvider<TFieldNames extends string = string>({
  children,
  stepsFields,
  onStepValidation,
}: MultiStepFormProviderProps<TFieldNames>) {
  const [steps, setStepsState] =
    useState<Stepfields<TFieldNames>[]>(stepsFields);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const goToNext = async () => {
    const currentStepData = steps[currentStepIndex - 1];

    if (onStepValidation) {
      const isValid = await onStepValidation(currentStepData);
      if (!isValid) return false;
    }

    if (currentStepIndex < steps.length) {
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

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= steps.length) {
      setCurrentStepIndex(stepNumber);
    }
  };

  const setSteps = (newSteps: Stepfields<TFieldNames>[]) => {
    setStepsState(newSteps);
    // Reset to first step if current step is out of bounds
    if (currentStepIndex > newSteps.length) {
      setCurrentStepIndex(1);
    }
  };

  const value: MultiStepFormContextType<TFieldNames> = {
    steps,
    currentStepIndex: currentStepIndex,
    currentStepData: steps[currentStepIndex - 1],
    progress: (currentStepIndex / steps.length) * 100,
    isFirstStep: currentStepIndex === 1,
    isLastStep: currentStepIndex === steps.length,
    goToNext,
    goToPrevious,
    goToFirstStep,
    goToStep,
    setSteps,
  };

  return (
    <MultiStepFormContext.Provider
      value={value as unknown as MultiStepFormContextType<string>}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
}

// Hook to consume context
export function useMultiStepForm<
  TFieldNames extends string = string,
>(): UseMultiFormStepsReturn<TFieldNames> {
  const context = useContext(MultiStepFormContext);

  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }

  return context as unknown as UseMultiFormStepsReturn<TFieldNames>;
}
