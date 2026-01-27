import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { U as USER_TYPE_VALUES, C as CONSTITUTION_OF_BUSINESS_VALUES } from "./user-types-DQBxjyNb.js";
import { o as optionalBoolean, a as optionalString, r as requiredString, s as selectField } from "./helpers-CIAyAvNc.js";
const updateProfileSchema = z.object({
  full_name: requiredString(),
  email: requiredString().email(),
  // Will be disabled in UI, but kept for schema structure if needed, or I might exclude it from payload
  phone_number: requiredString().refine((val) => isValidPhoneNumber(val), {
    error: "Please enter a valid phone number"
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
  receive_updates_or_newsletter: optionalBoolean()
}).refine(
  (data) => !data.alternate_email_or_phone || data.alternate_email_or_phone !== data.email,
  {
    message: "Alternate email/phone cannot be same as primary email",
    path: ["alternate_email_or_phone"]
  }
);
export {
  updateProfileSchema as u
};
