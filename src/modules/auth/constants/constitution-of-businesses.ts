import { createSelectOptions } from "@/modules/auth/constants/helpers";

const constitutionOfBusinessConfig = createSelectOptions([
  { value: "proprietorship", label: "Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "pvt_ltd", label: "Pvt Ltd" },
] as const);

export const CONSTITUTION_OF_BUSINESS_OPTIONS =
  constitutionOfBusinessConfig.options;
export const CONSTITUTION_OF_BUSINESS_VALUES =
  constitutionOfBusinessConfig.values;
