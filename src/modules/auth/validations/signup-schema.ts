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

export const signupSchema = z
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
    ip_address_device_info: optionalString(),
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

export const personalStepSchema = signupSchema
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

export const gstStepSchema = signupSchema.pick({
  gstin: true,
  business_name: true,
  constitution_of_business: true,
  state_or_jurisdiction: true,
});

export const professionalStepSchema = signupSchema.pick({
  user_type: true,
  organization_name: true,
  designation: true,
  professional_registration_number: true,
});

export const contactStepSchema = signupSchema.pick({
  address: true,
  pincode: true,
  alternate_email_or_phone: true,
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Form types (what React Hook Form uses)
export type SignupSchema = z.infer<typeof signupSchema>;
export type PersonalStepSchema = z.infer<typeof personalStepSchema>;
export type GstStepSchema = z.infer<typeof gstStepSchema>;
export type ProfessionalStepSchema = z.infer<typeof professionalStepSchema>;
export type ContactStepSchema = z.infer<typeof contactStepSchema>;
