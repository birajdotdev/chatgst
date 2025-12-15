export interface References {
  message: string;
  data: Data;
}

export interface Data {
  "Input Tax Credit": InputTaxCredit[];
  "Classification of Goods and Services": any[];
}

export interface InputTaxCredit {
  section_name: string;
  brief_description_of_section: string;
  authority: string;
  key_points: string[];
}
