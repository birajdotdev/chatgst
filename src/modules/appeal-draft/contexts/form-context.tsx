"use client";

import { createContext, useContext, useState } from "react";

interface FormContextValue {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  isDirty: boolean;
  setIsDirty: (value: boolean) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <FormContext.Provider
      value={{ isSubmitting, setIsSubmitting, isDirty, setIsDirty }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
}
