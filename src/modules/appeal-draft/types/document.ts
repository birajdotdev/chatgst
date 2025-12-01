export interface DocumentData {
  id: string;
  doc_name: string;
  assessee_details: AssesseeDetails;
  order_details: OrderDetail[];
  jurisdiction_details: JurisdictionDetails;
  created_at: Date;
  updated_at: Date;
}

export interface AssesseeDetails {
  assessee_name: string;
  assessee_address: string;
}

export interface JurisdictionDetails {
  jurisdiction_officer: string;
  jurisdiction_office: string;
}

export interface OrderDetail {
  order_number: string;
  order_date: string;
  tax_period: string;
  demand_amount: string;
}
