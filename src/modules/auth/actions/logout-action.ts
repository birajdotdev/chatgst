import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "vinxi/http";

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  return { success: true };
});
