import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { CONSTITUTION_OF_BUSINESS_VALUES } from "@/modules/auth/constants/constitution-of-businesses";
import { USER_TYPE_VALUES } from "@/modules/auth/constants/user-types";
import {
  optionalBoolean,
  optionalString,
  requiredString,
  selectField,
} from "@/modules/auth/validations/helpers";

export const updateProfileSchema = z
  .object({
    full_name: requiredString(),
    email: requiredString().email(), // Will be disabled in UI, but kept for schema structure if needed, or I might exclude it from payload
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
  .refine(
    (data) =>
      !data.alternate_email_or_phone ||
      data.alternate_email_or_phone !== data.email,
    {
      message: "Alternate email/phone cannot be same as primary email",
      path: ["alternate_email_or_phone"],
    }
  );

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
