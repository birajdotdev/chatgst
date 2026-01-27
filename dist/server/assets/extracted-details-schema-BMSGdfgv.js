import { z } from "zod";
import { r as requiredString } from "./helpers-CIAyAvNc.js";
const assesseeDetailsSchema = z.object({
  assessee_name: requiredString(),
  assessee_address: requiredString()
});
const orderDetailsSchema = z.object({
  order_number: requiredString(),
  order_date: z.iso.date("Order date must be a valid date"),
  tax_period: requiredString(),
  demand_amount: requiredString()
});
const jurisdictionDetailsSchema = z.object({
  jurisdiction_officer: requiredString(),
  jurisdiction_office: requiredString()
});
const extractedDetailsSchema = z.object({
  assessee_details: assesseeDetailsSchema,
  order_details: z.array(orderDetailsSchema).default([]),
  jurisdiction_details: jurisdictionDetailsSchema
});
const updateDocumentSchema = extractedDetailsSchema.extend({
  id: z.string().min(1, "Document ID is required")
});
export {
  updateDocumentSchema as u
};
