import { z } from "zod";
import { b as otpField, e as emailField } from "./helpers-CIAyAvNc.js";
const sendOtpSchema = z.object({
  email: emailField()
});
const verifyOtpSchema = z.object({
  email: emailField(),
  otp: otpField()
});
export {
  sendOtpSchema as s,
  verifyOtpSchema as v
};
