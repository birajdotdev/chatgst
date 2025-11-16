import { createSelectOptions } from "@/modules/auth/constants/helpers";

const userTypeConfig = createSelectOptions([
  { value: "tax_payer", label: "Taxpayer" },
  { value: "consultant", label: "Consultant" },
  { value: "ca", label: "CA" },
  { value: "advocate", label: "Advocate" },
] as const);

export const USER_TYPE_OPTIONS = userTypeConfig.options;
export const USER_TYPE_VALUES = userTypeConfig.values;
