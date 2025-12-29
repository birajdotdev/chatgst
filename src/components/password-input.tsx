"use client";

import * as React from "react";

import { Check, Eye, EyeOff, X } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  className?: string;
  showStrengthIndicator?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface PasswordRequirement {
  met: boolean;
  text: string;
}

function PasswordInput({
  className,
  showStrengthIndicator = false,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const id = React.useId();

  const type = visible ? "text" : "password";

  // Use controlled value if provided, otherwise use internal state
  const password =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledOnChange) {
      controlledOnChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const checkStrength = (pass: string): PasswordRequirement[] => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        text: "At least 1 special character",
      },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = React.useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div className={cn("w-full", className)}>
      <InputGroup>
        <InputGroupInput
          {...props}
          type={type}
          value={password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={props["aria-label"] ?? props.placeholder ?? "Password"}
          aria-describedby={
            showStrengthIndicator ? `${id}-description` : undefined
          }
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
            size="icon-xs"
            className="bg-transparent!"
          >
            {visible ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {showStrengthIndicator && isFocused && (
        <>
          {/* Password strength indicator */}
          <div
            className="mt-3 mb-4 h-1.5 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            />
          </div>

          {/* Password strength description */}
          <p
            id={`${id}-description`}
            className="mb-2 text-sm font-medium text-foreground"
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <X
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export { PasswordInput };
