function createSelectOptions(options) {
  return {
    options,
    values: options.map((opt) => opt.value)
  };
}
const constitutionOfBusinessConfig = createSelectOptions([
  { value: "proprietorship", label: "Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "pvt_ltd", label: "Pvt Ltd" }
]);
const CONSTITUTION_OF_BUSINESS_OPTIONS = constitutionOfBusinessConfig.options;
const CONSTITUTION_OF_BUSINESS_VALUES = constitutionOfBusinessConfig.values;
const userTypeConfig = createSelectOptions([
  { value: "tax_payer", label: "Taxpayer" },
  { value: "consultant", label: "Consultant" },
  { value: "ca", label: "CA" },
  { value: "advocate", label: "Advocate" }
]);
const USER_TYPE_OPTIONS = userTypeConfig.options;
const USER_TYPE_VALUES = userTypeConfig.values;
export {
  CONSTITUTION_OF_BUSINESS_VALUES as C,
  USER_TYPE_VALUES as U,
  CONSTITUTION_OF_BUSINESS_OPTIONS as a,
  USER_TYPE_OPTIONS as b
};
