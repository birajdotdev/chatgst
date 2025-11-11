import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { CONSTITUTION_OF_BUSINESS_VALUES } from "@/modules/auth/constants/constitution-of-businesses";
import { USER_TYPE_VALUES } from "@/modules/auth/constants/user-types";
import {
  emailField,
  optionalBoolean,
  optionalString,
  passwordField,
  requiredString,
  selectField,
} from "@/modules/auth/validations/helpers";

// ============================================================================
// BASE FORM SCHEMA - Single source of truth for all form fields
// Used by React Hook Form for UI validation (no transformation)
// ============================================================================

export const signupFormSchema = z
  .object({
    first_name: requiredString(),
    middle_name: optionalString(),
    last_name: requiredString(),
    email: emailField(),
    password: passwordField(),
    confirm_password: requiredString(),
    phone_number: requiredString().refine((val) => isValidPhoneNumber(val), {
      error: "Please enter a valid phone number",
    }),
    gstin: requiredString(),
    business_name: requiredString(),
    constitution_of_business: selectField(CONSTITUTION_OF_BUSINESS_VALUES),
    state_or_jurisdiction: requiredString(),
    user_type: selectField(USER_TYPE_VALUES),
    organization_name: requiredString(),
    designation: optionalString(),
    professional_registration_number: optionalString(),
    address: optionalString(),
    pincode: optionalString(),
    alternate_email_or_phone: optionalString(),
    terms_and_privacy_policy: optionalBoolean(),
    receive_updates_or_newsletter: optionalBoolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
    when(payload) {
      // Run the password match check if both password and confirm_password are valid strings
      return payload.issues.every((iss) => {
        const firstPathEl = iss.path?.[0];
        return firstPathEl !== "password" && firstPathEl !== "confirm_password";
      });
    },
  });

// ============================================================================
// STEP SCHEMAS - Derived from base form schema for multi-step validation
// Each step validates only its relevant fields
// ============================================================================

export const personalStepSchema = signupFormSchema
  .pick({
    first_name: true,
    middle_name: true,
    last_name: true,
    email: true,
    password: true,
    confirm_password: true,
    phone_number: true,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
    when(payload) {
      // Run the password match check if both password and confirm_password are valid strings
      return payload.issues.every((iss) => {
        const firstPathEl = iss.path?.[0];
        return firstPathEl !== "password" && firstPathEl !== "confirm_password";
      });
    },
  });

export const gstStepSchema = signupFormSchema.pick({
  gstin: true,
  business_name: true,
  constitution_of_business: true,
  state_or_jurisdiction: true,
});

export const professionalStepSchema = signupFormSchema.pick({
  user_type: true,
  organization_name: true,
  designation: true,
  professional_registration_number: true,
});

export const contactStepSchema = signupFormSchema.pick({
  address: true,
  pincode: true,
  alternate_email_or_phone: true,
});

// ============================================================================
// ACTION SCHEMA - Used by server action with transformation
// Transforms form data into API payload format (first_name + last_name → full_name)
// Removes confirm_password as it's only needed for UI validation
// ============================================================================

export const signupActionSchema = signupFormSchema.transform((data) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { first_name, middle_name, last_name, confirm_password, ...rest } =
    data;

  // Combine name fields into full_name for API
  const full_name = [first_name, middle_name, last_name]
    .filter(Boolean)
    .join(" ");

  return {
    ...rest,
    full_name,
  };
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Form types (what React Hook Form uses)
export type SignupFormInput = z.infer<typeof signupFormSchema>;
export type PersonalStepInput = z.infer<typeof personalStepSchema>;
export type GstStepInput = z.infer<typeof gstStepSchema>;
export type ProfessionalStepInput = z.infer<typeof professionalStepSchema>;
export type ContactStepInput = z.infer<typeof contactStepSchema>;

// Action types (what the server action receives)
export type SignupActionInput = z.input<typeof signupActionSchema>; // Before transform (= SignupFormInput)
export type SignupActionOutput = z.output<typeof signupActionSchema>; // After transform (has full_name)
