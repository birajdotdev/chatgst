/**
 * Single source of truth for password requirements
 * Used by both the UI strength indicator and Zod schema validation
 */

export const PASSWORD_REQUIREMENTS = [
  {
    id: "minLength",
    regex: /.{8,}/,
    text: "At least 8 characters",
    message: "Password must be at least 8 characters long",
  },
  {
    id: "number",
    regex: /[0-9]/,
    text: "At least 1 number",
    message: "Password must contain at least one number",
  },
  {
    id: "lowercase",
    regex: /[a-z]/,
    text: "At least 1 lowercase letter",
    message: "Password must contain at least one lowercase letter",
  },
  {
    id: "uppercase",
    regex: /[A-Z]/,
    text: "At least 1 uppercase letter",
    message: "Password must contain at least one uppercase letter",
  },
  {
    id: "special",
    regex: /[@$!%*?&#]/,
    text: "At least 1 special character (@$!%*?&#)",
    message: "Password must contain at least one special character (@$!%*?&#)",
  },
] as const;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

/**
 * Check which password requirements are met
 */
export function checkPasswordStrength(password: string) {
  return PASSWORD_REQUIREMENTS.map((req) => ({
    id: req.id,
    met: req.regex.test(password),
    text: req.text,
  }));
}

/**
 * Get password strength score (0-5)
 */
export function getPasswordStrengthScore(password: string): number {
  return checkPasswordStrength(password).filter((req) => req.met).length;
}

/**
 * Validate password meets all requirements
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      errors: [
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      ],
    };
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      isValid: false,
      errors: [
        `Password must be no more than ${PASSWORD_MAX_LENGTH} characters long`,
      ],
    };
  }

  const unmetRequirements = PASSWORD_REQUIREMENTS.filter(
    (req) => !req.regex.test(password)
  );

  if (unmetRequirements.length > 0) {
    return {
      isValid: false,
      errors: unmetRequirements.map((req) => req.message),
    };
  }

  return { isValid: true, errors: [] };
}
