import { z } from "zod";
const requiredString = () => z.string().check(z.minLength(1, { error: "This field is required" })).check(z.trim());
const optionalString = () => z.string().check(z.trim()).optional();
const optionalBoolean = () => z.boolean().optional();
const emailField = () => z.string().check(z.minLength(1, { error: "This field is required" })).check(z.email()).check(z.toLowerCase()).check(z.trim());
const passwordField = () => z.string().check(z.minLength(1, { error: "This field is required" })).check(
  z.minLength(8, { error: "Password must be at least 8 characters long" })
).check(
  z.maxLength(100, {
    error: "Password must be at most 100 characters long"
  })
).check(
  z.regex(/[A-Z]/, {
    error: "Password must contain at least one uppercase letter"
  })
).check(
  z.regex(/[a-z]/, {
    error: "Password must contain at least one lowercase letter"
  })
).check(
  z.regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    error: "Password must contain at least 1 special character"
  })
).check(z.trim());
const selectField = (values) => z.enum(values, {
  error: "Please select a valid option"
});
const otpField = () => z.string().check(z.length(6, "OTP must be exactly 6 digits")).check(z.regex(/^\d+$/, "OTP must contain only numbers"));
export {
  optionalString as a,
  otpField as b,
  emailField as e,
  optionalBoolean as o,
  passwordField as p,
  requiredString as r,
  selectField as s
};
