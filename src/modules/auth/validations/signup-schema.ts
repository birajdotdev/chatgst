import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import {
  emailField,
  optionalBoolean,
  optionalString,
  passwordField,
  requiredString,
} from "@/modules/auth/validations/helpers";

const baseSignupSchema = z.object({
  first_name: requiredString(),
  middle_name: z.string().trim().optional(),
  last_name: requiredString(),
  email: emailField(),
  password: passwordField(),
  confirm_password: passwordField(),
  phone_number: requiredString().refine((val) => isValidPhoneNumber(val), {
    message: "Please enter a valid phone number",
  }),
  gstin: requiredString(),
  business_name: requiredString(),
  constitution_of_business: requiredString(),
  state_or_jurisdiction: requiredString(),
  user_type: requiredString(),
  organization_name: requiredString(),
  designation: optionalString(),
  professional_registration_number: optionalString(),
  address: optionalString(),
  pincode: optionalString(),
  alternate_email_or_phone: optionalString(),
  terms_and_privacy_policy: optionalBoolean(),
  receive_updates_or_newsletter: optionalBoolean(),
});

export const personalSchema = baseSignupSchema
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
  });

export const gstSpecificSchema = baseSignupSchema.pick({
  gstin: true,
  business_name: true,
  constitution_of_business: true,
  state_or_jurisdiction: true,
});

export const professionalSchema = baseSignupSchema.pick({
  user_type: true,
  organization_name: true,
  designation: true,
  professional_registration_number: true,
});

export const contactSchema = baseSignupSchema.pick({
  address: true,
  pincode: true,
  alternate_email_or_phone: true,
});

// Main signup schema - needs own refine since base refine is lost after pick/transform
export const signupSchema = baseSignupSchema
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
  .transform((data) => {
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

export type SignupInput = z.input<typeof signupSchema>;
export type SignupOutput = z.output<typeof signupSchema>;
