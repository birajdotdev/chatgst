"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";

const steps: Array<{ step: number; title: string }> = [
  {
    step: 1,
    title: "Personal",
  },
  {
    step: 2,
    title: "Professional",
  },
  {
    step: 3,
    title: "Preview",
  },
];

export function SignUpView() {
  return (
    <div className="w-full max-w-sm md:max-w-5xl">
      <Card className="p-0">
        <CardHeader className="h-fit border-b px-12 !py-4">
          <CardTitle className="text-xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent className="px-12">
          <div className="space-y-8 text-center">
            <Stepper defaultValue={1}>
              {steps.map(({ step, title }) => (
                <StepperItem
                  key={step}
                  step={step}
                  className="not-last:flex-1 max-md:items-start"
                >
                  <div className="flex items-center gap-2 max-md:flex-col">
                    <StepperIndicator className="size-10 text-lg" />
                    <div className="text-center md:text-left">
                      <StepperTitle className="text-lg text-muted-foreground transition-colors duration-200 group-data-[state=active]/step:font-semibold group-data-[state=active]/step:text-primary">
                        {title}
                      </StepperTitle>
                    </div>
                  </div>
                  {step < steps.length && (
                    <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
