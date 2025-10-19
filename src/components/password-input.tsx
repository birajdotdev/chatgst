"use client";

import React, { useMemo, useState } from "react";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  checkPasswordStrength,
  getPasswordStrengthScore,
} from "@/lib/password-requirements";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, "type"> {
  /**
   * Whether the password should be visible by default
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * Callback fired when the password visibility changes
   * @param visible - The new visibility state
   */
  onVisibilityChange?: (visible: boolean) => void;
  /**
   * Whether to show password strength indicator
   * @default false
   */
  showStrength?: boolean;
  /**
   * Callback fired when password strength changes
   * @param strength - The strength score (0-4)
   */
  onStrengthChange?: (strength: number) => void;
}

const getStrengthColor = (score: number) => {
  if (score === 0) return "bg-border";
  if (score <= 2) return "bg-red-500";
  if (score === 3) return "bg-orange-500";
  if (score === 4) return "bg-amber-500";
  return "bg-emerald-500";
};

const getStrengthText = (score: number) => {
  if (score === 0) return "Enter a password";
  if (score <= 2) return "Weak password";
  if (score <= 3) return "Medium password";
  if (score === 4) return "Good password";
  return "Strong password";
};

export function PasswordInput({
  defaultVisible = false,
  onVisibilityChange,
  showStrength = false,
  onStrengthChange,
  value,
  onChange,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(defaultVisible);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newValue = !prev;
      onVisibilityChange?.(newValue);
      return newValue;
    });
  };

  const password = (value as string) || "";

  const strength = useMemo(() => checkPasswordStrength(password), [password]);

  const strengthScore = useMemo(() => {
    const score = getPasswordStrengthScore(password);
    onStrengthChange?.(score);
    return score;
  }, [password, onStrengthChange]);

  return (
    <div className="space-y-2">
      <InputGroup>
        <InputGroupInput
          {...props}
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-xs"
            onClick={togglePasswordVisibility}
            className="rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {showStrength && password && (
        <>
          {/* Password strength indicator */}
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={5}
            aria-label="Password strength"
          >
            <div
              className={cn(
                "h-full transition-all duration-500 ease-out",
                getStrengthColor(strengthScore)
              )}
              style={{ width: `${(strengthScore / 5) * 100}%` }}
            />
          </div>

          {/* Password strength description */}
          <p className="text-sm font-medium text-foreground">
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={cn(
                    "text-xs",
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  )}
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
