import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

const steps = [
  {
    description: "Document Upload",
    step: 1,
    title: "Upload",
  },
  {
    description: "Extract",
    step: 2,
    title: "Basic Details",
  },
  {
    description: "Issue Selection",
    step: 3,
    title: "Issues",
  },
  {
    description: "Legal Knowledge",
    step: 4,
    title: "References",
  },
  {
    description: "Appeal Generation",
    step: 5,
    title: "Draft",
  },
  {
    description: "Final Review",
    step: 6,
    title: "Review",
  },
];

interface AppealDraftStepperProps {
  step: number;
  className?: string;
}

export function AppealDraftStepper({
  step,
  className,
}: AppealDraftStepperProps) {
  return (
    <div className={cn("space-y-8 text-center", className)}>
      <Stepper defaultValue={1} value={step}>
        {steps.map(({ step, title, description }) => (
          <StepperItem
            className="relative flex-1 flex-col!"
            key={step}
            step={step}
          >
            <StepperTrigger className="flex-col gap-3 rounded">
              <StepperIndicator className="z-10 md:size-9 md:text-sm" />
              <div className="space-y-0.5 px-2">
                <StepperTitle className="text-xs md:text-sm">
                  {title}
                </StepperTitle>
                <StepperDescription className="text-xs max-sm:hidden">
                  {description}
                </StepperDescription>
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none md:top-5" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
