import { z } from "zod";
const resetPasswordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(8, "New password must be at least 8 characters"),
  confirm_password: z.string().min(1, "Confirm password is required")
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"]
});
export {
  resetPasswordSchema as r
};
