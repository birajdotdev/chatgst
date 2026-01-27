import { c as createSsrRpc } from "./createSsrRpc-D8jcV7CB.js";
import { v as verifyOtpSchema, s as sendOtpSchema } from "./otp-schema-CrqXLMtA.js";
import { c as createServerFn } from "../server.js";
const sendOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => sendOtpSchema.parse(data)).handler(createSsrRpc("06fd1849caa911a803219791b0037b1774667c374965f82387156fcb78ab7ad3"));
const verifyOtpFn = createServerFn({
  method: "POST"
}).inputValidator((data) => verifyOtpSchema.parse(data)).handler(createSsrRpc("ee32b3f2b0fdc7bab9d2d789e2032b225aa5915f25bc8b30350a64a204881ad6"));
export {
  sendOtpFn as s,
  verifyOtpFn as v
};
